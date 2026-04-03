import Link from "next/link";
import type { Metadata } from "next";
import { articles } from "../../../lib/journal";
import Container from "../../../components/Container";
import DiagonalSlash from "../../../components/DiagonalSlash";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Perspectives on branding, web design, and digital strategy for service-based businesses.",
};

export default function JournalPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-16 md:pt-24 pb-16 md:pb-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <p className="text-xs uppercase tracking-widest text-graphite/50 mb-4">
                Journal
              </p>
              <DiagonalSlash className="text-graphite/20 mb-4" />
              <h1 className="font-serif text-[2.75rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl editorial-heading">
                Thinking out
                <br />
                <span className="italic">loud.</span>
              </h1>
            </div>
            <div className="md:col-span-4 md:col-start-9 flex items-end">
              <p className="text-graphite text-base md:text-lg leading-relaxed">
                Perspectives on branding, strategy, and the decisions that shape
                how businesses show up online.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Articles List */}
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="border-t border-neutral-light">
            {articles.map((article, i) => (
              <Link
                key={article.id}
                href={`/journal/${article.id}`}
                className="group block border-b border-neutral-light"
              >
                <div className="py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-8 items-baseline">
                  <div className="md:col-span-1">
                    <span className="text-xs text-graphite/30 font-medium">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="md:col-span-6">
                    <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-charcoal group-hover:text-narvaez-red transition-colors duration-300 editorial-heading leading-[1.1]">
                      {article.title}
                    </h2>
                    <p className="mt-4 text-graphite/60 text-sm md:text-base leading-relaxed max-w-lg hidden md:block">
                      {article.subtitle}
                    </p>
                  </div>

                  <div className="md:col-span-4 md:col-start-9 flex items-center justify-between md:justify-end gap-6">
                    <span className="text-xs text-graphite/40">
                      {article.readTime}
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
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
