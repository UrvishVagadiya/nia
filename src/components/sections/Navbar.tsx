"use client";

import Link from "next/link";
import { ChapterSwitcher } from "./EyebrowChip";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Members", href: "#members" },
  { label: "Schedule", href: "#schedule" },
  { label: "Membership", href: "#pricing" },
  { label: "Updates", href: "#updates" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-paper/90 backdrop-blur-lg border-b border-line shadow-sm" : "bg-paper"
      }`}
    >
      <nav className="section-container flex items-center justify-between h-16 gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-[28px] font-bold tracking-tight text-brand">NIA</span>
        </Link>

        {/* Chapter Switcher — always visible */}
        <div className="hidden sm:flex">
          <ChapterSwitcher />
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[14px] font-medium text-ink-2 hover:text-brand-2 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="primary" render={<Link href="#apply" />} nativeButton={false}>
            Visit a Meeting
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md text-ink-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Switcher — visible on small screens */}
      <div className="sm:hidden flex justify-center pb-2 px-4">
        <ChapterSwitcher />
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileOpen && (
        <div className="lg:hidden bg-paper border-t border-line px-6 py-4 flex flex-col gap-3 animate-in slide-in-from-top-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-[15px] font-medium text-ink-2 py-2 hover:text-brand-2 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div onClick={() => setMobileOpen(false)} className="mt-2 flex">
            <Button
              variant="primary"
              render={<Link href="#apply" />}
              className="w-full"
              nativeButton={false}
            >
              Visit a Meeting
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
