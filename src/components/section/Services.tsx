"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Smartphone, 
  ShoppingCart, 
  Users, 
  Palette, 
  Server, 
  Bot, 
  Cpu, 
  TrendingUp, 
  CreditCard, 
  Monitor, 
  ShieldCheck, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

interface ServiceItem {
  id: string;
  categories: ("web" | "mobile" | "ecommerce-crm" | "cloud-ai")[];
  badge: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

const SERVICES: ServiceItem[] = [
  {
    id: "web-saas",
    categories: ["web"],
    badge: "Web & SaaS",
    title: "Websites & SaaS Platforms",
    description: "From high-converting landing pages to complex multi-tenant SaaS platforms. We architect blazing-fast, responsive web applications on Next.js, React, and modern full-stack tech.",
    icon: <Globe className="w-6 h-6 text-secondary" />,
    tags: ["Next.js / React", "Full-Stack SaaS", "SEO Optimized"]
  },
  {
    id: "mobile-apps",
    categories: ["mobile"],
    badge: "Mobile Apps",
    title: "Mobile Apps (iOS & Android)",
    description: "Native and cross-platform mobile apps engineered on Flutter & React Native. Smooth animations, offline support, push notifications, and App Store & Google Play readiness.",
    icon: <Smartphone className="w-6 h-6 text-secondary" />,
    tags: ["iOS & Android", "Flutter / React Native", "Offline First"]
  },
  {
    id: "ecommerce",
    categories: ["web", "mobile", "ecommerce-crm"],
    badge: "Web & Mobile Store",
    title: "E-Commerce & Mobile Shopping Apps",
    description: "High-converting online storefronts and native iOS & Android shopping apps. We build on Shopify, WooCommerce, or headless Next.js Commerce with 1-click checkout, push notifications, and Apple Pay.",
    icon: <ShoppingCart className="w-6 h-6 text-secondary" />,
    tags: ["Mobile Shopping Apps", "Shopify / Headless", "Apple & Google Pay", "Push Alerts"]
  },
  {
    id: "crm-erp",
    categories: ["web", "mobile", "ecommerce-crm"],
    badge: "CRM & Enterprise",
    title: "Custom CRM & Enterprise Portals",
    description: "Tailor-made CRM, ERP, and customer portals available on web and mobile. Centralize lead pipelines, automate employee workflows, and track real-time analytics with role-based permissions.",
    icon: <Users className="w-6 h-6 text-secondary" />,
    tags: ["Lead Pipelines", "Role-Based Access", "Mobile Field Access"]
  },
  {
    id: "ui-ux",
    categories: ["web", "mobile"],
    badge: "UI/UX Design",
    title: "UI/UX Design & Prototyping",
    description: "User research, wireframing, clickable high-fidelity Figma prototypes for web and mobile apps, and scalable design systems that make visitors trust your brand instantly.",
    icon: <Palette className="w-6 h-6 text-secondary" />,
    tags: ["Figma Prototypes", "Design Systems", "Mobile & Web"]
  },
  {
    id: "cloud-backend",
    categories: ["cloud-ai"],
    badge: "Cloud & Backend",
    title: "Cloud Infrastructure & APIs",
    description: "High-performance backend systems, RESTful and GraphQL APIs, and serverless microservices on AWS, Google Cloud, or Supabase with 99.99% uptime guarantees.",
    icon: <Server className="w-6 h-6 text-secondary" />,
    tags: ["REST & GraphQL", "AWS / Supabase", "Auto-Scaling"]
  },
  {
    id: "ai-solutions",
    categories: ["web", "mobile", "cloud-ai"],
    badge: "AI & Automation",
    title: "AI Solutions & Smart Automation",
    description: "Supercharge your business with custom AI agents, LLM chatbots, intelligent document processing, and automated workflows that eliminate hours of manual work.",
    icon: <Bot className="w-6 h-6 text-secondary" />,
    tags: ["AI Chatbots & Agents", "Workflow Automation", "Predictive Data"]
  },
  {
    id: "integrations",
    categories: ["cloud-ai"],
    badge: "Integrations",
    title: "Third-Party & System Integrations",
    description: "Seamlessly connect all your business tools—Stripe, HubSpot, Salesforce, Zapier, Slack, and legacy databases—so data flows automatically with zero friction.",
    icon: <Cpu className="w-6 h-6 text-secondary" />,
    tags: ["Webhook Pipelines", "ERP & CRM Sync", "API Connectors"]
  },
  {
    id: "payments",
    categories: ["web", "mobile", "ecommerce-crm"],
    badge: "FinTech & Payments",
    title: "Online Payments & FinTech Setup",
    description: "PCI-compliant checkout systems, subscription recurring billing, digital wallets (Apple Pay, Google Pay), and global payment gateways with fraud protection.",
    icon: <CreditCard className="w-6 h-6 text-secondary" />,
    tags: ["Stripe & PayPal", "Apple/Google Pay", "Fraud Protection"]
  },
  {
    id: "seo-growth",
    categories: ["web"],
    badge: "Growth & SEO",
    title: "SEO & Search Visibility",
    description: "Rank higher on Google with technical on-page SEO, structured schema markup, speed optimization (Core Web Vitals), and conversion-driven sitemap architecture.",
    icon: <TrendingUp className="w-6 h-6 text-secondary" />,
    tags: ["Technical SEO", "Core Web Vitals", "Organic Ranking"]
  },
  {
    id: "desktop-apps",
    categories: ["web"],
    badge: "Desktop Software",
    title: "Desktop Software Solutions",
    description: "Custom desktop applications for Windows, macOS, and Linux built using Electron and modern desktop runtimes for high-performance internal team workflows.",
    icon: <Monitor className="w-6 h-6 text-secondary" />,
    tags: ["macOS & Windows", "Electron Apps", "Hardware Sync"]
  },
  {
    id: "maintenance-security",
    categories: ["web", "mobile", "cloud-ai"],
    badge: "Support & Security",
    title: "24/7 Security & Maintenance",
    description: "Proactive uptime monitoring, security audits, routine dependency updates, automated daily backups, and dedicated engineer support day or night.",
    icon: <ShieldCheck className="w-6 h-6 text-secondary" />,
    tags: ["Proactive Monitoring", "Daily Cloud Backups", "SLA Guarantees"]
  }
];

const CATEGORIES = [
  { id: "all", label: "All Services (12)" },
  { id: "web", label: "Web & Platforms" },
  { id: "mobile", label: "Mobile Apps (Incl. E-Commerce)" },
  { id: "ecommerce-crm", label: "E-Commerce & CRM" },
  { id: "cloud-ai", label: "Cloud & AI Solutions" },
];

const Services: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredServices = activeFilter === "all" 
    ? SERVICES 
    : SERVICES.filter(s => s.categories.includes(activeFilter as "web" | "mobile" | "ecommerce-crm" | "cloud-ai"));

