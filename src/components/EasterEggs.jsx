import React, { useEffect, useRef, useState } from "react";
import soundEffects from "../utils/soundEffects";
import { useDevToolsOpen } from "../utils/useDevToolsOpen";
import NyanCat from "./NyanCat";

const OWNER_NAME = "mridul";
const OWNER_ALIASES = ["mridul", "Mridul", "MRIDUL"];
const SECRET_COMMANDS = {
  portfolio: "Shows portfolio diagnostics",
  matrix: "Enables developer matrix mode",
  bankai: "Unlocks anime console effect",
  clear: "Clears secret console",
};

const printLine = (text, style = "") => {
  console.log(`%c${text}`, style);
};

const styles = {
  system:
    "color:#888;font-family:Menlo,Consolas,monospace;font-size:12px;letter-spacing:1px;",
  title:
    "color:#c19d23;font-size:28px;font-weight:900;font-family:Arial,sans-serif;text-shadow:0 0 18px rgba(193,157,35,.45);",
  body:
    "background:#080b14;color:#f5f5f5;padding:14px 18px;border-left:5px solid #c19d23;line-height:1.7;font-family:Arial,sans-serif;font-size:15px;border-radius:8px;",
  success:
    "background:#07130d;color:#52ff9d;padding:14px 18px;border-left:5px solid #22c55e;font-weight:700;font-size:15px;border-radius:8px;",
  warning:
    "background:#1c1404;color:#facc15;padding:14px 18px;border-left:5px solid #c19d23;font-weight:700;font-size:15px;border-radius:8px;",
  error:
    "background:#1a0808;color:#ff6b6b;padding:14px 18px;border-left:5px solid #ef4444;font-weight:700;font-size:15px;border-radius:8px;",
  command:
    "background:#111827;color:#8ec5ff;padding:6px 10px;border-radius:6px;font-weight:700;",
};

const createFloatingBadge = (text = "ADMIN MODE UNLOCKED") => {
  if (document.getElementById("portfolio-secret-badge")) return;

  const badge = document.createElement("div");
  badge.id = "portfolio-secret-badge";
  badge.innerText = text;

  Object.assign(badge.style, {
    position: "fixed",
    right: "22px",
    bottom: "22px",
    zIndex: "999999",
    padding: "14px 18px",
    borderRadius: "18px",
    background:
      "linear-gradient(135deg, rgba(193,157,35,.95), rgba(8,11,20,.95))",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
    fontWeight: "800",
    fontSize: "13px",
    letterSpacing: "1px",
    border: "1px solid rgba(255,255,255,.22)",
    boxShadow: "0 20px 60px rgba(193,157,35,.35)",
    backdropFilter: "blur(16px)",
    transform: "translateY(30px)",
    opacity: "0",
    transition: "all .5s ease",
  });

  document.body.appendChild(badge);

  requestAnimationFrame(() => {
    badge.style.transform = "translateY(0)";
    badge.style.opacity = "1";
  });

  setTimeout(() => {
    badge.style.transform = "translateY(30px)";
    badge.style.opacity = "0";

    setTimeout(() => {
      badge.remove();
    }, 600);
  }, 4500);
};

const createMatrixRain = () => {
  if (document.getElementById("portfolio-matrix-rain")) return;

  const canvas = document.createElement("canvas");
  canvas.id = "portfolio-matrix-rain";

  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    zIndex: "999998",
    pointerEvents: "none",
    opacity: "0.18",
  });

  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  resize();
  window.addEventListener("resize", resize);

  const chars = "01MRIDULAIKARTOFULLSTACK";
  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  const interval = setInterval(() => {
    ctx.fillStyle = "rgba(8, 11, 20, 0.12)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#c19d23";
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * fontSize, y * fontSize);

      if (y * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i] += 1;
    });
  }, 45);

  setTimeout(() => {
    clearInterval(interval);
    window.removeEventListener("resize", resize);
    canvas.remove();
  }, 9000);
};

const printSecretHelp = () => {
  console.clear();

  printLine("// PORTFOLIO_SECRET_TERMINAL", styles.system);
  printLine("✨ SECRET MODE UNLOCKED", styles.title);

  printLine(
    `Welcome to Mridul Mishra's hidden developer console.

Available commands:
• portfolio
• matrix
• Bankai
• clear

Tip: Type any command directly in the console and press Enter.`,
    styles.body
  );

  Object.entries(SECRET_COMMANDS).forEach(([command, description]) => {
    console.log(
      `%c${command}%c  → ${description}`,
      styles.command,
      "color:#d1d5db;font-size:14px;font-family:Arial,sans-serif;"
    );
  });
};

