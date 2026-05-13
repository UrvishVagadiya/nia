"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { Check, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Typography from "@/components/ui/typography";

// Initialize EmailJS
if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
  emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
}

type VisitorFormValues = {
  name: string;
  email: string;
  specialty: string;
  phone: string;
  notes: string;
  chapterId: string;
  chapterName: string;
  chapterSlug: string;
  venue: string;
  meetingDay: string;
  meetingDate: string;
  meetingTopic: string;
};

interface StepsSectionProps {
  chapterSlug?: string;
  chapterName?: string;
  venue?: string;
}

const StepsSection = ({ chapterSlug, chapterName, venue }: StepsSectionProps) => {
  const searchParams = useSearchParams();
  const queryChapter = searchParams.get("chapter") || "";
  const queryVenue = searchParams.get("venue") || "";
  const queryDay = searchParams.get("day") || "";
  const queryDate = searchParams.get("date") || "";
  const queryTopic = searchParams.get("topic") || "";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VisitorFormValues>({
    defaultValues: {
      name: "",
      email: "",
      specialty: "",
      phone: "",
      notes: "",
      chapterId: "",
      chapterName: "",
      chapterSlug: "",
      venue: "",
      meetingDay: "",
      meetingDate: "",
      meetingTopic: "",
    },
  });

  const currentChapterName = watch("chapterName");

  useEffect(() => {
    const rootChapter = process.env.NEXT_PUBLIC_ROOT_CHAPTER_SLUG || "innovators";
    const fallbackSlug = chapterSlug || queryChapter || rootChapter;

    // Capitalize slug words for fallback name (e.g. "superiors" -> "Superiors")
    const fallbackName =
      chapterName ||
      fallbackSlug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    const fallbackVenue = venue || queryVenue || "";

    setValue("chapterName", fallbackName);
    setValue("chapterSlug", fallbackSlug);
    setValue("venue", fallbackVenue);
  }, [chapterSlug, chapterName, venue, queryChapter, queryVenue, setValue]);

  useEffect(() => {
    if (!queryDay && !queryDate && !queryTopic) return;
    setValue("meetingDay", queryDay);
    setValue("meetingDate", queryDate);
    setValue("meetingTopic", queryTopic);
  }, [queryDay, queryDate, queryTopic, setValue]);

  const onSubmit = async (values: VisitorFormValues) => {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const mailTo = process.env.NEXT_PUBLIC_MAIL_TO || "";

    if (!serviceId || !templateId || !publicKey) {
      toast.error("Email service configuration missing.");
      return;
    }

    const templateParams = {
      to_email: mailTo,
      user_name: values.name,
      user_phone: values.phone,
      user_specialty: values.specialty,
      user_notes: values.notes,
      chapter_name: values.chapterName,
      chapter_slug: values.chapterSlug,
      venue: values.venue,
      meeting_day: values.meetingDay,
      meeting_date: values.meetingDate,
      meeting_topic: values.meetingTopic,
      name: values.name, // Matches {{name}} in From Name
      email: values.email, // Matches {{email}} in Reply To
    };

    console.log("Sending EmailJS request with params:", templateParams);

    const sendEmail = emailjs.send(serviceId, templateId, templateParams, publicKey);

    toast.promise(sendEmail, {
      loading: "Sending your request...",
      success: (res) => {
        console.log("EmailJS Success:", res);
        reset({
          name: "",
          email: "",
          specialty: "",
          phone: "",
          notes: "",
          chapterName: values.chapterName,
          chapterSlug: values.chapterSlug,
          venue: values.venue,
        });
        return "Request sent! We'll reply within 24 hours.";
      },
      error: (err) => {
        const rootChapter = process.env.NEXT_PUBLIC_ROOT_CHAPTER_SLUG || "innovators";
        console.error("EmailJS Error:", err);
        return `Could not send: ${err?.text || "Unknown error"}`;
      },
    });
  };

  const chapterLabel =
    currentChapterName ||
    (chapterSlug ? chapterSlug.charAt(0).toUpperCase() + chapterSlug.slice(1) : "Innovators");

  return (
    <section id="StepsSection" className="bg-paper-2 border-t border-line">
      <div className="section-container section-padding">
        <div className="bg-white rounded-[24px] overflow-hidden border border-line grid grid-cols-1 md:grid-cols-2">
          {/* Left Side (Dark Blue) */}
          <div className="bg-brand-deep text-white p-[52px_44px] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(46,157,219,0.25),transparent_50%)] pointer-events-none"></div>

            <div className="relative">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-pill bg-white/15 mb-4.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                <Typography variant="eyebrow" color="white" className="uppercase">
                  Visit a meeting
                </Typography>
              </div>

              <Typography as="h2" variant="h2" color="white" className="mb-4.5">
                Sit in,
                <br />
                <span className="italic text-brand font-serif">before you sign up.</span>
              </Typography>

              <Typography variant="body-md" color="white" className="opacity-80 mb-7 max-w-115">
                One Tuesday morning is the best way to feel the room. Tell us your specialty — if
                the seat is open, we&apos;ll book you in.
              </Typography>

              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                <li className="flex items-center gap-3">
                  <span className="w-5.5 h-5.5 rounded-full bg-brand grid place-items-center shrink-0">
                    <Check size={12} strokeWidth={3} className="text-white" />
                  </span>
                  <Typography variant="body-sm" color="white" className="opacity-90">
                    No fee, no obligation, no follow-up sales call
                  </Typography>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5.5 h-5.5 rounded-full bg-brand grid place-items-center shrink-0">
                    <Check size={12} strokeWidth={3} className="text-white" />
                  </span>
                  <Typography variant="body-sm" color="white" className="opacity-90">
                    Sreyansh personally vets every applicant
                  </Typography>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5.5 h-5.5 rounded-full bg-brand grid place-items-center shrink-0">
                    <Check size={12} strokeWidth={3} className="text-white" />
                  </span>
                  <Typography variant="body-sm" color="white" className="opacity-90">
                    You&apos;ll know if it&apos;s a fit within 90 minutes
                  </Typography>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side (Form) */}
          <div className="p-[44px_36px]">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Typography as="div" variant="eyebrow" color="brand-2" className="pb-4">
                  Visitor Pass · {chapterLabel}
                </Typography>
                <Typography
                  as="div"
                  variant="h3"
                  color="brand-deep"
                  className="mb-2 text-[24px]! font-bold!"
                >
                  Request a pass
                </Typography>

                {(watch("meetingDate") || watch("meetingTopic")) && (
                  <div className="mb-2 p-3.5 bg-brand-soft rounded-[10px] border border-brand/20">
                    <Typography
                      variant="caption"
                      color="brand-2"
                      className="uppercase mb-1 font-bold!"
                    >
                      Selected Meeting
                    </Typography>
                    <div className="flex flex-col gap-0.5">
                      <Typography variant="body-sm" color="brand-deep" className="font-bold!">
                        {watch("meetingDay")}, {watch("meetingDate")}
                      </Typography>
                      <Typography variant="caption" color="ink-3" className="italic">
                        {watch("meetingTopic")}
                      </Typography>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5">
                  <Typography as="span" variant="eyebrow" color="ink-2" className="font-bold!">
                    Your name
                  </Typography>
                  <input
                    placeholder="Full name"
                    suppressHydrationWarning
                    {...register("name", { required: true })}
                    className="w-full px-3.25 py-2.75 text-[14px] font-sans border border-line rounded-[10px] bg-white text-ink! outline-none focus:border-brand transition-colors"
                  />
                  {errors.name && (
                    <span className="text-[12px] text-red-600">Name is required.</span>
                  )}
                </label>

                <label className="flex flex-col gap-1.5">
                  <Typography as="span" variant="eyebrow" color="ink-2" className="font-bold!">
                    Email address
                  </Typography>
                  <input
                    placeholder="name@company.com"
                    type="email"
                    suppressHydrationWarning
                    {...register("email", { required: true })}
                    className="w-full px-3.25 py-2.75 text-[14px] font-sans border border-line rounded-[10px] bg-white text-ink! outline-none focus:border-brand transition-colors"
                  />
                  {errors.email && (
                    <span className="text-[12px] text-red-600">Email is required.</span>
                  )}
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5">
                  <Typography as="span" variant="eyebrow" color="ink-2" className="font-bold!">
                    Your specialty / trade
                  </Typography>
                  <input
                    placeholder="e.g. Textile exports"
                    suppressHydrationWarning
                    {...register("specialty", { required: true })}
                    className="w-full px-3.25 py-2.75 text-[14px] font-sans border border-line rounded-[10px] bg-white text-ink outline-none focus:border-brand transition-colors"
                  />
                  {errors.specialty && (
                    <span className="text-[12px] text-red-600">Specialty is required.</span>
                  )}
                </label>

                <label className="flex flex-col gap-1.5">
                  <Typography as="span" variant="eyebrow" color="ink-2" className="font-bold!">
                    Phone (with code)
                  </Typography>
                  <input
                    placeholder="+91 …"
                    suppressHydrationWarning
                    {...register("phone", { required: true })}
                    className="w-full px-3.25 py-2.75 text-[14px] font-sans border border-line rounded-[10px] bg-white text-ink outline-none focus:border-brand transition-colors"
                  />
                  {errors.phone && (
                    <span className="text-[12px] text-red-600">Phone is required.</span>
                  )}
                </label>
              </div>

              <label className="flex flex-col gap-1.5">
                <Typography as="span" variant="eyebrow" color="ink-2" className="font-bold! ">
                  Anything else?
                </Typography>
                <textarea
                  placeholder="Optional context"
                  rows={3}
                  suppressHydrationWarning
                  {...register("notes")}
                  className="w-full px-3.25 py-2.75 text-[14px] font-sans border border-line rounded-[10px] bg-white text-ink outline-none resize-y focus:border-brand transition-colors"
                />
              </label>

              <input type="hidden" {...register("chapterId")} />
              <input type="hidden" {...register("chapterName")} />
              <input type="hidden" {...register("chapterSlug")} />
              <input type="hidden" {...register("venue")} />
              <input type="hidden" {...register("meetingDay")} />
              <input type="hidden" {...register("meetingDate")} />
              <input type="hidden" {...register("meetingTopic")} />

              <button
                type="submit"
                suppressHydrationWarning
                disabled={isSubmitting}
                className="bg-brand text-white border-none rounded-pill px-5.5 py-3.5 font-bold cursor-pointer mt-1.5 inline-flex items-center justify-center gap-2 hover:bg-brand-2 transition-colors disabled:opacity-70"
              >
                <Typography as="span" variant="body-sm" color="white" className="font-bold!">
                  {isSubmitting ? "Sending..." : "Submit request"}
                </Typography>
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <ArrowRight size={16} />
                )}
              </button>

              <Typography
                as="div"
                variant="caption"
                color="ink-4"
                className="text-center font-semibold"
              >
                Replied within 24 hours
              </Typography>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
