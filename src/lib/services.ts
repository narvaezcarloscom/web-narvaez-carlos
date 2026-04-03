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
    ],
  },
  {
    id: "seo",
    name: "SEO",
    summary: "Get found by the customers already searching for what you do.",
    content:
      "We build SEO strategies grounded in data and focused on sustainable growth. From technical audits to local optimization, we make sure your business shows up when and where it matters — in your city, in your industry, in front of your ideal customer.",
    capabilities: [
      "Local SEO & Google Business Profile",
      "On-page & technical SEO",
      "Keyword strategy",
      "Analytics & conversion tracking",
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
