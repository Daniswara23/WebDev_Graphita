/*
  insights/page.tsx — Halaman /insights (server component)
  Data diambil langsung dari Supabase.
  Tampilan tidak berubah — hanya cara data di-fetch yang berubah (server-side).
*/

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";
import InsightsClient from "./insights-client";
import type { Article, ResearchReport } from "./types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insight & Riset",
  description:
    "Ruang berbagi pengetahuan PT Grahita Adhi Sasmita — artikel, publikasi ilmiah, dan laporan riset mengenai keberlanjutan, ESG, pemberdayaan komunitas, dan pembangunan berkelanjutan.",
  alternates: {
    canonical: "https://grahitas.co.id/insights",
  },
  openGraph: {
    title: "Insight & Riset | PT Grahita Adhi Sasmita",
    description:
      "Artikel, publikasi ilmiah, dan laporan riset mengenai keberlanjutan, ESG, dan pembangunan berkelanjutan.",
    url: "https://grahitas.co.id/insights",
  },
};

export default async function InsightsPage() {
  const supabase = await createClient();

  const [{ data: articles }, { data: reports }] = await Promise.all([
    supabase
      .from("articles")
      .select("id, title, excerpt, category, published_at, file_url, external_url")
      .eq("is_published", true)
      .order("sort_order"),
    supabase
      .from("research_reports")
      .select("id, title, subtitle, year, category, file_url")
      .order("sort_order"),
  ]);

  return (
    <>
      <Navbar />
      <InsightsClient
        articles={(articles ?? []) as Article[]}
        reports={(reports ?? []) as ResearchReport[]}
      />
      <Footer />
    </>
  );
}