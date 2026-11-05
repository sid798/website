import { CodeDemo } from "@/components/code-demo";
import { MediumCycler } from "@/components/medium-cycler";
import { PageMotion } from "@/components/page-motion";
import { RevealText } from "@/components/reveal-text";
import { WorkRail } from "@/components/work-rail";
import { email, experience, mediums, projects } from "@/lib/content";

const tools = ["Figma", "Cursor", "Claude", "After Effects", "Blender", "TouchDesigner"];

export default function Home() {
  return (
    <main id="top">
      <PageMotion />

      <section className="flex min-h-svh flex-col justify-end px-5 pb-8 pt-28 sm:px-10 sm:pb-10">
        <RevealText
          as="h1"
          mode="load"
          delay={0.15}
          text="Siddharth Thorat"
          className="text-[20.5vw] font-medium leading-[0.86] tracking-[-0.055em] sm:text-[21.4vw]"
        />
        <div className="mt-10 grid gap-8 border-t border-line pt-6 md:grid-cols-12">
          <p data-fade="0.6" className="text-2xl leading-tight tracking-tight md:col-span-5 sm:text-3xl">
            Designer working across{" "}
            <MediumCycler words={mediums} final="every medium." />
          </p>
          <p data-fade="0.75" className="max-w-md text-base leading-relaxed text-muted md:col-span-4 md:col-start-8">
            A short paragraph on what you do, how you do it, and who you are. Placeholder text for the
            intro, two or three lines at most.
          </p>
          <a
            data-fade="0.9"
            href="#work"
            className="u-draw self-end justify-self-start pb-0.5 text-sm md:col-span-1 md:justify-self-end"
          >
            Work ↓
          </a>
        </div>
      </section>

      <WorkRail projects={projects} />

      <section id="process" className="bg-ink px-5 py-28 text-paper sm:px-10 sm:py-36">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="mb-8 text-sm text-paper/50">Process</p>
            <RevealText
              as="h2"
              text="Designed by hand. Built with machines."
              className="text-4xl font-medium leading-[1.02] tracking-[-0.035em] sm:text-6xl"
            />
            <p data-fade className="mt-8 max-w-md leading-relaxed text-paper/60">
              Placeholder: how you use AI tools like Claude and Cursor to take an idea from sketch to
              something real, and why it widens what one designer can ship.
            </p>
            <ul data-fade className="mt-10 flex flex-wrap gap-2 font-mono text-xs text-paper/70">
              {tools.map((tool) => (
                <li key={tool} className="rounded-full border border-paper/15 px-3 py-1.5">
                  {tool}
                </li>
              ))}
            </ul>
          </div>
          <div data-fade className="md:col-span-7 md:pt-12">
            <CodeDemo />
          </div>
        </div>
      </section>

      <section className="px-5 py-28 sm:px-10 sm:py-36">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-sm text-muted">Experience</p>
          </div>
          <ul className="border-t border-line md:col-span-8">
            {experience.map((item, i) => (
              <li key={i} className="row-wipe relative border-b border-line">
                <div className="relative grid grid-cols-2 gap-1 px-1 py-6 sm:grid-cols-3 sm:px-3">
                  <span className="font-medium">{item.role}</span>
                  <span className="text-right text-muted transition-colors sm:text-left">{item.place}</span>
                  <span className="font-mono text-xs text-muted transition-colors sm:self-center sm:text-right">
                    {item.years}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="about" className="px-5 pb-28 sm:px-10 sm:pb-36">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-sm text-muted">About</p>
            <div data-fade className="mt-8 aspect-[4/5] w-full max-w-xs bg-[#D9D3C7] md:max-w-none" />
          </div>
          <div className="md:col-span-8">
            <RevealText
              mode="scrub"
              text="The longer about. Where you grew up, how you came to design, and why you refuse to stay in one medium. This paragraph lights up as you scroll through it. Placeholder text."
              className="text-3xl leading-[1.15] tracking-[-0.02em] sm:text-5xl"
            />
            <div className="mt-16 grid gap-10 text-sm sm:grid-cols-3">
              <div data-fade>
                <p className="mb-3 text-muted">Mediums</p>
                <ul className="space-y-1 capitalize">
                  {mediums.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
              <div data-fade="0.08">
                <p className="mb-3 text-muted">Currently</p>
                <ul className="space-y-1 text-muted">
                  <li>Placeholder</li>
                  <li>Placeholder</li>
                </ul>
              </div>
              <div data-fade="0.16">
                <p className="mb-3 text-muted">Recognition</p>
                <ul className="space-y-1 text-muted">
                  <li>Placeholder</li>
                  <li>Placeholder</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="border-t border-line px-5 pb-8 pt-24 sm:px-10">
        <p className="mb-6 text-sm text-muted">Contact</p>
        <RevealText
          as="h2"
          text="Let’s make something."
          className="text-[12vw] font-medium leading-[0.9] tracking-[-0.05em]"
        />
        <a
          href={`mailto:${email}`}
          className="u-draw mt-8 inline-block pb-1 font-serif text-3xl italic sm:text-5xl"
        >
          {email}
        </a>
        <div className="mt-24 flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
          <ul className="flex gap-6">
            <li>LinkedIn</li>
            <li>Instagram</li>
            <li>Read.cv</li>
          </ul>
          <a href="#top" className="u-draw pb-0.5 text-ink">
            Back to top ↑
          </a>
        </div>
      </footer>
    </main>
  );
}
