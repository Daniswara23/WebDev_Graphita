/*
  portal/layout.tsx — Root layout untuk semua halaman /portal/*.
  Layout minimal tanpa auth guard.
  Auth guard + sidebar ada di (dashboard)/layout.tsx.
*/

export default function PortalRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}