import mongoose from "mongoose";
import { z } from "zod";

// 🔹 Schema untuk validasi dengan Zod
export const ChatHistorySchema = z.object({
  _id: z.string().optional(), // MongoDB akan mengisi otomatis
  chatId: z.string(),
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string(),
      timestamp: z.date().optional(),
    })
  ),
});

const ChatHistoryMongoSchema = new mongoose.Schema(
  {
    chatId: { type: String, unique: true, required: true },
    messages: [
      {
        role: { type: String, enum: ["user", "assistant"], required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const ChatHistory = mongoose.models.ChatHistory || mongoose.model("ChatHistory", ChatHistoryMongoSchema);

export default ChatHistory;
