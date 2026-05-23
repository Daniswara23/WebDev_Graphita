/*
  portal/(dashboard)/layout.tsx — Layout untuk halaman portal yang butuh auth + sidebar.
*/

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/app/portal/Sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/portal/login");

  // Cek admin
  const { data: admin } = await supabase
    .from("admin_users")
    .select("full_name")
    .eq("email", user.email)
    .maybeSingle();

  if (!admin) {
    await supabase.auth.signOut();
    redirect("/portal/login");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--navy-dark)" }}>
      <Sidebar adminName={admin.full_name} />
      <main style={{ flex: 1, marginLeft: "260px", padding: "32px 40px", overflow: "auto" }}>
        {children}
      </main>
    </div>
  );
}