
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Savol kiritilmagan" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API kaliti topilmadi" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    console.time("Lexora Gemini javob vaqti");
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: message.trim(),
      config: {
        systemInstruction:
          "Sen Lexora AI nomli huquqiy yordamchisan. " +
          "Foydalanuvchining tilida javob ber. " +
          "Huquqiy savollarga sodda va tushunarli javob ber. " +
          "Qonun moddalarini yoki manbalarni to'qib chiqarma. " +
          "Qaysi davlat qonunchiligi haqida gap ketayotgani " +
          "noma'lum bo'lsa, avval davlatni aniqlashtir. " +
          "Javoblaring umumiy huquqiy ma'lumot ekanini " +
          "va professional yuridik maslahat o'rnini " +
          "bosmasligini tushuntir.",
      },
    });
    console.timeEnd("Lexora Gemini javob vaqti");
    return NextResponse.json({
      reply: response.text ?? "AI javob qaytarmadi.",
    });
  } catch (error) {
    console.error("Lexora Gemini API xatosi:", error);

    return NextResponse.json(
      { error: "AI bilan bog‘lanishda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