const EasterEggs = () => {
  const { isDevToolsOpen } = useDevToolsOpen();
  const [showCat, setShowCat] = useState(false);
  const unlockedRef = useRef(false);

  useEffect(() => {
    if (!isDevToolsOpen) return;
    if (typeof console === "undefined") return;

    console.clear();

    printLine("// SYSTEM_LOG: UNEXPECTED_ACCESS", styles.system);
    printLine("Hold on... you found the hidden layer. 👀", styles.title);

    const introTimer = setTimeout(() => {
      console.clear();

      printLine("// SECURITY_SCAN: PASSED", styles.system);
      printLine(
        `This portfolio has a secret developer mode.

Password hint:
Type the first name of the person who built this website.`,
        styles.body
      );

      OWNER_ALIASES.forEach((name) => {
        if (Object.hasOwn(window, name)) return;

        Object.defineProperty(window, name, {
          configurable: true,
          get() {
            if (unlockedRef.current) return "Secret mode already unlocked.";

            unlockedRef.current = true;
            window.__easterEggUnlocked = true;

            soundEffects.playMagic?.();
            createFloatingBadge();
            printSecretHelp();

            return "Initializing Portfolio Admin Mode...";
          },
        });
      });

      if (!Object.hasOwn(window, "portfolio")) {
        Object.defineProperty(window, "portfolio", {
          configurable: true,
          get() {
            console.clear();

            printLine("// PORTFOLIO_DIAGNOSTICS", styles.system);
            printLine("Mridul Mishra — Developer Profile", styles.title);

            console.table({
              Name: "Mridul Mishra",
              Role: "Full Stack Developer",
              Focus: "AI Automation + Scalable Products",
              Projects: "Karto, AI Gas Nomination Agent, Utility Tariff Platform",
              Theme: "Black + Gold Premium UI",
              Status: "Available for collaboration",
            });

            printLine(
              "This section is designed to surprise recruiters, developers and curious visitors.",
              styles.success
            );

            return "Portfolio diagnostics loaded.";
          },
        });
      }

      if (!Object.hasOwn(window, "matrix")) {
        Object.defineProperty(window, "matrix", {
          configurable: true,
          get() {
            soundEffects.playMagic?.();
            createMatrixRain();

            printLine("// MATRIX_MODE: ENABLED", styles.system);
            printLine("Digital rain activated for 9 seconds.", styles.success);

            return "Matrix mode started.";
          },
        });
      }

      if (!Object.hasOwn(window, "clear")) {
        Object.defineProperty(window, "clear", {
          configurable: true,
          get() {
            console.clear();
            return "Console cleared.";
          },
        });
      }

      if (!Object.hasOwn(window, "Bankai")) {
        Object.defineProperty(window, "Bankai", {
          configurable: true,
          get() {
            console.clear();
            soundEffects.playMagic?.();

            printLine(
              "💥 BANKAI! Katen Kyokotsu: Karamatsu Shinju 🗡️",
              "color:#ff1d1d;background:#080b14;font-size:28px;font-weight:900;padding:14px 18px;border-radius:10px;border:2px solid #550000;text-shadow:0 0 18px red;"
            );

            printLine(
              "Hidden anime command unlocked. This portfolio has layers.",
              styles.warning
            );

            return "Bankai activated.";
          },
        });
      }
    }, 1000);

    const keyHandler = (event) => {
      const key = event.key.toLowerCase();

      if (key === "m" && window.__easterEggUnlocked) {
        setShowCat((prev) => !prev);
        soundEffects.playMagic?.();

        printLine(
          "🌈 Nyan Mode toggled. Press M again to hide it.",
          styles.success
        );
      }

      if (key === "escape") {
        setShowCat(false);
      }
    };

    window.addEventListener("keydown", keyHandler);

    return () => {
      clearTimeout(introTimer);
      window.removeEventListener("keydown", keyHandler);
    };
  }, [isDevToolsOpen]);

  return showCat ? <NyanCat /> : null;
};

export default EasterEggs;