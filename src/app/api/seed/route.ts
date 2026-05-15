import { getPayload } from "payload";
import config from "@/payload.config";
import { pic } from "@/constant/Portraits.image";
import { NextResponse } from "next/server";

const MEMBERS_BY_CHAPTER = {
  innovators: [
    {
      name: "Abhishek Saboo",
      convention: "Jacquards Weaver",
      company: "Saboo Textiles",
      specialty: "Textiles",
      oneliner: "Premium jacquard weaving for fashion houses across India.",
      photo: pic("m", 0),
    },
    {
      name: "Hetal Mehta",
      convention: "Numbers Whisperer",
      company: "Mehta & Associates",
      specialty: "Chartered Accountancy",
      oneliner: "Tax & advisory for family businesses.",
      photo: pic("f", 0),
    },
    {
      name: "Rohan Choksi",
      convention: "Stone Reader",
      company: "Choksi Diamonds",
      specialty: "Diamond Trading",
      oneliner: "Solitaires sourced from Antwerp & Mumbai.",
      photo: pic("m", 1),
    },
    {
      name: "Priya Nanavati",
      convention: "Frame Maker",
      company: "Studio Nanavati",
      specialty: "Photography",
      oneliner: "Wedding & brand photography.",
      photo: pic("f", 1),
    },
    {
      name: "Karan Desai",
      convention: "Code Carpenter",
      company: "Desai Tech Labs",
      specialty: "IT & Software",
      oneliner: "Custom ERP for textile manufacturers.",
      photo: pic("m", 2),
    },
    {
      name: "Anjali Shah",
      convention: "Light Architect",
      company: "Shah Designs",
      specialty: "Architecture",
      oneliner: "Residential architecture across Gujarat.",
      photo: pic("f", 2),
    },
    {
      name: "Vivek Patel",
      convention: "Money Mover",
      company: "Patel Wealth",
      specialty: "Wealth Management",
      oneliner: "Portfolio advisory for HNIs.",
      photo: pic("m", 3),
    },
    {
      name: "Nirali Kothari",
      convention: "Gold Seeker",
      company: "Kothari Jewellers",
      specialty: "Jewellery",
      oneliner: "Bridal sets, four generations in.",
      photo: pic("f", 3),
    },
    {
      name: "Manish Trivedi",
      convention: "Truth Keeper",
      company: "Trivedi Legal",
      specialty: "Law — Corporate",
      oneliner: "M&A and contract law.",
      photo: pic("m", 4),
    },
    {
      name: "Rina Bhatia",
      convention: "Heart Healer",
      company: "Bhatia Clinic",
      specialty: "Medicine",
      oneliner: "Preventive cardiac care.",
      photo: pic("f", 4),
    },
    {
      name: "Devang Gandhi",
      convention: "Space Shaper",
      company: "Gandhi Interiors",
      specialty: "Interior Design",
      oneliner: "Hospitality and residential interiors.",
      photo: pic("m", 5),
    },
    {
      name: "Sneha Joshi",
      convention: "Voice Lifter",
      company: "Joshi PR",
      specialty: "Public Relations",
      oneliner: "PR for D2C and family-run brands.",
      photo: pic("f", 5),
    },
  ],
  superiors: [
    {
      name: "Rajiv Ambani",
      convention: "Fabric Father",
      company: "Ambani Mills",
      specialty: "Textiles",
      oneliner: "Industrial-scale weaving and finishing.",
      photo: pic("m", 6),
    },
    {
      name: "Meena Kapadia",
      convention: "Number Sage",
      company: "Kapadia & Co.",
      specialty: "Chartered Accountancy",
      oneliner: "Audit and advisory, 30+ years.",
      photo: pic("f", 0),
    },
    {
      name: "Sanjay Zaveri",
      convention: "Diamond Don",
      company: "Zaveri Brothers",
      specialty: "Diamond Trading",
      oneliner: "Wholesale, polished and rough.",
      photo: pic("m", 7),
    },
    {
      name: "Falguni Modi",
      convention: "Brand Builder",
      company: "Modi Group",
      specialty: "Marketing",
      oneliner: "Full-service brand & growth.",
      photo: pic("f", 1),
    },
    {
      name: "Yash Vora",
      convention: "Steel Setter",
      company: "Vora Steels",
      specialty: "Manufacturing",
      oneliner: "Structural steel for infrastructure.",
      photo: pic("m", 8),
    },
    {
      name: "Aarti Bhansali",
      convention: "Bone Setter",
      company: "Bhansali Ortho",
      specialty: "Medicine",
      oneliner: "Joint replacement specialist.",
      photo: pic("f", 2),
    },
    {
      name: "Pranav Surana",
      convention: "Land Lord",
      company: "Surana Realty",
      specialty: "Real Estate",
      oneliner: "Premium residential developments.",
      photo: pic("m", 9),
    },
    {
      name: "Komal Jariwala",
      convention: "Thread Master",
      company: "Jariwala Embroidery",
      specialty: "Embroidery",
      oneliner: "Hand & machine embroidery, exports.",
      photo: pic("f", 3),
    },
    {
      name: "Nikhil Dalal",
      convention: "Risk Reader",
      company: "Dalal Insurance",
      specialty: "Insurance",
      oneliner: "Commercial and business insurance.",
      photo: pic("m", 10),
    },
    {
      name: "Ritu Agarwal",
      convention: "Plate Painter",
      company: "Agarwal Catering",
      specialty: "Catering",
      oneliner: "Wedding and corporate catering.",
      photo: pic("f", 4),
    },
    {
      name: "Bhavesh Tanna",
      convention: "Wheel Wright",
      company: "Tanna Logistics",
      specialty: "Logistics",
      oneliner: "Pan-India textile logistics.",
      photo: pic("m", 11),
    },
    {
      name: "Shilpa Mansukhani",
      convention: "Garden Grower",
      company: "Mansukhani Florals",
      specialty: "Event Decor",
      oneliner: "Floral and event production.",
      photo: pic("f", 5),
    },
  ],
  pioneers: [
    {
      name: "Tarang Kanjani",
      convention: "Pixel Pusher",
      company: "Kanjani Studios",
      specialty: "Branding",
      oneliner: "Identity systems for new ventures.",
      photo: pic("m", 0),
    },
    {
      name: "Pooja Vasa",
      convention: "Word Smith",
      company: "Vasa Content",
      specialty: "Marketing",
      oneliner: "Long-form content for B2B.",
      photo: pic("f", 0),
    },
    {
      name: "Akshay Sojitra",
      convention: "Watt Watcher",
      company: "Sojitra Solar",
      specialty: "Solar Energy",
      oneliner: "Rooftop solar for businesses.",
      photo: pic("m", 1),
    },
    {
      name: "Heena Lalwani",
      convention: "Skin Scholar",
      company: "Lalwani Dermatology",
      specialty: "Medicine",
      oneliner: "Clinical and aesthetic skincare.",
      photo: pic("f", 1),
    },
    {
      name: "Mihir Surti",
      convention: "Tax Tactician",
      company: "Surti Tax Co.",
      specialty: "Tax Advisory",
      oneliner: "GST and direct tax for SMEs.",
      photo: pic("m", 2),
    },
    {
      name: "Krina Chheda",
      convention: "Smile Shaper",
      company: "Chheda Dental",
      specialty: "Dentistry",
      oneliner: "Cosmetic and implant dentistry.",
      photo: pic("f", 2),
    },
    {
      name: "Sahil Doshi",
      convention: "Cargo Captain",
      company: "Doshi Shipping",
      specialty: "Logistics",
      oneliner: "Sea & air freight, EU and USA.",
      photo: pic("m", 3),
    },
    {
      name: "Ishita Mehrotra",
      convention: "Page Turner",
      company: "Mehrotra Publishing",
      specialty: "Publishing",
      oneliner: "Trade and academic publishing.",
      photo: pic("f", 3),
    },
    {
      name: "Dhruv Gajjar",
      convention: "Pipe Plumber",
      company: "Gajjar Plumbing Pro",
      specialty: "MEP",
      oneliner: "Commercial MEP contractor.",
      photo: pic("m", 4),
    },
    {
      name: "Rashmi Vakharia",
      convention: "Petal Planner",
      company: "Vakharia Events",
      specialty: "Wedding Planning",
      oneliner: "Destination weddings, full service.",
      photo: pic("f", 4),
    },
    {
      name: "Ojas Kheni",
      convention: "Stage Setter",
      company: "Kheni AV",
      specialty: "Audio Visual",
      oneliner: "Sound & light for live events.",
      photo: pic("m", 5),
    },
    {
      name: "Bhumi Lath",
      convention: "Trip Tailor",
      company: "Lath Travels",
      specialty: "Travel & Tourism",
      oneliner: "Bespoke leisure & business travel.",
      photo: pic("f", 5),
    },
  ],
};

