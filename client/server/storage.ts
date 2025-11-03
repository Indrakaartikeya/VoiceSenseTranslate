import {
  users,
  recordings,
  type User,
  type UpsertUser,
  type Recording,
  type InsertRecording,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Recording operations
  getRecording(id: string): Promise<Recording | undefined>;
  getUserRecordings(userId: string): Promise<Recording[]>;
  createRecording(recording: InsertRecording): Promise<Recording>;
  updateRecording(id: string, recording: Partial<InsertRecording>): Promise<Recording>;
  deleteRecording(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Recording operations
  async getRecording(id: string): Promise<Recording | undefined> {
    const [recording] = await db.select().from(recordings).where(eq(recordings.id, id));
    return recording;
  }

  async getUserRecordings(userId: string): Promise<Recording[]> {
    return await db
      .select()
      .from(recordings)
      .where(eq(recordings.userId, userId))
      .orderBy(desc(recordings.createdAt));
  }

  async createRecording(recordingData: InsertRecording): Promise<Recording> {
    const [recording] = await db.insert(recordings).values(recordingData).returning();
    return recording;
  }

  async updateRecording(id: string, recordingData: Partial<InsertRecording>): Promise<Recording> {
    const [recording] = await db
      .update(recordings)
      .set({ ...recordingData, updatedAt: new Date() })
      .where(eq(recordings.id, id))
      .returning();
    return recording;
  }

  async deleteRecording(id: string): Promise<void> {
    await db.delete(recordings).where(eq(recordings.id, id));
  }
}

export const storage = new DatabaseStorage();
