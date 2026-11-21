
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import uz from "../../messages/uz.json";
import ru from "../../messages/ru.json";
import en from "../../messages/en.json";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const translations = { uz, ru, en };

type Language = keyof typeof translations;

type Message = {
    role: "user" | "assistant";
    content: string;
};

export default function AIAssistantPage() {
    const [language, setLanguage] = useState<Language>("uz");
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    }, [messages, isLoading]);

    const t = translations[language].aiAssistant;

    async function handleSendMessage() {
        const text = question.trim();

        if (!text || isLoading) return;

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: text,
            },
        ]);

        setQuestion("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: text,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || t.error);
            }

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: data.reply || t.error,
                },
            ]);
        } catch (error) {
            console.error("Lexora AI xatosi:", error);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: t.error,
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-[var(--lexora-bg)] text-[var(--lexora-text)] transition-colors duration-300">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">

                {/* HEADER */}
                <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 py-6 dark:border-white/10">
                    <Link
                        href="/"
                        className="text-2xl font-extrabold tracking-tight sm:text-3xl"
                    >
                        ⚖️ Lexora AI
                    </Link>

                    <Link
                        href="/dashboard"
                        className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-blue-400"
                    >
                        ← {t.back}
                    </Link>
                </header>

                {/* PAGE CONTENT */}
                <section className="py-10">
                    <div className="mb-8">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300">
                            <span>✨</span>
                            <span>Lexora AI</span>
                        </div>

                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                            {t.title}
                        </h1>

                        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
                            {t.description}
                        </p>
                    </div>

                    {/* CHAT CONTAINER */}
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/60">

                        {/* CHAT HEADER */}
                        <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-6 py-4 dark:border-white/10 dark:bg-slate-900">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-2xl dark:bg-blue-500/15">
                                ⚖️
                            </div>

                            <div>
                                <h2 className="font-bold">Lexora AI</h2>

                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {t.title}
                                </p>
                            </div>
                        </div>

                        {/* CHAT MESSAGES */}
                        <div
                            role="log"
                            aria-live="polite"
                            className="flex min-h-[360px] max-h-[55vh] flex-col gap-4 overflow-y-auto bg-white p-5 sm:p-7 dark:bg-slate-900/40"
                        >
                            {messages.length === 0 && !isLoading ? (
                                <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                                    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-4xl dark:bg-blue-500/10">
                                        🤖
                                    </div>

                                    <h3 className="text-xl font-bold">
                                        {t.title}
                                    </h3>

                                    <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
                                        {t.empty}
                                    </p>
                                </div>
                            ) : (
                                <>
                                    {messages.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`flex ${message.role === "user"
                                                ? "justify-end"
                                                : "justify-start"
                                                }`}
                                        >
                                            <div
                                                className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm sm:text-base ${message.role === "user"
                                                    ? "rounded-br-md bg-blue-600 text-white"
                                                    : "rounded-bl-md border border-slate-200 bg-slate-100 text-slate-900 dark:border-white/10 dark:bg-slate-800 dark:text-slate-100"
                                                    }`}
                                            >

                                                {message.role === "assistant" ? (
                                                    <div className="prose prose-slate max-w-none dark:prose-invert">
                                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                            {message.content}
                                                        </ReactMarkdown>
                                                    </div>
                                                ) : (
                                                    message.content
                                                )}

                                            </div>
                                        </div>
                                    ))}

                                    {/* AI LOADING */}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div
                                                role="status"
                                                className="flex items-center gap-3 rounded-2xl rounded-bl-md border border-slate-200 bg-slate-100 px-5 py-4 text-sm text-slate-600 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300"
                                            >
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                                                <span>{t.thinking}</span>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                void handleSendMessage();
                            }}
                            className="border-t border-slate-200 bg-slate-50 p-4 sm:p-6 dark:border-white/10 dark:bg-slate-900"
                        >
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    placeholder={t.placeholder}
                                    aria-label={t.placeholder}
                                    disabled={isLoading}
                                    className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-5 py-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 disabled:opacity-60 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 sm:text-base"
                                />

                                <button
                                    type="submit"
                                    disabled={!question.trim() || isLoading}
                                    className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-blue-500 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 sm:px-7 sm:text-base"
                                >
                                    <span>{t.send}</span>
                                    <span aria-hidden="true">➤</span>
                                </button>
                            </div>

                            <p className="mt-4 text-center text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                {t.disclaimer}
                            </p>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    );
}
