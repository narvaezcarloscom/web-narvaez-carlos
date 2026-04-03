import Link from "next/link";
import type { Metadata } from "next";
import { services } from "../../../lib/services";
import Container from "../../../components/Container";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web design, SEO, digital advertising, and content strategy for service-based businesses.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-16 md:pt-24 pb-16 md:pb-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <p className="text-xs uppercase tracking-widest text-graphite/50 mb-4">
                Services
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl editorial-heading">
                Strategy, design,
                <br />
                and technology —
                <br />
                <span className="italic">working together.</span>
              </h1>
            </div>
            <div className="md:col-span-4 md:col-start-9 flex items-end">
              <p className="text-graphite text-base md:text-lg leading-relaxed">
                We help service-based businesses build strong digital
                foundations through focused, intentional work across four core
                disciplines.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Services List */}
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="border-t border-neutral-light">
            {services.map((service, i) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="group border-b border-neutral-light py-8 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:border-graphite/20 transition-colors duration-300"
              >
                <div className="flex items-baseline gap-6 md:gap-8">
                  <span className="text-xs text-graphite/30 font-medium w-6">
                    0{i + 1}
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-charcoal group-hover:text-narvaez-red transition-colors duration-300">
                    {service.name}
                  </h2>
                </div>
                <div className="flex items-center gap-8 md:gap-12">
                  <p className="text-sm text-graphite/60 max-w-xs hidden md:block">
                    {service.summary}
                  </p>
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
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
