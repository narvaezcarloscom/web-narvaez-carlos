import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, projects } from "../../../../lib/projects";
import Container from "../../../../components/Container";
import ParallaxImage from "../../../../components/animations/ParallaxImage";

type Params = { id: string };
type Props = { params: Promise<Params> };

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const project = getProject(id);
  return {
    title: project ? project.name : "Project not found",
    description: project?.tagline ?? "Project detail",
  };
}

export default async function ProjectDetail({ params }: Props) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) return notFound();

  const currentIndex = projects.findIndex((p) => p.id === id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      {/* Hero */}
      <section className="pt-16 md:pt-24 pb-16 md:pb-20">
        <Container>
          <Link
            href="/work"
            className="link-underline text-xs uppercase tracking-widest text-graphite/50 mb-8 inline-block"
          >
            All projects
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-6">
            <div className="md:col-span-8">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl editorial-heading">
                {project.name}
              </h1>
              <p className="mt-6 text-graphite text-lg md:text-xl max-w-2xl">
                {project.tagline}
              </p>
            </div>

            {/* Meta */}
            <div className="md:col-span-3 md:col-start-10 flex flex-col gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-graphite/50 mb-2">
                  Year
                </p>
                <p className="text-charcoal">{project.year}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-graphite/50 mb-2">
                  Category
                </p>
                <p className="text-charcoal">{project.category}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-graphite/50 mb-2">
                  Services
                </p>
                <p className="text-charcoal">{project.services.join(", ")}</p>
              </div>
              {project.url !== "#" && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-graphite/50 mb-2">
                    Live site
                  </p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-charcoal hover:text-narvaez-red transition-colors"
                  >
                    Visit website
                  </a>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Image */}
      {project.image && (
        <section className="pb-16 md:pb-24">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-7">
                <ParallaxImage
                  src={project.image}
                  alt={`${project.name} — website screenshot`}
                  className="aspect-[4/3] w-full bg-neutral-light"
                  speed={0.08}
                  priority
                />
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Case Study Content */}
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-20">
            {/* Main Content */}
            <div className="md:col-span-7 space-y-16 md:space-y-20">
              {/* Overview */}
              <div>
                <p className="text-xs uppercase tracking-widest text-graphite/50 mb-4">
                  Overview
                </p>
                <p className="text-graphite text-lg md:text-xl leading-relaxed">
                  {project.overview}
                </p>
              </div>

              {/* Challenge */}
              <div>
                <p className="text-xs uppercase tracking-widest text-graphite/50 mb-4">
                  The challenge
                </p>
                <p className="text-graphite text-lg md:text-xl leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              {/* Solution */}
              <div>
                <p className="text-xs uppercase tracking-widest text-graphite/50 mb-4">
                  The solution
                </p>
                <p className="text-graphite text-lg md:text-xl leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Results Sidebar */}
            <div className="md:col-span-4 md:col-start-9">
              <div className="md:sticky md:top-28">
                <p className="text-xs uppercase tracking-widest text-graphite/50 mb-6">
                  Results
                </p>
                <ul className="space-y-0 list-none m-0 p-0">
                  {project.results.map((result, i) => (
                    <li
                      key={i}
                      className="border-b border-neutral-light py-4 text-charcoal text-sm flex items-start gap-4"
                    >
                      <span className="text-narvaez-red text-xs mt-0.5 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {result}
                    </li>
                  ))}
                </ul>

                <div className="mt-12">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-narvaez-red text-ivory px-7 py-3.5 text-sm font-medium tracking-wide uppercase hover:bg-narvaez-red-hover transition-colors duration-300"
                  >
                    Start your project
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Next Project */}
          <div className="mt-24 md:mt-32 pt-12 border-t border-neutral-light">
            <p className="text-xs uppercase tracking-widest text-graphite/50 mb-4">
              Next project
            </p>
            <Link
              href={`/work/${nextProject.id}`}
              className="group inline-block"
            >
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl editorial-heading text-charcoal group-hover:text-narvaez-red transition-colors duration-300">
                {nextProject.name}
              </h2>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