  const handleFilterClick = (catId: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const scrollY = window.scrollY;
      setActiveFilter(catId);
      // Immediately lock and re-lock on animation frame to prevent browser scroll anchoring jumps
      window.scrollTo({ top: scrollY, behavior: "instant" });
      requestAnimationFrame(() => {
        window.scrollTo({ top: scrollY, behavior: "instant" });
      });
    } else {
      setActiveFilter(catId);
    }
  };

  const handleInquireService = (serviceTitle: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("selectPlan", { detail: serviceTitle }));
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section 
      id="services" 
      style={{ overflowAnchor: "none" }}
      className="pt-12 sm:pt-16 pb-16 sm:pb-24 relative overflow-hidden bg-background"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>End-to-End Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-bold font-syne mb-6 tracking-tight leading-[1.12]">
            Everything Your Business Needs <span className="text-secondary">To Grow Online</span>
          </h2>

          <p className="text-black dark:text-gray-400 max-w-2xl lg:max-w-3xl mx-auto text-base sm:text-lg md:text-xl font-space-grotesk leading-relaxed">
            From custom web platforms and native mobile apps to headless e-commerce, tailored CRMs, and AI automation—we build and maintain the digital tools that scale your company.
          </p>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            {CATEGORIES.map((cat) => {
              const isActive = activeFilter === cat.id;
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={(e) => handleFilterClick(cat.id, e)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border cursor-pointer ${
                    isActive
                      ? "btn-primary !py-2 font-bold text-white shadow-[0_0_12px_rgba(156,254,202,0.25)] border-transparent scale-[1.02]"
                      : "bg-foreground/5 border-foreground/10 text-black dark:text-gray-400 hover:text-foreground hover:border-foreground/25"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid (3 Columns x 4 Rows = 12 Cards) */}
        <div 
          style={{ overflowAnchor: "none" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch min-h-[500px]"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-3xl border border-foreground/10 bg-foreground/5 backdrop-blur-sm transition-colors duration-300 hover:border-secondary/40 hover:bg-foreground/10 shadow-lg overflow-hidden"
              >
                {/* Card top accent line glow on hover */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-secondary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center border border-secondary/20 shadow-[0_0_10px_rgba(156,254,202,0.1)] group-hover:shadow-[0_0_20px_rgba(156,254,202,0.3)] transition-all duration-300 shrink-0">
                      {service.icon}
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border border-secondary/25 bg-secondary/10 text-secondary">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold font-syne mb-3 text-foreground group-hover:text-secondary transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-black dark:text-gray-400 font-space-grotesk leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Tags & Action */}
                <div className="pt-5 border-t border-foreground/10 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-foreground/5 text-gray-600 dark:text-gray-400 border border-foreground/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleInquireService(service.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-secondary hover:text-white transition-colors group/link pt-1 cursor-pointer"
                  >
                    <span>Inquire About This Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </button>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Banner to Contact / Pricing */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-5 sm:p-6 rounded-2xl bg-foreground/5 border border-foreground/10 backdrop-blur-sm max-w-3xl mx-auto">
            <div className="text-center sm:text-left">
              <span className="block text-sm sm:text-base font-bold font-syne text-foreground">
                Need a custom tailored solution or multi-platform bundle?
              </span>
              <span className="block text-xs sm:text-sm text-black dark:text-gray-400 font-space-grotesk mt-0.5">
                We design specialized combinations for high-growth businesses and enterprise teams.
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleInquireService("Enterprise / Custom Architecture")}
              className="btn-primary !py-2.5 !px-5 text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 shadow-none hover:shadow-[0_0_12px_#9cfeca] cursor-pointer"
            >
              Request Free Consultation
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;
