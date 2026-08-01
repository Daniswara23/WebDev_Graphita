import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const BASE_URL = "https://grahitas.co.id";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Halaman statis
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/insights`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/toko`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/dokumentasi`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  // Konten dinamis dari Supabase
  const supabase = await createClient();

  // Articles (publikasi)
  const { data: articles } = await supabase
    .from("articles")
    .select("id, slug, updated_at, published_at")
    .eq("is_published", true);

  const articlePages: MetadataRoute.Sitemap = (articles ?? []).map((article) => ({
    url: `${BASE_URL}/insights/publikasi/${article.slug || article.id}`,
    lastModified: new Date(article.updated_at || article.published_at || Date.now()),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Research reports (riset)
  const { data: researchReports } = await supabase
    .from("research_reports")
    .select("id, title, year, created_at")
    .eq("is_published", true);

  const researchPages: MetadataRoute.Sitemap = (researchReports ?? []).map((report) => ({
    url: `${BASE_URL}/insights/riset/${report.id}`,
    lastModified: new Date(report.created_at || Date.now()),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  // Photo galleries (dokumentasi)
  const { data: galleries } = await supabase
    .from("photo_galleries")
    .select("id, event_date, created_at")
    .eq("is_published", true);

  const galleryPages: MetadataRoute.Sitemap = (galleries ?? []).map((gallery) => ({
    url: `${BASE_URL}/dokumentasi/${gallery.id}`,
    lastModified: new Date(gallery.created_at || Date.now()),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticPages, ...articlePages, ...researchPages, ...galleryPages];
}