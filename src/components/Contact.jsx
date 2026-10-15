import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import React, { useMemo, useRef, useState } from "react";
import {
  RiArrowRightUpLine,
  RiGithubFill,
  RiLinkedinBoxFill,
  RiMailFill,
  RiMapPin2Fill,
  RiPhoneFill,
  RiSendPlaneFill,
  RiWhatsappFill,
} from "react-icons/ri";

import useMagnetic from "../reactbits/hooks/useMagnetic";
import useSoundCue from "../reactbits/hooks/useSoundCue";
import Toast from "./ui/toast";
import SyntaxCVSectionLayout from "./SyntaxCVSectionLayout";

const contactLinks = [
  {
    title: "Phone & WhatsApp",
    value: "+91-8418069880",
    icon: RiPhoneFill,
    href: "tel:+918418069880",
    label: "+91 8418069880",
  },
  {
    title: "Email",
    value: "mradulm148@gmail.com",
    icon: RiMailFill,
    href: "mailto:mradulm148@gmail.com",
    label: "mradulm148@gmail.com",
  },
  {
    title: "Location",
    value: "Shahjahanpur, UP, India",
    icon: RiMapPin2Fill,
    href: "https://maps.google.com/?q=Shahjahanpur,Uttar+Pradesh",
    label: "India (UTC+5:30)",
  },
  {
    title: "GitHub",
    value: "github.com/themridul03",
    icon: RiGithubFill,
    href: "https://github.com/themridul03",
    label: "themridul03",
  },
  {
    title: "LinkedIn",
    value: "linkedin.com/in/mahii7781",
    icon: RiLinkedinBoxFill,
    href: "https://www.linkedin.com/in/mahii7781/",
    label: "in/mahii7781",
  },
];

