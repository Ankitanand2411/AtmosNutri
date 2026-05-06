import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { NutriProvider } from "@/hooks/useNutriStore";
import { Sidebar } from "@/components/layout/Sidebar";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "NutriOS · Cognitive Food Engine",
  description: "A food intelligence OS — circadian timing, mood-based meals, habit streaks, and macro tracking in one minimal interface.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} dark`}>
      <body style={{ background: "var(--bg)", color: "var(--text-1)" }}>
        <NutriProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            {/* Offset for sidebar width */}
            <div className="flex-1 ml-[220px] min-h-screen overflow-x-hidden">
              {children}
            </div>
          </div>
        </NutriProvider>
      </body>
    </html>
  );
}
