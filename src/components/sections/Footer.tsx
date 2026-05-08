"use client";

import Link from "next/link";

const COLS = [
  {
    title: "Chapters",
    links: [
      { label: "Innovators", href: "#" },
      { label: "Superiors", href: "#" },
      { label: "Pioneers", href: "#" },
    ],
  },
  {
    title: "Visit",
    links: [
      { label: "About NIA", href: "#about" },
      { label: "Schedule", href: "#schedule" },
      { label: "Apply", href: "#apply" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "+91 98 25 0X XXXX", href: "tel:+919825000000" },
      { label: "hello@niasurat.com", href: "mailto:hello@niasurat.com" },
      { label: "Surat, Gujarat", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-deep text-white">
      <div className="section-container py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 lg:gap-16">
          {/* Brand column */}
          <div>
            <span className="text-[32px] font-bold tracking-tight">NIA</span>
            <p className="text-[14px] text-white/60 mt-3 leading-relaxed max-w-xs">
              Three chapters. 72 business owners. One mission — to be the most-trusted referral room
              in Surat.
            </p>
          </div>

          {COLS.map((col) => (
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-6 border-t border-white/10">
          <span className="text-[13px] text-white/40">
            &copy; 2026 NIA Surat &middot; A Network In Action chapter
          </span>
          <Link
            href="https://propelius.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] text-white/40 bg-white/5 px-3 py-1.5 rounded-pill hover:bg-white/10 transition-colors"
          >
            Built by Propelius
          </Link>
        </div>
      </div>
    </footer>
  );
}
