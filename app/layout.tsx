
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lexora — AI Legal Platform",
  description: "Multilingual AI-powered legal assistance platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className="h-full">

      <body
        className={`${inter.className} min-h-full flex flex-col antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>

    </html>
  );
}
