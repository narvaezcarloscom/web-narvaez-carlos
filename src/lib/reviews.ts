// Google Business Profile metadata + curated reviews.
// Source of truth for aggregateRating (5.0 / 23) and Review[] schema.
// Update this file when new verified reviews come in on the GMB profile.

export const gmbProfile = {
  name: "Narvaez Digital Marketing",
  // Canonical short URL — resolves to the same listing as the long maps URL.
  url: "https://maps.google.com/?cid=11170561863089871042",
  // Long-form URL kept as fallback; used only if short URL ever breaks.
  longUrl:
    "https://www.google.com/maps/place/Narvaez+Digital+Marketing/@-3.8104279,-92.32732,3z/data=!4m8!3m7!1s0x8fd544f694471877:0x9b05ced48eff58c2!8m2!3d-3.8104279!4d-92.32732!9m1!1b1!16s%2Fg%2F11w3p1m1yb",
  ratingValue: 5.0,
  reviewCount: 23,
  bestRating: 5,
  worstRating: 1,
} as const;

// Aggregate counts of mentions across all 23 reviews (visible as tags on GMB).
// Updated 2026-06-13 from the live profile filters.
export const reviewThemes = [
  { en: "Creative", es: "Creativo", count: 7 },
  { en: "Work", es: "Trabajo", count: 7 },
  { en: "Web", es: "Web", count: 4 },
  { en: "Company", es: "Compañía", count: 3 },
  { en: "Ideas", es: "Ideas", count: 2 },
  { en: "Price", es: "Precio", count: 2 },
  { en: "Logo", es: "Logo", count: 2 },
  { en: "Management", es: "Administración", count: 2 },
  { en: "Solutions", es: "Soluciones", count: 2 },
] as const;

// Service IDs from lib/services.ts. Kept loose (string[]) to avoid a circular import.
export type ServiceId =
  | "web-design"
  | "custom-apps-platforms"
  | "digital-advertising"
  | "content-social-media";

export type Review = {
  id: string;
  authorName: string;
  initials: string;
  authorContext?: string; // company or local-guide tag
  rating: 1 | 2 | 3 | 4 | 5;
  datePublished: string; // ISO date
  language: "en" | "es";
  body: string;
  bodyTruncated?: boolean; // true when Google's UI cut the source text
  reviewUrl: string; // link to the full review on Google
  // Services the review explicitly mentions or implicitly validates.
  // Order matters: the first match is the "primary" service for crossovers.
  relatedServices: ServiceId[];
};

export const reviews: Review[] = [
  {
    id: "manuel-angle-stone",
    authorName: "Manuel de Jesús",
    initials: "MJ",
    authorContext: "Angle Stone LLC",
    rating: 5,
    datePublished: "2026-02-13",
    language: "en",
    body: "Carlos was hired to help us create our business website, and from the very beginning, his focus and energy were dedicated to meeting our needs. Our expectations were far exceeded by Carlos's excellent work and creativity, and we will definitely hire him again in the future. Angle Stone LLC highly recommends him.",
    reviewUrl: gmbProfile.url,
    relatedServices: ["web-design"],
  },
  {
    id: "yuru-gil",
    authorName: "Yuru Gil",
    initials: "YG",
    authorContext: "Google Local Guide",
    rating: 5,
    datePublished: "2025-06-13",
    language: "en",
    body: "I recently called Carlos to create a new logo for my company. I was immediately impressed by their creativity and professionalism. He took the time to understand my brand and my target audience, and proposed several logo concepts that were visually appealing and relevant to my business. The final logo is exactly what I was looking for and has helped me create a strong and recognizable brand identity. I highly recommend Carlos to anyone looking for a talented and trustworthy graphic designer. Thank you so much, Carlos!!!",
    reviewUrl: gmbProfile.url,
    relatedServices: ["web-design"],
  },
  {
    id: "sara-gomez",
    authorName: "Sara Gómez",
    initials: "SG",
    rating: 5,
    datePublished: "2025-09-13",
    language: "es",
    body: "Definitivamente es súper profesional y dedicado a su trabajo. Lo recomiendo 100% para lograr los objetivos de marketing que se necesitan para emprendimientos, empresa, creación de contenido. En verdad 10/10.",
    reviewUrl: gmbProfile.url,
    relatedServices: ["content-social-media", "digital-advertising"],
  },
  {
    id: "alex-pinon",
    authorName: "Alex Pinon",
    initials: "AP",
    authorContext: "Google Local Guide",
    rating: 5,
    datePublished: "2025-06-13",
    language: "en",
    body: "Carlos has done two websites for my business companies and designed my logos for both. He has done a great job and a great price. Will definitely use him again when I need him.",
    reviewUrl: gmbProfile.url,
    relatedServices: ["web-design"],
  },
  {
    id: "eduardo-arangurena-gtr",
    authorName: "Eduardo Arangurén Nederr",
    initials: "EA",
    authorContext: "GTR",
    rating: 5,
    datePublished: "2025-06-13",
    language: "en",
    body: "Has been excellent working with Carlos, he haves a lot of knowledge in our field, great ideas were given and our webpage SEO Managment was a huge success. Totally recommend him and his staff. Very happy with our results at GTR.",
    reviewUrl: gmbProfile.url,
    relatedServices: ["digital-advertising", "web-design"],
  },
  {
    id: "angelica-guayllas",
    authorName: "Angélica Guayllas",
    initials: "AG",
    rating: 5,
    datePublished: "2025-06-13",
    language: "es",
    body: "Recientemente, contraté los servicios de Carlos Narvaez para la administración de mi pagina web, y no podría estar más satisfecha con el resultado. Desde el primer contacto, el equipo mostró un alto nivel de profesionalismo, creatividad y atención a los detalles. Recomendado!!!!!!",
    reviewUrl: gmbProfile.url,
    relatedServices: ["web-design", "content-social-media"],
  },
];

export function getReviewsByService(
  serviceId: ServiceId,
  limit?: number,
): Review[] {
  const matches = reviews.filter((r) => r.relatedServices.includes(serviceId));
  return typeof limit === "number" ? matches.slice(0, limit) : matches;
}
