/*
  portal/dashboard/page.tsx — Dashboard ringkasan portal admin.
*/

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import styles from "./dashboard.module.css";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [articlesCount, reportsCount, productsCount, messagesCount] = await Promise.all([
    supabase.from("articles").select("id", { count: "exact", head: true }),
    supabase.from("research_reports").select("id", { count: "exact", head: true }),
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
  ]);

  const cards = [
    { label: "Artikel Publikasi", count: articlesCount.count ?? 0, href: "/portal/publikasi", color: "#52b788" },
    { label: "Laporan Riset", count: reportsCount.count ?? 0, href: "/portal/riset", color: "#fbbf24" },
    { label: "Produk Toko", count: productsCount.count ?? 0, href: "/portal/toko", color: "#60a5fa" },
    { label: "Pesan Masuk", count: messagesCount.count ?? 0, href: "/portal/pesan", color: "#f472b6" },
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
            key={card.href}
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
            { label: "+ Laporan Riset Baru", href: "/portal/riset/create" },
            { label: "+ Produk Baru", href: "/portal/toko/create" },
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