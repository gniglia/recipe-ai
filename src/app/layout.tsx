import { Geist, Geist_Mono } from "next/font/google";

import { Toaster } from "sonner";

import "./globals.css";

import { QueryProvider } from "@/components/providers/query-provider";

import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RecipeAI - Your Smart Recipe Assistant",
  description:
    "Discover amazing recipes tailored to your ingredients, dietary preferences, and cooking style. Let Google Gemini AI transform your available ingredients into culinary masterpieces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <QueryProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "white",
                border: "1px solid #f97316",
                color: "#1f2937",
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
