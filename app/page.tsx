"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLocale, useMessages } from "./i18n/context";

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

const NAV_ITEMS = [
  { key: "about", href: "#about" },
  { key: "skills", href: "#skills" },
  { key: "projects", href: "#projects" },
  { key: "experience", href: "#experience" },
  { key: "contact", href: "#contact" },
];

function Nav() {
  const [active, setActive] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const { locale, setLocale, t } = useLocale();

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

  const toggleLocale = () => {
    setLocale(locale === "en" ? "pt-BR" : "en");
  };

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
            {t(`nav.${item.key}`)}
          </a>
        ))}
        <style>{`@media(min-width:640px){nav a{display:block!important}}`}</style>

        <button
          onClick={toggleLocale}
          className="mono"
          style={{
            background: "transparent",
            color: "#6B7280",
            border: "1px solid #1E1E2E",
            padding: "0.3rem 0.7rem",
            borderRadius: "5px",
            fontSize: "0.72rem",
            cursor: "pointer",
            letterSpacing: "0.05em",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget).style.borderColor = "#3B82F6"; (e.currentTarget).style.color = "#F0F0F5"; }}
          onMouseLeave={(e) => { (e.currentTarget).style.borderColor = "#1E1E2E"; (e.currentTarget).style.color = "#6B7280"; }}
        >
          {locale === "en" ? "PT-BR" : "EN"}
        </button>

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
          {t("nav_cta")}
        </a>
      </nav>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const { t } = useLocale();
  const [typed, setTyped] = useState("");
  const full = t("hero.title");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(full.slice(0, i + 1));
      i++;
      if (i === full.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, [full]);

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
          {t("hero.greeting")}
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
          {t("hero.name")}
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
          {t("hero.description")}{" "}
          <span style={{ color: "#F0F0F5", fontWeight: 600 }}>{t("hero.company")}</span>.
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
            {t("hero.cta_projects")}
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
            {t("hero.cta_contact")}
          </a>
        </div>
      </motion.div>

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
  const { t } = useLocale();
  return (
    <section id="about" style={{ padding: "7rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
      <FadeIn>
        <SectionLabel>{t("about.label")}</SectionLabel>
        <h2 style={{ fontSize: "2.2rem", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "2.5rem", color: "#F0F0F5" }}>
          {t("about.title")}
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
              {t("about.p1")}
            </p>
            <p style={{ color: "#9CA3AF", lineHeight: 1.9, fontSize: "1.02rem", marginBottom: "1.2rem" }}>
              {t("about.p2_before")}{" "}
              <span style={{ color: "#F0F0F5", fontWeight: 600 }}>{t("about.p2_company")}</span>{" "}
              {t("about.p2_after")}
            </p>
            <p style={{ color: "#9CA3AF", lineHeight: 1.9, fontSize: "1.02rem" }}>
              {t("about.p3")}
            </p>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
          {[
            { value: t("about.stat_years_value"), label: t("about.stat_years_label") },
            { value: t("about.stat_role_value"), label: t("about.stat_role_label") },
            { value: t("about.stat_certs_value"), label: t("about.stat_certs_label") },
            { value: t("about.stat_location_value"), label: t("about.stat_location_label") },
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

const SKILLS_DATA: Record<string, string[]> = {
  Backend: ["Java", "Spring Boot", "Node.js", "NestJS", "Express", "REST APIs", "Microservices"],
  Frontend: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS"],
  Cloud: ["AWS", "Azure", "Docker", "Kubernetes", "CI/CD"],
  Database: ["PostgreSQL", "MySQL", "MongoDB"],
  Architecture: ["Clean Architecture", "SOLID", "Event-Driven Architecture"],
};

function Skills() {
  const { t } = useLocale();
  return (
    <section id="skills" style={{ padding: "7rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
      <FadeIn>
        <SectionLabel>{t("skills.label")}</SectionLabel>
        <h2 style={{ fontSize: "2.2rem", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "2.5rem", color: "#F0F0F5" }}>
          {t("skills.title")}
        </h2>
      </FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.2rem" }}>
        {Object.entries(SKILLS_DATA).map(([category, techs], i) => (
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
  const { t } = useLocale();
  const tm = useMessages();
  const raw = tm("projectItems");
  const items = (Array.isArray(raw) ? raw : []) as {
    title: string;
    description: string;
    focus: string;
    tags: string[];
    color: string;
  }[];

  return (
    <section id="projects" style={{ padding: "7rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
      <FadeIn>
        <SectionLabel>{t("projects.label")}</SectionLabel>
        <h2 style={{ fontSize: "2.2rem", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "2.5rem", color: "#F0F0F5" }}>
          {t("projects.title")}
        </h2>
      </FadeIn>
      <div style={{ display: "grid", gap: "1.2rem" }}>
        {items.map((project, i) => (
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
  const { t } = useLocale();
  const tm = useMessages();

  const raw = tm("experience.items");
  const items = (Array.isArray(raw) ? raw : []) as {
    company: string;
    role: string;
    type: string;
    start: string;
    end: string;
    duration: string;
    location: string;
    description: string;
    skills: string;
  }[];

  return (
    <section id="experience" style={{ padding: "7rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
      <FadeIn>
        <SectionLabel>{t("experience.label")}</SectionLabel>
        <h2 style={{ fontSize: "2.2rem", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "3rem", color: "#F0F0F5" }}>
          {t("experience.title")}
        </h2>
      </FadeIn>

      {items.map((exp, index) => (
        <FadeIn key={exp.company + exp.start} delay={index * 0.1}>
          <div style={{ display: "flex", gap: "2rem", position: "relative", marginBottom: "2rem" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#3B82F6", flexShrink: 0, marginTop: "4px" }} />
              {index < items.length - 1 && (
                <div style={{ width: "2px", flex: 1, background: "#1E1E2E", marginTop: "4px" }} />
              )}
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
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#F0F0F5", marginBottom: "0.25rem" }}>{exp.role}</h3>
                  <p style={{ color: "#3B82F6", fontWeight: 600, fontSize: "0.95rem" }}>{exp.company}</p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                  {exp.end.toLowerCase() === "present" || exp.end.toLowerCase() === "o momento" ? (
                    <span
                      className="mono"
                      style={{ fontSize: "0.75rem", color: "#6B7280", background: "#0A0A0F", padding: "0.3rem 0.8rem", borderRadius: "4px", border: "1px solid #1E1E2E", height: "fit-content" }}
                    >
                      {t("experience.current")}
                    </span>
                  ) : null}
                  <span
                    className="mono"
                    style={{ fontSize: "0.72rem", color: "#6B7280", background: "#0A0A0F", padding: "0.3rem 0.8rem", borderRadius: "4px", border: "1px solid #1E1E2E", height: "fit-content" }}
                  >
                    {exp.start} - {exp.end} · {exp.duration}
                  </span>
                </div>
              </div>
              {exp.location && (
                <p style={{ color: "#6B7280", fontSize: "0.82rem", marginBottom: "0.75rem" }}>{exp.location}</p>
              )}
              <p style={{ color: "#9CA3AF", lineHeight: 1.9, fontSize: "0.93rem", marginBottom: "0.75rem" }}>
                {exp.description}
              </p>
              <p className="mono" style={{ color: "#6B7280", fontSize: "0.78rem" }}>
                {exp.skills}
              </p>
            </div>
          </div>
        </FadeIn>
      ))}

      {/* Certifications */}
      <FadeIn delay={0.2}>
        <div style={{ marginTop: "3rem" }}>
          <p className="mono" style={{ fontSize: "0.75rem", color: "#3B82F6", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.2rem" }}>
            {t("experience.certifications_title")}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {[
              { name: t("experience.cert_aws"), icon: "☁️", color: "#F59E0B" },
              { name: t("experience.cert_azure"), icon: "🔷", color: "#3B82F6" },
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
                  <p style={{ fontSize: "0.78rem", color: "#6B7280" }}>{t("experience.cert_subtitle")}</p>
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
  const { t } = useLocale();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@dionesalves.dev");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" style={{ padding: "7rem 2rem 10rem", maxWidth: "900px", margin: "0 auto" }}>
      <FadeIn>
        <SectionLabel>{t("contact.label")}</SectionLabel>
        <h2 style={{ fontSize: "2.2rem", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "1rem", color: "#F0F0F5" }}>
          {t("contact.title")}
        </h2>
        <p style={{ color: "#9CA3AF", lineHeight: 1.8, maxWidth: "520px", marginBottom: "3rem", fontSize: "1rem" }}>
          {t("contact.subtitle")}
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
            <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "0.4rem" }}>{t("contact.email_label")}</p>
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
              {copied ? t("contact.copied_btn") : t("contact.copy_btn")}
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
              {t("contact.send_btn")}
            </a>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {[
            { label: t("contact.github"), url: "https://github.com/dionesalves", icon: "⌥" },
            { label: t("contact.linkedin"), url: "https://linkedin.com/in/dionesalves", icon: "in" },
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
  const { t } = useLocale();
  return (
    <footer
      style={{
        borderTop: "1px solid #1E1E2E",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <p className="mono" style={{ fontSize: "0.78rem", color: "#4B5563" }}>
        © {new Date().getFullYear()} Diones Alves — {t("footer.credit")}
      </p>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const { locale } = useLocale();
  return (
    <main>
      <Nav />
      <Hero key={locale} />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
