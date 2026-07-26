"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playSound } from "@/utils/sound";

// Skills Data
const skillCategories = [
  {
    title: "Programming Languages",
    icon: "code",
    color: "var(--accent-secondary)",
    skills: [
      { name: "JavaScript (ES6+)", level: 5 },
      { name: "TypeScript", level: 5 },
      { name: "PHP", level: 4 },
      { name: "SQL (PostgreSQL, MySQL, SQLite)", level: 5 },
      { name: "HTML5 & CSS3", level: 5 },
    ],
  },
  {
    title: "Frontend & Desktop",
    icon: "monitor",
    color: "var(--accent-primary)",
    skills: [
      { name: "React.js", level: 5 },
      { name: "Next.js", level: 5 },
      { name: "Electron", level: 5 },
      { name: "Redux", level: 4 },
      { name: "Tailwind CSS", level: 5 },
      { name: "Bootstrap / Handlebars", level: 4 },
    ],
  },
  {
    title: "Backend & APIs",
    icon: "server",
    color: "var(--accent-tertiary)",
    skills: [
      { name: "Node.js", level: 5 },
      { name: "Express.js", level: 5 },
      { name: "REST APIs", level: 5 },
      { name: "WebSockets", level: 4 },
      { name: "Node-Cron & Multer", level: 4 },
      { name: "Axios", level: 5 },
    ],
  },
  {
    title: "Databases & Tools",
    icon: "database",
    color: "var(--accent-secondary)",
    skills: [
      { name: "PostgreSQL", level: 5 },
      { name: "SQLite", level: 5 },
      { name: "MongoDB", level: 4 },
      { name: "Redis", level: 4 },
      { name: "Git & GitHub", level: 5 },
      { name: "Postman & WorkBench", level: 5 },
      { name: "Photoshop", level: 4 },
    ],
  },
];

const allSkillNames = [
  { name: "React.js", color: "rgba(62, 232, 181, 0.25)" },
  { name: "Next.js", color: "rgba(232, 168, 73, 0.25)" },
  { name: "TypeScript", color: "rgba(62, 232, 181, 0.25)" },
  { name: "Electron", color: "rgba(232, 90, 110, 0.25)" },
  { name: "Node.js", color: "rgba(232, 90, 110, 0.25)" },
  { name: "Express.js", color: "rgba(62, 232, 181, 0.25)" },
  { name: "PostgreSQL", color: "rgba(62, 232, 181, 0.25)" },
  { name: "SQLite", color: "rgba(232, 168, 73, 0.25)" },
  { name: "JavaScript", color: "rgba(62, 232, 181, 0.25)" },
  { name: "PHP", color: "rgba(232, 90, 110, 0.25)" },
  { name: "MySQL", color: "rgba(232, 90, 110, 0.25)" },
  { name: "MongoDB", color: "rgba(232, 168, 73, 0.25)" },
  { name: "Redis", color: "rgba(232, 90, 110, 0.25)" },
  { name: "Git", color: "rgba(232, 168, 73, 0.25)" },
  { name: "GitHub", color: "rgba(62, 232, 181, 0.25)" },
  { name: "Postman", color: "rgba(232, 168, 73, 0.25)" },
  { name: "WebSockets", color: "rgba(232, 90, 110, 0.25)" },
  { name: "REST APIs", color: "rgba(62, 232, 181, 0.25)" },
  { name: "Redux", color: "rgba(232, 90, 110, 0.25)" },
  { name: "Photoshop", color: "rgba(232, 168, 73, 0.25)" },
];

interface PhysicsBody {
  id: string;
  name: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  color: string;
}

