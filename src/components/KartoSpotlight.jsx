import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiGooglePlayFill,
  RiArrowRightUpLine,
  RiSmartphoneLine,
  RiStore2Line,
  RiEBike2Line,
  RiShieldCheckLine,
  RiRadarLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";

import { karto, karto3d } from "../assets";
import { personalInfo } from "../constants";
import SyntaxCVSectionLayout from "./SyntaxCVSectionLayout";

const ROLES = [
  {
    id: "customer",
    title: "Customer Mobile App",
    icon: RiSmartphoneLine,
    stat: "< 45 sec",
    statLabel: "Order Velocity",
    desc: "Instant store browsing, smart cart state, Razorpay checkout with UPI & cards, live map order tracking via Socket.io with rider location streamed every 3 seconds.",
  },
  {
    id: "vendor",
    title: "Vendor Management Portal",
    icon: RiStore2Line,
    stat: "98.5%",
    statLabel: "On-Time Dispatch",
    desc: "Instant audio & visual notification on incoming orders, kitchen preparation countdown, dynamic catalog stock toggles, daily settlement reports, and net margin analytics.",
  },
  {
    id: "rider",
    title: "Rider Delivery Partner",
    icon: RiEBike2Line,
    stat: "< 150ms",
    statLabel: "GPS Latency",
    desc: "Real-time delivery broadcast with nearest-rider proximity assignment algorithm, turn-by-turn routing, live customer contact masking, and automated proof of delivery.",
  },
  {
    id: "admin",
    title: "Central Admin Console",
    icon: RiShieldCheckLine,
    stat: "100%",
    statLabel: "Audit Trail",
    desc: "Platform telemetry, dispute resolution dashboard, automated commission payouts, merchant onboarding verification, and system health monitoring.",
  },
];

const KartoSpotlight = () => {
  const [activeRole, setActiveRole] = useState(ROLES[0]);
  const [activeImage, setActiveImage] = useState("3d"); // "3d" | "schematic"

  return (
    <SyntaxCVSectionLayout
      id="karto-spotlight"
      number="04."
      title="flagship project"
    >
      <div className="space-y-10">
        {/* Top Metadata & Headline */}
        <div>
          <div className="flex flex-wrap items-center gap-2 text-sm font-mono text-[#949494]">
            <span className="text-white font-medium">Hyperlocal Delivery Ecosystem</span>
            <span>•</span>
            <span>Android (Play Store) &amp; Web</span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded-full bg-[#00ffae]/10 text-[#00ffae] border border-[#00ffae]/30 text-xs">
              Google Play Verified
            </span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            Karto – Multi-Role On-Demand Delivery Platform
          </h3>

          <p className="mt-4 text-base sm:text-lg text-[#d4d4d4] leading-relaxed max-w-3xl">
            Engineered a production-ready, full-stack 4-tier delivery platform connecting{" "}
            <span className="text-white font-semibold">
              Customers, Vendors, Delivery Riders, and Dispatch Admins
            </span>. Designed with high-throughput WebSockets for sub-150ms rider telemetry, Razorpay payment processing, and deployed live to the Google Play Store.
          </p>

          {/* Action CTAs with Syntax CV rotating arrow */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={personalInfo.kartoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-6 py-3 rounded-lg bg-[#00ffae] text-black font-semibold text-sm font-mono flex items-center gap-2 hover:bg-[#00ffae]/90 shadow-[0_0_20px_rgba(0,255,174,0.3)] transition"
            >
              <span>Visit Karto.online</span>
              <RiArrowRightUpLine
                size={17}
                className="group-hover:rotate-45 transition-transform duration-300"
              />
            </a>

            <a
              href={personalInfo.kartoPlayStore}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-6 py-3 rounded-lg border border-white/[0.15] border-b-2 hover:border-[#00ffae] hover:text-[#00ffae] text-white text-sm font-mono font-medium transition-all duration-300 flex items-center gap-2"
            >
              <RiGooglePlayFill size={18} className="text-[#00ffae]" />
              <span>Google Play Store</span>
              <RiArrowRightUpLine
                size={17}
                className="group-hover:rotate-45 transition-transform duration-300"
              />
            </a>
          </div>
        </div>

        {/* 4 Role Cards in Syntax CV Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ROLES.map((role) => {
            const Icon = role.icon;
            const isSelected = activeRole.id === role.id;

            return (
              <div
                key={role.id}
                onClick={() => setActiveRole(role)}
                className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "border-[#00ffae] border-b-2 border-b-[#00ffae] bg-white/[0.04] shadow-[0_0_25px_rgba(0,255,174,0.15)]"
                    : "border-white/[0.12] border-b-2 border-b-white/[0.2] bg-white/[0.02] hover:border-white/40"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00ffae]">
                      <Icon size={20} />
                    </div>
                    <h4 className="text-lg font-bold text-white">
                      {role.title}
                    </h4>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-bold text-[#00ffae] font-mono">
                      {role.stat}
                    </div>
                    <div className="text-[11px] text-[#949494] font-mono">
                      {role.statLabel}
                    </div>
                  </div>
                </div>

                <p className="mt-3.5 text-sm text-[#949494] leading-relaxed">
                  {role.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Visual Showcase Card with Image Switcher */}
        <div className="p-6 sm:p-8 rounded-2xl border border-white/[0.12] bg-[#111111]">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00ffae] animate-ping" />
              <span className="text-white font-mono font-bold text-sm">
                Active Architecture Simulator
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveImage("3d")}
                className={`px-3 py-1 rounded text-xs font-mono transition ${
                  activeImage === "3d"
                    ? "bg-[#00ffae] text-black font-bold"
                    : "text-[#949494] hover:text-white"
                }`}
              >
                3D Ecosystem
              </button>
              <button
                onClick={() => setActiveImage("schematic")}
                className={`px-3 py-1 rounded text-xs font-mono transition ${
                  activeImage === "schematic"
                    ? "bg-[#00ffae] text-black font-bold"
                    : "text-[#949494] hover:text-white"
                }`}
              >
                Delivery Flow
              </button>
            </div>
          </div>

          <div className="mt-6 relative h-[280px] sm:h-[380px] rounded-xl overflow-hidden bg-black/60 flex items-center justify-center">
            <img
              src={activeImage === "3d" ? karto3d : karto}
              alt="Karto Delivery Ecosystem"
              className="w-full h-full object-cover object-center filter contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/90">
              <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur border border-white/10">
                Current Inspection: {activeRole.title}
              </span>
              <span className="px-2.5 py-1 rounded bg-[#00ffae]/20 text-[#00ffae] border border-[#00ffae]/40">
                Verified on Play Store
              </span>
            </div>
          </div>
        </div>
      </div>
    </SyntaxCVSectionLayout>
  );
};

export default KartoSpotlight;
