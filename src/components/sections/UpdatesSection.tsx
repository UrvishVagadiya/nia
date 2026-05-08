"use client";

import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export default function UpdatesSection() {
  return (
    <section id="updates" className="bg-paper-2 section-padding">
      <div className="section-container">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-pill bg-brand-soft px-3 py-1.5 eyebrow-text mb-4">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            UPDATES
          </span>
          <h2 className="text-[clamp(28px,4vw,52px)] font-bold leading-[1.05] tracking-[-0.025em] text-ink">
            From the <span className="heading-italic-brand">chapter floor.</span>
          </h2>
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.title}
              className="rounded-[16px] overflow-hidden bg-paper border border-line hover:shadow-card transition-all duration-200 group"
            >
              <div className="relative aspect-[3/2]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[12px] text-ink-4">{post.date}</span>
                  <Badge
                    variant="secondary"
                    className="text-[11px] font-semibold bg-brand-soft text-brand-2 border-0"
                  >
                    {post.category}
                  </Badge>
                </div>
                <h3 className="text-[17px] font-bold text-ink leading-snug mb-2">{post.title}</h3>
                <p className="text-[14px] text-ink-3 line-clamp-2">{post.preview}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Read all */}
        <div className="text-center mt-8">
          <Link
            href="/updates"
            className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand-2 hover:text-brand transition-colors"
          >
            Read all updates
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
