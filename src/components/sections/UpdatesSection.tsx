"use client";

import Image from "next/image";
import Link from "next/link";
import Typography from "@/components/ui/typography";

import { BLOG_POSTS } from "../constant/UpdatesSection.data";
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";

export default function UpdatesSection() {
  return (
    <section id="updates" className="bg-paper-2 border-t border-line">
      <div className="section-container section-padding">
        {/* Heading */}
        <div className="text-center flex flex-col items-center mb-14 max-w-180 mx-auto">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-pill bg-brand-soft mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            <Typography variant="eyebrow" color="brand-2">
              From the chapter
            </Typography>
          </div>
          <Typography as="h2" variant="h2" color="brand-deep">
            Updates from the room.
          </Typography>
          <Typography variant="body-md" color="ink-3" className="max-w-155">
            Recaps, member spotlights and industry insights from across NIA Surat.
          </Typography>
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <Card
              key={post.title}
              className="bg-white rounded-[18px] border border-line ring-0 overflow-hidden flex flex-col shadow-none py-0! gap-0"
            >
              <div className="aspect-16/10 bg-paper-3 relative overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3.5 left-3.5 px-3 py-1.25 bg-white rounded-pill">
                  <Typography as="div" variant="caption" color="brand-2">
                    {post.category}
                  </Typography>
                </div>
              </div>

              <div className="px-5.5 pt-5 pb-6 flex flex-col gap-2.5 flex-1">
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
                <CardFooter className="p-0 mt-1.5">
                  <Link
                    href={post.link || "#"}
                    className="text-brand text-[13px] font-bold items-center gap-1.5 hover:text-brand-2 transition-colors"
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
