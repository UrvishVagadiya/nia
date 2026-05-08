const PORTRAITS = {
  m: [
    "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=faces",
  ],
  f: [
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop&crop=faces",
  ],
};

export const pic = (kind: "m" | "f", idx: number) => PORTRAITS[kind][idx % PORTRAITS[kind].length];

// ─── Images ──────────────────────────────────────────────────────────────────

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&h=1100&fit=crop";
export const MEETING_IMAGE =
  "https://images.unsplash.com/photo-1552581234-26160f608093?w=1200&h=700&fit=crop";
export const VENUE_IMAGE =
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900&h=600&fit=crop";
