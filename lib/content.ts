export type Screen = {
  /** Looping video sources in /public, best format first (e.g. WebM, then an MP4 fallback). */
  video?: string[];
  /** Still frame or image in /public. Also the cover shown before a video plays. */
  image?: string;
};

export type Visual = Screen & {
  ratio: "portrait" | "landscape" | "square" | "wide" | "classic";
  tone: string;
  /** Shows each screen inside a phone frame, side by side on the tone colour. */
  phones?: Screen[];
  /** Shows the screen inside a laptop frame, centred on the tone colour. */
  laptop?: Screen;
  /** Shows the screen set in from the top-left, running off the right and bottom edges. */
  corner?: Screen;
  /** "contain" shows the whole media on the tone colour; "inset" also pads it off the edges. */
  fit?: "contain" | "inset";
  /** A thin soft-grey outline, for tiles that would otherwise vanish into the page. */
  border?: boolean;
};

export const placeholder = "#110326";

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
  /** The V1 thumbnail, when it should differ from the first visual. */
  cover?: Visual;
  visuals: Visual[];
};

export const ndaNote = "Under NDA. Detailed walkthrough available on request.";

const healthflexHero: Screen = {
  video: ["/work/healthflex/hero.webm", "/work/healthflex/hero.mp4"],
  image: "/work/healthflex/hero.jpg",
};

export const projects: Project[] = [
  {
    slug: "cruise-money",
    name: "Cruise Money",
    scope: ["Website Design", "Marketing"],
    context: "At Chariot",
    summary: "Website design and marketing for Cruise Money.",
    nda: true,
    visuals: [
      {
        ratio: "wide",
        tone: placeholder,
        video: ["/work/cruise-money/hero.webm", "/work/cruise-money/hero.mp4"],
        image: "/work/cruise-money/hero.jpg",
      },
      { ratio: "classic", tone: placeholder, image: "/work/cruise-money/macbook.webp" },
      {
        ratio: "wide",
        tone: placeholder,
        phones: ["sayings", "features", "visualisation"].map((name) => ({
          video: [`/work/cruise-money/${name}.webm`, `/work/cruise-money/${name}.mp4`],
          image: `/work/cruise-money/${name}.jpg`,
        })),
      },
    ],
  },
  {
    slug: "alai",
    name: "Alai",
    scope: ["Product Design", "Web Design"],
    context: "At Chariot",
    summary: "Product and website design for Alai.",
    facts: ["Featured on Product Hunt", "YC-backed"],
    nda: true,
    visuals: [
      { ratio: "classic", tone: placeholder, image: "/work/alai/mockup.webp" },
      { ratio: "classic", tone: placeholder, image: "/work/alai/website.webp" },
      { ratio: "classic", tone: placeholder, image: "/work/alai/editor.webp" },
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
      { ratio: "wide", tone: "#ffbe06", fit: "inset", image: "/work/freight-tiger/macbook.webp" },
      {
        ratio: "wide",
        tone: "#0a0a0a",
        fit: "inset",
        video: ["/work/freight-tiger/tool.webm", "/work/freight-tiger/tool.mp4"],
        image: "/work/freight-tiger/tool.jpg",
      },
      {
        ratio: "wide",
        tone: "#ffffff",
        fit: "inset",
        border: true,
        video: ["/work/freight-tiger/feature.webm", "/work/freight-tiger/feature.mp4"],
        image: "/work/freight-tiger/feature.jpg",
      },
    ],
  },
  {
    slug: "healthflex",
    name: "Healthflex by Loop",
    scope: ["Website Design"],
    context: "At Chariot",
    summary: "Website design for Healthflex by Loop.",
    nda: true,
    cover: { ratio: "classic", tone: "#d4eb17", corner: healthflexHero },
    visuals: [
      { ratio: "classic", tone: "#d4eb17", laptop: healthflexHero },
      { ratio: "classic", tone: "#d4eb17", image: "/work/healthflex/slide.webp" },
    ],
  },
];

/** Hidden from the lists for now; the case study page still builds from here. */
export const parked: Project[] = [
  {
    slug: "life-in-progress",
    name: "Life in Progress",
    scope: ["Product Design", "Creative Direction"],
    context: "Personal project",
    summary:
      "Product design and creative direction for Life in Progress, a personal project. Placeholder: one or two sentences on what it is and why you made it.",
    caseStudy: true,
    visuals: [
      { ratio: "landscape", tone: placeholder },
      { ratio: "portrait", tone: placeholder },
      { ratio: "landscape", tone: placeholder },
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
      { ratio: "portrait", tone: placeholder },
      { ratio: "portrait", tone: placeholder },
      { ratio: "square", tone: placeholder },
    ],
  },
  {
    slug: "jazz-de-montreal",
    name: "Jazz de Montréal",
    scope: ["Graphic Design"],
    context: "Archive",
    summary: "Work for Jazz de Montréal. Placeholder: one line on what this was.",
    visuals: [
      { ratio: "portrait", tone: placeholder },
      { ratio: "square", tone: placeholder },
      { ratio: "portrait", tone: placeholder },
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
  wide: "aspect-video",
  classic: "aspect-[4/3]",
};
