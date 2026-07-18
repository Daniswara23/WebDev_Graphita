/*
  portal/(dashboard)/social-links/constants.ts — Konstanta untuk social links
*/

export const PLATFORM_OPTIONS = [
  { value: "linkedin", label: "LinkedIn", icon: "/images/LinkedIn-logo.png" },
  { value: "instagram", label: "Instagram", icon: "/images/Instagram-icon.png" },
  { value: "twitter", label: "X (Twitter)", icon: "/images/X-logo.png" },
  { value: "facebook", label: "Facebook", icon: "/images/Facebook-Logo.png" },
] as const;

export type PlatformType = (typeof PLATFORM_OPTIONS)[number]["value"];