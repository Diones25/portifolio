"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "about", href: "#about" },
  { label: "skills", href: "#skills" },
  { label: "projects", href: "#projects" },
  { label: "experience", href: "#experience" },
  { label: "contact", href: "#contact" },
];

const SKILLS = {
  Backend: ["Java", "Spring Boot", "Node.js", "NestJS", "Express", "REST APIs", "Microservices"],
  Frontend: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS"],
  Cloud: ["AWS", "Azure", "Docker", "Kubernetes", "CI/CD"],
  Database: ["PostgreSQL", "MySQL", "MongoDB"],
  Architecture: ["Clean Architecture", "SOLID", "Event-Driven Architecture"],
};

const PROJECTS = [
  {
    title: "Real-Time Communication Platform",
    description:
      "Full-featured platform with video, audio, and text communication channels. Built with WebRTC for peer-to-peer connections and Socket.IO for signaling and presence.",
    tags: ["WebRTC", "Socket.IO", "NestJS", "React"],
    focus: "Real-time • P2P • WebSockets",
    color: "#3B82F6",
  },
  {
    title: "Banking API",
    description:
      "Secure RESTful API for financial operations with robust authentication flows, JWT refresh token rotation, and Swagger documentation for enterprise consumers.",
    tags: ["NestJS", "PostgreSQL", "JWT", "Docker", "Swagger"],
    focus: "Auth • Security • API Design",
    color: "#8B5CF6",
  },
  {
    title: "Microservices Platform",
    description:
      "Distributed system with event-driven communication between independent services. Each service owns its database and communicates asynchronously via message queues.",
    tags: ["NestJS", "RabbitMQ", "Docker", "PostgreSQL"],
    focus: "Distributed Systems • Event-Driven",
    color: "#10B981",
  },
  {
    title: "Movie Application",
    description:
      "Performance-first movie discovery app consuming the TMDB API. Built with Next.js for optimal SEO using hybrid rendering — SSG for popular pages, SSR for dynamic routes.",
    tags: ["Next.js", "React", "TMDB API"],
    focus: "SEO • SSR • SSG • Performance",
    color: "#F59E0B",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <span
      className="mono"
      style={{
        fontSize: "0.75rem",
        color: "#3B82F6",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        display: "block",
        marginBottom: "0.5rem",
      }}
    >
      ~/{children}
    </span>
  );
}

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  const [active, setActive] = useState("about");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV_ITEMS.map((i) => i.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: scrolled ? "1px solid #1E1E2E" : "1px solid transparent",
        background: scrolled ? "rgba(10,10,15,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <a
        href="#hero"
        className="mono"
        style={{ color: "#3B82F6", fontWeight: 700, fontSize: "1rem", textDecoration: "none", letterSpacing: "-0.02em" }}
      >
        da<span style={{ color: "#F0F0F5" }}>.dev</span>
      </a>
      <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="mono"
            style={{
              fontSize: "0.8rem",
              color: active === item.href.slice(1) ? "#3B82F6" : "#6B7280",
              textDecoration: "none",
              letterSpacing: "0.05em",
              transition: "color 0.2s",
              display: "none",
            }}
            onMouseEnter={(e) => { if (active !== item.href.slice(1)) (e.target as HTMLElement).style.color = "#F0F0F5"; }}
            onMouseLeave={(e) => { if (active !== item.href.slice(1)) (e.target as HTMLElement).style.color = "#6B7280"; }}
          >
            {item.label}
          </a>
        ))}
        <style>{`@media(min-width:640px){nav a{display:block!important}}`}</style>
        <a
          href="mailto:hello@dionesalves.dev"
          style={{
            background: "#3B82F6",
            color: "#fff",
            padding: "0.4rem 1rem",
            borderRadius: "6px",
            fontSize: "0.8rem",
            fontWeight: 600,
            textDecoration: "none",
            letterSpacing: "0.02em",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.background = "#1D4ED8")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.background = "#3B82F6")}
        >
          Contact
        </a>
      </nav>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const [typed, setTyped] = useState("");
  const full = "Full Stack Software Engineer";

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTyped(full.slice(0, i + 1));
      i++;
      if (i === full.length) clearInterval(t);
    }, 45);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 2rem",
        maxWidth: "900px",
        margin: "0 auto",
        paddingTop: "8rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p
          className="mono"
          style={{ color: "#3B82F6", fontSize: "0.85rem", letterSpacing: "0.15em", marginBottom: "1.5rem" }}
        >
          ~/hello
        </p>
        <h1
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#F0F0F5",
            marginBottom: "1rem",
          }}
        >
          Diones Alves
        </h1>
        <h2
          className="mono"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
            color: "#A5B4FC",
            fontWeight: 400,
            marginBottom: "2rem",
            minHeight: "2rem",
          }}
        >
          {typed}
          <span className="cursor-blink" style={{ color: "#3B82F6" }}>▋</span>
        </h2>
        <p
          style={{
            maxWidth: "580px",
            color: "#9CA3AF",
            fontSize: "1.05rem",
            lineHeight: 1.8,
            marginBottom: "3rem",
          }}
        >
          4+ years building enterprise-grade applications, REST APIs, and cloud-based solutions.
          Currently crafting large-scale financial systems at{" "}
          <span style={{ color: "#F0F0F5", fontWeight: 600 }}>GFT Technologies</span>.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a
            href="#projects"
            style={{
              background: "#3B82F6",
              color: "#fff",
              padding: "0.75rem 1.75rem",
              borderRadius: "8px",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "0.95rem",
              transition: "background 0.2s, transform 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => { (e.currentTarget).style.background = "#1D4ED8"; (e.currentTarget).style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { (e.currentTarget).style.background = "#3B82F6"; (e.currentTarget).style.transform = "translateY(0)"; }}
          >
            View Projects →
          </a>
          <a
            href="mailto:hello@dionesalves.dev"
            style={{
              border: "1px solid #1E1E2E",
              color: "#F0F0F5",
              padding: "0.75rem 1.75rem",
              borderRadius: "8px",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "0.95rem",
              transition: "border-color 0.2s, transform 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => { (e.currentTarget).style.borderColor = "#3B82F6"; (e.currentTarget).style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { (e.currentTarget).style.borderColor = "#1E1E2E"; (e.currentTarget).style.transform = "translateY(0)"; }}
          >
            Get in Touch
          </a>
        </div>
      </motion.div>

      {/* Floating stack badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{ marginTop: "5rem", display: "flex", gap: "0.6rem", flexWrap: "wrap" }}
      >
        {["Java", "Spring Boot", "Node.js", "NestJS", "React", "Next.js", "TypeScript", "AWS", "Docker"].map((tech) => (
          <span
            key={tech}
            className="mono"
            style={{
              fontSize: "0.72rem",
              padding: "0.3rem 0.7rem",
              border: "1px solid #1E1E2E",
              borderRadius: "4px",
              color: "#6B7280",
              letterSpacing: "0.05em",
            }}
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" style={{ padding: "7rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
      <FadeIn>
        <SectionLabel>about</SectionLabel>
        <h2 style={{ fontSize: "2.2rem", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "2.5rem", color: "#F0F0F5" }}>
          Who I am
        </h2>
      </FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
        <FadeIn delay={0.1}>
          <div
            style={{
              background: "#13131A",
              border: "1px solid #1E1E2E",
              borderRadius: "12px",
              padding: "2rem",
            }}
          >
            <p style={{ color: "#9CA3AF", lineHeight: 1.9, fontSize: "1.02rem", marginBottom: "1.2rem" }}>
              I'm a Full Stack Software Engineer based in Brazil with over 4 years of experience
              delivering production-grade software for enterprise clients. My work spans backend systems,
              REST APIs, microservices architecture, and modern frontend applications.
            </p>
            <p style={{ color: "#9CA3AF", lineHeight: 1.9, fontSize: "1.02rem", marginBottom: "1.2rem" }}>
              At <span style={{ color: "#F0F0F5", fontWeight: 600 }}>GFT Technologies</span>, I work on
              large-scale financial systems and banking platforms where reliability, security, and
              performance are non-negotiable. I care deeply about clean architecture, SOLID principles,
              and writing code that teams can evolve with confidence.
            </p>
            <p style={{ color: "#9CA3AF", lineHeight: 1.9, fontSize: "1.02rem" }}>
              I hold certifications in both <span style={{ color: "#F0F0F5" }}>AWS</span> and{" "}
              <span style={{ color: "#F0F0F5" }}>Azure</span>, and I'm comfortable working across the
              full stack — from database schema design to pixel-perfect UIs.
            </p>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
          {[
            { label: "Years of Experience", value: "4+" },
            { label: "Current Role", value: "Software Engineer @ GFT" },
            { label: "Certifications", value: "AWS + Azure" },
            { label: "Location", value: "Brazil 🇧🇷" },
          ].map((stat) => (
            <FadeIn key={stat.label} delay={0.15}>
              <div
                style={{
                  background: "#13131A",
                  border: "1px solid #1E1E2E",
                  borderRadius: "10px",
                  padding: "1.4rem",
                }}
              >
                <p
                  className="mono"
                  style={{ fontSize: "1.5rem", fontWeight: 700, color: "#3B82F6", marginBottom: "0.35rem" }}
                >
                  {stat.value}
                </p>
                <p style={{ fontSize: "0.8rem", color: "#6B7280" }}>{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <section id="skills" style={{ padding: "7rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
      <FadeIn>
        <SectionLabel>skills</SectionLabel>
        <h2 style={{ fontSize: "2.2rem", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "2.5rem", color: "#F0F0F5" }}>
          Technical Stack
        </h2>
      </FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.2rem" }}>
        {Object.entries(SKILLS).map(([category, techs], i) => (
          <FadeIn key={category} delay={i * 0.07}>
            <div
              style={{
                background: "#13131A",
                border: "1px solid #1E1E2E",
                borderRadius: "12px",
                padding: "1.6rem",
                height: "100%",
              }}
            >
              <p
                className="mono"
                style={{
                  fontSize: "0.72rem",
                  color: "#3B82F6",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                {category}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {techs.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontSize: "0.82rem",
                      padding: "0.3rem 0.75rem",
                      background: "#0A0A0F",
                      border: "1px solid #1E1E2E",
                      borderRadius: "5px",
                      color: "#D1D5DB",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ─── Projects ────────────────────────────────────────────────────────────────

function Projects() {
  return (
    <section id="projects" style={{ padding: "7rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
      <FadeIn>
        <SectionLabel>projects</SectionLabel>
        <h2 style={{ fontSize: "2.2rem", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "2.5rem", color: "#F0F0F5" }}>
          Selected Work
        </h2>
      </FadeIn>
      <div style={{ display: "grid", gap: "1.2rem" }}>
        {PROJECTS.map((project, i) => (
          <FadeIn key={project.title} delay={i * 0.08}>
            <div
              style={{
                background: "#13131A",
                border: "1px solid #1E1E2E",
                borderRadius: "12px",
                padding: "2rem",
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget).style.borderColor = project.color)}
              onMouseLeave={(e) => ((e.currentTarget).style.borderColor = "#1E1E2E")}
            >
              {/* color accent line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "4px",
                  height: "100%",
                  background: project.color,
                  borderRadius: "12px 0 0 12px",
                }}
              />
              <div style={{ paddingLeft: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#F0F0F5" }}>{project.title}</h3>
                  <span
                    className="mono"
                    style={{ fontSize: "0.7rem", color: project.color, background: `${project.color}18`, padding: "0.25rem 0.6rem", borderRadius: "4px" }}
                  >
                    {project.focus}
                  </span>
                </div>
                <p style={{ color: "#9CA3AF", lineHeight: 1.75, marginBottom: "1.25rem", fontSize: "0.93rem" }}>
                  {project.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="mono"
                      style={{
                        fontSize: "0.72rem",
                        padding: "0.25rem 0.6rem",
                        border: "1px solid #1E1E2E",
                        borderRadius: "4px",
                        color: "#6B7280",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────

function Experience() {
  return (
    <section id="experience" style={{ padding: "7rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
      <FadeIn>
        <SectionLabel>experience</SectionLabel>
        <h2 style={{ fontSize: "2.2rem", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "3rem", color: "#F0F0F5" }}>
          Where I've Worked
        </h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div style={{ display: "flex", gap: "2rem", position: "relative" }}>
          {/* Timeline line */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#3B82F6", flexShrink: 0, marginTop: "4px" }} />
            <div style={{ width: "2px", flex: 1, background: "#1E1E2E", marginTop: "4px" }} />
          </div>
          <div
            style={{
              background: "#13131A",
              border: "1px solid #1E1E2E",
              borderRadius: "12px",
              padding: "2rem",
              flex: 1,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
              <div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#F0F0F5", marginBottom: "0.25rem" }}>Software Engineer</h3>
                <p style={{ color: "#3B82F6", fontWeight: 600, fontSize: "0.95rem" }}>GFT Technologies</p>
              </div>
              <span
                className="mono"
                style={{ fontSize: "0.75rem", color: "#6B7280", background: "#0A0A0F", padding: "0.3rem 0.8rem", borderRadius: "4px", border: "1px solid #1E1E2E", height: "fit-content" }}
              >
                Current
              </span>
            </div>
            <ul style={{ color: "#9CA3AF", lineHeight: 1.9, paddingLeft: "1.2rem", fontSize: "0.93rem" }}>
              {[
                "Developing enterprise-grade applications and banking systems for financial sector clients",
                "Designing and consuming REST APIs following OpenAPI specs and security best practices",
                "Building cloud-native solutions on AWS and Azure infrastructure",
                "Architecting microservices with event-driven patterns for high-throughput workloads",
                "Collaborating with cross-functional teams on software architecture decisions",
              ].map((item) => (
                <li key={item} style={{ marginBottom: "0.4rem" }}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </FadeIn>

      {/* Certifications */}
      <FadeIn delay={0.2}>
        <div style={{ marginTop: "3rem" }}>
          <p className="mono" style={{ fontSize: "0.75rem", color: "#3B82F6", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.2rem" }}>
            Certifications
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {[
              { name: "AWS Certified", icon: "☁️", color: "#F59E0B" },
              { name: "Azure Certified", icon: "🔷", color: "#3B82F6" },
            ].map((cert) => (
              <div
                key={cert.name}
                style={{
                  background: "#13131A",
                  border: "1px solid #1E1E2E",
                  borderRadius: "10px",
                  padding: "1.4rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <span style={{ fontSize: "1.8rem" }}>{cert.icon}</span>
                <div>
                  <p style={{ fontWeight: 600, color: "#F0F0F5" }}>{cert.name}</p>
                  <p style={{ fontSize: "0.78rem", color: "#6B7280" }}>Cloud Certification</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@dionesalves.dev");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" style={{ padding: "7rem 2rem 10rem", maxWidth: "900px", margin: "0 auto" }}>
      <FadeIn>
        <SectionLabel>contact</SectionLabel>
        <h2 style={{ fontSize: "2.2rem", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "1rem", color: "#F0F0F5" }}>
          Let's Build Something
        </h2>
        <p style={{ color: "#9CA3AF", lineHeight: 1.8, maxWidth: "520px", marginBottom: "3rem", fontSize: "1rem" }}>
          Open to new opportunities, freelance projects, or just a technical conversation.
          Drop a message — I respond within 24 hours.
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div
          style={{
            background: "#13131A",
            border: "1px solid #1E1E2E",
            borderRadius: "12px",
            padding: "2.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "0.4rem" }}>Email</p>
            <p className="mono" style={{ fontSize: "1.05rem", color: "#F0F0F5" }}>hello@dionesalves.dev</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={copyEmail}
              style={{
                background: copied ? "#10B981" : "#0A0A0F",
                color: copied ? "#fff" : "#F0F0F5",
                border: "1px solid #1E1E2E",
                padding: "0.65rem 1.4rem",
                borderRadius: "7px",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: 600,
                transition: "all 0.2s",
              }}
            >
              {copied ? "✓ Copied!" : "Copy Email"}
            </button>
            <a
              href="mailto:hello@dionesalves.dev"
              style={{
                background: "#3B82F6",
                color: "#fff",
                padding: "0.65rem 1.4rem",
                borderRadius: "7px",
                fontSize: "0.85rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget).style.background = "#1D4ED8")}
              onMouseLeave={(e) => ((e.currentTarget).style.background = "#3B82F6")}
            >
              Send Email →
            </a>
          </div>
        </div>
      </FadeIn>

      {/* Social Links */}
      <FadeIn delay={0.2}>
        <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {[
            { label: "GitHub", url: "https://github.com/dionesalves", icon: "⌥" },
            { label: "LinkedIn", url: "https://linkedin.com/in/dionesalves", icon: "in" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mono"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.6rem 1.2rem",
                border: "1px solid #1E1E2E",
                borderRadius: "7px",
                color: "#6B7280",
                textDecoration: "none",
                fontSize: "0.82rem",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget).style.borderColor = "#3B82F6"; (e.currentTarget).style.color = "#F0F0F5"; }}
              onMouseLeave={(e) => { (e.currentTarget).style.borderColor = "#1E1E2E"; (e.currentTarget).style.color = "#6B7280"; }}
            >
              <span>{link.icon}</span>
              {link.label}
            </a>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #1E1E2E",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <p className="mono" style={{ fontSize: "0.78rem", color: "#4B5563" }}>
        © {new Date().getFullYear()} Diones Alves — Built with Next.js + TypeScript
      </p>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
