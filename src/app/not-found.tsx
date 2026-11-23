"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Compass,
  Home,
  ArrowLeft,
  Layers,
  Sparkles,
  DollarSign,
  MessageSquare,
  ChevronRight,
  Terminal,
} from "lucide-react";
import Stars from "@/components/utils/Stars";
import Magnetic from "@/components/utils/Magnetic";

const QUICK_LINKS = [
  {
    title: "Web & SaaS Solutions",
    desc: "Next-gen web applications, custom platforms & portals.",
    href: "/#services",
    icon: Layers,
    badge: "Core Service",
  },
  {
    title: "Case Studies & Results",
    desc: "See how we accelerated revenue and scale for our partners.",
    href: "/#results",
    icon: Sparkles,
    badge: "Proof",
  },
  {
    title: "Transparent Pricing",
    desc: "Upfront tiers from Starter to Enterprise solutions.",
    href: "/#pricing",
    icon: DollarSign,
    badge: "Flexible",
  },
  {
    title: "Start a Conversation",
    desc: "Get a free strategy audit and technical consultation.",
    href: "/#contact",
    icon: MessageSquare,
    badge: "24h Response",
  },
];

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden">
      {/* Dynamic Cosmic Background Elements */}
      <Stars />

      {/* Cyber Grid Mask */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40 dark:opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(156,254,202,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(156,254,202,0.12) 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, #000 50%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, #000 50%, transparent 100%)",
        }}
      />

      {/* Ambient Neon Glow Orbs */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] h-[340px] sm:h-[540px] bg-secondary/15 dark:bg-secondary/10 rounded-full blur-[120px] -z-10" />
      <div className="pointer-events-none absolute bottom-10 left-10 w-72 h-72 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[90px] -z-10" />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wider uppercase border border-secondary/30 bg-secondary/10 text-secondary backdrop-blur-md shadow-[0_0_15px_rgba(156,254,202,0.15)] mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
          </span>
          <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "12s" }} />
          <span>Error 404 // Route Disconnected</span>
        </motion.div>

        {/* Big Glitch / Hologram 404 Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="relative select-none my-2"
        >
          {/* Subtle Backlight */}
          <div className="absolute inset-0 -z-10 blur-2xl opacity-40 bg-gradient-to-r from-secondary/40 via-emerald-400/30 to-secondary/40 rounded-full transform scale-90" />
          
          <h1 className="font-syne font-extrabold text-[100px] sm:text-[150px] md:text-[200px] lg:text-[230px] leading-none tracking-tighter bg-gradient-to-b from-foreground via-foreground/80 to-foreground/20 dark:from-white dark:via-gray-200 dark:to-gray-600 bg-clip-text text-transparent drop-shadow-sm">
            404
          </h1>

          {/* Floating Cyber Badge Across the 404 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg border border-red-500/40 bg-background/80 backdrop-blur-xl text-red-500 text-xs sm:text-sm font-mono tracking-widest uppercase shadow-lg shadow-red-500/10">
            [Signal Lost in Space]
          </div>
        </motion.div>

        {/* Heading & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto space-y-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-syne font-bold text-foreground">
            Looks like you ventured off the digital grid.
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-foreground/70 dark:text-foreground/60 leading-relaxed font-space-grotesk">
            The page or frequency you are trying to reach doesn&apos;t exist, has been
            relocated, or drifted into an unmapped coordinate of cyberspace.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 w-full"
        >
          <Magnetic>
            <Link
              href="/"
              className="btn-primary inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold rounded-xl"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </Magnetic>

          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium rounded-xl border border-foreground/15 hover:border-secondary/50 hover:text-secondary bg-foreground/5 hover:bg-secondary/10 transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium rounded-xl border border-foreground/15 hover:border-secondary/50 hover:text-secondary bg-foreground/5 hover:bg-secondary/10 transition-all duration-200"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Report Broken Link</span>
          </Link>
        </motion.div>

        {/* Quick Route Shortcuts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 w-full"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-12 bg-foreground/15" />
            <span className="text-xs uppercase font-mono tracking-wider text-foreground/50">
              Teleport to safe coordinates
            </span>
            <span className="h-px w-12 bg-foreground/15" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-left">
            {QUICK_LINKS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="group relative p-4 rounded-xl border border-foreground/10 bg-card/60 hover:bg-secondary/5 dark:hover:bg-secondary/10 hover:border-secondary/40 transition-all duration-200 backdrop-blur-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border border-foreground/10 text-foreground/60 bg-foreground/5">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold font-syne text-foreground group-hover:text-secondary transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-foreground/60 leading-relaxed font-space-grotesk">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center text-xs font-medium text-secondary opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    <span>Navigate</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Minimal Terminal Diagnostic Log */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-12 w-full max-w-lg mx-auto rounded-lg border border-foreground/10 bg-black/40 dark:bg-black/60 backdrop-blur-md p-3 text-left font-mono text-[11px] sm:text-xs text-foreground/60 shadow-inner"
        >
          <div className="flex items-center justify-between border-b border-foreground/10 pb-2 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
              <span className="ml-2 text-[10px] uppercase tracking-wider text-foreground/40">
                Diagnostic Console
              </span>
            </div>
            <Terminal className="w-3.5 h-3.5 text-foreground/40" />
          </div>
          <div className="space-y-1">
            <p className="text-emerald-400">
              <span className="text-foreground/40">&gt;</span> STATUS: 404 NOT_FOUND [Protocol: HTTP/2]
            </p>
            <p>
              <span className="text-foreground/40">&gt;</span> ANOMALY: Target route rejected by DNS routing matrix.
            </p>
            <p className="text-foreground/50">
              <span className="text-foreground/40">&gt;</span> RESOLUTION: Auto-fallback available via navigation links above.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
