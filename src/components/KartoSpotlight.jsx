import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiGooglePlayFill,
  RiExternalLinkLine,
  RiSmartphoneLine,
  RiStore2Line,
  RiEBike2Line,
  RiShieldCheckLine,
  RiMapPin2Fill,
  RiRadarLine,
  RiFlashlightFill,
  RiCheckboxCircleFill,
  RiSparklingFill,
  RiRouteLine,
} from "react-icons/ri";

import { SectionWrapper } from "../hoc";
import { karto, karto3d } from "../assets";
import { personalInfo } from "../constants";

const ROLES = [
  {
    id: "customer",
    title: "Customer App",
    icon: RiSmartphoneLine,
    color: "#f59e0b",
    tagline: "Frictionless hyperlocal ordering with live GPS tracking",
    points: [
      "Dynamic store and catalog browsing with instant search and category filters.",
      "Smart cart state management with real-time tax and delivery fee calculation.",
      "Seamless Razorpay checkout with UPI, credit/debit cards, and net banking.",
      "Live order map tracking via Socket.io with rider location updates every 3 seconds.",
      "Push alerts for every status change (Accepted, Prepared, Dispatched, Delivered).",
    ],
    stats: { label: "Order Time", value: "< 45 sec" },
  },
  {
    id: "vendor",
    title: "Vendor Portal",
    icon: RiStore2Line,
    color: "#10b981",
    tagline: "High-speed store operations and real-time inventory control",
    points: [
      "Instant sound & visual alert on new order placement with one-tap accept/reject.",
      "Live catalog item toggle (In Stock / Out of Stock) and pricing updates.",
      "Preparation time countdown and kitchen dispatch management.",
      "Daily settlement reports, net earnings summary, and commission breakdown.",
      "Order history search with customer feedback and rating metrics.",
    ],
    stats: { label: "Dispatch Speed", value: "98.5% on-time" },
  },
  {
    id: "rider",
    title: "Rider Partner",
    icon: RiEBike2Line,
    color: "#38bdf8",
    tagline: "Turn-by-turn routing with sub-150ms location streaming",
    points: [
      "Real-time delivery broadcast with automatic nearest-rider assignment algorithm.",
      "Integrated navigation routing from vendor pickup to customer doorstep.",
      "Secure delivery handover with 4-digit customer OTP verification.",
      "Daily trip log, incentive earnings calculator, and distance tracker.",
      "Battery-efficient background GPS telemetry using native device location services.",
    ],
    stats: { label: "GPS Latency", value: "< 150 ms" },
  },
  {
    id: "admin",
    title: "Admin Tower",
    icon: RiShieldCheckLine,
    color: "#a855f7",
    tagline: "Central control, multi-tenant governance and financial auditing",
    points: [
      "Multi-tenant merchant onboarding, KYC document review, and store approval.",
      "Live operations map showing active riders, ongoing deliveries, and hotspots.",
      "Automated financial reconciliation with Razorpay webhook verification.",
      "Granular role-based permissions (Super Admin, Support Lead, Dispatcher).",
      "Comprehensive telemetry logs, dispute resolution tools, and promo engine.",
    ],
    stats: { label: "Platform Uptime", value: "99.9%" },
  },
];

const STEPS = [
  { step: "1", title: "Order Placed", time: "00:00", active: true },
  { step: "2", title: "Store Prepping", time: "00:03", active: true },
  { step: "3", title: "Rider Picked", time: "00:08", active: true },
  { step: "4", title: "On The Way", time: "00:14", active: true },
  { step: "5", title: "Delivered", time: "00:22", active: false },
];

