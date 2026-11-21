
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

import uz from "../../messages/uz.json";
import ru from "../../messages/ru.json";
import en from "../../messages/en.json";


const translations = { uz, ru, en };

type Language = keyof typeof translations;

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
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

    const t = translations[language].auth;


    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setMessage(error.message);
            } else {
                setMessage(t.loginSuccess);
                router.replace("/dashboard");
            }
        } catch {
            setMessage(t.connectionError);
        } finally {
            setLoading(false);
        }

    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 text-white">
            <form
                onSubmit={handleLogin}
                className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8"
            >

                <h1 className="mb-3 text-center text-4xl font-bold">
                    ⚖️ Lexora
                </h1>

                <h2 className="mb-8 text-center text-2xl">
                    {t.loginTitle}
                </h2>

                <label htmlFor="email" className="text-lg">
                    {t.email}
                </label>

                <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-5 mt-2 w-full rounded-xl border border-white/20 bg-slate-900 p-4 text-lg"
                    placeholder="email@example.com"
                />

                <label htmlFor="password" className="text-lg">
                    {t.password}
                </label>
                <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-6 mt-2 w-full rounded-xl border border-white/20 bg-slate-900 p-4 text-lg"
                    placeholder="Parolingiz"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-blue-600 p-4 text-xl font-bold hover:bg-blue-500 disabled:opacity-50"
                >
                    {loading ? t.loading : t.loginButton}
                </button>

                {message && (
                    <p role="status" className="mt-5 text-center text-lg">
                        {message}
                    </p>
                )}

                <p className="mt-6 text-center">
                    {t.noAccount}{" "}
                    <a
                        href="/register"
                        className="text-blue-400 hover:underline"
                    >
                        {t.registerButton}
                    </a>
                </p>

            </form>
        </main>
    );
}
