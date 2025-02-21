import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import ChatHistory from "@/lib/db/models/chatHistory";
import Product from "@/lib/db/models/product.model";
import { initialMessages } from "@/lib/data";


export const runtime = "nodejs";
const generateId = () => Math.random().toString(36).slice(2, 15);

export async function POST(req: NextRequest) {
  await connectToDatabase();

  try {
    const body = await req.json();
    const chatId = body.chatId || generateId();
    const messages = body.messages;
    let chat = await ChatHistory.findOne({ chatId });

    if (!chat) {
      chat = await ChatHistory.create({ chatId, messages });
    } else {
      if (!Array.isArray(chat.messages)) {
        chat.messages = [];
      }
      chat.messages.push(...messages);
      await chat.save();
    }

    // 🔹 Ambil pertanyaan terakhir pengguna
    const latestUserMessage = messages[messages.length - 1]?.content || "";


    if (latestUserMessage.toLowerCase().includes("produk") || latestUserMessage.toLowerCase().includes("harga")) {
      const products = await Product.find({});


      const messagesForAI = [
        {
          parts: [
            { text: initialMessages.map(m => m.content) },
            { text: `Berikut adalah produk kami: ${products.map(p => `Nama: ${p.name}, Harga: ${p.price}, Deskripsi: ${p.description}, Kategori: ${p.category}, Gambar: ${p.images}, Stok: ${p.countInStock}, Brand: ${p.brand}, Warna: ${p.colors}, Ukuran: ${p.sizes}, Penjualan: ${p.numSales}, Rating: ${p.avgRating},`)}` },
            ...chat.messages.map(({ content }: { content: string }) => ({ text: content }))
          ]
        }
      ];

      // const messagesForAI = [
      //   {
      //     parts: chat.messages.map(({ content }: { content: string }) => ({ text: content }))
      //   }
      // ];
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contents: messagesForAI }),
        }
      );

      const data = await response.json();

      const aiReply = {
        role: "assistant",
        content: data.candidates?.[0]?.content?.parts?.[0]?.text || "No response",
        timestamp: new Date()
      };


      await ChatHistory.updateOne(
        { chatId },
        { $push: { messages: { role: "assistant", content: aiReply.content, timestamp: aiReply.timestamp } } }
      );

      if (!response.ok) {
        console.error("❌ Gemini API Error:", data);
        throw new Error(data.error?.message || "Unknown API error");
      }

      return NextResponse.json({
        success: true,
        chatId,
        reply: aiReply
      });
    }
  }
  catch (error) {
    return NextResponse.json({ success: false, message: "Something went wrong", error }, { status: 500 });
  }
}
