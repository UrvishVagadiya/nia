"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { CHAPTERS, NAV_LINKS } from "@/components/constant/Navbar.data";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky py-1.5 top-0 z-50 transition-all duration-300 bg-paper">
      <nav className="section-container flex items-center justify-between h-16 gap-x-4">
        <div className="pt-3 shrink-0">
          <Image src="/Nia.png" alt="NIA Logo" width={45} height={45} className="w-auto h-[38px]" />
        </div>
        <div className="hidden sm:flex items-center border border-line rounded-pill bg-paper-3 p-1 shadow-sm overflow-hidden max-w-[400px]">
          <div className="flex items-center overflow-x-auto no-scrollbar">
            {CHAPTERS.map((ch) => {
              const href = `/${ch.id}`;
              const isActive = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={ch.id}
                  href={href}
                  className={cn(
                    "px-4 py-1.5 rounded-pill text-[13px] font-semibold transition-all duration-200 whitespace-nowrap text-center",
                    isActive ? "bg-brand text-white shadow-sm" : "text-ink-3 hover:text-ink"
                  )}
                >
                  {ch.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="hidden lg:flex flex-1 items-center justify-end gap-x-6 px-4 overflow-hidden">
          <div className="flex items-center gap-x-6 overflow-x-auto no-scrollbar">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[14px] font-medium text-ink-2 hover:text-brand-2 transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-x-3 shrink-0">
          <div className="hidden md:block">
            <Button variant="primary" render={<Link href="#apply" />} nativeButton={false}>
              Visit a Meeting
            </Button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            suppressHydrationWarning
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md text-ink-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Dropdown */}
      {mobileOpen && (
        <div className="lg:hidden bg-paper border-t border-line px-6 py-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
          {/* Chapter Switcher for Mobile */}
          <div className="flex items-center border border-line rounded-pill bg-paper-3 p-1 shadow-sm overflow-hidden">
            <div className="flex items-center w-full">
              {CHAPTERS.map((ch) => {
                const href = `/${ch.id}`;
                const isActive = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <Link
                    key={ch.id}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex-1 px-3 py-2 rounded-pill text-[12px] font-semibold transition-all duration-200 whitespace-nowrap text-center",
                      isActive ? "bg-brand text-white shadow-sm" : "text-ink-3 hover:text-ink"
                    )}
                  >
                    {ch.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-1">
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
          </div>

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
