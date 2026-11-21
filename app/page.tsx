
"use client";

import { useState, useEffect } from "react";
import uz from "../messages/uz.json";
import ru from "../messages/ru.json";
import en from "../messages/en.json";
import ThemeToggle from "@/components/ThemeToggle";
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

  useEffect(() => {
    const savedLanguage = localStorage.getItem("lexora-language");

    if (
      savedLanguage === "uz" ||
      savedLanguage === "ru" ||
      savedLanguage === "en"
    ) {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = translations[language];


  return (
    <main className="min-h-screen bg-[var(--lexora-bg)] text-[var(--lexora-text)] transition-colors duration-300">

      <header className="border-b border-slate-200 dark:border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            ⚖️ Lexora
          </h1>

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              aria-label={t.nav.country}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-lg text-slate-900 transition-colors dark:border-white/20 dark:bg-slate-800 dark:text-white"
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

              onChange={(e) => {
                const selectedLanguage = e.target.value as Language;
                setLanguage(selectedLanguage);
                localStorage.setItem("lexora-language", selectedLanguage);
              }}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-lg text-slate-900 transition-colors dark:border-white/20 dark:bg-slate-800 dark:text-white"
            >
              <option value="uz">O‘zbekcha</option>
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </select>

            <ThemeToggle />

          </div>
        </div>
      </header>


      <section className="mx-auto max-w-7xl px-5 pt-10 pb-16 text-center sm:pt-10 sm:pb-15">
        <div className="mb-8 inline-block rounded-full border border-blue-200 bg-blue-50 px-5 py-3 text-lg font-semibold text-blue-700 transition-colors dark:border-blue-400/30 dark:bg-blue-500/10 dark:text-blue-300">
          {t.home.badge}
        </div>

        <h2 className="mx-auto max-w-5xl text-4xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
          {t.home.title}
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-slate-600 dark:text-slate-300 sm:text-2xl">
          {t.home.description}
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

          <button
            className="rounded-xl bg-blue-600 px-9 py-5 text-xl font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl"
          >
            {t.home.start}
          </button>



          <button
            className="rounded-xl border border-slate-300 bg-white px-9 py-5 text-xl font-semibold text-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
          >
            {t.home.laws}
          </button>

        </div>


        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-white/5 dark:hover:border-blue-500/40">
            <div className="text-5xl">🤖</div>
            <h3 className="mt-5 text-2xl font-bold">
              {language === "uz"
                ? "AI huquqiy yordamchi"
                : language === "ru"
                  ? "Юридический AI-помощник"
                  : "AI Legal Assistant"}
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-white/5 dark:hover:border-blue-500/40">
            <div className="text-5xl">📚</div>
            <h3 className="mt-5 text-2xl font-bold">
              {language === "uz"
                ? "Huquqiy darslar"
                : language === "ru"
                  ? "Юридические уроки"
                  : "Legal Lessons"}
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-white/5 dark:hover:border-blue-500/40">
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
    </main >
  );
}
