
"use client";

import { useEffect } from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const savedTheme = localStorage.getItem("lexora-theme");

    const theme = savedTheme === "light" ? "light" : "dark";

    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );
  }, []);

  return <>{children}</>;
}
