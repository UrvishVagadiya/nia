import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Footer, Navbar } from "@/components/sections";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NIA Surat — Three chapters. One mission.",
  description:
    "NIA Surat is a paid, invite-only business referral community. Three weekly chapters — Innovators, Superiors, Pioneers — 72 business owners, one mission: to be the most-trusted referral room in Surat.",
};

import { headers } from "next/headers";
import { getAllChapters } from "@/lib/payload";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const currentChapterSlug = headersList.get("x-subdomain") || "innovators";
  const host = headersList.get("host") || "";

  let chapters: { name: string; slug: string }[] = [];
  try {
    const all = await getAllChapters();
    chapters = Array.isArray(all) ? all.map((c) => ({ name: c.name, slug: c.slug })) : [];
  } catch (error) {
    console.error("Error fetching chapters for Navbar:", error);
  }

  // Fallback to defaults if CMS is empty or connection fails
  const navbarChapters: { name: string; slug: string }[] =
    chapters.length > 0
      ? chapters
      : [
          { name: "Innovators", slug: "innovators" },
          { name: "Superiors", slug: "superiors" },
          { name: "Pioneers", slug: "pioneers" },
        ];

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body suppressHydrationWarning={true} className="min-h-full flex flex-col">
        <Providers>
          <Navbar chapters={navbarChapters} currentChapterSlug={currentChapterSlug} host={host} />
          {children}
          <Toaster />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
