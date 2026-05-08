"use client";

import Image from "next/image";
import Link from "next/link";

import { BLOG_POSTS } from "../constant/UpdatesSection.data";
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";

export default function UpdatesSection() {
  return (
    <section id="updates" className="bg-paper-2 border-t border-line">
      <div className="max-w-[1280px] mx-auto px-[32px] py-[88px]">
        {/* Heading */}
        <div className="text-center flex flex-col items-center mb-[56px] max-w-[720px] mx-auto">
          <div className="inline-flex items-center gap-[10px] px-[14px] py-[6px] rounded-pill bg-brand-soft text-brand-2 text-[12px] font-[700] tracking-[0.06em] uppercase mb-[16px]">
            <span className="w-[6px] h-[6px] rounded-full bg-brand" />
            From the chapter
          </div>
          <h2 className="font-sans text-[clamp(34px,4.4vw,52px)] leading-[1.1] tracking-[-0.025em] font-[700] m-0 text-brand-deep text-balance">
            Updates from the room.
          </h2>
          <p className="text-[17px] leading-[1.6] text-ink-3 mt-[18px] mb-0 max-w-[620px] text-pretty">
            Recaps, member spotlights and industry insights from across NIA Surat.
          </p>
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
          {BLOG_POSTS.map((post) => (
            <Card
              key={post.title}
              className="bg-white rounded-[18px] border border-line ring-0 overflow-hidden flex flex-col shadow-none !py-0 gap-0"
            >
              <div className="aspect-[16/10] bg-paper-3 relative overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-[14px] left-[14px] px-[12px] py-[5px] bg-white text-brand-2 text-[11px] font-[700] rounded-pill tracking-[0.04em]">
                  {post.category}
                </div>
              </div>

              <div className="px-[22px] pt-[20px] pb-[24px] flex flex-col gap-[10px] flex-1">
                <div className="text-[11.5px] text-ink-4 font-[600] tracking-[0.04em]">
                  {post.date}
                </div>
                <CardTitle className="text-[18px] leading-[1.3] tracking-[-0.01em] font-[700] m-0 text-brand-deep text-balance">
                  {post.title}
                </CardTitle>
                <CardContent className="p-0 text-[13.5px] leading-[1.55] text-ink-3 m-0 flex-1 text-pretty">
                  {post.preview}
                </CardContent>
                <CardFooter className="p-0 mt-[6px]">
                  <Link
                    href={post.link || "#"}
                    className="text-brand text-[13px] font-[700] items-center gap-[6px] hover:text-brand-2 transition-colors"
                  >
                    Read post <span className="font-serif">&rarr;</span>
                  </Link>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
