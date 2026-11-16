export type Screen = {
  /** Looping video sources in /public, best format first (e.g. WebM, then an MP4 fallback). */
  video?: string[];
  /** Still frame or image in /public. Also the cover shown before a video plays. */
  image?: string;
};

export type Visual = Screen & {
  ratio: "portrait" | "landscape" | "square" | "wide" | "classic" | "banner";
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
  /** Phrases in `summary` to turn into outbound links. */
  summaryLinks?: { text: string; href: string }[];
  facts?: string[];
  nda?: boolean;
  link?: string;
  /** A full case study hosted elsewhere. */
  caseStudyLink?: string;
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
    scope: ["Branding", "Website", "Marketing"],
    context: "At Chariot",
    summary:
      "Cruise is an AI money companion for India’s affluent professionals, helping them manage investments and plan their finances through conversation. Launching as a new company, it needed everything from the ground up: identity, logo, website, and marketing. The brand is positioned around people who want their money to support the lifestyle they’re working toward, with each touchpoint designed to win its first users.",
    nda: true,
    link: "https://www.cruise.money/",
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
        phones: ["whatif", "features", "visualisation"].map((name) => ({
          video: [`/work/cruise-money/${name}.webm`, `/work/cruise-money/${name}.mp4`],
          image: `/work/cruise-money/${name}.jpg`,
        })),
      },
    ],
  },
  {
    slug: "alai",
    name: "Alai",
    scope: ["Website", "Product Design"],
    context: "At Chariot",
    summary:
      "Alai is a Y Combinator-backed AI tool for creating polished presentations quickly. The work spanned the website and the product experience, including how agentic editing sits alongside traditional manual control, that lets users get the speed of AI without losing authorship. Alai launched on Product Hunt as #2 Product of the Day.",
    summaryLinks: [
      { text: "Product Hunt as #2 Product of the Day", href: "https://www.producthunt.com/products/alai" },
    ],
    link: "https://getalai.com/",
    caseStudyLink: "https://withchariot.com/alai-product-design-uiux",
    visuals: [
      { ratio: "classic", tone: placeholder, image: "/work/alai/mockup.webp" },
      { ratio: "classic", tone: placeholder, image: "/work/alai/website.webp" },
      { ratio: "classic", tone: placeholder, image: "/work/alai/editor.webp" },
    ],
  },
  {
    slug: "freight-tiger",
    name: "Freight Tiger",
    scope: ["Branding", "Website"],
    context: "At Chariot",
    summary:
      "Freight Tiger is a logistics platform that helps businesses manage freight and transportation. The engagement covered a redesign of the brand language and website, replacing a dense, utilitarian look with a clear, consistent visual system that makes a complex product easier to understand.",
    nda: true,
    link: "https://www.freighttiger.com/",
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
        ratio: "banner",
        tone: "#ffffff",
        border: true,
        video: ["/work/freight-tiger/marketplace.webm", "/work/freight-tiger/marketplace.mp4"],
        image: "/work/freight-tiger/marketplace.jpg",
      },
    ],
  },
  {
    slug: "healthflex",
    name: "Healthflex by Loop",
    scope: ["Branding", "Website"],
    context: "At Chariot",
    summary:
      "Healthflex is a flexible health benefits product from Loop, which provides health insurance and benefits for employers. As a new offering with no existing site or visual direction, it called for a website designed from scratch. The result is an identity that stands on its own while remaining part of the Loop family.",
    nda: true,
    link: "https://healthflex.loophealth.com/",
    cover: { ratio: "classic", tone: "#d4eb17", corner: healthflexHero },
    visuals: [
      { ratio: "classic", tone: "#d4eb17", laptop: healthflexHero },
      { ratio: "classic", tone: "#d4eb17", image: "/work/healthflex/slide.webp" },
    ],
  },
];

export const archive = {
  text: "Archived works",
  href: "https://docs.google.com/presentation/d/e/2PACX-1vQFOt2uZ0_QrkyC8ab-RGUmanFf3YYPzI3IhvuNsLpfkFsZPzhHWDBtluYcpK4gpnumjWFu76T8tmaA/pub?start=false&loop=false&delayms=3000",
};

export const about = [
  "I’ve spent five years designing across advertising, marketing, branding and product, and I’ve never fit neatly into a traditional role. I adapt quickly to whatever the problem needs, and I do my best work when I have room to explore before settling on an answer.",
  "I care about music and environmental conservation. If you’re building something in either, I’d like to talk.",
];

export const experience = [
  { role: "Product Designer", place: "Chariot", years: "2024 — 2026" },
  { role: "Freelance Graphic Designer", place: "Independent", years: "2021 — 2024" },
];

/** Set to `true` to show the Process label and code demo on the homepage layouts. */
export const showProcessSection = false;

export const connectLinks = [
  { label: "siddharththorat96@gmail.com", href: "mailto:siddharththorat96@gmail.com" },
  { label: "Instagram", href: "https://www.instagram.com/_siddharth_thorat/" },
] as const;

export const ratioClass: Record<Visual["ratio"], string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[3/2]",
  square: "aspect-square",
  wide: "aspect-video",
  classic: "aspect-[4/3]",
  banner: "aspect-[1404/572]",
};
