
"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        const savedTheme = localStorage.getItem("lexora-theme");
        setTheme(savedTheme === "light" ? "light" : "dark");
    }, []);

    function toggleTheme() {
        const nextTheme = theme === "dark" ? "light" : "dark";

        setTheme(nextTheme);
        localStorage.setItem("lexora-theme", nextTheme);

        document.documentElement.classList.toggle(
            "dark",
            nextTheme === "dark"
        );
    }

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark and light mode"
            className="flex h-[54px] w-[54px] items-center justify-center rounded-xl border border-slate-300 bg-white text-2xl shadow-sm transition-all duration-200 hover:border-blue-400 hover:bg-blue-50 dark:border-white/20 dark:bg-slate-800 dark:hover:bg-slate-700"
        >
            {theme === "dark" ? "☀️" : "🌙"}
        </button>
    );
}
