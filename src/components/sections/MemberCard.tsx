import Image from "next/image";
import Typography from "../ui/typography";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Member } from "@/lib/types";
import { Calendar, MapPin } from "lucide-react";

const MemberCard = ({ member }: { member: Member }) => {
  return (
    <Card className="bg-white rounded-lg overflow-hidden shadow-[0_8px_24px_-12px_rgba(14,58,92,0.1)] flex flex-col h-full border border-line/50 !p-0 gap-0 ring-0">
      {/* Image Section */}
      <div className="relative h-72 sm:h-80 w-full shrink-0 bg-paper-3">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e3a5c]/40 via-[#0e3a5c]/10 to-transparent" />
        <div className="absolute top-4 left-4 bg-white text-brand px-2.5 py-1 rounded-pill text-2.5 font-bold shadow-sm flex items-center gap-[6px] tracking-wide">
          <span className="w-1.25 h-1.25 rounded-full bg-brand" />
          <Typography variant="caption" color="brand" className="text-[10.5] font-bold!">
            {member.specialty}
          </Typography>
        </div>
        <CardHeader className="absolute bottom-4 left-5 right-5 flex flex-col p-0 border-none space-y-0">
          <CardTitle className="m-0 leading-tight">
            <Typography as="span" variant="h5" color="white" className="m-0">
              {member.name}
            </Typography>
          </CardTitle>
          <CardDescription className="mt-0.5 m-0">
            <Typography as="span" variant="caption" color="white" className="italic m-0">
              {member.convention}
            </Typography>
          </CardDescription>
        </CardHeader>
      </div>

      {/* Content Section */}
      <CardContent className="p-6 pb-0 flex flex-col flex-1 border-none shadow-none text-left">
        <div className="flex items-center gap-2 text-ink-4 text-[11px] font-bold mb-4 tracking-wide uppercase">
          <div className="flex items-center gap-1">
            <MapPin size={11} className="text-brand" />
            {member.location}
          </div>
          <span className="text-ink-4 mx-0.5">&bull;</span>
          <div className="flex items-center gap-1">
            <Calendar size={11} className="text-brand" />
            {member.joined}
          </div>
        </div>
        <p className="text-[13px] text-ink-3 leading-[1.6] line-clamp-3 m-0 text-pretty min-h-[64px]">
          {member.oneliner}
        </p>
        <div className="flex-1 min-h-4" />
      </CardContent>

      {/* Footer */}
      <CardFooter className="px-6 pb-2.5 pt-4 border-t border-line flex items-center gap-2 bg-transparent">
        {[
          {
            icon: "linkedin",
            path: "M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM20.45 20.45h-3.56v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.66H9.33V9h3.42v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z",
          },
          { icon: "instagram", path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" },
          {
            icon: "web",
            path: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
          },
        ].map((social, idx) => (
          <a
            key={idx}
            href="#"
            className="w-7 h-7 rounded-full bg-paper-2 flex items-center justify-center text-ink-3 hover:text-brand hover:bg-brand-soft transition-colors cursor-pointer"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill={social.icon === "linkedin" ? "currentColor" : "none"}
              stroke={social.icon === "linkedin" ? "none" : "currentColor"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {social.icon === "instagram" && (
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              )}
              {social.icon === "web" && <circle cx="12" cy="12" r="10"></circle>}
              {social.icon === "web" && <line x1="2" y1="12" x2="22" y2="12"></line>}
              <path d={social.path} />
              {social.icon === "instagram" && <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>}
            </svg>
          </a>
        ))}
      </CardFooter>
    </Card>
  );
};

export default MemberCard;
