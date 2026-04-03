export const services = [
  {
    id: "web-design",
    name: "Web Design & Development",
    summary: "Custom websites built for performance, clarity, and conversion.",
    content:
      "We design and develop websites that look refined and perform at the highest level. Every site is custom-built with clean code, responsive layouts, and strategic structure — tailored specifically for service-based businesses that need to convert visitors into customers.",
    capabilities: [
      "Responsive website design",
      "Landing pages",
      "Website redesigns",
      "Speed & Core Web Vitals optimization",
      "SEO-ready structure & search visibility",
    ],
  },
  {
    id: "custom-apps-platforms",
    name: "Custom Apps & Platforms",
    summary:
      "Tailored digital tools that streamline your operations and grow your revenue.",
    content:
      "We build complete digital platforms that go beyond a website — from e-commerce storefronts with online ordering and loyalty programs to internal systems that automate complex workflows. Every platform is designed around your business logic, your customers, and your growth goals.",
    capabilities: [
      "E-commerce & online ordering (pickup & delivery)",
      "Mobile apps with loyalty & rewards programs",
      "Business dashboards & inventory management",
      "Custom internal systems & workflow automation",
    ],
  },
  {
    id: "digital-advertising",
    name: "Digital Advertising",
    summary: "Targeted campaigns that turn budget into booked jobs.",
    content:
      "We plan, launch, and optimize paid campaigns across Google and social platforms. Every dollar is tracked, every result is measured. Our approach focuses on generating qualified leads for service businesses — not just impressions.",
    capabilities: [
      "Google Ads (Search & Local Services)",
      "Meta Ads (Facebook & Instagram)",
      "Campaign strategy & management",
      "Conversion tracking & reporting",
    ],
  },
  {
    id: "content-social-media",
    name: "Content & Social Media",
    summary: "Strategic content that builds trust and keeps your brand visible.",
    content:
      "We create and manage content systems that keep your brand consistent and visible. From social media to email marketing, every piece of content is designed with purpose — to build authority, engage your audience, and support your business goals.",
    capabilities: [
      "Social media management",
      "Email marketing",
      "Blog & website content",
      "Brand photography & video direction",
    ],
  },
];

export function getService(id: string) {
  return services.find((s) => s.id === id);
}
