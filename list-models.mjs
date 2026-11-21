
import { GoogleGenAI } from "@google/genai";
import { readFileSync } from "node:fs";

const env = readFileSync(".env.local", "utf8");
const apiKey = env.match(/^GEMINI_API_KEY=(.*)$/m)?.[1]?.trim().replace(/^["']|["']$/g, "");

if (!apiKey) {
  throw new Error("GEMINI_API_KEY topilmadi");
}

const ai = new GoogleGenAI({ apiKey });

const models = await ai.models.list();

for await (const model of models) {
  console.log(model.name);
}
