import { streamText, Message } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db";


import Product from "@/lib/db/models/product.model";

import { initialMessages } from "@/lib/data";


const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API || "",
});

export const runtime = "nodejs";

const generateId = () => Math.random().toString(36).slice(2, 15);

const buildGoogleGenAIPrompt = (initialMessages: string, initialContent: string, messages: Message[]): Message[] => [
  {
    id: generateId(),
    role: "user",
    content: `${JSON.stringify(initialMessages, null, 2)}\n\n${initialContent}`,  // Gabungan data Produk, Order, dan User
  },
  ...messages.map((message) => ({
    id: message.id || generateId(),
    role: message.role,
    content: message.content,
  })),
];

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const { messages } = await req.json();
  // 🔹 Ambil session user dari request


  // 🔹 Ambil data produk terbaru
  const products = await Product.find();


  // 🔹 Ambil data order berdasarkan userId (jika ada sesi user)


  // 🔹 Gabungkan semua informasi menjadi satu prompt awal
  const initialContent = `📦 Data semua Produk :\n${products}\n\n`;

  // 🔹 Kirim ke AI sebagai prompt
  const stream = await streamText({
    model: google("gemini-pro"),
    messages: buildGoogleGenAIPrompt(initialMessages.content, initialContent, messages,),
    temperature: 0.7,
  });

  return stream?.toDataStreamResponse();
}
