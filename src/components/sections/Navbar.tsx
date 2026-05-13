"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/constant/Navbar.data";
import Typography from "@/components/ui/typography";

interface NavbarProps {
  chapters: { name: string; slug: string }[];
  currentChapterSlug?: string;
  host: string;
}

const Navbar = ({ chapters, currentChapterSlug, host }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Sort chapters alphabetically
  const sortedChapters = [...chapters].sort((a, b) => a.name.localeCompare(b.name));

  // Helper to build subdomain URLs
  const getSubdomainUrl = (slug: string) => {
    const protocol = host.includes("localhost") ? "http" : "https";
    const productionDomain = "nia-surat.propelius.tech";

    let baseDomain = host;
    if (host.includes(productionDomain)) {
      baseDomain = productionDomain;
    } else if (host.includes("localhost")) {
      if (host.includes("localhost:3000")) baseDomain = "localhost:3000";
    }

    // Map 'innovators' slug back to 'innovator' subdomain for the URL
    const subdomain = slug === "innovators" ? "innovator" : slug;
    return `${protocol}://${subdomain}.${baseDomain}/`;
  };

  return (
    <header className="sticky py-1.5 top-0 z-50 transition-all duration-300 bg-paper">
      <nav className="section-container flex items-center justify-between h-16 gap-x-8">
        <div className="pt-3 shrink-0">
          <Image src="/Nia.png" alt="NIA Logo" width={45} height={45} className="w-auto h-[38px]" />
        </div>

        <div className="hidden md:flex gap-5">
          <div className="flex items-center gap-x-5 lg:gap-x-6">
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
          <div className="flex items-center gap-x-3 shrink-0">
            <div className="hidden md:block">
              <Button variant="primary" render={<Link href="#apply" />} nativeButton={false}>
                Visit a Meeting
              </Button>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              suppressHydrationWarning
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-ink-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-paper border-t border-line px-6 py-6 flex flex-col gap-6 animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-1">
            <Typography
              variant="caption"
              color="ink-4"
              className="uppercase tracking-widest font-bold mb-2"
            >
              Menu
            </Typography>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[16px] font-semibold text-ink-2 py-2.5 border-b border-line/50 hover:text-brand transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div onClick={() => setMobileOpen(false)} className="mt-2">
            <Button
              variant="primary"
              render={<Link href="#apply" />}
              className="w-full h-12 text-base"
              nativeButton={false}
            >
              Visit a Meeting
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
