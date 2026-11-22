
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import uz from "../../messages/uz.json";
import ru from "../../messages/ru.json";
import en from "../../messages/en.json";

type Language = "uz" | "ru" | "en";

export default function FactlensPage() {
    const [language, setLanguage] = useState<Language>("uz");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [hasConsent, setHasConsent] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<{
        aiProbability: number;
        classification: "likely_ai" | "likely_real" | "uncertain";
    } | null>(null);
    const [analysisError, setAnalysisError] = useState<string | null>(null);

    async function handleAnalyze() {
        if (!selectedImage || !hasConsent || isAnalyzing) return;

        setIsAnalyzing(true);
        setAnalysisError(null);
        setAnalysisResult(null);

        try {
            const formData = new FormData();
            formData.append("image", selectedImage);

            const response = await fetch("/api/factlens", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("ANALYSIS_ERROR");
            }

            const data = await response.json();

            setAnalysisResult({
                aiProbability: data.aiProbability,
                classification: data.classification,
            });
        } catch {
            setAnalysisError("ANALYSIS_ERROR");
        } finally {
            setIsAnalyzing(false);
        }
    }


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

    const translations = {
        uz,
        ru,
        en,
    };

    const t = translations[language].factlens;

    return (
        <main className="min-h-screen p-8">
            <div className="mx-auto max-w-3xl">
                <Link
                    href="/dashboard"
                    className="mb-8 inline-block text-blue-600 hover:underline"
                >
                    ← {t.back}
                </Link>

                <h1 className="text-3xl font-bold">
                    {t.title}
                </h1>

                <p className="mt-4 text-gray-500">
                    {t.description}
                </p>

                <div className="mt-8 rounded-xl border border-gray-200 p-6">
                    <label
                        htmlFor="factlens-image"
                        className="mb-3 block font-medium"
                    >
                        {t.uploadImage}
                    </label>

                    <input
                        id="factlens-image"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(event) => {
                            const file = event.target.files?.[0] ?? null;
                            setSelectedImage(file);
                        }}
                        className="block w-full rounded-lg border border-gray-300 p-3"
                    />

                    <label className="mt-5 flex items-start gap-3 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            checked={hasConsent}
                            onChange={(event) => setHasConsent(event.target.checked)}
                            className="mt-1 h-4 w-4"
                        />

                        <span>
                            {t.disclaimer}{" "}
                            {t.consent}
                        </span>

                    </label>

                    {/* <button
                        type="button"
                        disabled={!selectedImage}
                        className="mt-5 rounded-lg bg-blue-600 px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {t.analyze}
                    </button> */}
                </div>

            </div>
        </main>
    );
}
