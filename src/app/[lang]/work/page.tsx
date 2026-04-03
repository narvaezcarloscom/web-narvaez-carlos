import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { projects } from "../../../lib/projects";
import Container from "../../../components/Container";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects — websites, brands, and digital experiences built for service-based businesses.",
};

export default function WorkPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-16 md:pt-24 pb-16 md:pb-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <p className="text-xs uppercase tracking-widest text-graphite/50 mb-4">
                Selected work
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl editorial-heading">
                Projects built
                <br />
                with <span className="italic">intention.</span>
              </h1>
            </div>
            <div className="md:col-span-4 md:col-start-9 flex items-end">
              <p className="text-graphite text-base md:text-lg leading-relaxed">
                Every project starts with a clear objective and ends with a
                measurable result. Here&apos;s a selection of our recent work
                for service-based businesses.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Projects List */}
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="border-t border-neutral-light">
            {projects.map((project, i) => (
              <Link
                key={project.id}
                href={`/work/${project.id}`}
                className="group block border-b border-neutral-light"
              >
                <div className="py-8 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:border-graphite/20 transition-colors duration-300">
                  <div className="flex items-baseline gap-6 md:gap-8">
                    <span className="text-xs text-graphite/30 font-medium w-6">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-charcoal group-hover:text-narvaez-red transition-colors duration-300">
                      {project.name}
                    </h2>
                  </div>
                  <div className="flex items-center gap-8 md:gap-12">
                    <span className="text-xs text-graphite/40 hidden md:block">
                      {project.category}
                    </span>
                    <span className="text-xs text-graphite/40 hidden md:block">
                      {project.year}
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="text-graphite/30 group-hover:text-narvaez-red transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0"
                    >
                      <path
                        d="M1 13L13 1M13 1H3M13 1V11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                </div>

                {/* Project Image Preview (if available) */}
                {project.image && (
                  <div className="overflow-hidden mb-8 md:mb-10 ml-8 md:ml-14">
                    <div className="relative aspect-[16/9] max-w-3xl bg-neutral-light overflow-hidden">
                      <Image
                        src={project.image}
                        alt={`${project.name} — website preview`}
                        fill
                        className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                      />
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