const KartoSpotlight = () => {
  const [activeRole, setActiveRole] = useState(ROLES[0]);
  const [viewMode, setViewMode] = useState("3d"); // "3d" | "diagram"

  return (
    <section id="karto-spotlight" className="relative w-full py-12 overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#f59e0b]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header (High-contrast Dark text on Beige Canvas) */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/40 text-[#b45309] text-xs sm:text-sm font-bold tracking-wide uppercase mb-4"
        >
          <RiFlashlightFill size={16} className="text-[#f59e0b]" />
          Flagship Project Spotlight
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[#121418] text-[36px] sm:text-[52px] lg:text-[60px] font-black leading-tight tracking-tight"
        >
          Karto – On-Demand Delivery Ecosystem
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-[#78716c] text-[16px] sm:text-[18px] leading-relaxed"
        >
          Engineered a production-ready, full-stack multi-role on-demand delivery platform powering{" "}
          <span className="text-[#121418] font-bold">Customers, Vendors, Riders, and Admins</span>. Deployed and verified on the Google Play Store.
        </motion.p>

        {/* Live CTA buttons */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
          <a
            href={personalInfo.kartoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#f59e0b] to-[#ea580c] text-white font-bold flex items-center gap-2 shadow-[0_10px_30px_rgba(245,158,11,0.35)] hover:scale-105 transition-all duration-300"
          >
            <span>Visit Karto.online</span>
            <RiExternalLinkLine size={16} />
          </a>

          <a
            href={personalInfo.kartoPlayStore}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-2xl bg-[#0d0f14] border border-emerald-500/40 text-emerald-400 font-bold flex items-center gap-2 hover:bg-emerald-500/15 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
          >
            <RiGooglePlayFill size={20} />
            <span>Karto on Google Play</span>
          </a>
        </div>
      </div>

      {/* SPOTLIGHT SHOWCASE GRID: Dark Obsidian Cards on Beige */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-stretch">
        
        {/* LEFT: INTERACTIVE SIMULATOR & 3D / ARCHITECTURE GRAPHIC */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-[32px] border border-white/10 bg-[#0d0f14] p-6 sm:p-8 flex flex-col justify-between shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
        >
          <div>
            {/* Top Bar with Live Tag and Image Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-white font-bold text-sm">Real-Time Delivery Engine</span>
              </div>

              {/* View Mode Toggle: 3D Render vs Architecture */}
              <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10">
                <button
                  type="button"
                  onClick={() => setViewMode("3d")}
                  className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    viewMode === "3d"
                      ? "bg-[#f59e0b] text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <RiSparklingFill size={12} />
                  <span>3D Diorama</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("diagram")}
                  className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    viewMode === "diagram"
                      ? "bg-[#f59e0b] text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <RiRouteLine size={12} />
                  <span>Architecture</span>
                </button>
              </div>
            </div>

            {/* Graphic Mockup Preview with Animated View Mode */}
            <div className="relative mt-6 rounded-2xl overflow-hidden border border-white/10 group bg-black/60">
              <AnimatePresence mode="wait">
                {viewMode === "3d" ? (
                  <motion.img
                    key="3d"
                    src={karto3d}
                    alt="Karto 3D Isometric Delivery Ecosystem"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-[280px] sm:h-[350px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <motion.img
                    key="diagram"
                    src={karto}
                    alt="Karto Delivery System Architecture"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-[280px] sm:h-[350px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/15">
                  <p className="text-[#fbbf24] text-xs font-bold">4 Multi-Role Workflows</p>
                  <p className="text-white text-xs">Customer • Vendor • Rider • Admin</p>
                </div>
                <div className="p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/15">
                  <p className="text-emerald-400 text-xs font-bold">Razorpay &amp; Firebase</p>
                  <p className="text-white text-xs">Integrated &amp; Live</p>
                </div>
              </div>
            </div>

            {/* Simulated Live Order Telemetry Stepper */}
            <div className="mt-8 p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-white text-xs sm:text-sm font-extrabold flex items-center gap-2">
                  <RiMapPin2Fill className="text-[#f59e0b]" />
                  Active Dispatch Simulator (Order #KR-9421)
                </p>
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono">
                  <RiRadarLine className="animate-spin text-sm" />
                  <span>12 min remaining</span>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {STEPS.map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-2 transition-all ${
                        step.active
                          ? "bg-[#f59e0b] text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                          : "bg-white/10 text-white/40 border border-white/10"
                      }`}
                    >
                      {step.active ? "✓" : step.step}
                    </div>
                    <span className="text-[11px] sm:text-xs text-white/90 font-medium leading-tight">
                      {step.title}
                    </span>
                    <span className="text-[10px] text-white/40 font-mono mt-0.5">{step.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tech Stack Footer */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2.5">
            {[
              "React Native",
              "Node.js",
              "Express.js",
              "PostgreSQL",
              "Prisma ORM",
              "Socket.io",
              "Firebase",
              "Razorpay",
              "Google Play",
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-white/80"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: INTERACTIVE ROLE SWITCHER */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-between rounded-[32px] border border-white/10 bg-[#0d0f14] p-6 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
        >
          <div>
            <div className="mb-6">
              <h3 className="text-white text-xl font-black">Role Architecture</h3>
              <p className="text-white/60 text-xs sm:text-sm mt-1">
                Explore the 4 specialized workflows powering Karto:
              </p>
            </div>

            {/* Role Tab Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {ROLES.map((role) => {
                const Icon = role.icon;
                const isSelected = activeRole.id === role.id;

                return (
                  <button
                    key={role.id}
                    onClick={() => setActiveRole(role)}
                    className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all duration-300 ${
                      isSelected
                        ? "border-[#f59e0b] bg-[#f59e0b]/15 shadow-[0_0_25px_rgba(245,158,11,0.2)]"
                        : "border-white/10 bg-white/[0.03] hover:border-white/30"
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${role.color}25`,
                        color: role.color,
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-white text-xs sm:text-sm font-bold">{role.title}</p>
                      <p className="text-white/50 text-[11px]">{role.stats.label}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Role Content Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: activeRole.color }}
                    />
                    <h4 className="text-white font-black text-lg">{activeRole.title}</h4>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: `${activeRole.color}20`,
                      color: activeRole.color,
                    }}
                  >
                    {activeRole.stats.value}
                  </span>
                </div>

                <p className="text-white/70 text-xs sm:text-sm mb-4 italic">
                  "{activeRole.tagline}"
                </p>

                <ul className="space-y-2.5">
                  {activeRole.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/85">
                      <RiCheckboxCircleFill
                        className="mt-0.5 shrink-0"
                        style={{ color: activeRole.color }}
                        size={16}
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <p className="text-[#fbbf24] font-black text-lg">4.8 ★</p>
              <p className="text-white/50 text-[11px]">Play Store</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <p className="text-emerald-400 font-black text-lg">&lt; 150ms</p>
              <p className="text-white/50 text-[11px]">Socket Sync</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <p className="text-cyan-400 font-black text-lg">100%</p>
              <p className="text-white/50 text-[11px]">Multi-Role</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionWrapper(KartoSpotlight, "karto-spotlight");