const TESTIMONIALS_BY_CHAPTER = {
  innovators: [
    {
      quote:
        "I've closed three textile-export deals through warm intros from this room in eight months. NIA Innovators is the highest-leverage hour of my week.",
      who: "Hetal Mehta",
      role: "Mehta & Associates · CA",
      photo: pic("f", 0),
    },
    {
      quote:
        "What surprised me wasn't the referrals — it was the bench of 24 advisors I now have on speed-dial across every category.",
      who: "Karan Desai",
      role: "Desai Tech Labs · IT",
      photo: pic("m", 2),
    },
    {
      quote:
        "The vetting is real. Sreyansh keeps the room high-trust, and that's what makes the referrals actually convert.",
      who: "Anjali Shah",
      role: "Shah Designs · Architecture",
      photo: pic("f", 2),
    },
  ],
  superiors: [
    {
      quote:
        "I joined Superiors at year 28 of my practice and still left every meeting with one new thing to act on. That's rare.",
      who: "Meena Kapadia",
      role: "Kapadia & Co. · CA",
      photo: pic("f", 0),
    },
    {
      quote:
        "The relationships compound. Year one was referrals, year two has been partnerships and joint ventures.",
      who: "Rajiv Ambani",
      role: "Ambani Mills · Textiles",
      photo: pic("m", 6),
    },
    {
      quote:
        "Every member here is a category leader. The peer-level conversations alone are worth the dues.",
      who: "Falguni Modi",
      role: "Modi Group · Marketing",
      photo: pic("f", 1),
    },
  ],
  pioneers: [
    {
      quote:
        "Pioneers is where I built my professional network from the ground up in Surat. Six months in and my pipeline is healthier than it's been in years.",
      who: "Akshay Sojitra",
      role: "Sojitra Solar · Energy",
      photo: pic("m", 1),
    },
    {
      quote:
        "Every member here is the only one in their category. That single rule makes the whole thing work.",
      who: "Pooja Vasa",
      role: "Vasa Content · Marketing",
      photo: pic("f", 0),
    },
    {
      quote:
        "The room punches above its weight. Specialists who actually deliver, not name-droppers.",
      who: "Mihir Surti",
      role: "Surti Tax Co. · Tax",
      photo: pic("m", 2),
    },
  ],
};

