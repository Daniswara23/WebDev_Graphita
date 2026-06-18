"use client";

"use client";

import { useEffect, useState } from "react";

export default function ContactClient({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }} />
    );
  }

  return <>{children}</>;
}