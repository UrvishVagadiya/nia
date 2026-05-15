"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { Check, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Typography from "@/components/ui/typography";

import { StepsSectionProps, VisitorFormValues } from "@/lib/types";

const getCurrentTimestampMs = () => Date.now();

const StepsSection = ({ chapterId, chapterSlug, chapterName, venue }: StepsSectionProps) => {
  const [cooldown, setCooldown] = useState(() => {
    if (typeof window === "undefined") return 0;

    const lastInquiryTime = localStorage.getItem("last_inquiry_time");
    if (lastInquiryTime) {
      const elapsed = (Date.now() - parseInt(lastInquiryTime)) / 1000;
      const cooldownDuration = 60;
      const remaining = Math.max(0, Math.ceil(cooldownDuration - elapsed));
      return remaining > 0 ? remaining : 0;
    }
    return 0;
  });
  const searchParams = useSearchParams();
  const queryChapter = searchParams.get("chapter") || "";
  const queryVenue = searchParams.get("venue") || "";
  const queryDate = searchParams.get("date") || "";
  const queryTopic = searchParams.get("topic") || "";

  // Helper inside component to consistently format date strings natively
  const formatDateLong = (dateStr?: string | Date): string => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return typeof dateStr === "string" ? dateStr : "";
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(d);
  };

  const {
    register,
    handleSubmit,
    setValue,
    control: formControl,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VisitorFormValues>({
    defaultValues: {
      name: "",
      email: "",
      specialty: "",
      phone: "",
      notes: "",
      chapterId: chapterId || "",
      chapterName: "",
      chapterSlug: "",
      venue: "",
      meetingDay: "", // Retained mapping placeholder to prevent breaks if required by types
      meetingDate: "",
      meetingTopic: "",
    },
  });

  const currentChapterName = useWatch({ control: formControl, name: "chapterName" });
  const selectedMeetingDate = useWatch({ control: formControl, name: "meetingDate" });
  const selectedMeetingTopic = useWatch({ control: formControl, name: "meetingTopic" });

  // Countdown effect
  useEffect(() => {
    if (cooldown <= 0) return;

    const interval = setInterval(() => {
      setCooldown((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldown]);

  useEffect(() => {
    if (chapterId) setValue("chapterId", chapterId);
  }, [chapterId, setValue]);

  useEffect(() => {
    const fallbackSlug = chapterSlug || queryChapter || "innovators";

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
    if (!queryDate && !queryTopic) return;
    setValue("meetingDate", queryDate);
    setValue("meetingTopic", queryTopic);
  }, [queryDate, queryTopic, setValue]);

  const onSubmit = async (values: VisitorFormValues) => {
    if (!values.chapterId) {
      toast.error("Chapter information is missing. Please refresh the page.");
      return;
    }

    const payloadData = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      specialty: values.specialty,
      notes: values.notes,
      chapter: values.chapterId,
      meetingDetails: {
        day: formatDateLong(values.meetingDate).split(",")[0] || "Wed",
        date: formatDateLong(values.meetingDate),
        topic: values.meetingTopic,
        venue: values.venue,
      },
    };

    const submitRequest = async () => {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.message || "Failed to submit request");
      }

      return response.json();
    };

    try {
      await submitRequest();

      reset({
        name: "",
        email: "",
        specialty: "",
        phone: "",
        notes: "",
        chapterId: values.chapterId,
        chapterName: values.chapterName,
        chapterSlug: values.chapterSlug,
        venue: values.venue,
        meetingDay: "",
        meetingDate: "",
        meetingTopic: "",
      });

      toast.success("Request sent! We'll reply within 24 hours.", {
        style: { background: "#fff", color: "#0e3a5c", border: "1px solid #e2e8f0" },
      });

      // Set cooldown
      setCooldown(60); // 60 second cooldown
      const now = getCurrentTimestampMs();
      localStorage.setItem("last_inquiry_time", now.toString());
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.error(`Could not send: ${message}`, {
        style: { background: "#fff", color: "#ff4d4d", border: "1px solid #ff4d4d" },
      });
    }
  };

  const chapterLabel =
    currentChapterName ||
    (chapterSlug ? chapterSlug.charAt(0).toUpperCase() + chapterSlug.slice(1) : "Innovators");

  const fieldErrorMessage = (message: string) => (
    <span className="text-[12px] text-red-600">{message}</span>
  );

  return (
    <section id="StepsSection" className="bg-paper-2 border-t border-line">
      <div className="section-container section-padding">
        <div className="bg-white rounded-3xl overflow-hidden border border-line grid grid-cols-1 md:grid-cols-2">
          {/* Left Side (Dark Blue) */}
          <div className="bg-brand-deep text-white p-[52px_36px] sm:p-[52px_44px] relative overflow-hidden">
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

                {selectedMeetingDate && (
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
                        {formatDateLong(selectedMeetingDate)}
                      </Typography>
                      {selectedMeetingTopic && (
                        <Typography variant="caption" color="ink-3" className="italic">
                          {selectedMeetingTopic}
                        </Typography>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4">
                <label className="flex flex-col gap-1.5">
                  <Typography as="span" variant="eyebrow" color="ink-2" className="font-bold!">
                    Your name
                  </Typography>
                  <input
                    placeholder="Full name"
                    suppressHydrationWarning
                    {...register("name", {
                      required: "Name is required.",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters.",
                      },
                    })}
                    className="w-full px-3.25 py-2.75 text-[14px] font-sans border border-line rounded-[10px] bg-white text-ink! outline-none focus:border-brand transition-colors"
                  />
                  {errors.name && fieldErrorMessage(errors.name.message || "Name is required.")}
                </label>

                <label className="flex flex-col gap-1.5">
                  <Typography as="span" variant="eyebrow" color="ink-2" className="font-bold!">
                    Email address
                  </Typography>
                  <input
                    placeholder="name@company.com"
                    type="email"
                    suppressHydrationWarning
                    {...register("email", {
                      required: "Email is required.",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address.",
                      },
                    })}
                    className="w-full px-3.25 py-2.75 text-[14px] font-sans border border-line rounded-[10px] bg-white text-ink! outline-none focus:border-brand transition-colors"
                  />
                  {errors.email && fieldErrorMessage(errors.email.message || "Email is required.")}
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <label className="flex flex-col gap-1.5">
                  <Typography as="span" variant="eyebrow" color="ink-2" className="font-bold!">
                    Your specialty / trade
                  </Typography>
                  <input
                    placeholder="e.g. Textile exports"
                    suppressHydrationWarning
                    {...register("specialty", {
                      required: "Specialty is required.",
                      minLength: {
                        value: 3,
                        message: "Specialty must be at least 3 characters.",
                      },
                    })}
                    className="w-full px-3.25 py-2.75 text-[14px] font-sans border border-line rounded-[10px] bg-white text-ink outline-none focus:border-brand transition-colors"
                  />
                  {errors.specialty &&
                    fieldErrorMessage(errors.specialty.message || "Specialty is required.")}
                </label>

                <label className="flex flex-col gap-1.5">
                  <Typography as="span" variant="eyebrow" color="ink-2" className="font-bold!">
                    Phone (with code)
                  </Typography>
                  <input
                    placeholder="+91 …"
                    suppressHydrationWarning
                    {...register("phone", {
                      required: "Phone is required.",
                      minLength: {
                        value: 7,
                        message: "Phone number is too short.",
                      },
                      maxLength: {
                        value: 15,
                        message: "Phone number is too long.",
                      },
                      pattern: {
                        value: /^[+]?[-\d\s()]{7,15}$/,
                        message: "Enter a valid phone number.",
                      },
                    })}
                    className="w-full px-3.25 py-2.75 text-[14px] font-sans border border-line rounded-[10px] bg-white text-ink outline-none focus:border-brand transition-colors"
                  />
                  {errors.phone && fieldErrorMessage(errors.phone.message || "Phone is required.")}
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
                disabled={isSubmitting || cooldown > 0}
                className="bg-brand text-white border-none rounded-pill px-5.5 py-3.5 font-bold cursor-pointer mt-1.5 inline-flex items-center justify-center gap-2 hover:bg-brand-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Typography as="span" variant="body-sm" color="white" className="font-bold!">
                  {isSubmitting
                    ? "Submitting..."
                    : cooldown > 0
                      ? `Wait ${cooldown}s`
                      : "Submit request"}
                </Typography>
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : cooldown > 0 ? null : (
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
