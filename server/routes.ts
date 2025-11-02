import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";

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
      const recording = await storage.createRecording({
        ...req.body,
        userId,
      });
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

  const httpServer = createServer(app);

  return httpServer;
}
