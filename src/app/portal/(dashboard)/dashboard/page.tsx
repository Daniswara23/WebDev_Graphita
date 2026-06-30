/*
  portal/dashboard/page.tsx — Dashboard ringkasan portal admin.
*/

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import styles from "./dashboard.module.css";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [articlesRes, reportsRes, productsRes, messagesRes, testimonialsRes, galleriesRes, partnersRes, caseStudiesRes] = await Promise.all([
    supabase.from("articles").select("id", { count: "exact", head: true }),
    supabase.from("research_reports").select("id", { count: "exact", head: true }),
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
    supabase.from("testimonials").select("id", { count: "exact", head: true }),
    supabase.from("photo_galleries").select("id", { count: "exact", head: true }),
    supabase.from("ecosystem_partners").select("id", { count: "exact", head: true }),
    supabase.from("ecosystem_case_studies").select("id", { count: "exact", head: true }),
  ]);

  const cards = [
    { label: "Artikel Publikasi",       count: articlesRes.count       ?? 0, href: "/portal/publikasi",      color: "#52b788" },
    { label: "Dokumentasi",             count: galleriesRes.count       ?? 0, href: "/portal/dokumentasi",    color: "#f97316" },
    { label: "Ecosystem Case Studies",  count: caseStudiesRes.count     ?? 0, href: "/portal/ekosistem",      color: "#34d399" },
    { label: "Ecosystem Partners",      count: partnersRes.count        ?? 0, href: "/portal/ekosistem",      color: "#2dd4bf" },
    { label: "Feedback",                count: testimonialsRes.count    ?? 0, href: "/portal/testimoni",      color: "#a78bfa" },
    { label: "Laporan Riset",           count: reportsRes.count         ?? 0, href: "/portal/riset",          color: "#fbbf24" },
    { label: "Pesan Masuk",             count: messagesRes.count        ?? 0, href: "/portal/pesan",          color: "#f472b6" },
    { label: "Produk Toko",             count: productsRes.count        ?? 0, href: "/portal/toko",           color: "#60a5fa" },
  ];

  return (
    <div>
      <h1 className={styles.dashboardTitle}>Dashboard</h1>
      <p className={styles.dashboardSubtitle}>
        Ringkasan konten website Grahita Adhi Sasmita.
      </p>

      <div className={styles.cardGrid}>
        {cards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className={styles.cardLink}
            >
            <div className={styles.cardNumber} style={{ color: card.color }}>
              {card.count}
            </div>
            <div className={styles.cardLabel}>
              {card.label}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className={styles.quickActionsSection}>
        <h2 className={styles.quickActionsTitle}>Aksi Cepat</h2>
        <div className={styles.quickActionsGrid}>
          {[
            { label: "+ Artikel Baru", href: "/portal/publikasi/create" },
            { label: "+ Case Study Baru", href: "/portal/ekosistem/case-studies/create" },
            { label: "+ Dokumentasi Baru", href: "/portal/dokumentasi/create" },
            { label: "+ Feedback Baru", href: "/portal/testimoni/create" },
            { label: "+ Laporan Riset Baru", href: "/portal/riset/create" },
            { label: "+ Partner Baru", href: "/portal/ekosistem/partners/create" },
            { label: "+ Produk Baru", href: "/portal/toko/create" },
            { label: "+ Video Baru", href: "/portal/case-videos/create" },
            { label: "Lihat Pesan", href: "/portal/pesan" },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={styles.actionLink}
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}