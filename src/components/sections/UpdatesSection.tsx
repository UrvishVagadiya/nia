"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Typography from "@/components/ui/typography";
import { UpdatesSectionProps } from "@/lib/types";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const UpdatesSection = ({ updates = [] }: UpdatesSectionProps) => {
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    if (!updates || updates.length === 0) return;
    const interval = setInterval(() => {
      setImgIdx((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [updates]);

  if (!updates || updates.length === 0) return null;

  return (
    <section id="updates" className="border-t border-line">
      <div className="section-container section-padding">
        {/* Heading */}
        <div className="text-center flex flex-col items-center mb-14 max-w-180 mx-auto">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-pill bg-brand-soft mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            <Typography variant="eyebrow" color="brand-2">
              From the chapter
            </Typography>
          </div>
          <Typography as="h2" variant="h2" color="brand-deep" className="mb-8">
            Updates from the room.
          </Typography>
          <Typography variant="body-md" color="ink-3" className="max-w-155">
            Recaps, member spotlights and industry insights from across NIA Surat.
          </Typography>
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {updates.map((post) => {
            return (
              <Card
                key={post.id}
                className="bg-white rounded-[18px] border border-line ring-0 overflow-hidden flex flex-col shadow-none py-0! gap-0 group"
              >
                <div className="aspect-16/10 bg-paper-3 relative overflow-hidden">
                  {post.images.map((image, index) => {
                    const isActive = index === imgIdx % post.images.length;

                    return (
                      <Image
                        key={`${post.id}-${index}`}
                        src={image}
                        alt={post.title}
                        fill
                        loading="eager"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={`
                          object-cover absolute inset-0
                          /* Use transition-all to handle both opacity and transform at once */
                          transition-all duration-1000 ease-in-out
                          /* Keep the scale on the group-hover */
                          group-hover:scale-110
                          /* Toggle visibility using opacity and z-index */
                          ${isActive ? "opacity-100 z-10" : "opacity-0 z-0"}
                        `}
                      />
                    );
                  })}

                  {/* Category Badge */}
                  <div className="absolute top-3.5 left-3.5 px-3 py-1.25 bg-white/90 backdrop-blur-sm rounded-pill z-20">
                    <Typography as="div" variant="caption" color="brand-2" className="font-bold!">
                      {post.category}
                    </Typography>
                  </div>
                </div>

                <div className="px-5.5 pt-5 pb-6 flex flex-col gap-2.5 flex-1">
                  <Typography as="div" variant="caption" color="ink-4" className="font-semibold!">
                    {post.publishedDate}
                  </Typography>
                  <CardTitle>
                    <Typography variant="h4" color="brand-deep" className="text-[18px]! font-bold!">
                      {post.title}
                    </Typography>
                  </CardTitle>
                  <CardContent className="p-0">
                    <Typography variant="body-sm" color="ink-3">
                      {post.preview}
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UpdatesSection;
