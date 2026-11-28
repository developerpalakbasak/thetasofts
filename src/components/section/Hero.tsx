"use client";

import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Typewriter, { ResponsiveQuote } from '../utils/Typewriter';
import Stars from '../utils/Stars';
import Magnetic from '../utils/Magnetic';

const quotes: ResponsiveQuote[] = [
  { desktop: "Websites That Win Clients", mobile: ["Websites", "That Win Clients"] },
  { desktop: "Mobile Apps Your Customers Love", mobile: ["Mobile Apps", "Your Customers Love"] },
  { desktop: "Online Stores That Actually Sell", mobile: ["Online Stores", "That Actually Sell"] },
  { desktop: "Brands That Get Found on Google", mobile: ["Brands That", "Get Found on Google"] },
  { desktop: "Digital Tools That Save You Time", mobile: ["Digital Tools", "That Save You Time"] },
  { desktop: "Software Built Around Your Business", mobile: ["Software Built", "Around Your Business"] },
  { desktop: "Results You Can See & Measure", mobile: ["Results You Can", "See & Measure"] }
];

const Hero: React.FC = () => {
  const pathname = usePathname();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
    }
  };

  const floatingTags = [
    { text: "🤝 Honest & Transparent", top: "18%", left: "3%", rotate: -8, delay: 0 },
    { text: "🚀 Fast Delivery, Zero Stress", top: "44%", left: "2%", rotate: 12, delay: 1 },
    { text: "💰 More Customers, More Revenue", top: "14%", right: "3%", rotate: 6, delay: 2 },
    { text: "🛡️ We Handle Everything For You", top: "50%", right: "2%", rotate: -10, delay: 3 },
  ];

  return (
    <div
      id='hero'
      className="relative flex flex-col justify-between items-center pt-28 pb-8 min-h-screen bg-background overflow-hidden"
    >
      {/* Background Cyber Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000018_1px,transparent_1px),linear-gradient(to_bottom,#00000018_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Subtle tech ambient gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Moving background stars */}
      <Stars />

      {/* Floating Cyber Badges */}
      {floatingTags.map((tag, idx) => (
        <motion.div
          key={idx}
          className="absolute hidden xl:flex items-center gap-2 px-4 py-2.5 rounded-xl border border-foreground/5 bg-foreground/5 backdrop-blur-md text-xs font-semibold text-black dark:text-gray-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20"
          style={{
            top: tag.top,
            left: tag.left,
            right: tag.right,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 0.85,
            scale: 1,
            y: [0, -12, 0],
            rotate: [tag.rotate, tag.rotate + 3, tag.rotate - 3, tag.rotate],
          }}
          transition={{
            y: {
              duration: 5 + idx,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 7 + idx,
              repeat: Infinity,
              ease: "easeInOut",
            },
            opacity: { duration: 0.6 },
            scale: { duration: 0.6 }
          }}
          whileHover={{
            scale: 1.1,
            opacity: 1,
            borderColor: 'rgba(156,254,202,0.4)',
            boxShadow: '0 0 15px rgba(156,254,202,0.15)'
          }}
        >
          {tag.text}
        </motion.div>
      ))}

      {/* Top spacer to balance layout vertically on large viewports */}
      <div className="hidden md:block h-6" />

      {/* Main Content Group */}
      <div className="z-10 flex-1 flex flex-col justify-center items-center text-center px-4 max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl gap-6 sm:gap-8 md:gap-10 w-full">
        {/* Strategic Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border border-secondary/30 bg-secondary/5 text-xs sm:text-sm md:text-base font-semibold tracking-wider text-secondary shadow-[0_0_15px_rgba(156,254,202,0.08)] backdrop-blur-sm"
        >
          ✨ We Turn Your Business Ideas Into Digital Reality
        </motion.div>

        {/* Content Container */}
        <div className="flex flex-col justify-center items-center text-center w-full">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] 2xl:text-[88px] font-bold tracking-tight leading-[1.15] sm:leading-[1.08] lg:leading-[1.03] font-syne">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="block text-foreground"
            >
              Your Business Deserves a
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="block min-h-[75px] sm:min-h-[110px] md:min-h-[135px] lg:min-h-[160px] xl:min-h-[185px] mt-2 sm:mt-3 bg-gradient-to-r from-secondary via-btn to-white bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(156,254,202,0.15)]"
            >
              <Typewriter quotes={quotes} className="text-secondary" />
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-4 sm:mt-8 text-base sm:text-lg md:text-xl lg:text-2xl text-black dark:text-gray-400 max-w-2xl lg:max-w-3xl font-space-grotesk leading-relaxed"
          >
            Whether you need a stunning website, a mobile app, or a complete online store — we build it for you, keep it running smoothly, and help more people discover your business online.
          </motion.p>
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="w-full flex flex-col items-center text-center gap-4"
        >
          <Magnetic>
            <Link
              href="/#contact"
              onClick={(e) => handleScroll(e, "/#contact")}
              className="btn-primary flex items-center gap-3 px-10 py-5 rounded-2xl text-base font-bold shadow-[0_0_20px_rgba(58,231,181,0.2)] hover:shadow-[0_0_40px_rgba(58,231,181,0.45)] hover:scale-[1.03] transition-all"
            >
              <span>Get a Free Consultation</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" x2="19" y1="12" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </Link>
          </Magnetic>

          <p className="text-xs md:text-sm text-black dark:text-gray-500 font-space-grotesk tracking-wide mt-2">
            ✅ Free Consultation • No Commitment • Results Guaranteed
          </p>
        </motion.div>
      </div>

      {/* bottom indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 1 }}
        className="z-10 flex flex-col items-center gap-1 cursor-pointer mt-4"
        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-black dark:text-gray-500 font-semibold">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-secondary"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