const Contact = () => {
  const formRef = useRef();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [focused, setFocused] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const { play } = useSoundCue("notification");

  const { ref: submitButtonRef, style: magneticStyle } = useMagnetic({
    radius: 90,
    strength: 0.35,
  });

  const messageCount = useMemo(() => form.message.length, [form.message]);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showToast = (message, type = "success") => {
    setToast({
      open: true,
      message,
      type,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      play?.("error");
      showToast("Please fill in all fields before transmitting.", "error");
      return;
    }

    if (!isValidEmail(form.email)) {
      play?.("error");
      showToast("Please enter a valid email address.", "error");
      return;
    }

    if (form.message.trim().length < 10) {
      play?.("error");
      showToast("Please write a little more about your requirements.", "error");
      return;
    }

    setLoading(true);

    const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setLoading(false);
      // Fallback: open mailto directly
      window.location.href = `mailto:mradulm148@gmail.com?subject=Project Inquiry from ${encodeURIComponent(
        form.name
      )}&body=${encodeURIComponent(form.message)}`;
      showToast("Opening default mail client with your message.");
      return;
    }

    emailjs
      .send(
        serviceId,
        templateId,
        {
          user_name: form.name,
          my_name: "Mridul Mohan Mishra",
          user_email: form.email,
          my_email: "mradulm148@gmail.com",
          user_message: form.message,
        },
        publicKey
      )
      .then(
        () => {
          setLoading(false);
          play?.("success");
          showToast("Message transmitted successfully. I will get back to you promptly.");
          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          play?.("error");
          showToast("Failed to transmit via EmailJS. Opening mail client instead.", "error");
          window.location.href = `mailto:mradulm148@gmail.com?subject=Project Inquiry from ${encodeURIComponent(
            form.name
          )}&body=${encodeURIComponent(form.message)}`;
        }
      );
  };

  return (
    <>
      {toast.open && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, open: false })}
        />
      )}

      {/* SYNTAX CV SECTION 10: CONTACT */}
      <SyntaxCVSectionLayout id="contact" number="10." title="contact">
        <div className="space-y-10">
          {/* Subline & Introduction */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Let&apos;s build something great.
            </h3>
            <p className="mt-2 text-base text-[#d4d4d4] leading-relaxed max-w-2xl">
              Available for full-time enterprise software engineering roles, cloud microservice architectures, and high-impact full-stack development.
            </p>
          </div>

          {/* Direct Channels Cards (Syntax CV style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactLinks.map((item, idx) => {
              const Icon = item.icon;

              return (
                <motion.a
                  key={item.title}
                  href={item.href}
                  target={item.href.startsWith("mailto:") || item.href.startsWith("tel:") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="p-5 rounded-xl border border-white/[0.12] border-b-2 border-b-white/[0.2] bg-white/[0.02] hover:border-[#00ffae] hover:border-b-[#00ffae] transition-all duration-300 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00ffae] group-hover:scale-105 transition">
                      <Icon size={19} />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-[#949494] uppercase tracking-wider">
                        {item.title}
                      </p>
                      <p className="text-base font-medium text-white group-hover:text-[#00ffae] transition mt-0.5">
                        {item.label}
                      </p>
                    </div>
                  </div>

                  <RiArrowRightUpLine
                    size={17}
                    className="text-[#949494] group-hover:text-[#00ffae] group-hover:rotate-45 transition-transform duration-300"
                  />
                </motion.a>
              );
            })}
          </div>

          {/* Clean Message Transmission Form in Syntax CV Style */}
          <div className="p-6 sm:p-8 rounded-2xl border border-white/[0.12] bg-[#111111]">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-[#00ffae]" />
              <span>Direct Transmission Protocol</span>
            </h4>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-mono text-[#949494] uppercase tracking-wider">
                    Your Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused("")}
                    placeholder="e.g. Alex Rivera"
                    className={`w-full px-4 py-3 rounded-lg bg-[#161616] text-white text-sm font-mono border transition-all duration-200 outline-none ${
                      focused === "name"
                        ? "border-[#00ffae] shadow-[0_0_15px_rgba(0,255,174,0.2)]"
                        : "border-white/[0.12]"
                    }`}
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-mono text-[#949494] uppercase tracking-wider">
                    Email Address
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused("")}
                    placeholder="alex@company.com"
                    className={`w-full px-4 py-3 rounded-lg bg-[#161616] text-white text-sm font-mono border transition-all duration-200 outline-none ${
                      focused === "email"
                        ? "border-[#00ffae] shadow-[0_0_15px_rgba(0,255,174,0.2)]"
                        : "border-white/[0.12]"
                    }`}
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#949494] uppercase tracking-wider">
                    Message
                  </span>
                  <span className="text-xs font-mono text-[#949494]">
                    {messageCount}/500
                  </span>
                </div>
                <textarea
                  rows={4}
                  maxLength={500}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused("")}
                  placeholder="Tell me about your product, team, or opportunity..."
                  className={`w-full px-4 py-3 rounded-lg bg-[#161616] text-white text-sm font-mono border transition-all duration-200 outline-none resize-none ${
                    focused === "message"
                      ? "border-[#00ffae] shadow-[0_0_15px_rgba(0,255,174,0.2)]"
                      : "border-white/[0.12]"
                  }`}
                />
              </label>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  ref={submitButtonRef}
                  type="submit"
                  disabled={loading}
                  style={magneticStyle}
                  className="group px-7 py-3 rounded-lg bg-[#00ffae] text-black font-semibold text-sm font-mono flex items-center gap-2 hover:bg-[#00ffae]/90 shadow-[0_0_20px_rgba(0,255,174,0.3)] transition disabled:opacity-50"
                >
                  <span>{loading ? "Transmitting..." : "Send Transmission"}</span>
                  <RiSendPlaneFill
                    size={16}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </button>

                <a
                  href="https://wa.me/918418069880"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono text-[#949494] hover:text-[#00ffae] transition"
                >
                  <RiWhatsappFill size={16} className="text-[#00ffae]" />
                  <span>Quick WhatsApp Ping</span>
                  <RiArrowRightUpLine size={13} />
                </a>
              </div>
            </form>
          </div>
        </div>
      </SyntaxCVSectionLayout>

      {/* SYNTAX CV SIGNATURE THANKS SECTION (EXACT REPLICA) */}
      <footer className="w-full pt-16 pb-12 border-t border-white/[0.12]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <p className="text-[#00ffae] font-mono text-xs tracking-[0.25em] uppercase font-bold mb-4">
              Final Transmission
            </p>
            <h2 className="text-white font-bold text-5xl sm:text-7xl lg:text-[100px] uppercase tracking-tighter leading-[0.88] select-none font-sans">
              Thanks <br />
              <span className="text-[#949494] hover:text-white transition-colors duration-300">
                For Being Here.
              </span>
            </h2>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group w-fit px-6 py-3.5 rounded-lg border border-white/[0.15] border-b-2 hover:border-[#00ffae] text-white font-mono text-xs uppercase tracking-wider flex items-center gap-3 transition-all duration-300 self-start md:self-end"
          >
            <span>Back To Top</span>
            <span className="w-6 h-6 rounded bg-white/10 group-hover:bg-[#00ffae] group-hover:text-black flex items-center justify-center transition">
              ↑
            </span>
          </button>
        </div>

        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#949494]">
          <p>© 2026 MRIDUL MOHAN MISHRA. ALL RIGHTS RESERVED.</p>
          <p className="text-center">
            
          </p>
          <div className="flex items-center gap-4 text-[#949494]">
            <a
              href="https://github.com/themridul03"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00ffae] transition"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href="https://www.linkedin.com/in/mahii7781/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00ffae] transition"
            >
              LinkedIn
            </a>
            <span>•</span>
            <a
              href="mailto:mradulm148@gmail.com"
              className="hover:text-[#00ffae] transition"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;