import { notFound } from "next/navigation";
import Link from "next/link";
import { getService, services } from "../../../../lib/services";
import Container from "../../../../components/Container";

type Params = { id: string };
type Props = { params: Promise<Params> };

export function generateStaticParams() {
  return services.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const svc = getService(id);
  return {
    title: svc ? svc.name : "Service not found",
    description: svc?.summary ?? "Service detail",
  };
}

export default async function ServiceDetail({ params }: Props) {
  const { id } = await params;
  const svc = getService(id);
  if (!svc) return notFound();

  const currentIndex = services.findIndex((s) => s.id === id);
  const nextService = services[(currentIndex + 1) % services.length];

  return (
    <>
      {/* Hero */}
      <section className="pt-16 md:pt-24 pb-16 md:pb-20">
        <Container>
          <Link
            href="/services"
            className="link-underline text-xs uppercase tracking-widest text-graphite/50 mb-8 inline-block"
          >
            All services
          </Link>
          <h1 className="font-serif text-[2.75rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl editorial-heading mt-6">
            {svc.name}
          </h1>
        </Container>
      </section>

      {/* Content */}
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-6 md:col-start-1">
              <p className="text-graphite text-lg md:text-xl leading-relaxed">
                {svc.content}
              </p>
            </div>

            <div className="md:col-span-4 md:col-start-8">
              <p className="text-xs uppercase tracking-widest text-graphite/50 mb-6">
                Capabilities
              </p>
              <ul className="space-y-4 list-none m-0 p-0">
                {svc.capabilities.map((cap) => (
                  <li
                    key={cap}
                    className="text-charcoal text-sm border-b border-neutral-light pb-4"
                  >
                    {cap}
                  </li>
                ))}
              </ul>

              <div className="mt-12">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-narvaez-red text-ivory px-7 py-3.5 text-sm font-medium tracking-wide uppercase hover:bg-narvaez-red-hover transition-colors duration-300"
                >
                  Start a project
                </Link>
              </div>
            </div>
          </div>

          {/* Next Service */}
          <div className="mt-24 md:mt-32 pt-12 border-t border-neutral-light">
            <p className="text-xs uppercase tracking-widest text-graphite/50 mb-4">
              Next service
            </p>
            <Link
              href={`/services/${nextService.id}`}
              className="group inline-block"
            >
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl editorial-heading text-charcoal group-hover:text-narvaez-red transition-colors duration-300">
                {nextService.name}
              </h2>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