const PRICING_BY_CHAPTER = {
  innovators: [
    {
      name: "Visitor",
      monthlyPrice: "0",
      annualPrice: 0,
      isPopular: false,
      features: [
        "Attend up to 2 chapter meetings",
        "Full participation in 60-sec updates",
        "Personal intro by chapter leader",
        "Networking over chai post-meeting",
        "Decide if NIA fits before applying",
      ],
    },
    {
      name: "Member",
      monthlyPrice: "6000",
      annualPrice: 65000,
      isPopular: true,
      features: [
        "Exclusive seat in your specialty",
        "Weekly chapter meeting (52/year)",
        "1-on-1s with all members",
        "Member directory & private channel",
        "Quarterly cross-chapter mixers",
        "Six-month ROI commitment",
      ],
    },
    {
      name: "Founding Member",
      monthlyPrice: "8000",
      annualPrice: 85000,
      isPopular: false,
      features: [
        "Everything in Member",
        "Voice in chapter governance",
        "Co-host one quarterly meet",
        "Priority on cross-chapter intros",
        "Speaking slots at NIA Surat events",
        "Recognised in all chapter materials",
      ],
    },
  ],
  superiors: [
    {
      name: "Visitor",
      monthlyPrice: "0",
      annualPrice: 0,
      isPopular: false,
      features: [
        "Attend up to 3 chapter meetings",
        "30-sec business introduction",
        "Meet chapter leadership team",
        "Tea & networking after sessions",
        "Explore if NIA aligns with your goals",
      ],
    },
    {
      name: "Professional",
      monthlyPrice: "7500",
      annualPrice: 78000,
      isPopular: true,
      features: [
        "Reserved seat for your business category",
        "Access to all weekly chapter meetings",
        "Structured referral networking",
        "Private member WhatsApp community",
        "Business growth workshops",
        "Annual business exposure opportunities",
      ],
    },
    {
      name: "Elite Partner",
      monthlyPrice: "12000",
      annualPrice: 125000,
      isPopular: false,
      features: [
        "Everything in Professional",
        "Priority referrals from leadership",
        "Featured spotlight at major events",
        "Speaking opportunities in NIA programs",
        "VIP access to cross-city networking",
        "Recognition across NIA branding assets",
      ],
    },
  ],
  pioneers: [
    {
      name: "Guest Pass",
      monthlyPrice: "0",
      annualPrice: 0,
      isPopular: false,
      features: [
        "Join 1 complimentary business meetup",
        "Quick networking introduction round",
        "Meet active business owners",
        "Access to open networking session",
        "Understand chapter culture before joining",
      ],
    },
    {
      name: "Business Member",
      monthlyPrice: "9500",
      annualPrice: 99000,
      isPopular: true,
      features: [
        "Exclusive category lock-in",
        "52 premium networking meetings yearly",
        "Verified referral exchange system",
        "Members-only business directory",
        "Monthly business training sessions",
        "Priority invitations to NIA events",
      ],
    },
    {
      name: "Leadership Circle",
      monthlyPrice: "15000",
      annualPrice: 165000,
      isPopular: false,
      features: [
        "Everything in Business Member",
        "Leadership role opportunities",
        "Host featured networking sessions",
        "Premium introductions across chapters",
        "Brand visibility in NIA campaigns",
        "Exclusive strategy & mastermind meets",
      ],
    },
  ],
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  if (process.env.NODE_ENV === "production" && secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const payload = await getPayload({ config });

  try {
    // 1. Cleanup existing children (NOT chapters)
    const collectionsToClean = ["members", "leaders", "testimonials", "pricing-plans"] as const;
    for (const slug of collectionsToClean) {
      await payload.delete({ collection: slug, where: { id: { exists: true } }, depth: 0 });
      await delay(100);
    }

    // 2. Fetch Chapter IDs
    const chaptersRes = await payload.find({ collection: "chapters", limit: 100 });
    const chapters = chaptersRes.docs;

    const findId = (slug: string) => chapters.find((c) => c.slug === slug)?.id;
    const ids = {
      innovators: findId("innovators"),
      superiors: findId("superiors"),
      pioneers: findId("pioneers"),
    };

    if (!ids.innovators || !ids.superiors || !ids.pioneers) {
      throw new Error(
        "One or more chapters (innovators, superiors, pioneers) are missing. Please ensure chapters exist first."
      );
    }

    // 3. Create 3 Separate Leaders (One per chapter)
    for (const id of Object.values(ids)) {
      await payload.create({
        collection: "leaders",
        data: {
          name: "Sreyansh Jain",
          role: "City Partner",
          specialty: "Networking Strategy",
          tenure: "5+ Years",
          quote: "The right room doesn't just open doors; it changes how you move inside them.",
          chapter: id,
        },
      });
      await delay(100);
    }

    // 4. Create Members sequentially
    for (const [slug, members] of Object.entries(MEMBERS_BY_CHAPTER)) {
      const chapterId = ids[slug as keyof typeof ids];
      for (const m of members) {
        await payload.create({
          collection: "members",
          data: {
            name: m.name,
            company: m.company,
            specialty: m.specialty,
            convention: m.convention,
            oneliner: m.oneliner,
            photoURL: m.photo,
            chapter: chapterId,
          },
        });
        await delay(50);
      }
    }

    // 5. Create Testimonials sequentially
    for (const [slug, testimonials] of Object.entries(TESTIMONIALS_BY_CHAPTER)) {
      const chapterId = ids[slug as keyof typeof ids];
      for (const t of testimonials) {
        await payload.create({
          collection: "testimonials",
          data: {
            quote: t.quote,
            who: t.who,
            role: t.role,
            photoUrl: t.photo,
            testimonialType: "external",
            chapter: chapterId,
          },
        });
        await delay(50);
      }
    }

    // 6. Create Pricing Plans (Chapter specific)
    for (const [slug, tiers] of Object.entries(PRICING_BY_CHAPTER)) {
      const chapterId = ids[slug as keyof typeof ids];
      for (const p of tiers) {
        await payload.create({
          collection: "pricing-plans",
          data: {
            name: p.name,
            monthlyPrice: p.monthlyPrice,
            annualPrice: p.annualPrice,
            isPopular: p.isPopular,
            features: p.features.map((f) => ({ text: f })),
            chapter: chapterId,
          },
        });
        await delay(50);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Targeted Data Population Successful!",
      details: {
        leadersCreated: 3,
        totalMembers: Object.values(MEMBERS_BY_CHAPTER).flat().length,
        pricingTiers: Object.values(PRICING_BY_CHAPTER).flat().length,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
