
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { getLegalSource } from "@/lib/legal-sources";

export async function POST(request: Request) {
  try {
    const { message, country = "UZ" } = await request.json();
    const legalSource = getLegalSource(country);

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

    const startTime = performance.now();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: message.trim(),
      config: {
        // tools: [{ googleSearch: {} }],
        systemInstruction:
          `Foydalanuvchi tanlagan davlat: ${legalSource?.name ?? "Noma'lum"}. ` +
          `Ushbu davlatning rasmiy huquqiy manbasi: ${legalSource?.officialWebsite ?? "Aniqlanmagan"}. ` +
          "Huquqiy savollarga tanlangan davlat qonunchiligi doirasida javob ber. " +
          "Foydalanuvchi boshqa davlat haqida aniq so'rasa, bu farqni tushuntir. " +
          "Rasmiy manba manzilini bilishing uning hujjatlarini tekshirganingni anglatmaydi. " +
          "Qonun moddasining raqami yoki sanasiga ishonching komil bo'lmasa, taxmin qilma. Rasmiy manbadan tekshirish kerakligini ayt. " +
          "Sen Lexora AI nomli huquqiy yordamchisan. " +
          "Foydalanuvchining tilida javob ber. " +
          "Huquqiy savollarga sodda va tushunarli javob ber. " +
          "Qonun moddalarini yoki manbalarni to'qib chiqarma. " +
          "Qonun moddasini aniq bilsang, uning raqamini ko'rsat. " +
          "Rasmiy manba tasdiqlanmagan bo'lsa, buni ochiq ayt. " +
          "Qaysi davlat qonunchiligi haqida gap ketayotgani " +
          "noma'lum bo'lsa, avval davlatni aniqlashtir. " +
          "Javoblaring umumiy huquqiy ma'lumot ekanini " +
          "va professional yuridik maslahat o'rnini " +
          "bosmasligini tushuntir.",
      },
    });
    console.log(
      `Lexora Gemini javob vaqti: ${Math.round(performance.now() - startTime)}ms`
    );
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
