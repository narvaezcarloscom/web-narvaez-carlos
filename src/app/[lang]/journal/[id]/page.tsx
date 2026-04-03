import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticle, articles } from "../../../../lib/journal";
import Container from "../../../../components/Container";

type Params = { id: string };
type Props = { params: Promise<Params> };

export function generateStaticParams() {
  return articles.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const article = getArticle(id);
  return {
    title: article ? article.title : "Article not found",
    description: article?.subtitle ?? "Journal article",
  };
}

export default async function ArticleDetail({ params }: Props) {
  const { id } = await params;
  const article = getArticle(id);
  if (!article) return notFound();

  const currentIndex = articles.findIndex((a) => a.id === id);
  const nextArticle = articles[(currentIndex + 1) % articles.length];

  return (
    <>
      {/* Hero */}
      <section className="pt-16 md:pt-24 pb-16 md:pb-20">
        <Container>
          <Link
            href="/journal"
            className="link-underline text-xs uppercase tracking-widest text-graphite/50 mb-8 inline-block"
          >
            Journal
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-6">
            <div className="md:col-span-8">
              <h1 className="font-serif text-[2.75rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl editorial-heading">
                {article.title}
              </h1>
              <p className="mt-6 text-graphite text-lg md:text-xl max-w-2xl leading-relaxed">
                {article.subtitle}
              </p>
            </div>

            <div className="md:col-span-3 md:col-start-10 flex flex-col gap-6 md:justify-end">
              <div>
                <p className="text-xs uppercase tracking-widest text-graphite/50 mb-2">
                  Published
                </p>
                <p className="text-charcoal">
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-graphite/50 mb-2">
                  Reading time
                </p>
                <p className="text-charcoal">{article.readTime}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Article Body */}
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-7 md:col-start-1">
              <div className="border-t border-neutral-light pt-12 space-y-12 md:space-y-16">
                {article.body.map((block, i) => (
                  <div key={i}>
                    {block.heading && (
                      <h2 className="font-serif text-2xl md:text-3xl editorial-heading leading-[1.15] mb-5">
                        {block.heading}
                      </h2>
                    )}
                    <p className="text-graphite text-base md:text-lg leading-[1.8]">
                      {block.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Podcast Embed */}
              {article.spotifyEpisodeId && (
                <div className="mt-16 md:mt-20 pt-12 border-t border-neutral-light">
                  <p className="text-xs uppercase tracking-widest text-graphite/50 mb-6">
                    Listen to this article
                  </p>
                  <iframe
                    src={`https://open.spotify.com/embed/episode/${article.spotifyEpisodeId}?utm_source=generator&theme=0`}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-xl"
                  />
                </div>
              )}

              {/* CTA */}
              <div className="mt-16 md:mt-20 pt-12 border-t border-neutral-light">
                <p className="text-graphite text-base mb-6">
                  Have a project that needs this kind of thinking?
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-narvaez-red text-ivory px-7 py-3.5 text-sm font-medium tracking-wide uppercase hover:bg-narvaez-red-hover transition-colors duration-300"
                >
                  Start a conversation
                </Link>
              </div>
            </div>
          </div>

          {/* Next Article */}
          <div className="mt-24 md:mt-32 pt-12 border-t border-neutral-light">
            <p className="text-xs uppercase tracking-widest text-graphite/50 mb-4">
              Next article
            </p>
            <Link
              href={`/journal/${nextArticle.id}`}
              className="group inline-block"
            >
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl editorial-heading text-charcoal group-hover:text-narvaez-red transition-colors duration-300">
                {nextArticle.title}
              </h2>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
