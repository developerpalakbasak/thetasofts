"use client";

import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { SelectedPlanPayload } from '@/data/pricingData';

const CONTACT_INFO = [
  {
    label: "Drop Us an Email",
    value: "contact.thetasofts@gmail.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
    )
  },
  {
    label: "We Reply Within",
    value: "24 Hours, Guaranteed",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
    )
  },
  {
    label: "We're Available",
    value: "7 Days a Week",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
    )
  }
];

const PLAN_OPTIONS = [
  {
    group: "Specialized Services (Web & Mobile)",
    options: [
      { label: "E-Commerce & Mobile Shopping Apps", value: "E-Commerce & Mobile Shopping Apps" },
      { label: "Custom CRM & Enterprise Portals", value: "Custom CRM & Enterprise Portals" },
      { label: "Websites & SaaS Platforms", value: "Websites & SaaS Platforms" },
      { label: "Mobile Apps (iOS & Android)", value: "Mobile Apps (iOS & Android)" },
      { label: "UI/UX Design & Prototyping", value: "UI/UX Design & Prototyping" },
      { label: "AI Solutions & Smart Automation", value: "AI Solutions & Smart Automation" },
      { label: "Cloud Infrastructure & APIs", value: "Cloud Infrastructure & APIs" },
      { label: "Online Payments & FinTech Setup", value: "Online Payments & FinTech Setup" },
      { label: "Third-Party & System Integrations", value: "Third-Party & System Integrations" },
      { label: "SEO & Search Visibility", value: "SEO & Search Visibility" },
      { label: "Desktop Software Solutions", value: "Desktop Software Solutions" },
      { label: "24/7 Security & Maintenance", value: "24/7 Security & Maintenance" },
    ]
  },
  {
    group: "Fixed-Scope Packages (Pricing Table)",
    options: [
      { label: "Web · Launch Package (Design Only)", value: "Web · Launch Package" },
      { label: "Web · Growth Package (Design + Dev)", value: "Web · Growth Package" },
      { label: "Web · Signature Package (Design + Dev + Brand)", value: "Web · Signature Package" },
      { label: "Mobile · Launch Package (App Design Only)", value: "Mobile · Launch Package" },
      { label: "Mobile · Growth Package (Design + Branding)", value: "Mobile · Growth Package" },
      { label: "Mobile · Signature Package (Full Launch + Support)", value: "Mobile · Signature Package" },
    ]
  },
  {
    group: "Monthly Retainer Subscriptions",
    options: [
      { label: "Web Subscription · Startup Sprint ($699/mo)", value: "Web Subscription · Startup Sprint" },
      { label: "Web Subscription · Growth Engine ($1,299/mo)", value: "Web Subscription · Growth Engine" },
      { label: "Mobile Subscription · App Sprint ($799/mo)", value: "Mobile Subscription · App Sprint" },
      { label: "Mobile Subscription · Product Powerhouse ($1,499/mo)", value: "Mobile Subscription · Product Powerhouse" },
    ]
  },
  {
    group: "Custom / Consulting",
    options: [
      { label: "Enterprise / Custom Architecture", value: "Enterprise / Custom Architecture" },
      { label: "Not Sure Yet / Free Consultation", value: "Not Sure Yet" },
    ]
  }
];

const ALL_PLAN_VALUES = PLAN_OPTIONS.flatMap(g => g.options.map(o => o.value));

