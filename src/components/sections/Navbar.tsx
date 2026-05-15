"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { NAV_LINKS } from "@/constant/Navbar.data";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { NavbarProps } from "@/lib/types";

const Navbar = ({ chapters, currentChapterSlug, host }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  return (
    <header
      className="sticky py-1.5 top-0 z-50 transition-all duration-300 bg-paper border-b border-line"
      data-chapter={currentChapterSlug}
      data-host={host}
      data-chapters-count={chapters.length}
    >
      <nav className="section-container flex items-center justify-between h-16">
        {/* LOGO */}
        <div className="pt-3 shrink-0">
          <Image src="/Nia.png" alt="NIA Logo" width={45} height={45} className="w-auto h-[38px]" />
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-x-6 lg:gap-x-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[14px] font-medium text-ink-2 hover:text-brand transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button variant="primary" render={<Link href="#apply" />} nativeButton={false}>
            Visit a Meeting
          </Button>
        </div>

        {/* TOGGLE BUTTON */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-ink-2 z-[60] relative"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* MOBILE SIDEBAR SYSTEM */}
      {/* 1. Backdrop - Fades in/out */}
      <div
        className={cn(
          "fixed inset-0 bg-ink/20 backdrop-blur-sm md:hidden z-40 transition-opacity duration-500 ease-in-out",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileOpen(false)}
      />

      {/* 2. Sidebar - Slides in/out from right */}
      <div
        className={cn(
          "fixed top-0 right-0 h-screen w-[280px] bg-paper border-l border-line px-6 py-20 flex flex-col gap-8 shadow-2xl z-50 transition-transform duration-500 ease-in-out md:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col gap-2">
          <Typography
            variant="body-md"
            color="ink-4"
            className="uppercase tracking-widest font-bold mb-2 opacity-50"
          >
            Menu
          </Typography>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-[18px] font-semibold text-ink-2 py-3 border-b border-line/50"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div onClick={() => setMobileOpen(false)}>
          <Button
            variant="primary"
            render={<Link href="#apply" />}
            className="w-full h-12 text-base shadow-md"
            nativeButton={false}
          >
            Visit a Meeting
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
