export type Screen = {
  /** Looping video sources in /public, best format first (e.g. WebM, then an MP4 fallback). */
  video?: string[];
  /** Still frame or image in /public. Also the cover shown before a video plays. */
  image?: string;
};

export type Visual = Screen & {
  ratio: "portrait" | "landscape" | "square" | "wide" | "classic" | "banner";
  tone: string;
  phones?: Screen[];
  laptop?: Screen;
  corner?: Screen;
  fit?: "contain" | "inset";
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
  summaryLinks?: { text: string; href: string }[];
  /** One line under the project name in the details panel. */
  blurb?: string;
  /** Result line shown under the blurb. */
  outcome?: { text: string; href?: string };
  facts?: string[];
  nda?: boolean;
  link?: string;
  caseStudyLink?: string;
  caseStudyLinkLabel?: string;
  caseStudy?: boolean;
  cover?: Visual;
  visuals: Visual[];
};

/** Replace `#` when the case study URL is ready. */
export const pendingHref = "#";

export const ndaNote = "Under NDA. Happy to walk you through it on a call.";

export const headline = "Brand and product designer.";

const healthflexHero: Screen = {
  video: ["/work/healthflex/hero.webm", "/work/healthflex/hero.mp4"],
  image: "/work/healthflex/hero.jpg",
};

export const projects: Project[] = [
  {
    slug: "alai",
    name: "Alai",
    scope: ["Website", "Product Design"],
    context: "At Chariot",
    blurb: "Worked directly with the founders and engineers to design the product and website.",
    summary:
      "Alai is a Y Combinator-backed AI tool for creating polished presentations quickly. The work spanned the website and the product experience, including how agentic editing sits alongside traditional manual control, that lets users get the speed of AI without losing authorship.",
    outcome: {
      text: "#2 Product of the Day on Product Hunt",
      href: "https://www.producthunt.com/products/alai",
    },
    link: "https://getalai.com/",
    caseStudyLink: "https://withchariot.com/alai-product-design-uiux",
    caseStudyLinkLabel: "View full case study",
    visuals: [
      { ratio: "classic", tone: placeholder, image: "/work/alai/mockup.webp" },
      { ratio: "classic", tone: placeholder, image: "/work/alai/website.webp" },
      { ratio: "classic", tone: placeholder, image: "/work/alai/editor.webp" },
    ],
  },
  {
    slug: "cruise-money",
    name: "Cruise Money",
    scope: ["Branding", "Website", "Marketing"],
    context: "At Chariot",
    blurb: "Led branding and marketing for Cruise and designed the website for its first 100 users.",
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
    slug: "healthflex",
    name: "Healthflex by Loop",
    scope: ["Branding", "Website"],
    context: "At Chariot",
    blurb: "Designed the website from scratch, working directly with Loop’s founders and managers.",
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
  {
    slug: "freight-tiger",
    name: "Freight Tiger",
    scope: ["Branding", "Website"],
    context: "At Chariot",
    blurb: "Led the brand and website redesign, working with Freight Tiger’s project managers and developers.",
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
];

export const archive = {
  text: "Earlier work",
  href: "https://docs.google.com/presentation/d/e/2PACX-1vQFOt2uZ0_QrkyC8ab-RGUmanFf3YYPzI3IhvuNsLpfkFsZPzhHWDBtluYcpK4gpnumjWFu76T8tmaA/pub?start=false&loop=false&delayms=3000",
};

export const about = [
  "I’ve spent five years designing across advertising, marketing, branding, and product, and I’ve never fit neatly into a traditional role. I adapt quickly to whatever the problem needs, and I do my best work when I have room to explore before settling on an answer.",
  "I care about music and environmental conservation, and I want my work to end up there. If you’re building something in either, I’d like to talk.",
];

export const experience = [
  {
    role: "Product Designer",
    place: "Chariot",
    years: "2024 — Present",
    detail: "Ran projects end to end, working with founders, managers, developers and marketing teams.",
  },
  { role: "Freelance Graphic Designer", place: "Independent", years: "2021 — 2024" },
];

export const showProcessSection = false;

export const connectLinks = [
  { label: "siddharththorat96@gmail.com", href: "mailto:siddharththorat96@gmail.com" },
  { label: "Resume", href: "/resume.pdf" },
] as const;

export const ratioClass: Record<Visual["ratio"], string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[3/2]",
  square: "aspect-square",
  wide: "aspect-video",
  classic: "aspect-[4/3]",
  banner: "aspect-[1404/572]",
};