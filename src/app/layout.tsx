import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar, Footer } from "@/components/sections";

export const metadata: Metadata = {
  title: "NIA Surat — Three chapters. One mission.",
  description:
    "NIA Surat is a paid, invite-only business referral community. Three weekly chapters — Innovators, Superiors, Pioneers — 72 business owners, one mission: to be the most-trusted referral room in Surat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
