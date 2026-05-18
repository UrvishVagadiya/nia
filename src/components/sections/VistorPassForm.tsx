"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm, useWatch, Controller } from "react-hook-form";
import { Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Typography from "@/components/ui/typography";
import { PhoneInput } from "@/components/ui/phone-input";
import { isValidPhoneNumber } from "libphonenumber-js/max";

import { VisitorFormValues } from "@/lib/types";

const formatDateLong = (dateStr?: string | Date): string => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    return typeof dateStr === "string" ? dateStr : "";
  }
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(d);
};

interface VistorPassFormProps {
  chapterId?: string | number;
  chapterSlug?: string;
  chapterName?: string;
  venue?: string;
}

const VistorPassForm = ({ chapterId, chapterSlug, chapterName, venue }: VistorPassFormProps) => {
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    const lastInquiryTime = localStorage.getItem("last_inquiry_time");
    if (lastInquiryTime) {
      const elapsed = (new Date().getTime() - parseInt(lastInquiryTime)) / 1000;
      const cooldownDuration = 60;
      const remaining = Math.max(0, Math.ceil(cooldownDuration - elapsed));
      if (remaining > 0) {
        const timer = setTimeout(() => setCooldown(remaining), 0);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const router = useRouter();
  const searchParams = useSearchParams();
  const queryChapter = searchParams.get("chapter") || "";
  const queryVenue = searchParams.get("venue") || "";
  const queryDate = searchParams.get("date") || "";
  const queryTopic = searchParams.get("topic") || "";

  const {
    handleSubmit,
    setValue,
    control: formControl,
    reset,
    register,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<VisitorFormValues>({
    mode: "onTouched",
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
      meetingDay: "",
      meetingDate: "",
      meetingTopic: "",
    },
  });

  const currentChapterName = useWatch({ control: formControl, name: "chapterName" });
  const selectedMeetingDate = useWatch({ control: formControl, name: "meetingDate" });
  const selectedMeetingTopic = useWatch({ control: formControl, name: "meetingTopic" });

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
    if (cooldown > 0) {
      const minutesRemaining = Math.ceil(cooldown / 60);
      toast.error(
        `Please try again in ${minutesRemaining} ${minutesRemaining === 1 ? "minute" : "minutes"}.`,
        {
          style: { background: "#fff", color: "#0e3a5c", border: "1px solid #e2e8f0" },
        }
      );
      return;
    }

    if (!values.chapterId) {
      toast.error("Chapter information is missing. Please refresh the page.");
      return;
    }

    const formattedDate = formatDateLong(values.meetingDate);
    const payloadData = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      specialty: values.specialty,
      notes: values.notes,
      chapter: values.chapterId,
      meetingDetails: {
        day: formattedDate.split(",")[0] || "",
        date:
          formattedDate.split(",").length > 1 ? formattedDate.split(",")[1].trim() : formattedDate,
        topic: values.meetingTopic || "Regular Meeting",
        venue: values.venue,
      },
    };

    try {
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

      toast.success("Request sent! We'll reply soon.", {
        style: { background: "#fff", color: "#0e3a5c", border: "1px solid #e2e8f0" },
      });

      setCooldown(60);
      localStorage.setItem("last_inquiry_time", new Date().getTime().toString());

      router.replace(window.location.pathname, { scroll: false });
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
              <Typography variant="caption" color="brand-2" className="uppercase mb-1 font-bold!">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Typography as="span" variant="eyebrow" color="ink-2" className="font-bold!">
              Your name <span className="text-red-500">*</span>
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
          </div>

          <div className="flex flex-col gap-1.5">
            <Typography as="span" variant="eyebrow" color="ink-2" className="font-bold!">
              Email address <span className="text-red-500">*</span>
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
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Typography as="span" variant="eyebrow" color="ink-2" className="font-bold!">
              Your specialty/trade <span className="text-red-500">*</span>
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
          </div>

          <div className="flex flex-col gap-1.5">
            <Typography as="span" variant="eyebrow" color="ink-2" className="font-bold!">
              Phone number <span className="text-red-500">*</span>
            </Typography>
            <Controller
              name="phone"
              control={formControl}
              rules={{
                required: "Phone number is required.",
                validate: (value) => {
                  if (!value) return "Phone number is required.";

                  const digitsOnly = value.replace(/\D/g, "");
                  if (digitsOnly.length <= 3) return true;

                  if (!isValidPhoneNumber(value)) {
                    return "Invalid phone number.";
                  }

                  return true;
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  <PhoneInput
                    international
                    defaultCountry="IN"
                    placeholder="Enter phone number"
                    value={field.value as string}
                    onChange={(value?: string) => {
                      field.onChange(value || "");
                    }}
                    onBlur={field.onBlur}
                  />
                  {fieldState.error &&
                    (fieldState.isTouched || fieldState.isDirty || isSubmitted) &&
                    fieldErrorMessage(fieldState.error.message || "Phone number is required.")}
                </>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
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
        </div>

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
          className="bg-brand text-white border-none rounded-pill px-5.5 py-3.5 font-bold cursor-pointer mt-1.5 inline-flex items-center justify-center gap-2 hover:bg-brand-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <Typography as="span" variant="body-sm" color="white" className="font-bold!">
            {isSubmitting ? "Submitting..." : "Submit request"}
          </Typography>
          {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <ArrowRight size={16} />}
        </button>
      </form>
    </div>
  );
};

export default VistorPassForm;