export default function SkillsSection() {
  const [gravityActive, setGravityActive] = useState(false);
  const [shakeTrigger, setShakeTrigger] = useState(0);
  const sandboxRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<PhysicsBody[]>([]);
  const elementRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const activeDragRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const pointerPosRef = useRef({ x: 0, y: 0 });
  const prevPointerPosRef = useRef({ x: 0, y: 0 });

  // Initialize physics bodies
  useEffect(() => {
    if (!sandboxRef.current) return;
    const rect = sandboxRef.current.getBoundingClientRect();
    const width = rect.width > 100 ? rect.width : 280;

    itemsRef.current = allSkillNames.map((skill, index) => {
      // Estimate width based on text length
      const itemWidth = skill.name.length * 9 + 40;
      const itemHeight = 36;
      // Stagger spawn coordinates safely within bounds
      const x = 15 + (index * 25) % (width - itemWidth - 25);
      const y = -40 - index * 24;

      return {
        id: `phy-${index}`,
        name: skill.name,
        x,
        y,
        vx: (Math.random() - 0.5) * 3,
        vy: Math.random() * 2 + 1.5,
        width: itemWidth,
        height: itemHeight,
        color: skill.color,
      };
    });
  }, []);

  // Physics animation loop
  useEffect(() => {
    if (!gravityActive) return;
    let animationId: number;
    let lastTime = performance.now();

    const updatePhysics = () => {
      if (!sandboxRef.current) return;
      const rect = sandboxRef.current.getBoundingClientRect();
      const containerWidth = rect.width;
      const containerHeight = rect.height;

      const gravity = 0.45;
      const friction = 0.985;
      const bounce = 0.55;

      // Update dragging velocity
      if (activeDragRef.current) {
        const dragItem = itemsRef.current.find((item) => item.id === activeDragRef.current?.id);
        if (dragItem) {
          const dx = pointerPosRef.current.x - prevPointerPosRef.current.x;
          const dy = pointerPosRef.current.y - prevPointerPosRef.current.y;
          dragItem.vx = dx * 0.8;
          dragItem.vy = dy * 0.8;
          dragItem.x = pointerPosRef.current.x - activeDragRef.current.offsetX;
          dragItem.y = pointerPosRef.current.y - activeDragRef.current.offsetY;
        }
      }

      // Physics integration step
      itemsRef.current.forEach((item) => {
        const isDragged = activeDragRef.current?.id === item.id;

        if (!isDragged) {
          // Apply gravity
          item.vy += gravity;
          
          // Apply friction
          item.vx *= friction;
          item.vy *= friction;

          // Update position
          item.x += item.vx;
          item.y += item.vy;

          // Boundary checks & collisions
          // Bottom wall
          if (item.y + item.height > containerHeight) {
            item.y = containerHeight - item.height;
            item.vy = -item.vy * bounce;
            item.vx *= 0.85; // Extra friction on floor
          }
          // Left wall
          if (item.x < 0) {
            item.x = 0;
            item.vx = -item.vx * bounce;
          }
          // Right wall
          if (item.x + item.width > containerWidth) {
            item.x = containerWidth - item.width;
            item.vx = -item.vx * bounce;
          }
          // Top wall (keep inside)
          if (item.y < -150) {
            item.y = -150;
            item.vy = 0;
          }
        }

        // Apply visual updates directly to DOM elements for maximum rendering speed
        const el = elementRefs.current[item.id];
        if (el) {
          el.style.transform = `translate3d(${item.x}px, ${item.y}px, 0)`;
        }
      });

      // Simple box-to-box elastic push collisions
      for (let i = 0; i < itemsRef.current.length; i++) {
        for (let j = i + 1; j < itemsRef.current.length; j++) {
          const a = itemsRef.current[i];
          const b = itemsRef.current[j];

          const isADragged = activeDragRef.current?.id === a.id;
          const isBDragged = activeDragRef.current?.id === b.id;

          // Centers of A and B
          const centerAX = a.x + a.width / 2;
          const centerAY = a.y + a.height / 2;
          const centerBX = b.x + b.width / 2;
          const centerBY = b.y + b.height / 2;

          const dx = centerAX - centerBX;
          const dy = centerAY - centerBY;

          // Combined half sizes
          const halfWidths = (a.width + b.width) / 2;
          const halfHeights = (a.height + b.height) / 2;

          if (Math.abs(dx) < halfWidths && Math.abs(dy) < halfHeights) {
            // Overlap detected! Find shortest axis to push out
            const overlapX = halfWidths - Math.abs(dx);
            const overlapY = halfHeights - Math.abs(dy);

            if (overlapX < overlapY) {
              const dir = dx > 0 ? 1 : -1;
              if (!isADragged) a.x += overlapX * 0.5 * dir;
              if (!isBDragged) b.x -= overlapX * 0.5 * dir;
              
              // Velocity exchange
              if (!isADragged && !isBDragged) {
                const temp = a.vx;
                a.vx = b.vx * bounce;
                b.vx = temp * bounce;
              }
            } else {
              const dir = dy > 0 ? 1 : -1;
              if (!isADragged) a.y += overlapY * 0.5 * dir;
              if (!isBDragged) b.y -= overlapY * 0.5 * dir;

              // Velocity exchange
              if (!isADragged && !isBDragged) {
                const temp = a.vy;
                a.vy = b.vy * bounce;
                b.vy = temp * bounce;
              }
            }
          }
        }
      }

      // Save previous pointer coordinates for velocity calculation
      prevPointerPosRef.current = { ...pointerPosRef.current };

      animationId = requestAnimationFrame(updatePhysics);
    };

    animationId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationId);
  }, [gravityActive]);

  // Shake trigger: apply random upward forces to scatter chips
  const triggerShake = () => {
    setShakeTrigger((prev) => prev + 1);
    itemsRef.current.forEach((item) => {
      item.vy = -12 - Math.random() * 8;
      item.vx = (Math.random() - 0.5) * 15;
    });
  };

  // Add custom chip to sandbox
  const [customSkillName, setCustomSkillName] = useState("");
  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSkillName.trim() || !sandboxRef.current) return;

    const rect = sandboxRef.current.getBoundingClientRect();
    const itemWidth = customSkillName.length * 9 + 40;
    const itemHeight = 36;
    const newId = `phy-custom-${Date.now()}`;

    const newSkill: PhysicsBody = {
      id: newId,
      name: customSkillName.trim(),
      x: rect.width / 2 - itemWidth / 2,
      y: -30,
      vx: (Math.random() - 0.5) * 6,
      vy: Math.random() * 2 + 3,
      width: itemWidth,
      height: itemHeight,
      color: "rgba(232, 168, 73, 0.25)",
    };

    itemsRef.current = [...itemsRef.current, newSkill];
    setCustomSkillName("");
  };

  // Mouse/Pointer Drag Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, id: string) => {
    playSound("click");
    if (!gravityActive || !sandboxRef.current) return;
    const target = e.currentTarget;
    const rect = sandboxRef.current.getBoundingClientRect();
    const item = itemsRef.current.find((it) => it.id === id);

    if (item) {
      target.setPointerCapture(e.pointerId);
      
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      activeDragRef.current = {
        id,
        offsetX: mouseX - item.x,
        offsetY: mouseY - item.y,
      };

      pointerPosRef.current = { x: mouseX, y: mouseY };
      prevPointerPosRef.current = { x: mouseX, y: mouseY };
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!activeDragRef.current || !sandboxRef.current) return;
    const rect = sandboxRef.current.getBoundingClientRect();
    
    pointerPosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>, id: string) => {
    if (activeDragRef.current?.id === id) {
      activeDragRef.current = null;
    }
  };

  // SVG helper based on key
  const renderIcon = (key: string) => {
    switch (key) {
      case "code":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        );
      case "server":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
            <line x1="6" y1="6" x2="6.01" y2="6"></line>
            <line x1="6" y1="18" x2="6.01" y2="18"></line>
          </svg>
        );
      case "database":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
            <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
          </svg>
        );
      case "monitor":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        );
      case "settings":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="skills" className="skills-section min-h-screen relative z-10 py-24 px-4">
      {/* Header Container */}
      <div className="content-wrapper p-4 md:p-6 lg:p-8 my-4">
        
        {/* Section Header */}
        <div className="text-center mt-8 mb-16 flex flex-col items-center p-4">
          <div className="section-divider mb-12 mx-auto" />
          <div className="p-1 my-2">
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4 text-center"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--accent-primary)",
              }}
            >
              02. Specialization
            </p>
          </div>
          <div className="p-2 my-2">
            <h2
              className="text-4xl md:text-5xl font-bold text-gradient-primary mb-6 text-center"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Core Expertise & Tech Stack
            </h2>
          </div>
          <div className="p-2 mt-2 mb-10">
            <p
              className="text-sm md:text-base max-w-2xl mx-auto text-center"
              style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}
            >
              I synthesize full-stack engineering with polished UX/UI designs. Explore my core skills arranged below, drag individual elements, or activate the physics sandbox to play.
            </p>
          </div>
        </div>
      </div>

      {/* Full-Width Sliding Marquee (Outside content-wrapper for edge-to-edge flow) */}
      <div className="marquee-wrapper mt-8 mb-16 pointer-events-none select-none py-4">
        {/* Row 1: Sliding Left */}
        <div className="marquee-container mt-2 mb-4 py-2">
          <div className="marquee-track track-left p-1 my-1">
            {[...allSkillNames, ...allSkillNames].map((skill, i) => (
              <div
                key={`mar-left-${i}`}
                className="marquee-item p-2.5"
                style={{ borderColor: skill.color }}
              >
                <span className="marquee-dot" />
                {skill.name}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Sliding Right */}
        <div className="marquee-container my-2 py-2">
          <div className="marquee-track track-right p-1 my-1">
            {[...allSkillNames, ...allSkillNames].reverse().map((skill, i) => (
              <div
                key={`mar-right-${i}`}
                className="marquee-item p-2.5"
                style={{ borderColor: skill.color }}
              >
                <span className="marquee-dot" />
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid Container */}
      <div className="content-wrapper p-4 md:p-6 lg:p-8 my-6">
        <div className="skills-layout-grid p-2 md:p-4 my-4">
          
          {/* LEFT: Categories Column */}
          <div className="skills-categories-col p-2 my-2">
            {skillCategories.map((category, idx) => (
              <div
                key={category.title}
                className="skill-card-wrap group p-1 my-4"
                style={{
                  animationDelay: `${idx * 0.15}s`,
                }}
              >
                {/* Glow Border Effect */}
                <div className="card-twinkle-glow" />

                <div className="skill-card-inner p-6 md:p-8 my-1">
                  {/* Card Header */}
                  <div className="flex items-center gap-3 mt-2 mb-6 p-2">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center p-2 my-1"
                      style={{
                        background: `rgba(${category.color === "var(--accent-primary)" ? "232, 168, 73" : category.color === "var(--accent-secondary)" ? "62, 232, 181" : "232, 90, 110"}, 0.1)`,
                        border: `1px solid rgba(${category.color === "var(--accent-primary)" ? "232, 168, 73" : category.color === "var(--accent-secondary)" ? "62, 232, 181" : "232, 90, 110"}, 0.25)`,
                        color: category.color,
                      }}
                    >
                      {renderIcon(category.icon)}
                    </div>
                    <div className="p-1 my-1">
                      <h3
                        className="font-bold text-lg"
                        style={{
                          fontFamily: "var(--font-heading)",
                          color: "var(--text-primary)",
                        }}
                      >
                        {category.title}
                      </h3>
                    </div>
                  </div>

                  {/* Skills Chips Grid */}
                  <div className="flex flex-wrap gap-2.5 p-2 my-3">
                    {category.skills.map((skill) => (
                      <motion.div
                        key={skill.name}
                        className="skill-chip cursor-grab active:cursor-grabbing select-none px-4 py-2"
                        style={{
                          "--chip-color": category.color,
                        } as React.CSSProperties}
                        drag
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        dragElastic={0.4}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: `0 0 15px rgba(${category.color === "var(--accent-primary)" ? "232, 168, 73" : category.color === "var(--accent-secondary)" ? "62, 232, 181" : "232, 90, 110"}, 0.2)`,
                        }}
                        whileDrag={{ scale: 1.1 }}
                      >
                        <span className="chip-dot" />
                        {skill.name}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Physics Playground Column (Fall Elements & Draggable Elements) */}
          <div className="skills-playground-col p-2 my-2">
            <div className="physics-console-card p-1 my-4">
              <div className="card-twinkle-glow" />
              <div className="physics-console-inner p-6 md:p-8 my-1">
                
                {/* Console Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mt-2 mb-6 border-b border-[rgba(232,168,73,0.1)] p-2 pb-4">
                  <div className="flex items-center gap-3 p-1 my-1">
                    <div className="console-indicator animate-pulse" />
                    <div className="p-1 my-1">
                      <h3
                        className="font-bold font-heading text-lg"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Interactive Physics Sandbox
                      </h3>
                      <p className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                        SYSTEM_STATUS: {gravityActive ? "PHYSICS_ENGINE_ACTIVE" : "IDLE"}
                      </p>
                    </div>
                  </div>
                  
                  {/* Physics Mode Toggles */}
                  <div className="flex items-center gap-3 p-1 my-1">
                    <button
                      onClick={() => {
                        setGravityActive(!gravityActive);
                        playSound("levelUp");
                      }}
                      className={`console-btn ${gravityActive ? "active" : ""}`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1.5 inline-block">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                      {gravityActive ? "Disable Gravity" : "Enable Gravity"}
                    </button>
                    <button
                      onClick={() => {
                        triggerShake();
                        playSound("click");
                      }}
                      disabled={!gravityActive}
                      className="console-btn"
                      style={{ opacity: gravityActive ? 1 : 0.4 }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1.5 inline-block animate-spin-slow">
                        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                      </svg>
                      Scatter
                    </button>
                  </div>
                </div>

                {/* Physics Box Screen */}
                <div
                  ref={sandboxRef}
                  className="physics-screen p-4 my-4"
                  style={{
                    position: "relative",
                    height: "360px",
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  {/* Grid overlay background inside sandbox */}
                  <div className="physics-grid-overlay p-1 my-1" />
                  
                  <AnimatePresence>
                    {!gravityActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-[rgba(10,10,15,0.7)] backdrop-blur-xs z-10"
                      >
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="var(--accent-primary)"
                          strokeWidth="1.5"
                          className="mb-4 animate-bounce"
                        >
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        <h4 className="font-heading text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                          Gravity Engine is Offline
                        </h4>
                        <p className="text-xs max-w-sm" style={{ color: "var(--text-secondary)" }}>
                          Enable gravity to watch skills tumble down! Once active, grab, throw, and pile them up in real time.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Render physics body chips */}
                  {itemsRef.current.map((item) => (
                    <div
                      key={item.id}
                      ref={(el) => {
                        elementRefs.current[item.id] = el;
                      }}
                      onPointerDown={(e) => handlePointerDown(e, item.id)}
                      onPointerMove={handlePointerMove}
                      onPointerUp={(e) => handlePointerUp(e, item.id)}
                      className={`physics-chip cursor-grab active:cursor-grabbing select-none px-4 py-2 ${
                        activeDragRef.current?.id === item.id ? "dragging" : ""
                      }`}
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: `${item.width}px`,
                        height: `${item.height}px`,
                        background: item.color,
                        transform: `translate3d(${item.x}px, ${item.y}px, 0)`,
                        opacity: gravityActive ? 1 : 0,
                        pointerEvents: gravityActive ? "auto" : "none",
                        transition: !gravityActive ? "transform 0.5s ease, opacity 0.5s ease" : "none",
                      }}
                    >
                      <span className="phy-chip-dot" />
                      {item.name}
                    </div>
                  ))}
                </div>

                {/* Spawn Custom Chip Form */}
                {gravityActive && (
                  <form onSubmit={handleAddCustomSkill} className="flex gap-2 mt-4 mb-2 p-2 pt-4 border-t border-[rgba(232,168,73,0.1)]">
                    <input
                      type="text"
                      placeholder="Add a custom skill to the sandbox..."
                      value={customSkillName}
                      onChange={(e) => setCustomSkillName(e.target.value)}
                      className="sandbox-input flex-1"
                      maxLength={20}
                    />
                    <button type="submit" className="console-btn active">
                      Drop Skill
                    </button>
                  </form>
                )}

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
