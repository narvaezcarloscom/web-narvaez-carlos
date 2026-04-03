import type { MetadataRoute } from "next";
import { services } from "../lib/services";
import { projects } from "../lib/projects";
import { articles } from "../lib/journal";

const BASE_URL = "https://narvaezcarlos.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/journal`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    // Spanish
    { url: `${BASE_URL}/es`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/es/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/es/work`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/es/journal`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/es/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.flatMap((s) => [
    { url: `${BASE_URL}/services/${s.id}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/es/services/${s.id}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
  ]);

  const workPages: MetadataRoute.Sitemap = projects.flatMap((p) => [
    { url: `${BASE_URL}/work/${p.id}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/es/work/${p.id}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
  ]);

  const journalPages: MetadataRoute.Sitemap = articles.flatMap((a) => [
    { url: `${BASE_URL}/journal/${a.id}`, lastModified: a.date, changeFrequency: "yearly" as const, priority: 0.7 },
    { url: `${BASE_URL}/es/journal/${a.id}`, lastModified: a.date, changeFrequency: "yearly" as const, priority: 0.6 },
  ]);

  return [...staticPages, ...servicePages, ...workPages, ...journalPages];
}
