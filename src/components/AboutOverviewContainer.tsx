/*
  AboutOverviewContainer.tsx — Server Component untuk fetch data video/case studies
  Fetch di server-side untuk bypass RLS anon yang belum diberi grant.
  Catatan: Jika RLS grants sudah dijalankan di Supabase, maka file ini tidak diperlukan.
*/

import { createClient } from "@/lib/supabase/server";
import AboutOverview from "./AboutOverview";

async function fetchCaseStudies() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("case_studies")
    .select("id, title, client, challenge, solution, result, image_url")
    .order("sort_order");
  return data || [];
}

async function fetchVideos() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("case_videos")
    .select("id, title, video_url, sort_order")
    .eq("is_active", true)
    .order("sort_order");
  return data || [];
}

export default async function AboutOverviewContainer() {
  const [caseStudies, videos] = await Promise.all([
    fetchCaseStudies(),
    fetchVideos()
  ]);

  return (
    <AboutOverview 
      caseStudies={caseStudies} 
      videos={videos} 
    />
  );
}