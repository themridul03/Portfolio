import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import React, { useMemo, useRef, useState } from "react";
import {
  RiArrowRightUpLine,
  RiGithubFill,
  RiLinkedinBoxFill,
  RiMailFill,
  RiMapPin2Fill,
  RiSendPlaneFill,
  RiSparkling2Fill,
  RiWhatsappFill,
} from "react-icons/ri";

import { SectionWrapper } from "../hoc";
import useMagnetic from "../reactbits/hooks/useMagnetic";
import useSoundCue from "../reactbits/hooks/useSoundCue";
import { styles } from "../styles";
import { slideIn } from "../utils/motion";
import { EarthCanvas } from "./canvas";
import Toast from "./ui/toast";

const contactLinks = [
  {
    title: "Email",
    value: "mradulm148@gmail.com",
    icon: RiMailFill,
    href: "mailto:mradulm148@gmail.com",
  },
  {
    title: "Phone & WhatsApp",
    value: "+91-8418069880",
    icon: RiWhatsappFill,
    href: "https://wa.me/918418069880",
  },
  {
    title: "Location",
    value: "Shahjahanpur, UP, 242221",
    icon: RiMapPin2Fill,
    href: "https://maps.google.com/?q=Shahjahanpur,Uttar+Pradesh",
  },
  {
    title: "GitHub",
    value: "github.com/themridul03",
    icon: RiGithubFill,
    href: "https://github.com/themridul03",
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
      play("error");
      showToast("Please fill in all fields before submitting.", "error");
      return;
    }

    if (!isValidEmail(form.email)) {
      play("error");
      showToast("Please enter a valid email address.", "error");
      return;
    }

    if (form.message.trim().length < 15) {
      play("error");
      showToast("Please write a little more about your project.", "error");
      return;
    }

    setLoading(true);

    const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setLoading(false);
      play("error");
      showToast("EmailJS configuration is missing.", "error");
      return;
    }

    emailjs
      .send(
        serviceId,
        templateId,
        {
          user_name: form.name,
          my_name: "Mridul Mishra",
          user_email: form.email,
          my_email: "mradulm148@gmail.com",
          user_message: form.message,
        },
        publicKey
      )
      .then(
        () => {
          setLoading(false);
          play("success");
          showToast("Message sent successfully. I will get back to you soon.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          play("error");
          showToast("Something went wrong. Please try again.", "error");
        }
      );
  };

  const inputClass = (name) =>
    `w-full rounded-2xl bg-[#07080d]/90 px-5 py-4 text-white placeholder:text-white/35 outline-none border transition-all duration-300 ${
      focused === name
        ? "border-[#c19d23] shadow-[0_0_35px_rgba(193,157,35,0.18)]"
        : "border-white/10 hover:border-white/20"
    }`;

  return (
    <>
      {toast.open && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, open: false })}
        />
      )}

      <div className="relative w-full min-h-screen overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#c19d23]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[130px]" />

        <motion.div
          variants={slideIn("down", "spring", 0.1, 0.9)}
          className="relative z-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#c19d23] text-sm font-semibold mb-5">
            <RiSparkling2Fill />
            Available for freelance & collaborations
          </div>

          <h2 className="text-white font-black md:text-[64px] sm:text-[52px] xs:text-[42px] text-[32px] px-4">
            Let&apos;s Build Something
            <span className="block bg-gradient-to-r from-[#c19d23] via-[#f7df8a] to-white bg-clip-text text-transparent">
              Amazing Together
            </span>
          </h2>

          <p className="mt-5 text-secondary text-[16px] max-w-2xl mx-auto leading-7 px-4">
            Have a project, product idea, automation workflow or collaboration
            in mind? Send me a message and let&apos;s discuss it.
          </p>
        </motion.div>

        <div className="relative z-10 xl:mt-14 mt-10 flex xl:flex-row flex-col-reverse gap-8 lg:gap-10 overflow-hidden text-white px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={slideIn("left", "tween", 0.2, 1)}
            className="flex-[0.85] w-full xl:w-[42rem] rounded-[30px] border border-white/10 bg-[#080b14]/85 backdrop-blur-xl p-5 sm:p-7 lg:p-9 shadow-2xl"
          >
            <p className={`text-[#c19d23] ${styles.sectionSubText}`}>
              Get in touch
            </p>

            <h3
              className={`${styles.sectionHeadText} text-[30px] sm:text-[36px] lg:text-[42px]`}
            >
              Contact.
            </h3>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactLinks.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.a
                    key={item.title}
                    href={item.href}
                    target={item.href === "#" ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.45 }}
                    viewport={{ once: true }}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:border-[#c19d23]/50 hover:bg-[#c19d23]/5 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#c19d23]/10 border border-[#c19d23]/20 flex items-center justify-center text-[#c19d23] group-hover:scale-110 transition">
                        <Icon size={22} />
                      </div>

                      <div>
                        <p className="text-white font-semibold text-sm">
                          {item.title}
                        </p>
                        <p className="text-secondary text-xs mt-1">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-6"
              id="contact"
            >
              <label className="flex flex-col">
                <span className="font-semibold text-white mb-3 text-sm">
                  Full Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused("")}
                  placeholder="Enter your name"
                  className={inputClass("name")}
                />
              </label>

              <label className="flex flex-col">
                <span className="font-semibold text-white mb-3 text-sm">
                  Email Address
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                  placeholder="you@example.com"
                  className={inputClass("email")}
                />
              </label>

              <label className="flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-white text-sm">
                    Your Message
                  </span>
                  <span className="text-xs text-secondary">
                    {messageCount}/500
                  </span>
                </div>

                <textarea
                  rows={6}
                  maxLength={500}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused("")}
                  placeholder="Tell me about your project..."
                  className={`${inputClass("message")} resize-none`}
                />
              </label>

              <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                <button
                  ref={submitButtonRef}
                  type="submit"
                  disabled={loading}
                  style={magneticStyle}
                  className="group relative overflow-hidden px-8 py-4 rounded-2xl w-fit text-white font-bold bg-gradient-to-r from-[#c19d23] via-[#d6b642] to-[#c19d23] shadow-lg shadow-[#c19d23]/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {loading ? "Sending..." : "Send Message"}
                    {loading ? null : <RiSendPlaneFill />}
                  </span>
                  <span className="absolute inset-0 bg-white/25 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 skew-x-12" />
                </button>

                <a
                  href="https://wa.me/8418069880"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-secondary hover:text-[#c19d23] transition"
                >
                  <RiWhatsappFill />
                  Quick WhatsApp chat
                  <RiArrowRightUpLine />
                </a>
              </div>
            </form>
          </motion.div>

          <motion.div
            variants={slideIn("right", "tween", 0.2, 1)}
            className="xl:flex-1 my-auto h-[330px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full relative"
          >
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-[#c19d23]/10 via-transparent to-cyan-500/10 blur-2xl" />

            <div className="relative h-full rounded-[32px] border border-white/10 bg-[#080b14]/40 backdrop-blur-xl overflow-hidden">
              <EarthCanvas />

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                viewport={{ once: true }}
                className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-4"
              >
                <p className="text-white font-semibold">
                  Response Time
                </p>
                <p className="text-secondary text-sm mt-1">
                  Usually replies within 24 hours.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");