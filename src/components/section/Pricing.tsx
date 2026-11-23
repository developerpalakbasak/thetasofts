"use client";

import React, { useState } from "react";
import Magnetic from "@/components/utils/Magnetic";
import { 
  Globe, 
  Smartphone, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  ChevronDown,
  ShoppingCart,
  ArrowUpRight
} from "lucide-react";
import {
  PricingMode,
  ServiceCategory,
  TierPackage,
  SelectedPlanPayload,
  WEB_SCOPES,
  WEB_PRICING_TABLE,
  MOBILE_SCOPES,
  MOBILE_PRICING_TABLE,
  WEB_SUBSCRIPTIONS,
  MOBILE_SUBSCRIPTIONS
} from "@/data/pricingData";

const Pricing: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("web");
  const [pricingMode, setPricingMode] = useState<PricingMode>("fixed");
  const [selectedWebScope, setSelectedWebScope] = useState<string>("5-9");
  const [selectedMobileScope, setSelectedMobileScope] = useState<string>("11-25");
  const [showMatrix, setShowMatrix] = useState<boolean>(false);

  const handleSelectPlan = (planData: string | SelectedPlanPayload) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("selectPlan", { detail: planData }));
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Generate the 3 tiers for the current selected scope
  const getFixedTiers = (): TierPackage[] => {
    if (activeCategory === "web") {
      const p = WEB_PRICING_TABLE[selectedWebScope];
      return [
        {
          name: "Launch Package",
          type: "Design Only",
          price: typeof p.launch === "number" ? `$${p.launch.toLocaleString()}` : p.launch,
          tagline: "Clean, high-converting web & e-commerce designs ready for your engineering team to build.",
          features: [
            "Comprehensive UX & competitor research",
            "High-fidelity UI designs & e-commerce layouts",
            "Fully responsive for desktop, tablet & mobile",
            "Clickable interactive Figma prototype & cart flows",
            "Foundational Design System (colors, fonts, tokens)",
            "Organized Developer Handoff & specs",
            "Unlimited design revisions until satisfaction"
          ],
          ctaText: "Choose Launch"
        },
        {
          name: "Growth Package",
          type: "Design + Development",
          badge: "Most Popular · End-to-End",
          isPopular: true,
          price: typeof p.growth === "number" ? `$${p.growth.toLocaleString()}` : p.growth,
          tagline: "Complete turnkey solution: designed and fully coded on Next.js, Shopify, Webflow, or Framer.",
          features: [
            "Everything in Launch Package included",
            "Next.js / Shopify / Webflow production build",
            "Full E-Commerce store setup & product catalog",
            "Payment gateways (Stripe, PayPal, Apple Pay)",
            "Custom animations & micro-interactions",
            "Hosting, custom domain & SSL setup",
            "2 Months complimentary post-launch maintenance"
          ],
          ctaText: "Choose Growth"
        },
        {
          name: "Signature Package",
          type: "Design + Dev + Brand Identity",
          price: typeof p.signature === "number" ? `$${p.signature.toLocaleString()}` : p.signature,
          tagline: "The all-inclusive package: modern branding, custom 3D/AI visuals, headless e-commerce, code, and technical SEO.",
          features: [
            "Everything in Growth Package included",
            "Full Brand Identity (Logo, guidelines, packaging/cards)",
            "Headless E-Commerce & multi-currency architecture",
            "Technical On-Page SEO & product schema markup",
            "AI & 3D custom brand photoshoot assets",
            "Multilingual & internationalization support",
            "3 Months premium ongoing maintenance & support"
          ],
          ctaText: "Choose Signature"
        }
      ];
    } else {
      const p = MOBILE_PRICING_TABLE[selectedMobileScope];
      return [
        {
          name: "Launch Package",
          type: "App Design Only",
          price: typeof p.launch === "number" ? `$${p.launch.toLocaleString()}` : p.launch,
          tagline: "Complete mobile UX/UI & shopping app architecture ready for Swift/Kotlin or Flutter developers.",
          features: [
            "In-depth user flow & mobile commerce wireframing",
            "Native iOS (HIG) & Android (Material 3) design",
            "High-fidelity visual UI screens & catalog flows",
            "Complete Design Style Guide & component library",
            "Vector graphic icons & custom illustrations",
            "Developer Handoff with spacing & typography tokens",
            "Unlimited revisions during the design phase"
          ],
          ctaText: "Choose Launch"
        },
        {
          name: "Growth Package",
          type: "Design + App Branding",
          badge: "Most Popular · App Store Ready",
          isPopular: true,
          price: typeof p.growth === "number" ? `$${p.growth.toLocaleString()}` : p.growth,
          tagline: "Polished design, interactive clickable prototype, in-app mobile checkout, App Icon, and Store graphic assets.",
          features: [
            "Everything in Launch Package included",
            "In-app mobile checkout & digital wallet flows",
            "Clickable advanced Figma prototype with transitions",
            "App Store & Google Play marketing screenshots",
            "Custom App Icon design & splash screens",
            "Full brand palette & typography system",
            "2 Months priority post-handoff design support"
          ],
          ctaText: "Choose Growth"
        },
        {
          name: "Signature Package",
          type: "Design + App Store Launch + Dev Support",
          price: typeof p.signature === "number" ? `$${p.signature.toLocaleString()}` : p.signature,
          tagline: "End-to-end mobile commerce launch: design, token setup, store submission, in-app purchases, and analytics.",
          features: [
            "Everything in Growth Package included",
            "Mobile Commerce & In-App Purchase setup",
            "Push notification triggers & cart reminder flows",
            "Design Token Support (JSON/Style Dictionary)",
            "Advanced mobile analytics & event tracking setup",
            "Dark mode & Multilingual localization support",
            "3 Months comprehensive maintenance & iteration"
          ],
          ctaText: "Choose Signature"
        }
      ];
    }
  };

  const fixedTiers = getFixedTiers();
  const currentSubscriptions = activeCategory === "web" ? WEB_SUBSCRIPTIONS : MOBILE_SUBSCRIPTIONS;

  return (
    <section id="pricing" className="pt-16 pb-24 relative overflow-hidden bg-background text-foreground">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-secondary/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl lg:max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Clear, Honest Pricing Packages</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-bold font-syne mb-6 tracking-tight leading-[1.12]">
            Premium Quality With <br />
            <span className="text-secondary">Affordability & Total Flexibility</span>
          </h2>

          <p className="text-black dark:text-gray-400 max-w-2xl lg:max-w-3xl mx-auto text-base sm:text-lg md:text-xl font-space-grotesk leading-relaxed">
            Choose between fixed-scope project packages or flexible monthly subscriptions for SaaS platforms, mobile apps, and high-converting e-commerce stores. No hidden surprises—just world-class execution tailored to your roadmap.
          </p>

          {/* PART 1 & PART 2 SELECTOR: Web vs Mobile App */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="inline-flex p-1.5 rounded-2xl bg-foreground/5 border border-foreground/10 shadow-lg backdrop-blur-md">
              <button
                type="button"
                onClick={() => setActiveCategory("web")}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeCategory === "web"
                    ? "btn-primary shadow-none hover:shadow-[0_0_10px_#9cfeca] text-white font-bold scale-[1.02]"
                    : "text-black dark:text-gray-300 hover:text-secondary"
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>1. Web, Platforms & E-Commerce</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory("mobile")}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeCategory === "mobile"
                    ? "btn-primary shadow-none hover:shadow-[0_0_10px_#9cfeca] text-white font-bold scale-[1.02]"
                    : "text-black dark:text-gray-300 hover:text-secondary"
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>2. Mobile Apps & mCommerce</span>
              </button>
            </div>
          </div>

          {/* Pricing Model Switcher: Fixed Package vs Monthly Subscription */}
          <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-black dark:text-gray-400 font-space-grotesk">
            <span>Model:</span>
            <button
              type="button"
              onClick={() => setPricingMode("fixed")}
              className={`px-3.5 py-1.5 rounded-lg border transition cursor-pointer ${
                pricingMode === "fixed"
                  ? "btn-primary text-xs !py-1.5 !px-3.5 font-bold rounded-lg text-center shadow-none hover:shadow-[0_0_10px_#9cfeca] border-none"
                  : "border-foreground/10 hover:border-foreground/30 text-gray-500"
              }`}
            >
              Fixed Scope Package
            </button>
            <button
              type="button"
              onClick={() => setPricingMode("subscription")}
              className={`px-3.5 py-1.5 rounded-lg border transition flex items-center gap-1.5 cursor-pointer ${
                pricingMode === "subscription"
                  ? "btn-primary text-xs !py-1.5 !px-3.5 font-bold rounded-lg text-center shadow-none hover:shadow-[0_0_10px_#9cfeca] border-none"
                  : "border-foreground/10 hover:border-foreground/30 text-gray-500"
              }`}
            >
              <span>Monthly Subscription</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-secondary/20 text-secondary">Retainer</span>
            </button>
          </div>
        </div>

        {/* Scope Selector Bar (For Fixed Mode) */}
        {pricingMode === "fixed" && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="text-center mb-3">
              <span className="text-xs font-semibold text-secondary uppercase tracking-widest font-mono">
                {activeCategory === "web" ? "Select Number of Website & Store Pages:" : "Select Number of App Screens:"}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 p-2 rounded-2xl bg-foreground/5 border border-foreground/10">
              {(activeCategory === "web" ? WEB_SCOPES : MOBILE_SCOPES).map((scope) => {
                const isSelected = activeCategory === "web" ? selectedWebScope === scope.id : selectedMobileScope === scope.id;
                return (
                  <button
                    type="button"
                    key={scope.id}
                    onClick={() => {
                      if (activeCategory === "web") setSelectedWebScope(scope.id);
                      else setSelectedMobileScope(scope.id);
                    }}
                    className={`py-3 px-2 rounded-xl text-center transition-all duration-200 border cursor-pointer ${
                      isSelected
                        ? "btn-primary !py-3 !px-2 font-bold text-white rounded-xl text-center shadow-none hover:shadow-[0_0_10px_#9cfeca] border-none scale-[1.02]"
                        : "bg-transparent border-transparent hover:bg-foreground/5 text-black dark:text-gray-300"
                    }`}
                  >
                    <span className="block text-sm font-syne">{scope.label}</span>
                    <span className="block text-[10px] opacity-80 truncate">{scope.subtitle}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Pricing Cards Render */}
        {pricingMode === "fixed" ? (
          /* Fixed Scope Cards Grid */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
            {fixedTiers.map((tier, index) => (
              <div
                key={index}
                className={`relative flex flex-col p-8 sm:p-10 rounded-3xl border transition-all duration-500 ${
                  tier.isPopular
                    ? "bg-foreground/10 border-secondary/60 shadow-[0_0_40px_rgba(156,254,202,0.15)] z-20 -translate-y-2"
                    : "bg-foreground/5 border-foreground/10 hover:border-foreground/25 z-10 hover:-translate-y-1"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-btn text-white text-xs font-bold uppercase tracking-widest px-5 py-1.5 rounded-full shadow-[0_0_12px_#9cfeca]">
                    {tier.badge}
                  </div>
                )}

                <div className="mb-6">
                  <div className="flex items-center justify-between gap-3 mb-2 pt-1">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-syne text-foreground">{tier.name}</h3>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-secondary/30 bg-secondary/10 text-secondary">
                      {tier.type}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-black dark:text-gray-400 font-space-grotesk min-h-[34px] mb-5 leading-relaxed">
                    {tier.tagline}
                  </p>

                  <div className="flex items-baseline gap-1.5 pb-6 border-b border-foreground/10">
                    <span className="text-4xl sm:text-5xl lg:text-6xl font-bold font-syne text-foreground tracking-tight">
                      {tier.price}
                    </span>
                    {tier.price !== "Custom" && (
                      <span className="text-xs text-black dark:text-gray-400 font-space-grotesk">/ project</span>
                    )}
                  </div>
                </div>

                <div className="flex-1 mb-8">
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
                    What’s Included:
                  </p>
                  <ul className="space-y-3.5 text-xs text-black dark:text-gray-300 font-space-grotesk">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="w-full [&>div]:w-full">
                  <Magnetic>
                    <button
                      type="button"
                      onClick={() =>
                        handleSelectPlan({
                          category: activeCategory,
                          mode: "fixed",
                          tierName: tier.name,
                          scope: activeCategory === "web" ? selectedWebScope : selectedMobileScope,
                          price: tier.price,
                          summary: `${activeCategory === "web" ? "Web & E-Commerce" : "Mobile App"} · ${tier.name} (${tier.price})`
                        })
                      }
                      className={
                        tier.isPopular
                          ? "w-full btn-primary text-xs py-3.5 font-bold rounded-xl text-center uppercase tracking-wider shadow-none hover:shadow-[0_0_10px_#9cfeca] transition-all hover:brightness-110 cursor-pointer"
                          : "block text-center w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-foreground/10 text-foreground hover:bg-foreground/20 border border-foreground/10 transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
                      }
                    >
                      {tier.ctaText}
                    </button>
                  </Magnetic>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Subscription Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16 items-stretch">
            {currentSubscriptions.map((sub, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col p-8 sm:p-10 rounded-3xl border transition-all duration-500 ${
                  sub.isPopular
                    ? "bg-foreground/10 border-secondary/60 shadow-[0_0_40px_rgba(156,254,202,0.15)] -translate-y-2"
                    : "bg-foreground/5 border-foreground/10 hover:border-foreground/25 hover:-translate-y-1"
                }`}
              >
                {sub.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-btn text-white text-xs font-bold uppercase tracking-widest px-5 py-1.5 rounded-full shadow-[0_0_12px_#9cfeca]">
                    {sub.badge}
                  </div>
                )}

                <div className="mb-6 pt-1">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-syne text-foreground mb-1">{sub.name}</h3>
                  <p className="text-xs sm:text-sm text-secondary font-mono font-semibold mb-4">{sub.hours}</p>
                  
                  <div className="flex items-baseline gap-1.5 pb-6 border-b border-foreground/10">
                    <span className="text-4xl sm:text-5xl lg:text-6xl font-bold font-syne text-foreground tracking-tight">
                      ${sub.rate}
                    </span>
                    <span className="text-xs sm:text-sm text-black dark:text-gray-400 font-space-grotesk">/ month</span>
                  </div>

                  <p className="text-xs sm:text-sm text-black dark:text-gray-400 font-space-grotesk mt-4 leading-relaxed">
                    {sub.tagline}
                  </p>
                </div>

                <div className="flex-1 mb-8">
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
                    Subscription Inclusions:
                  </p>
                  <ul className="space-y-3.5 text-xs text-black dark:text-gray-300 font-space-grotesk">
                    {sub.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="w-full [&>div]:w-full">
                  <Magnetic>
                    <button
                      type="button"
                      onClick={() =>
                        handleSelectPlan({
                          category: activeCategory,
                          mode: "subscription",
                          tierName: sub.name,
                          scope: sub.hours,
                          price: `$${sub.rate}/mo`,
                          summary: `${activeCategory === "web" ? "Web & E-Commerce" : "Mobile App"} Subscription · ${sub.name} ($${sub.rate}/mo)`
                        })
                      }
                      className={
                        sub.isPopular
                          ? "w-full btn-primary text-xs py-3.5 font-bold rounded-xl text-center uppercase tracking-wider shadow-none hover:shadow-[0_0_10px_#9cfeca] transition-all hover:brightness-110 cursor-pointer"
                          : "block text-center w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-foreground/10 text-foreground hover:bg-foreground/20 border border-foreground/10 transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
                      }
                    >
                      {sub.ctaText}
                    </button>
                  </Magnetic>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Glorifying E-Commerce Banner */}
        <div className="max-w-5xl mx-auto mb-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-secondary/15 via-foreground/5 to-secondary/10 border border-secondary/30 relative overflow-hidden shadow-[0_0_50px_rgba(156,254,202,0.08)]">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-xs font-bold uppercase tracking-wider">
                <ShoppingCart className="w-4 h-4" />
                <span>Full-Scale E-Commerce & Retail Solutions</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-syne text-foreground tracking-tight">
                Selling Online? We Build High-Converting Stores & Mobile Shopping Apps.
              </h3>
              <p className="text-sm sm:text-base text-black dark:text-gray-300 font-space-grotesk max-w-2xl leading-relaxed">
                Whether you need a high-converting Shopify store, a custom headless Next.js Commerce engine, or native iOS & Android shopping apps with 1-click Apple Pay, we craft digital storefronts engineered for maximum average order value and frictionless repeat sales.
              </p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-2">
                <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-foreground/5 border border-foreground/10 text-foreground flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-secondary" /> Shopify & Headless Stores
                </span>
                <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-foreground/5 border border-foreground/10 text-foreground flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-secondary" /> iOS & Android Shopping Apps
                </span>
                <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-foreground/5 border border-foreground/10 text-foreground flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-secondary" /> Stripe, Apple Pay & Klarna
                </span>
                <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-foreground/5 border border-foreground/10 text-foreground flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-secondary" /> Real-time Inventory Sync
                </span>
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleSelectPlan("E-Commerce & Mobile Shopping Apps")}
                className="btn-primary w-full sm:w-auto py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(156,254,202,0.3)] hover:scale-[1.02] cursor-pointer"
              >
                <span>Inquire E-Commerce Store</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Feature Comparison Table Toggle */}
        <div className="text-center mb-16">
          <button
            type="button"
            onClick={() => setShowMatrix(!showMatrix)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 text-xs font-semibold text-secondary transition-all cursor-pointer"
          >
            <span>{showMatrix ? "Hide Detailed Comparison Table" : "Compare Launch vs Growth vs Signature Table"}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showMatrix ? "rotate-180" : ""}`} />
          </button>

          {showMatrix && (
            <div className="mt-8 text-left bg-foreground/5 border border-foreground/10 rounded-3xl overflow-hidden shadow-xl max-w-5xl mx-auto">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left font-space-grotesk">
                  <thead>
                    <tr className="bg-foreground/10 border-b border-foreground/10 text-foreground">
                      <th className="py-4 px-6 font-semibold">Deliverable & Scope</th>
                      <th className="py-4 px-4 font-semibold text-center">Launch (Design)</th>
                      <th className="py-4 px-4 font-semibold text-center text-secondary bg-secondary/10">Growth (Design + Dev)</th>
                      <th className="py-4 px-4 font-semibold text-center">Signature (Design + Dev + Brand)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-foreground/5 text-black dark:text-gray-300">
                    <tr>
                      <td className="py-3.5 px-6 font-medium text-foreground">UX Research & User Flows</td>
                      <td className="py-3.5 px-4 text-center text-secondary font-bold">Included</td>
                      <td className="py-3.5 px-4 text-center text-secondary font-bold bg-secondary/10">Included</td>
                      <td className="py-3.5 px-4 text-center text-secondary font-bold">Included</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-6 font-medium text-foreground">High-Fidelity Screen Designs</td>
                      <td className="py-3.5 px-4 text-center text-secondary font-bold">Included</td>
                      <td className="py-3.5 px-4 text-center text-secondary font-bold bg-secondary/10">Included</td>
                      <td className="py-3.5 px-4 text-center text-secondary font-bold">Included</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-6 font-medium text-foreground">E-Commerce & Store Architecture</td>
                      <td className="py-3.5 px-4 text-center">Cart & Checkout UX</td>
                      <td className="py-3.5 px-4 text-center text-secondary font-bold bg-secondary/10">Shopify / Next.js / Stripe</td>
                      <td className="py-3.5 px-4 text-center text-secondary font-bold">Headless + Multi-Currency + ERP</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-6 font-medium text-foreground">Full Design System / Style Guide</td>
                      <td className="py-3.5 px-4 text-center text-secondary font-bold">Included</td>
                      <td className="py-3.5 px-4 text-center text-secondary font-bold bg-secondary/10">Included</td>
                      <td className="py-3.5 px-4 text-center text-secondary font-bold">Included</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-6 font-medium text-foreground">Clickable Interactive Prototype</td>
                      <td className="py-3.5 px-4 text-center">Basic Prototype</td>
                      <td className="py-3.5 px-4 text-center text-secondary font-bold bg-secondary/10">Advanced Micro-interactions</td>
                      <td className="py-3.5 px-4 text-center text-secondary font-bold">Full Product Flow Prototype</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-6 font-medium text-foreground">Code Development</td>
                      <td className="py-3.5 px-4 text-center text-gray-400">— (Handoff Only)</td>
                      <td className="py-3.5 px-4 text-center text-secondary font-bold bg-secondary/10">Framer / Webflow / App / Store</td>
                      <td className="py-3.5 px-4 text-center text-secondary font-bold">Full Stack + SEO + Tokens</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-6 font-medium text-foreground">Brand Identity & Marketing Assets</td>
                      <td className="py-3.5 px-4 text-center text-gray-400">—</td>
                      <td className="py-3.5 px-4 text-center bg-secondary/10">App Store / Social Assets</td>
                      <td className="py-3.5 px-4 text-center text-secondary font-bold">Full Logo + 3D/AI Photoshoot</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-6 font-medium text-foreground">Complimentary Maintenance</td>
                      <td className="py-3.5 px-4 text-center text-gray-400">—</td>
                      <td className="py-3.5 px-4 text-center text-secondary font-bold bg-secondary/10">2 Months Free</td>
                      <td className="py-3.5 px-4 text-center text-secondary font-bold">3 Months Free</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-6 font-medium text-foreground">Revisions Policy</td>
                      <td className="py-3.5 px-4 text-center text-secondary font-bold">Unlimited</td>
                      <td className="py-3.5 px-4 text-center text-secondary font-bold bg-secondary/10">Unlimited</td>
                      <td className="py-3.5 px-4 text-center text-secondary font-bold">Unlimited</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Development Promise & Value Guarantee */}
        <div className="max-w-5xl mx-auto bg-foreground/5 border border-foreground/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="flex-1 text-center md:text-left relative z-10">
            <h4 className="text-xl sm:text-2xl font-syne font-bold text-foreground mb-2">Our Standard Assurance</h4>
            <p className="text-black dark:text-gray-400 font-space-grotesk text-sm sm:text-base max-w-md mx-auto md:mx-0">
              Every Web, Mobile & E-Commerce project includes unlimited design iterations and dedicated handoff support so your launch is smooth and risk-free.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full md:w-auto">
            <div className="flex items-center gap-4 bg-foreground/5 rounded-2xl px-5 py-4 border border-foreground/5 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold border border-secondary/30">
                <ShieldCheck className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-left">
                <span className="block text-sm font-bold text-foreground">2–3 Months</span>
                <span className="block text-xs text-black dark:text-gray-400 font-space-grotesk">Included Maintenance</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-foreground/5 rounded-2xl px-5 py-4 border border-foreground/5 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold border border-secondary/30">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-left">
                <span className="block text-sm font-bold text-foreground">Unlimited</span>
                <span className="block text-xs text-black dark:text-gray-400 font-space-grotesk">Iterative Revisions</span>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-foreground/5 rounded-2xl px-5 py-4 border border-foreground/5 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold border border-secondary/30">
                <ShoppingCart className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-left">
                <span className="block text-sm font-bold text-foreground">E-Commerce</span>
                <span className="block text-xs text-black dark:text-gray-400 font-space-grotesk">Storefront & Checkout Ready</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Pricing;
