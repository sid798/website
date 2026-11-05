export type Project = {
  slug: string;
  name: string;
  kind: string;
  year: string;
  role: string;
  ratio: "portrait" | "landscape" | "square";
  tone: string;
  summary: string;
};

export const projects: Project[] = [
  {
    slug: "project-one",
    name: "Project One",
    kind: "Brand identity",
    year: "2026",
    role: "Design lead",
    ratio: "portrait",
    tone: "#D9D3C7",
    summary:
      "One or two sentences on the brief, what you made, and why it mattered. Placeholder text.",
  },
  {
    slug: "project-two",
    name: "Project Two",
    kind: "Product design",
    year: "2025",
    role: "Product designer",
    ratio: "landscape",
    tone: "#C9CFC8",
    summary:
      "One or two sentences on the brief, what you made, and why it mattered. Placeholder text.",
  },
  {
    slug: "project-three",
    name: "Project Three",
    kind: "Motion",
    year: "2025",
    role: "Motion designer",
    ratio: "square",
    tone: "#1C1C1A",
    summary:
      "One or two sentences on the brief, what you made, and why it mattered. Placeholder text.",
  },
  {
    slug: "project-four",
    name: "Project Four",
    kind: "Editorial",
    year: "2024",
    role: "Art direction",
    ratio: "portrait",
    tone: "#E4D6C3",
    summary:
      "One or two sentences on the brief, what you made, and why it mattered. Placeholder text.",
  },
  {
    slug: "project-five",
    name: "Project Five",
    kind: "Spatial",
    year: "2024",
    role: "Designer",
    ratio: "landscape",
    tone: "#BFC6CC",
    summary:
      "One or two sentences on the brief, what you made, and why it mattered. Placeholder text.",
  },
  {
    slug: "project-six",
    name: "Project Six",
    kind: "Creative coding",
    year: "2023",
    role: "Designer and developer",
    ratio: "square",
    tone: "#2A2B2E",
    summary:
      "One or two sentences on the brief, what you made, and why it mattered. Placeholder text.",
  },
];

export const experience = [
  { role: "Role title", place: "Company", years: "2024 — Now" },
  { role: "Role title", place: "Company", years: "2022 — 2024" },
  { role: "Role title", place: "Company", years: "2020 — 2022" },
  { role: "Role title", place: "Company", years: "2019 — 2020" },
];

export const mediums = ["brand", "product", "motion", "print", "space", "code"];

export const email = "hello@example.com";
