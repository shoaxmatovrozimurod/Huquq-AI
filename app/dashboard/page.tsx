
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);

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
            alert("Akkauntdan chiqishda xatolik yuz berdi.");
            return;
        }

        router.replace("/login");
    }


    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
                <p className="text-xl">Yuklanmoqda...</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 p-6 text-white">
            <div className="mx-auto max-w-6xl">
                <header className="border-b border-white/10 py-6">
                    <h1 className="text-4xl font-bold">⚖️ Lexora</h1>
                </header>

                <section className="py-12">
                    <h2 className="text-3xl font-bold">
                        Shaxsiy kabinet
                    </h2>

                    <p className="mt-4 text-lg text-slate-300">
                        Xush kelibsiz, {email}!
                    </p>

                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                            <div className="text-4xl">🤖</div>
                            <h3 className="mt-4 text-xl font-bold">
                                AI huquqiy yordamchi
                            </h3>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                            <div className="text-4xl">📚</div>
                            <h3 className="mt-4 text-xl font-bold">
                                Huquqiy darslar
                            </h3>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                            <div className="text-4xl">📝</div>
                            <h3 className="mt-4 text-xl font-bold">
                                Test tizimi
                            </h3>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
