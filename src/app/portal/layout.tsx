/*
  portal/layout.tsx — Root layout untuk semua halaman /portal/*.
  Auth guard sudah di-handle oleh src/proxy.ts.
  Layout ini hanya sebagai wrapper minimal.
*/

export default function PortalRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}