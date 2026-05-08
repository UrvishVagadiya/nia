"use client";

import Image from "next/image";
import Link from "next/link";
import Typography from "@/components/ui/typography";

import { BLOG_POSTS } from "@/lib/data";
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";

export default function UpdatesSection() {
  return (
    <section id="updates" className="bg-paper-2 border-t border-line">
      <div className="max-w-[1280px] mx-auto px-[32px] py-[88px]">
        {/* Heading */}
        <div className="text-center flex flex-col items-center mb-[56px] max-w-[720px] mx-auto">
          <div className="inline-flex items-center gap-[10px] px-[14px] py-[6px] rounded-pill bg-brand-soft mb-[16px]">
            <span className="w-[6px] h-[6px] rounded-full bg-brand" />
            <Typography variant="eyebrow" color="brand-2">
              From the chapter
            </Typography>
          </div>
          <Typography as="h2" variant="h2" color="brand-deep">
            Updates from the room.
          </Typography>
          <Typography variant="body-md" color="ink-3" className="max-w-[620px]">
            Recaps, member spotlights and industry insights from across NIA Surat.
          </Typography>
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
                <div className="absolute top-[14px] left-[14px] px-[12px] py-[5px] bg-white rounded-pill">
                  <Typography as="div" variant="caption" color="brand-2">
                    {post.category}
                  </Typography>
                </div>
              </div>

              <div className="px-[22px] pt-[20px] pb-[24px] flex flex-col gap-[10px] flex-1">
                <Typography as="div" variant="caption" color="ink-4">
                  {post.date}
                </Typography>
                <CardTitle>
                  <Typography variant="h4" color="brand-deep">
                    {post.title}
                  </Typography>
                </CardTitle>
                <CardContent className="p-0">
                  <Typography variant="body-sm" color="ink-3">
                    {post.preview}
                  </Typography>
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
