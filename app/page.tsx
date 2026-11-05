const projects = [
  { name: "Project One", kind: "Brand identity" },
  { name: "Project Two", kind: "Product design" },
  { name: "Project Three", kind: "Motion" },
  { name: "Project Four", kind: "Editorial" },
  { name: "Project Five", kind: "Spatial" },
  { name: "Project Six", kind: "Creative coding" },
];

const experience = [
  { role: "Role title", place: "Company", years: "2024 — Now" },
  { role: "Role title", place: "Company", years: "2022 — 2024" },
  { role: "Role title", place: "Company", years: "2020 — 2022" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-8 text-sm text-neutral-500">{children}</p>;
}

export default function Home() {
  return (
    <main className="flex flex-col gap-32 py-10 pb-24">
      <section className="px-6 sm:px-10">
        <h1 className="text-5xl font-medium tracking-tight sm:text-7xl">
          Siddharth Thorat
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-neutral-700 sm:text-2xl">
          A short paragraph on what I do, how I do it, and who I am. This is
          placeholder text for the intro.
        </p>
      </section>

      <section>
        <div className="px-6 sm:px-10">
          <SectionLabel>Work</SectionLabel>
        </div>
        <ul className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 sm:px-10">
          {projects.map((project) => (
            <li key={project.name} className="w-[75vw] shrink-0 snap-start sm:w-[420px]">
              <div className="aspect-[4/5] w-full bg-neutral-200" />
              <h2 className="mt-4 text-lg font-medium">{project.name}</h2>
              <p className="text-sm text-neutral-500">{project.kind}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-6 sm:px-10">
        <SectionLabel>Experience</SectionLabel>
        <ul className="border-t border-neutral-200">
          {experience.map((item, i) => (
            <li
              key={i}
              className="grid grid-cols-1 gap-1 border-b border-neutral-200 py-5 sm:grid-cols-3"
            >
              <span className="font-medium">{item.role}</span>
              <span className="text-neutral-600">{item.place}</span>
              <span className="text-neutral-500 sm:text-right">{item.years}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-6 sm:px-10">
        <SectionLabel>About</SectionLabel>
        <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-neutral-700">
          <p>
            The longer about section. Background, how you came to design, the
            mediums you work across, and what you care about. Placeholder text.
          </p>
          <p>
            A second paragraph: tools, process, how you use AI tools like Claude
            and Cursor, and what you are looking for next.
          </p>
        </div>
      </section>
    </main>
  );
}
