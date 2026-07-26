"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toggleSound, playSound, isSoundEnabled } from "@/utils/sound";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Skills", href: "#skills" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Social", href: "#social" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    setSoundEnabled(isSoundEnabled());
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundEnabled(newState);
    if (newState) {
      playSound("levelUp");
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "nav-glass" : ""
        }`}
        style={{
          padding: scrolled ? "0.75rem 0" : "1.25rem 0",
        }}
      >
        <div className="w-full max-w-none px-6 md:px-12 flex items-center justify-between">
          {/* Logo & Character Info */}
          <motion.a
            href="#home"
            className="flex items-center gap-3 group shrink-0"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm"
                style={{
                  background: "rgba(62, 232, 181, 0.1)",
                  border: "1px solid rgba(62, 232, 181, 0.3)",
                  fontFamily: "var(--font-mono)",
                  color: "var(--accent-secondary)",
                }}
              >
                MK
              </div>
              <div
                className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full animate-pulse"
                style={{
                  background: "var(--accent-primary)",
                  boxShadow: "0 0 10px rgba(232, 168, 73, 0.8)",
                }}
              />
            </div>
            <div className="flex flex-col">
              <span
                className="text-xs sm:text-sm tracking-wider font-bold"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--text-primary)",
                }}
              >
                MURALI KRISHNA
              </span>
              <span className="text-[10px] font-mono text-[var(--accent-secondary)]">
                Lv.2 Full-Stack Dev
              </span>
            </div>
          </motion.a>

          {/* RPG HUD STATS BAR (Desktop/Tablet) */}
          <div className="hidden md:flex items-center gap-6 px-4 py-1.5 rounded-lg border border-[rgba(255,255,255,0.05)] bg-[rgba(10,10,15,0.4)] backdrop-blur-sm">
            {/* HP */}
            <div className="flex flex-col w-24">
              <div className="flex justify-between text-[9px] font-mono mb-0.5 text-[var(--text-secondary)]">
                <span>HP [UPTIME]</span>
                <span className="text-[var(--accent-secondary)]">100%</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-800 rounded-sm overflow-hidden border border-zinc-900">
                <div className="h-full bg-emerald-500 rounded-sm" style={{ width: "100%" }} />
              </div>
            </div>
            {/* MP */}
            <div className="flex flex-col w-24">
              <div className="flex justify-between text-[9px] font-mono mb-0.5 text-[var(--text-secondary)]">
                <span>MP [APIS]</span>
                <span className="text-[var(--accent-primary)]">120/120</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-800 rounded-sm overflow-hidden border border-zinc-900">
                <div className="h-full bg-amber-500 rounded-sm" style={{ width: "100%" }} />
              </div>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="nav-link text-[11px]"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
              >
                <span style={{ color: "var(--accent-primary)", marginRight: "4px" }}>
                  [{link.name === "Home" ? "STATUS" : 
                    link.name === "Skills" ? "INVENTORY" :
                    link.name === "About" ? "BIO" :
                    link.name === "Experience" ? "QUESTS" :
                    link.name === "Projects" ? "GEAR" : 
                    link.name === "Social" ? "INFLUENCE" : "CAST"}]
                </span>
              </motion.a>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Sound Toggle Button */}
            <motion.button
              onClick={handleSoundToggle}
              className="p-2 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.06)] hover:border-[var(--accent-primary)] transition-all flex items-center justify-center cursor-pointer text-sm"
              title={soundEnabled ? "Mute Sound" : "Unmute Sound"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {soundEnabled ? "🔊" : "🔇"}
            </motion.button>

            <motion.a
              href="#contact"
              className="btn-outline hidden md:inline-flex"
              style={{ padding: "0.5rem 1.25rem", fontSize: "0.7rem" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {"<"} Cast Spell: Contact {"/>"}
            </motion.a>

            {/* Hamburger */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                className="block w-6 h-0.5 rounded-full"
                style={{ background: "var(--accent-primary)" }}
                animate={{
                  rotate: mobileOpen ? 45 : 0,
                  y: mobileOpen ? 8 : 0,
                }}
              />
              <motion.span
                className="block w-4 h-0.5 rounded-full"
                style={{ background: "var(--accent-primary)" }}
                animate={{ opacity: mobileOpen ? 0 : 1 }}
              />
              <motion.span
                className="block w-6 h-0.5 rounded-full"
                style={{ background: "var(--accent-primary)" }}
                animate={{
                  rotate: mobileOpen ? -45 : 0,
                  y: mobileOpen ? -8 : 0,
                }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{
              background: "rgba(10, 10, 15, 0.95)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-light tracking-widest"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--text-secondary)",
                  }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setMobileOpen(false)}
                  whileHover={{ color: "#e8a849", x: 10 }}
                >
                  <span
                    style={{
                      color: "var(--accent-primary)",
                      fontSize: "0.75rem",
                      marginRight: "12px",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
