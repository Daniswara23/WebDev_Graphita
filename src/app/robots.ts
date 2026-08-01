import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/portal", "/api/portal"],
      },
    ],
    sitemap: "https://grahitas.co.id/sitemap.xml",
  };
}