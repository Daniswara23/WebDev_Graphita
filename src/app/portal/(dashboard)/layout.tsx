/*
  portal/(dashboard)/layout.tsx — Layout untuk halaman dashboard portal.
  Auth guard sudah di-handle oleh portal/layout.tsx.
  Layout ini menyediakan Sidebar + idle timeout.
*/

import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/app/portal/Sidebar";
import IdleTimeout from "@/components/IdleTimeout";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Ambil nama admin untuk sidebar (user pasti sudah terautentikasi dari parent layout)
  let adminName = "Admin";
  if (user) {
    const { data: admin } = await supabase
      .from("admin_users")
      .select("full_name")
      .eq("email", user.email)
      .maybeSingle();
    if (admin) {
      adminName = admin.full_name;
    }
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-primary)" }}>
      <Sidebar adminName={adminName} />
      <main style={{ flex: 1, marginLeft: "260px", padding: "32px 40px", overflow: "auto" }}>
        {children}
      </main>
      <IdleTimeout />
    </div>
  );
}
