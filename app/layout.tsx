import "./styles.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Talk-To-My-Lawyer",
  description: "Generate professional legal letters with ease.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-white text-slate-900 antialiased font-sans">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
