"use client";

import Link from "next/link";
import { FOOTER_DATA } from "@/constant/Footer.data";
import Image from "next/image";
import Typography from "@/components/ui/typography";

const Footer = () => {
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
              className="invert brightness-0 h-auto"
              style={{ width: "auto" }}
            />
            <Typography
              variant="body-sm"
              color="white"
              className="mt-3 leading-relaxed max-w-xs text-white/60"
            >
              Three chapters. 72 business owners. One mission — to be the most-trusted referral room
              in Surat.
            </Typography>
          </div>

          {FOOTER_DATA.map((col) => (
            <div key={col.title}>
              <Typography
                as="h4"
                variant="caption"
                color="white"
                className="uppercase font-bold! tracking-[0.14em] mb-4 text-white/40"
              >
                {col.title}
              </Typography>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition-colors">
                      <Typography
                        as="span"
                        variant="body-sm"
                        color="white"
                        className="text-white/70"
                      >
                        {link.label}
                      </Typography>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-12 pt-6 border-t border-white/10">
          <Typography
            as="span"
            variant="eyebrow"
            color="white"
            className="text-white/40 font-medium!"
          >
            &copy; 2026 NIA Surat &middot; A Network In Action chapter
          </Typography>
          <Link
            href="https://propelius.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 bg-white/8 border border-white/15 rounded-pill hover:bg-white/12 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            <Typography as="span" variant="body-sm" color="white" className="font-bold!">
              Built by Propelius
            </Typography>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
