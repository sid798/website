export type Visual = {
  ratio: "portrait" | "landscape" | "square";
  tone: string;
  /** Looping MP4/WebM in /public. Leave unset until the file exists. */
  video?: string;
  /** Still frame or image in /public. Also the cover shown before a video plays. */
  image?: string;
};

export type Project = {
  slug: string;
  name: string;
  scope: string[];
  context: string;
  year?: string;
  summary: string;
  facts?: string[];
  nda?: boolean;
  link?: string;
  caseStudy?: boolean;
  visuals: Visual[];
};

export const ndaNote = "Under NDA. Detailed walkthrough available on request.";

export const projects: Project[] = [
  {
    slug: "alai",
    name: "Alai",
    scope: ["Product Design", "Web Design"],
    context: "At Chariot",
    summary: "Product and website design for Alai.",
    facts: ["Featured on Product Hunt", "YC-backed"],
    nda: true,
    visuals: [
      { ratio: "landscape", tone: "#D8D4CC" },
      { ratio: "landscape", tone: "#CFCAC0" },
      { ratio: "portrait", tone: "#E2DED6" },
    ],
  },
  {
    slug: "healthflex",
    name: "Healthflex by Loop",
    scope: ["Website Design"],
    context: "At Chariot",
    summary: "Website design for Healthflex by Loop.",
    nda: true,
    visuals: [
      { ratio: "landscape", tone: "#C9CEC8" },
      { ratio: "landscape", tone: "#BFC5BF" },
      { ratio: "square", tone: "#D5D9D3" },
    ],
  },
  {
    slug: "atlabs",
    name: "Atlabs",
    scope: ["Product Design", "Website Design"],
    context: "At Chariot",
    summary: "Product and website design for Atlabs.",
    nda: true,
    visuals: [
      { ratio: "landscape", tone: "#2B2B29" },
      { ratio: "square", tone: "#3A3A37" },
      { ratio: "landscape", tone: "#242422" },
    ],
  },
  {
    slug: "freight-tiger",
    name: "Freight Tiger",
    scope: ["Website Design"],
    context: "At Chariot",
    summary: "Website design for Freight Tiger.",
    nda: true,
    visuals: [
      { ratio: "landscape", tone: "#C3C9CF" },
      { ratio: "landscape", tone: "#B6BDC4" },
      { ratio: "portrait", tone: "#CDD2D7" },
    ],
  },
  {
    slug: "cruise-money",
    name: "Cruise Money",
    scope: ["Website Design", "Marketing"],
    context: "At Chariot",
    summary: "Website design and marketing for Cruise Money.",
    nda: true,
    visuals: [
      { ratio: "landscape", tone: "#E3D7C6" },
      { ratio: "portrait", tone: "#D9CCB9" },
      { ratio: "landscape", tone: "#EADFD0" },
    ],
  },
  {
    slug: "life-in-progress",
    name: "Life in Progress",
    scope: ["Product Design", "Creative Direction"],
    context: "Personal project",
    summary:
      "Product design and creative direction for Life in Progress, a personal project. Placeholder: one or two sentences on what it is and why you made it.",
    caseStudy: true,
    visuals: [
      { ratio: "landscape", tone: "#30312F" },
      { ratio: "portrait", tone: "#1F201E" },
      { ratio: "landscape", tone: "#3B3C39" },
    ],
  },
];

export const archives: Project[] = [
  {
    slug: "india-art-fair",
    name: "India Art Fair",
    scope: ["Graphic Design"],
    context: "Archive",
    summary: "Work for India Art Fair. Placeholder: one line on what this was.",
    visuals: [
      { ratio: "portrait", tone: "#E6D9C2" },
      { ratio: "portrait", tone: "#DCCDB2" },
      { ratio: "square", tone: "#EFE5D4" },
    ],
  },
  {
    slug: "jazz-de-montreal",
    name: "Jazz de Montréal",
    scope: ["Graphic Design"],
    context: "Archive",
    summary: "Work for Jazz de Montréal. Placeholder: one line on what this was.",
    visuals: [
      { ratio: "portrait", tone: "#C7CCD6" },
      { ratio: "square", tone: "#BAC0CC" },
      { ratio: "portrait", tone: "#D3D7DF" },
    ],
  },
];

export const intro = [
  "A short paragraph on what you do and how you do it. Placeholder text: two or three sentences about the way you approach work across mediums.",
  "A second, shorter line about what drives you.",
];

export const about = [
  "The longer about. Where you grew up, how you came to design, and why you refuse to stay in one medium. Placeholder text.",
  "A second paragraph on process: how you use tools like Claude and Cursor to take an idea from sketch to something real, and what you are looking for next.",
];

export const experience = [
  { role: "Product Designer", place: "Chariot", years: "2024 — 2026" },
  { role: "Freelance Graphic Designer", place: "Independent", years: "2022 — 2024" },
];

export const connect = ["Email", "LinkedIn", "Instagram", "Read.cv"];

export const ratioClass: Record<Visual["ratio"], string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[3/2]",
  square: "aspect-square",
};