const ContactFormInner = () => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Sync with Pricing plan clicks & Services inquiries
  useEffect(() => {
    const handleSelectPlanEvent = (e: CustomEvent<string | SelectedPlanPayload>) => {
      const detail = e.detail;
      if (!detail) return;

      if (typeof detail === "string") {
        // 1. Direct match with option values or labels
        const allOptions = PLAN_OPTIONS.flatMap(g => g.options);
        const exactMatch = allOptions.find(
          o => o.value.toLowerCase() === detail.toLowerCase() || o.label.toLowerCase() === detail.toLowerCase()
        );
        if (exactMatch) {
          setSelectedPlan(exactMatch.value);
          return;
        }

        // 2. Specific pricing shorthand matching
        const lower = detail.toLowerCase();
        if (lower.includes("mobile") && (lower.includes("launch") || lower.includes("growth") || lower.includes("signature") || lower.includes("sprint") || lower.includes("powerhouse"))) {
          if (lower.includes("launch")) setSelectedPlan("Mobile · Launch Package");
          else if (lower.includes("signature")) setSelectedPlan("Mobile · Signature Package");
          else if (lower.includes("sprint")) setSelectedPlan("Mobile Subscription · App Sprint");
          else if (lower.includes("powerhouse")) setSelectedPlan("Mobile Subscription · Product Powerhouse");
          else setSelectedPlan("Mobile · Growth Package");
          return;
        } else if (lower.includes("web") && (lower.includes("launch") || lower.includes("growth") || lower.includes("signature") || lower.includes("sprint") || lower.includes("engine"))) {
          if (lower.includes("launch")) setSelectedPlan("Web · Launch Package");
          else if (lower.includes("signature")) setSelectedPlan("Web · Signature Package");
          else if (lower.includes("sprint")) setSelectedPlan("Web Subscription · Startup Sprint");
          else if (lower.includes("engine")) setSelectedPlan("Web Subscription · Growth Engine");
          else setSelectedPlan("Web · Growth Package");
          return;
        }

        // 3. Keep exact string
        setSelectedPlan(detail);
      } else {
        const isMobile = detail.category === "mobile";
        if (detail.mode === "subscription") {
          if (detail.tierName.includes("Startup")) setSelectedPlan("Web Subscription · Startup Sprint");
          else if (detail.tierName.includes("Growth Engine")) setSelectedPlan("Web Subscription · Growth Engine");
          else if (detail.tierName.includes("App Sprint")) setSelectedPlan("Mobile Subscription · App Sprint");
          else if (detail.tierName.includes("Product Powerhouse")) setSelectedPlan("Mobile Subscription · Product Powerhouse");
          else setSelectedPlan(`${isMobile ? "Mobile" : "Web"} Subscription · ${detail.tierName}`);
        } else {
          if (detail.tierName.includes("Launch")) setSelectedPlan(`${isMobile ? "Mobile" : "Web"} · Launch Package`);
          else if (detail.tierName.includes("Signature")) setSelectedPlan(`${isMobile ? "Mobile" : "Web"} · Signature Package`);
          else setSelectedPlan(`${isMobile ? "Mobile" : "Web"} · Growth Package`);
        }
      }
    };

    window.addEventListener('selectPlan', handleSelectPlanEvent as EventListener);
    return () => {
      window.removeEventListener('selectPlan', handleSelectPlanEvent as EventListener);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          plan: selectedPlan || "Not Sure Yet",
          projectType: selectedPlan.includes("Mobile") 
            ? "Mobile App" 
            : (selectedPlan.includes("Web") ? "Web & Platforms" : "Custom Project"),
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus("success");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: ""
      });
      setSelectedPlan("");

      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (error: unknown) {
      setStatus("error");
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative bg-foreground/5 border border-secondary/10 p-6 md:p-8 rounded-2xl md:rounded-[32px] backdrop-blur-xl shadow-2xl">
      <div className="space-y-5">
        
        {/* Subtle Selected Plan Indicator */}
        {selectedPlan && (
          <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-secondary/10 border border-secondary/20 text-xs">
            <span className="text-foreground">
              Selected Package: <strong className="text-secondary">{selectedPlan}</strong>
            </span>
            <button
              type="button"
              onClick={() => setSelectedPlan("")}
              className="text-gray-400 hover:text-foreground text-[11px] underline cursor-pointer"
            >
              Clear
            </button>
          </div>
        )}

        {/* Full Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-black dark:text-gray-400 uppercase tracking-widest ml-1">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-gray-500 focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-black dark:text-gray-400 uppercase tracking-widest ml-1">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
              className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-gray-500 focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all"
            />
          </div>
        </div>

        {/* Phone & Interested Plan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-black dark:text-gray-400 uppercase tracking-widest ml-1">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-gray-500 focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-black dark:text-gray-400 uppercase tracking-widest ml-1">
              Interested Plan / Service
            </label>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all appearance-none cursor-pointer"
            >
              <option value="" className="bg-background text-foreground">Select a plan or service...</option>
              {selectedPlan && !ALL_PLAN_VALUES.includes(selectedPlan) && (
                <option value={selectedPlan} className="bg-background text-foreground font-semibold">
                  {selectedPlan}
                </option>
              )}
              {PLAN_OPTIONS.map((group, idx) => (
                <optgroup key={idx} label={group.group} className="bg-background text-foreground font-semibold">
                  {group.options.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-background text-foreground font-normal">
                      {opt.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-black dark:text-gray-400 uppercase tracking-widest ml-1">
            How can we help? *
          </label>
          <textarea
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Tell us about your project, goals, or timeline..."
            className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-gray-500 focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all resize-y min-h-[110px] max-h-[300px]"
          ></textarea>
        </div>

        {/* Error Alert */}
        {status === "error" && (
          <div className="p-3.5 bg-red-500/10 border border-red-500/40 rounded-xl text-red-400 text-sm">
            {errorMessage}
          </div>
        )}

        {/* Success Alert */}
        {status === "success" && (
          <div className="p-3.5 bg-secondary/15 border border-secondary/50 rounded-xl text-secondary text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Message sent successfully! We&apos;ll be in touch within 24 hours.</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary w-full py-4 rounded-xl text-base font-bold shadow-[0_0_25px_rgba(156,254,202,0.15)] hover:shadow-[0_0_35px_rgba(156,254,202,0.3)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
        >
          {status === "loading" ? (
            <>
              <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Sending...</span>
            </>
          ) : (
            <span>Send My Message — It&apos;s Free</span>
          )}
        </button>

        <p className="text-center text-xs text-black dark:text-gray-500 font-space-grotesk">
          🔒 Your information is private and will never be shared.
        </p>
      </div>
    </form>
  );
};

const Contact: React.FC = () => {
  return (
    <section id="contact" className="pb-12 sm:pb-24 pt-12 sm:pt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Info */}
          <div className="flex flex-col justify-center pt-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4 w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Let&apos;s Connect</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-bold font-syne mb-6 tracking-tight leading-[1.12]">
              We&apos;re Here to Help <br />
              <span className="text-secondary">Your Vision Grow</span>
            </h2>

            <p className="text-black dark:text-gray-400 text-base sm:text-lg md:text-xl font-space-grotesk mb-10 max-w-lg lg:max-w-xl leading-relaxed">
              Have a question or a project in mind? We&apos;d love to hear from you. Send us a message and let&apos;s start a conversation about how we can support your journey.
            </p>

            <div className="space-y-6">
              {CONTACT_INFO.map((info, index) => (
                <div key={index} className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 shadow-[0_0_10px_rgba(156,254,202,0.1)] group-hover:shadow-[0_0_20px_rgba(156,254,202,0.3)] transition-all duration-300 shrink-0">
                    {info.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-black dark:text-gray-500 uppercase tracking-widest mb-0.5">{info.label}</p>
                    <p className="text-base sm:text-lg lg:text-xl font-medium text-foreground break-all sm:break-normal">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="relative">
            {/* Decorative glow behind form */}
            <div className="absolute -inset-4 bg-secondary/10 rounded-[40px] blur-3xl pointer-events-none -z-10" />
            <ContactFormInner />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
