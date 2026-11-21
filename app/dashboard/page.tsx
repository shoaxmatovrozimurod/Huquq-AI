
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

import uz from "../../messages/uz.json";
import ru from "../../messages/ru.json";
import en from "../../messages/en.json";

const translations = { uz, ru, en };

type Language = keyof typeof translations;

export default function DashboardPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);

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

    const t = translations[language].dashboard;


    useEffect(() => {
        async function checkUser() {
            const { data, error } = await supabase.auth.getUser();

            if (error || !data.user) {
                router.replace("/login");
                return;
            }

            setEmail(data.user.email ?? "");
            setLoading(false);
        }

        checkUser();
    }, [router]);

    async function handleLogout() {
        const { error } = await supabase.auth.signOut();

        if (error) {
            alert(t.logoutError);
            return;
        }

        router.replace("/login");
    }


    if (loading) {
        return (

            <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
                <p className="text-xl">{t.loading}</p>
            </main>

        );
    }

    return (
        <main className="min-h-screen bg-slate-950 p-6 text-white">
            <div className="mx-auto max-w-6xl">

                <header className="flex items-center justify-between border-b border-white/10 py-6">
                    <h1 className="text-4xl font-bold">⚖️ Lexora</h1>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="rounded-xl border border-red-400/40 px-5 py-3 font-semibold text-red-300 transition hover:bg-red-500/10"
                    >
                        {t.logout}
                    </button>
                </header>


                <section className="py-12">

                    <h2 className="text-3xl font-bold">
                        {t.title}
                    </h2>

                    <p className="mt-4 text-lg text-slate-300">
                        {t.welcome}, {email}!
                    </p>


                    <div className="mt-10 grid gap-6 md:grid-cols-3">

                        <Link
                            href="/ai-assistant"
                            className="rounded-2xl border border-white/10 bg-white/5 p-8 transition hover:border-blue-500 hover:bg-white/10"
                        >
                            <div className="text-4xl">🤖</div>
                            <h3 className="mt-4 text-xl font-bold">
                                {t.aiAssistant}
                            </h3>
                        </Link>


                        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                            <div className="text-4xl">📚</div>

                            <h3 className="mt-4 text-xl font-bold">
                                {t.lessons}
                            </h3>

                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                            <div className="text-4xl">📝</div>

                            <h3 className="mt-4 text-xl font-bold">
                                {t.tests}
                            </h3>

                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
