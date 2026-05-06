import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { NutriProvider } from "@/hooks/useNutriStore";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "NutriOS · Cognitive Food Engine",
  description:
    "A food intelligence OS that maps your mood, circadian rhythm, and habits to smarter eating — no calorie obsession, just cognitive performance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} dark`}>
      <body>
        <NutriProvider>{children}</NutriProvider>
      </body>
    </html>
  );
}
