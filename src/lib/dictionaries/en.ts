const en = {
  nav: {
    services: "Services",
    work: "Work",
    journal: "Journal",
    contact: "Contact",
  },
  hero: {
    label: "Boutique Digital Studio — Seattle, WA",
    labelWords: ["Boutique", "Digital", "Studio"],
    heading: ["We build brands", "that communicate", "with clarity."],
    body: "We help service businesses look as good as the work they do — through strategy, design, and technology that actually converts.",
    cta: "Start a project",
    ctaSecondary: "View our work",
    scroll: "Scroll",
  },
  services: {
    label: "What we do",
    heading: "Services",
    description:
      "We combine strategy, design, and technology to help service-based businesses build strong digital foundations — brands that communicate clearly, convert effectively, and grow sustainably.",
    learnMore: "Learn more",
    pageHeading: ["Strategy, design,", "and technology —", "working together."],
    pageDescription:
      "We help service-based businesses build strong digital foundations through focused, intentional work across four core disciplines.",
    capabilities: "Capabilities",
    allServices: "All services",
    nextService: "Next service",
  },
  work: {
    label: "Selected work",
    heading: "Recent projects",
    viewAll: "View all projects",
    pageHeading: ["Projects built", "with intention."],
    pageDescription:
      "Every project starts with a clear objective and ends with a measurable result. Here's a selection of our recent work for service-based businesses.",
    allProjects: "All projects",
    nextProject: "Next project",
    year: "Year",
    category: "Category",
    servicesLabel: "Services",
    liveSite: "Live site",
    visitWebsite: "Visit website",
    overview: "Overview",
    challenge: "The challenge",
    solution: "The solution",
    results: "Results",
  },
  about: {
    label: "About the studio",
    heading: [
      "Good branding is not decoration.",
      "It is structure, clarity,",
      "and intention.",
    ],
    body1:
      "Narvaez Digital Marketing is a boutique digital studio focused on helping service-based businesses build strong digital foundations.",
    body2:
      "Our work combines strategy, design, and technology to create brands and digital experiences that communicate clearly, convert effectively, and grow sustainably.",
    values: ["Clarity", "Structure", "Elegance", "Strategy"],
  },
  journal: {
    label: "Journal",
    heading: ["Thinking out", "loud."],
    description:
      "Perspectives on branding, strategy, and the decisions that shape how businesses show up online.",
    listen: "Listen to this article",
    published: "Published",
    readingTime: "Reading time",
    nextArticle: "Next article",
    ctaText: "Have a project that needs this kind of thinking?",
    ctaButton: "Start a conversation",
  },
  contact: {
    label: "Contact",
    heading: ["Let's start a", "conversation."],
    description:
      "Tell us about your project. We'll get back to you within 24 hours to schedule a free consultation.",
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "your@email.com",
    company: "Company",
    companyPlaceholder: "Your company",
    service: "Service",
    servicePlaceholder: "Select a service",
    message: "Message",
    messagePlaceholder: "Tell us about your project...",
    submit: "Send message",
    thankYou: "Thank you.",
    thankYouBody:
      "We received your message and will be in touch within 24 hours.",
    sendAnother: "Send another message",
    emailLabel: "Email",
    location: "Location",
    connect: "Connect",
    availability: "Availability",
    hours: "Mon — Fri, 9am — 6pm PST",
  },
  footer: {
    heading: "Let's build something",
    headingItalic: "together.",
    cta: "Start a project",
    brand: "Narvaez Digital Marketing",
    studio: "Boutique digital studio",
    location: "Seattle, WA",
    navigation: "Navigation",
    connect: "Connect",
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
  },
  common: {
    startProject: "Start a project",
    startYourProject: "Start your project",
    studioLocation: "Seattle, WA — Boutique Digital Studio",
  },
} as const;

type DeepMutable<T> = {
  -readonly [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends readonly (infer U)[]
      ? U extends string ? string[] : DeepMutable<U>[]
      : T[K] extends object
        ? DeepMutable<T[K]>
        : T[K];
};

export type Dictionary = DeepMutable<typeof en>;
export default en as unknown as Dictionary;
