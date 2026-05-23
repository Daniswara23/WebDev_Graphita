/*
  Sidebar.tsx — Sidebar navigasi portal admin (Client Component).
*/

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/portal/login/actions";
import styles from "./Sidebar.module.css";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/portal/dashboard", icon: "◉" },
  { label: "Publikasi", href: "/portal/publikasi", icon: "📄" },
  { label: "Riset", href: "/portal/riset", icon: "📊" },
  { label: "Toko", href: "/portal/toko", icon: "🏪" },
  { label: "Pesan", href: "/portal/pesan", icon: "✉" },
];

export default function Sidebar({ adminName }: { adminName: string }) {
  const pathname = usePathname();

  return (
    <aside className={styles.aside}>
      {/* Logo */}
      <div className={styles.logo}>
        <Link href="/portal/dashboard" className={styles.logoLink}>
          Grahita <span style={{ color: "var(--white)" }}>Admin</span>
        </Link>
      </div>

      {/* Admin name */}
      <div className={styles.adminName}>
        {adminName}
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className={styles.footer}>
        <form action={logoutAction}>
          <button type="submit" className={styles.logoutBtn}>
            Keluar
          </button>
        </form>
      </div>
    </aside>
  );
}