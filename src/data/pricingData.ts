export type PricingMode = "fixed" | "subscription";
export type ServiceCategory = "web" | "mobile";

export interface ScopeOption {
  id: string;
  label: string;
  subtitle: string;
}

export interface TierPackage {
  name: string;
  badge?: string;
  isPopular?: boolean;
  type: string;
  price: number | string;
  tagline: string;
  features: string[];
  ctaText: string;
}

export interface SelectedPlanPayload {
  category: ServiceCategory;
  mode: PricingMode;
  tierName: string;
  scope?: string;
  price?: number | string;
  summary: string;
}

// Web Scopes & Prices
export const WEB_SCOPES: ScopeOption[] = [
  { id: "1-4", label: "1–4 Pages", subtitle: "Landing page & microsites" },
  { id: "5-9", label: "5–9 Pages", subtitle: "Standard business / SaaS sites" },
  { id: "10-15", label: "10–15 Pages", subtitle: "High-growth product platforms" },
  { id: "16-25", label: "16–25 Pages", subtitle: "Complex multi-page portals" },
  { id: "enterprise", label: "Enterprise", subtitle: "Custom scalable architecture" }
];

export const WEB_PRICING_TABLE: Record<string, { launch: number | string; growth: number | string; signature: number | string }> = {
  "1-4": { launch: 299, growth: 599, signature: 899 },
  "5-9": { launch: 499, growth: 999, signature: 1499 },
  "10-15": { launch: 799, growth: 1499, signature: 2199 },
  "16-25": { launch: 1199, growth: 2199, signature: 2999 },
  "enterprise": { launch: "Custom", growth: "Custom", signature: "Custom" }
};

// Mobile Scopes & Prices
export const MOBILE_SCOPES: ScopeOption[] = [
  { id: "1-10", label: "1–10 Screens", subtitle: "MVP & core user journey" },
  { id: "11-25", label: "11–25 Screens", subtitle: "Standard feature-rich app" },
  { id: "26-40", label: "26–40 Screens", subtitle: "Multi-role / SaaS mobile app" },
  { id: "41-60", label: "41–60 Screens", subtitle: "Full-scale enterprise app" },
  { id: "enterprise", label: "Enterprise", subtitle: "Multi-platform ecosystem" }
];

export const MOBILE_PRICING_TABLE: Record<string, { launch: number | string; growth: number | string; signature: number | string }> = {
  "1-10": { launch: 349, growth: 699, signature: 1099 },
  "11-25": { launch: 649, growth: 1199, signature: 1799 },
  "26-40": { launch: 999, growth: 1799, signature: 2599 },
  "41-60": { launch: 1499, growth: 2599, signature: 3699 },
  "enterprise": { launch: "Custom", growth: "Custom", signature: "Custom" }
};

// Monthly Subscriptions
export const WEB_SUBSCRIPTIONS = [
  {
    name: "Startup Sprint",
    hours: "80 Hours / month",
    rate: "699",
    badge: "Part-Time Pod",
    tagline: "Ideal for continuous website iterations, Framer/Webflow pages, and conversion experiments.",
    features: [
      "80 dedicated hours per month",
      "Figma UI/UX & Webflow / Framer build",
      "Unlimited requests in queue (1 active)",
      "Dedicated Project Manager",
      "48-hour average turnaround",
      "Slack / Discord + async Loom walkthroughs",
      "Unused hours rollover protection"
    ],
    ctaText: "Start Web Sprint"
  },
  {
    name: "Growth Engine",
    hours: "160 Hours / month",
    rate: "1,299",
    badge: "Most Popular · Full-Time",
    isPopular: true,
    tagline: "Full-time equivalent output for scaling brands requiring parallel design & development streams.",
    features: [
      "160 dedicated hours per month",
      "Full design team: Senior UI/UX + Webflow Dev",
      "Parallel task streams in active progress",
      "Weekly live strategy & roadmap syncs",
      "Design System governance & token sync",
      "Priority 24-48 hour turnaround on core tasks",
      "Quarterly technical SEO & CRO audits"
    ],
    ctaText: "Get Full-Time Team"
  }
];

export const MOBILE_SUBSCRIPTIONS = [
  {
    name: "App Sprint",
    hours: "80 Hours / month",
    rate: "799",
    badge: "Part-Time Pod",
    tagline: "Dedicated product designer for ongoing iOS/Android screen design, flows, and design systems.",
    features: [
      "80 dedicated hours of mobile product design",
      "iOS Human Interface & Material 3 guidelines",
      "Clickable interactive Figma prototypes",
      "Design tokens & developer handoff specs",
      "App Store & Google Play screenshots",
      "Direct Slack channel with senior mobile lead",
      "Unused hours rollover (30 days)"
    ],
    ctaText: "Start Mobile Sprint"
  },
  {
    name: "Product Powerhouse",
    hours: "160 Hours / month",
    rate: "1,499",
    badge: "Most Popular · Full Squad",
    isPopular: true,
    tagline: "Dedicated end-to-end mobile squad tackling UX research, UI design, animations, and frontend support.",
    features: [
      "160 dedicated hours of senior mobile output",
      "UI/UX Lead + Mobile Animation / Lottie designer",
      "Parallel flow iterations & micro-interactions",
      "React Native / Flutter frontend handoff guidance",
      "Weekly sprint planning & backlog reviews",
      "Same-day Slack response & live video syncs",
      "Quarterly UX usability benchmark reports"
    ],
    ctaText: "Hire Mobile Squad"
  }
];

// Helper to resolve fixed price
export function getFixedPrice(category: ServiceCategory, scopeId: string, tierName: string): string {
  const table = category === "web" ? WEB_PRICING_TABLE : MOBILE_PRICING_TABLE;
  const scopeData = table[scopeId];
  if (!scopeData) return "Custom";

  let val: string | number = "Custom";
  if (tierName.toLowerCase().includes("launch")) {
    val = scopeData.launch;
  } else if (tierName.toLowerCase().includes("growth")) {
    val = scopeData.growth;
  } else if (tierName.toLowerCase().includes("signature")) {
    val = scopeData.signature;
  }

  if (typeof val === "number") {
    return `$${val.toLocaleString()}`;
  }
  return String(val);
}
