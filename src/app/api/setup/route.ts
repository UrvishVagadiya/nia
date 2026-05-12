import { getPayload } from "payload";
import config from "@/payload.config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const payload = await getPayload({ config });

    const chaptersToCreate = [
      { name: "Innovators", slug: "innovators", chapterNumber: "Chapter 01" },
      { name: "Superiors", slug: "superiors", chapterNumber: "Chapter 02" },
      { name: "Pioneers", slug: "pioneers", chapterNumber: "Chapter 03" },
    ];

    const results = [];

    for (const chapter of chaptersToCreate) {
      const existing = await payload.find({
        collection: "chapters",
        where: {
          slug: {
            equals: chapter.slug,
          },
        },
      });

      if (existing.totalDocs === 0) {
        const created = await payload.create({
          collection: "chapters",
          data: {
            ...chapter,
            hero: {
              title: `${chapter.name} Chapter`,
              subtitle: `Join the ${chapter.name} chapter of NIA Surat.`,
              bullets: [],
            },
            stats: [
              { label: "Members", value: "0" },
              { label: "Referrals", value: "0" },
              { label: "Business", value: "0" },
            ],
          },
        });
        results.push(`Created ${chapter.name}`);
      } else {
        results.push(`${chapter.name} already exists`);
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    const err = error as Error;
    console.error("Setup error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
