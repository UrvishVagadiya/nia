"use client";

import Link from "next/link";
import { FOOTER_DATA } from "@/components/constant/Footer.data";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-brand-deep text-white">
      <div className="section-container pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 lg:gap-16">
          {/* Brand column */}
          <div>
            <Image
              src="/nia-logo.png"
              alt="NIA Logo"
              width={120}
              height={40}
              className="invert brightness-0 "
            />
            <p className="text-[14px] text-white/60 mt-3 leading-relaxed max-w-xs">
              Three chapters. 72 business owners. One mission — to be the most-trusted referral room
              in Surat.
            </p>
          </div>

          {FOOTER_DATA.map((col) => (
            <div key={col.title}>
              <h4 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/40 mb-4">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-12 pt-6 border-t border-white/10">
          <span className="text-[13px] text-white/40">
            &copy; 2026 NIA Surat &middot; A Network In Action chapter
          </span>
          <Link
            href="https://propelius.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-[8px] text-[12px] text-white px-[14px] py-[7px] bg-white/[0.08] border border-white/15 rounded-pill font-[600] hover:bg-white/[0.12] transition-colors"
          >
            <span className="w-[5px] h-[5px] rounded-full bg-brand" />
            Built by Propelius
          </Link>
        </div>
      </div>
    </footer>
  );
}
