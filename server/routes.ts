import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import multer from "multer";
import path from "path";
import fs from "fs";
import { transcribeAudio, summarizeText, translateText } from "./openai";
import { insertRecordingSchema } from "@shared/schema";
import { z } from "zod";

// Validation schemas
const summarizeSchema = z.object({
  text: z.string().min(1, "Text is required"),
  level: z.enum(["brief", "standard", "detailed"]).optional().default("standard"),
});

const translateSchema = z.object({
  text: z.string().min(1, "Text is required"),
  targetLanguage: z.string().min(2, "Target language is required"),
});

// Configure multer for audio uploads
const upload = multer({
  dest: "server/uploads/",
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB max file size
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "audio/mpeg",
      "audio/mp3",
      "audio/wav",
      "audio/wave",
      "audio/x-wav",
      "audio/mp4",
      "audio/m4a",
      "audio/x-m4a",
      "audio/webm",
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only audio files are allowed."));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get("/api/auth/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Recording routes (all protected)
  // Get all user recordings
  app.get("/api/recordings", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const recordings = await storage.getUserRecordings(userId);
      res.json(recordings);
    } catch (error) {
      console.error("Error fetching recordings:", error);
      res.status(500).json({ message: "Failed to fetch recordings" });
    }
  });

  // Get single recording
  app.get("/api/recordings/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const recording = await storage.getRecording(req.params.id);
      
      if (!recording) {
        return res.status(404).json({ message: "Recording not found" });
      }

      // Verify recording belongs to user
      if (recording.userId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      res.json(recording);
    } catch (error) {
      console.error("Error fetching recording:", error);
      res.status(500).json({ message: "Failed to fetch recording" });
    }
  });

  // Create recording
  app.post("/api/recordings", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Validate request body
      const validatedData = insertRecordingSchema.safeParse({
        ...req.body,
        userId,
      });

      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid request data",
          errors: validatedData.error.errors,
        });
      }

      const recording = await storage.createRecording(validatedData.data);
      res.json(recording);
    } catch (error) {
      console.error("Error creating recording:", error);
      res.status(500).json({ message: "Failed to create recording" });
    }
  });

  // Update recording
  app.patch("/api/recordings/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const existing = await storage.getRecording(req.params.id);
      
      if (!existing) {
        return res.status(404).json({ message: "Recording not found" });
      }

      // Verify recording belongs to user
      if (existing.userId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const recording = await storage.updateRecording(req.params.id, req.body);
      res.json(recording);
    } catch (error) {
      console.error("Error updating recording:", error);
      res.status(500).json({ message: "Failed to update recording" });
    }
  });

  // Delete recording
  app.delete("/api/recordings/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const existing = await storage.getRecording(req.params.id);
      
      if (!existing) {
        return res.status(404).json({ message: "Recording not found" });
      }

      // Verify recording belongs to user
      if (existing.userId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      await storage.deleteRecording(req.params.id);
      res.json({ message: "Recording deleted successfully" });
    } catch (error) {
      console.error("Error deleting recording:", error);
      res.status(500).json({ message: "Failed to delete recording" });
    }
  });

  // OpenAI processing endpoints
  // Transcribe audio file
  app.post("/api/transcribe", isAuthenticated, upload.single("audio"), async (req: any, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No audio file provided" });
      }

      const transcription = await transcribeAudio(req.file.path);

      // Clean up uploaded file
      fs.unlinkSync(req.file.path);

      res.json({ transcription });
    } catch (error) {
      console.error("Error in transcription:", error);
      // Clean up file on error
      if (req.file) {
        try {
          fs.unlinkSync(req.file.path);
        } catch (e) {
          console.error("Error cleaning up file:", e);
        }
      }
      res.status(500).json({ message: "Failed to transcribe audio" });
    }
  });

  // Generate summary
  app.post("/api/summarize", isAuthenticated, async (req: any, res) => {
    try {
      const validatedData = summarizeSchema.safeParse(req.body);

      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid request data",
          errors: validatedData.error.errors,
        });
      }

      const { text, level } = validatedData.data;
      const summary = await summarizeText(text, level);
      res.json({ summary });
    } catch (error) {
      console.error("Error in summarization:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to summarize text";
      res.status(500).json({ message: errorMessage });
    }
  });

  // Translate text
  app.post("/api/translate", isAuthenticated, async (req: any, res) => {
    try {
      const validatedData = translateSchema.safeParse(req.body);

      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid request data",
          errors: validatedData.error.errors,
        });
      }

      const { text, targetLanguage } = validatedData.data;
      const translation = await translateText(text, targetLanguage);
      res.json({ translation });
    } catch (error) {
      console.error("Error in translation:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to translate text";
      res.status(500).json({ message: errorMessage });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
