import type { Metadata } from "next";
import Container from "../../../components/Container";
import ContactForm from "../../../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Narvaez Digital Marketing. Free consultation for service-based businesses.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-16 md:pt-24 pb-16 md:pb-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <p className="text-xs uppercase tracking-widest text-graphite/50 mb-4">
                Contact
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl editorial-heading">
                Let&apos;s start a
                <br />
                <span className="italic">conversation.</span>
              </h1>
            </div>
            <div className="md:col-span-4 md:col-start-9 flex items-end">
              <p className="text-graphite text-base md:text-lg leading-relaxed">
                Tell us about your project. We&apos;ll get back to you within 24
                hours to schedule a free consultation.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Form + Info */}
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
            {/* Form */}
            <div className="md:col-span-7">
              <ContactForm />
            </div>

            {/* Info Sidebar */}
            <div className="md:col-span-4 md:col-start-9">
              <div className="space-y-10">
                <div>
                  <p className="text-xs uppercase tracking-widest text-graphite/50 mb-3">
                    Email
                  </p>
                  <a
                    href="mailto:hello@narvaezcarlos.com"
                    className="link-underline text-charcoal text-lg hover:text-narvaez-red transition-colors"
                  >
                    hello@narvaezcarlos.com
                  </a>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-graphite/50 mb-3">
                    Location
                  </p>
                  <p className="text-charcoal text-lg">Seattle, WA</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-graphite/50 mb-3">
                    Connect
                  </p>
                  <ul className="space-y-3 list-none m-0 p-0">
                    {[
                      { label: "Instagram", href: "https://instagram.com/narvaezcarloscom/" },
                      { label: "YouTube", href: "https://youtube.com/@narvaezcarloscom" },
                      { label: "GitHub", href: "https://github.com/narvaezcarloscom" },
                      { label: "LinkedIn", href: "https://linkedin.com/in/narvaezcarlos" },
                    ].map((l) => (
                      <li key={l.href}>
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline text-charcoal hover:text-narvaez-red transition-colors"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-graphite/50 mb-3">
                    Availability
                  </p>
                  <p className="text-charcoal">Mon — Fri, 9am — 6pm PST</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
