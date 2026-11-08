export type Visual = { ratio: "portrait" | "landscape" | "square"; tone: string };

export type Project = {
  slug: string;
  name: string;
  kind: string;
  year: string;
  role: string;
  summary: string;
  visuals: Visual[];
};

const summary =
  "One or two sentences on the brief, what you made, and why it mattered. Placeholder text until the real case study is written.";

export const projects: Project[] = [
  {
    slug: "project-one",
    name: "Project One",
    kind: "Brand Identity",
    year: "2026",
    role: "Design Lead",
    summary,
    visuals: [
      { ratio: "landscape", tone: "#D8D4CC" },
      { ratio: "portrait", tone: "#CFCAC0" },
      { ratio: "landscape", tone: "#E2DED6" },
    ],
  },
  {
    slug: "project-two",
    name: "Project Two",
    kind: "Product Design",
    year: "2025",
    role: "Product Designer",
    summary,
    visuals: [
      { ratio: "landscape", tone: "#C9CEC8" },
      { ratio: "landscape", tone: "#BFC5BF" },
      { ratio: "square", tone: "#D5D9D3" },
    ],
  },
  {
    slug: "project-three",
    name: "Project Three",
    kind: "Motion",
    year: "2025",
    role: "Motion Designer",
    summary,
    visuals: [
      { ratio: "square", tone: "#2B2B29" },
      { ratio: "landscape", tone: "#3A3A37" },
      { ratio: "landscape", tone: "#242422" },
    ],
  },
  {
    slug: "project-four",
    name: "Project Four",
    kind: "Editorial",
    year: "2024",
    role: "Art Direction",
    summary,
    visuals: [
      { ratio: "portrait", tone: "#E3D7C6" },
      { ratio: "portrait", tone: "#D9CCB9" },
      { ratio: "landscape", tone: "#EADFD0" },
    ],
  },
  {
    slug: "project-five",
    name: "Project Five",
    kind: "Spatial",
    year: "2024",
    role: "Designer",
    summary,
    visuals: [
      { ratio: "landscape", tone: "#C3C9CF" },
      { ratio: "square", tone: "#B6BDC4" },
      { ratio: "landscape", tone: "#CDD2D7" },
    ],
  },
  {
    slug: "project-six",
    name: "Project Six",
    kind: "Creative Coding",
    year: "2023",
    role: "Design & Engineering",
    summary,
    visuals: [
      { ratio: "landscape", tone: "#30312F" },
      { ratio: "landscape", tone: "#1F201E" },
      { ratio: "portrait", tone: "#3B3C39" },
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
  { role: "Role Title", place: "Company", years: "2024 — Now" },
  { role: "Role Title", place: "Company", years: "2022 — 2024" },
  { role: "Role Title", place: "Company", years: "2020 — 2022" },
  { role: "Role Title", place: "Company", years: "2019 — 2020" },
];

export const connect = ["Email", "LinkedIn", "Instagram", "Read.cv"];

export const ratioClass: Record<Visual["ratio"], string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[3/2]",
  square: "aspect-square",
};
