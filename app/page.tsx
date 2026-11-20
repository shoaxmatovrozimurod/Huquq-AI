
"use client";

import { useState } from "react";

import uz from "../messages/uz.json";
import ru from "../messages/ru.json";
import en from "../messages/en.json";

const translations = { uz, ru, en };

type Language = keyof typeof translations;

const countries = [
  { code: "uz", name: "O‘zbekiston" },
  { code: "kz", name: "Qozog‘iston" },
  { code: "kg", name: "Qirg‘iziston" },
  { code: "tj", name: "Tojikiston" },
  { code: "tm", name: "Turkmaniston" },
];

export default function Home() {
  const [country, setCountry] = useState("uz");
  const [language, setLanguage] = useState<Language>("uz");

  const t = translations[language];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            ⚖️ Lexora
          </h1>

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              aria-label={t.nav.country}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="rounded-xl border border-white/20 bg-slate-800 px-5 py-3 text-lg text-white"
            >
              {countries.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>

            <select
              aria-label={t.nav.language}
              value={language}
              onChange={(e) =>
                setLanguage(e.target.value as Language)
              }
              className="rounded-xl border border-white/20 bg-slate-800 px-5 py-3 text-lg text-white"
            >
              <option value="uz">O‘zbekcha</option>
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-20 text-center sm:py-28">
        <div className="mb-8 inline-block rounded-full border border-blue-400/30 bg-blue-500/10 px-5 py-3 text-lg text-blue-300">
          Global Legal AI Platform
        </div>

        <h2 className="mx-auto max-w-5xl text-4xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
          {t.home.title}
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-slate-300 sm:text-2xl">
          {t.home.description}
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <button className="rounded-xl bg-blue-600 px-9 py-5 text-xl font-bold hover:bg-blue-500">
            {t.home.start}
          </button>

          <button className="rounded-xl border border-white/20 px-9 py-5 text-xl font-semibold hover:bg-white/10">
            {t.home.laws}
          </button>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-left">
            <div className="text-5xl">🤖</div>
            <h3 className="mt-5 text-2xl font-bold">
              {language === "uz"
                ? "AI huquqiy yordamchi"
                : language === "ru"
                  ? "Юридический AI-помощник"
                  : "AI Legal Assistant"}
            </h3>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-left">
            <div className="text-5xl">📚</div>
            <h3 className="mt-5 text-2xl font-bold">
              {language === "uz"
                ? "Huquqiy darslar"
                : language === "ru"
                  ? "Юридические уроки"
                  : "Legal Lessons"}
            </h3>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-left">
            <div className="text-5xl">📝</div>
            <h3 className="mt-5 text-2xl font-bold">
              {language === "uz"
                ? "Test tizimi"
                : language === "ru"
                  ? "Система тестирования"
                  : "Testing System"}
            </h3>
          </div>
        </div>
      </section>
    </main>
  );
}
