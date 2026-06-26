import { useState, useEffect, useRef } from "react";

// ─── THEME ────────────────────────────────────────────────────────────────────
const C = {
  bg: "#07070F",
  surface: "#0E0E1C",
  surface2: "#141428",
  text: "#EEEEFF",
  textSec: "#8888AA",
  accent: "#8B5CF6",
  accentLight: "#A78BFA",
  accentGlow: "rgba(139,92,246,0.18)",
  border: "rgba(139,92,246,0.15)",
  borderHover: "rgba(139,92,246,0.45)",
};

const T = {
  display: "'Poppins', sans-serif",
  body: "'Inter', sans-serif",
  mono: "'Space Mono', monospace",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SKILLS = {
  Frontend: [
    "React.js",
    "Redux",
    "JavaScript ES6+",
    "HTML & CSS",
    "Tailwind CSS",
  ],
  Backend: ["Laravel", "Spring Boot 3", "Java 17", "PHP"],
  Database: ["MySQL", "MongoDB"],
  "Tools & DevOps": ["Git", "Docker", "JWT", "REST APIs", "Postman"],
  "AI / ML": ["Python", "TensorFlow", "Groq API", "Transfer Learning"],
  Methods: ["Agile / Scrum", "UML", "Merise", "Cloud Native"],
};

const PROJECTS = [
  {
    id: "p1",
    tag: "SaaS · Full Stack",
    name: "MediCabinet",
    desc: "A multi-doctor, multi-cabinet SaaS for medical practices — patient records, appointments, SOAP consultations, lab analyses, and an AI assistant powered by Groq (LLaMA-3). Built with a teammate and supervised at ISGI.",
    tech: ["React", "Laravel", "MySQL", "JWT", "Groq AI", "Tailwind"],
    github: "https://github.com/Fadwa-Saif",
    featured: true,
  },
  {
    id: "p2",
    tag: "Enterprise · Internship",
    name: "JOJMA ERP",
    desc: "Modular ERP for a Moroccan metallic construction company. Full sales cycle (quote → delivery → invoice), manufacturing BOMs, stock, purchases, and RBAC for 4 roles — built in a 4-person team during internship.",
    tech: ["React.js", "Spring Boot 3", "Java 17", "MySQL", "JWT"],
    github: "https://github.com/Fadwa-Saif",
    featured: false,
  },
  {
    id: "p3",
    tag: "Frontend · Vanilla JS",
    name: "Maison Medina",
    desc: "A restaurant management website with multi-page architecture: landing page, menu, reservations, recipes, admin dashboard, and authentication. Built with vanilla HTML, CSS, and JavaScript.",
    tech: ["HTML", "CSS", "JavaScript", "Admin Dashboard"],
    github: "https://github.com/Fadwa-Saif/Maison-Medina",
    featured: false,
  },
];

const EXP_BULLETS = [
  "Built a modular ERP system with a 4-person team from scratch, shipping in 5–6 weeks",
  "Covered full sales cycle (quote → order → delivery → invoice), manufacturing BOMs, stock, and purchases",
  "Learned Spring Boot 3 & Java 17 under real production conditions — no prior experience",
  "Implemented RBAC on the React frontend for 4 distinct roles: Admin, Commercial, Magasinier, Comptable",
];

const EDU_TOPICS = [
  "React / Redux",
  "Laravel",
  "Spring Boot",
  "MySQL",
  "MongoDB",
  "Docker",
  "Machine Learning",
  "Agile / Scrum",
  "UML & Merise",
];

const CERTS = [
  {
    name: "Python Essentials 1",
    issuer: "Cisco · OpenEDG Python Institute",
    desc: "Python programming fundamentals — syntax, semantics, and the Python Standard Library.",
    link: "https://www.credly.com/badges/d97adb7d-2547-48a6-b1a2-8d8e271539f3",
    status: "issued",
    year: "2024",
  },
  {
    name: "SheCodes Plus",
    issuer: "SheCodes",
    desc: "Hands-on coding workshop covering front-end development and applied AI.",
    link: "https://www.shecodes.io/certificates/704fd72ea1d7c16d7610f1ab0c56a55e",
    status: "issued",
    year: "2025",
  },
  {
    name: "Machine Learning",
    issuer: "TBD",
    desc: "Fundamentals of ML — neural networks, transfer learning, model evaluation.",
    link: null,
    status: "incoming",
    year: "Aug 2026",
  },
  {
    name: "Entrepreneurship",
    issuer: "OFPPT × UM6P",
    desc: "Entrepreneurship program co-organized by OFPPT and Mohammed VI Polytechnic University.",
    link: null,
    status: "incoming",
    year: "Aug 2026",
  },
];

const NAV = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "Certifications", id: "certifications" },
  { label: "Contact", id: "contact" },
];

// ─── PARTICLE CANVAS ──────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = Math.min(
      90,
      Math.floor((canvas.width * canvas.height) / 9000),
    );
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.4 + 0.4,
      o: Math.random() * 0.45 + 0.15,
    }));

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const LINK = 130;
    const REPEL = 100;
    const STR = 0.55;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.hypot(dx, dy);
        if (dist < REPEL && dist > 0) {
          p.vx += (dx / dist) * STR;
          p.vy += (dy / dist) * STR;
        }
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.hypot(
            particles[i].x - particles[j].x,
            particles[i].y - particles[j].y,
          );
          if (d < LINK) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139,92,246,${0.2 * (1 - d / LINK)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${p.o})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}

// ─── MARQUEE ──────────────────────────────────────────────────────────────────
function Marquee() {
  const words = [
    "Full Stack",
    "Casablanca",
    "Builder",
    "React.js",
    "Spring Boot",
    "Laravel",
    "Ship It",
    "Problem Solver",
    "Python",
    "Groq AI",
    "MongoDB",
    "Machine Learning",
  ];
  const all = [...words, ...words];
  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
        padding: "13px 0",
        background: C.surface,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "marqueeScroll 26s linear infinite",
        }}
      >
        {all.map((w, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontFamily: T.mono,
              fontSize: 11,
              color: C.textSec,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "0 18px",
              whiteSpace: "nowrap",
            }}
          >
            {w}
            <span
              style={{
                color: C.accent,
                marginLeft: 18,
                fontSize: 13,
                animation: `shimmer 3s ease-in-out infinite`,
                animationDelay: `${(i % words.length) * 0.25}s`,
                display: "inline-block",
              }}
            >
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── GEOMETRIC ART ────────────────────────────────────────────────────────────
function GeometricArt() {
  const cx = 170,
    cy = 170;
  const radii = [38, 76, 114, 152, 190];
  const axisAng = [0, 90, 180, 270];

  return (
    <svg
      viewBox="0 0 340 340"
      style={{
        position: "absolute",
        right: "4%",
        top: "50%",
        transform: "translateY(-50%)",
        width: "min(320px, 38vw)",
        height: "auto",
        opacity: 0.15,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Background grid */}
      {[68, 136, 204, 272].map((v) => (
        <g key={v}>
          <line
            x1={v}
            y1={0}
            x2={v}
            y2={340}
            stroke="#8B5CF6"
            strokeWidth="0.35"
          />
          <line
            x1={0}
            y1={v}
            x2={340}
            y2={v}
            stroke="#8B5CF6"
            strokeWidth="0.35"
          />
        </g>
      ))}
      <line
        x1={170}
        y1={0}
        x2={170}
        y2={340}
        stroke="#8B5CF6"
        strokeWidth="0.6"
      />
      <line
        x1={0}
        y1={170}
        x2={340}
        y2={170}
        stroke="#8B5CF6"
        strokeWidth="0.6"
      />

      {/* Concentric circles */}
      {radii.map((r, i) => (
        <circle
          key={r}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#8B5CF6"
          strokeWidth={i === 2 ? 0.9 : 0.4}
          strokeOpacity={0.7 - i * 0.1}
        />
      ))}

      {/* Outer dashed ring */}
      <circle
        cx={cx}
        cy={cy}
        r={200}
        fill="none"
        stroke="#8B5CF6"
        strokeWidth={0.3}
        strokeOpacity={0.3}
        strokeDasharray="3 9"
      />

      {/* Dots at ring–axis intersections */}
      {radii.map((r) =>
        axisAng.map((a) => {
          const rad = (a * Math.PI) / 180;
          return (
            <circle
              key={`${r}-${a}`}
              cx={cx + r * Math.cos(rad)}
              cy={cy + r * Math.sin(rad)}
              r={2}
              fill="#A78BFA"
              opacity={0.85}
            />
          );
        }),
      )}

      {/* Diagonal cross hair */}
      <line
        x1={80}
        y1={80}
        x2={260}
        y2={260}
        stroke="#8B5CF6"
        strokeWidth="0.3"
        strokeOpacity="0.3"
      />
      <line
        x1={260}
        y1={80}
        x2={80}
        y2={260}
        stroke="#8B5CF6"
        strokeWidth="0.3"
        strokeOpacity="0.3"
      />

      {/* Centre dot */}
      <circle cx={cx} cy={cy} r={4} fill="#8B5CF6" opacity={1} />
      <circle
        cx={cx}
        cy={cy}
        r={8}
        fill="none"
        stroke="#8B5CF6"
        strokeWidth={0.6}
        opacity={0.6}
      />
    </svg>
  );
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function Label({ children }) {
  return (
    <div
      style={{
        fontFamily: T.mono,
        fontSize: 10.5,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        marginBottom: 14,
        display: "inline-block",
        background: `linear-gradient(90deg, ${C.accent}, ${C.accentLight})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {children}
    </div>
  );
}

function H2({ children }) {
  return (
    <h2
      style={{
        fontFamily: T.display,
        fontWeight: 700,
        fontSize: "clamp(24px, 3.5vw, 36px)",
        letterSpacing: "-0.02em",
        lineHeight: 1.2,
        margin: "0 0 40px",
        color: C.text,
      }}
    >
      {children}
    </h2>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [vis, setVis] = useState({});
  const glowRef = useRef(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&family=Space+Mono&display=swap";
    document.head.appendChild(link);

    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting)
            setVis((v) => ({ ...v, [e.target.dataset.id]: true }));
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll("[data-id]").forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const anim = (id, delay = 0) => ({
    opacity: vis[id] ? 1 : 0,
    transform: vis[id] ? "none" : "translateY(24px)",
    transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
  });

  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const handleHeroMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (glowRef.current) {
      glowRef.current.style.left = x + "px";
      glowRef.current.style.top = y + "px";
    }
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.bg}; overflow-x: hidden; color: ${C.text}; }
        a    { text-decoration: none; }

        .nav-link {
          font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500;
          color: ${C.textSec}; letter-spacing: 0.01em; padding: 4px 0;
          transition: color .2s; background: none; border: none; cursor: pointer;
        }
        .nav-link:hover { color: ${C.accentLight}; }

        .card {
          background: ${C.surface};
          border: 1px solid ${C.border};
          border-radius: 14px;
          transition: border-color .25s, box-shadow .25s, transform .25s;
        }
        .card:hover {
          border-color: ${C.borderHover};
          box-shadow: 0 0 32px ${C.accentGlow};
          transform: translateY(-3px);
        }

        .tag {
          background: rgba(139,92,246,0.12);
          border: 1px solid rgba(139,92,246,0.22);
          border-radius: 100px; padding: 3px 11px;
          font-family: 'Space Mono', monospace;
          font-size: 11px; color: ${C.accentLight};
        }

        .pill {
          background: ${C.surface2};
          border: 1px solid ${C.border};
          border-radius: 6px; padding: 5px 11px;
          font-family: 'Inter', sans-serif;
          font-size: 12.5px; font-weight: 500; color: ${C.textSec};
          transition: color .2s, border-color .2s;
        }
        .pill:hover { color: ${C.accentLight}; border-color: rgba(139,92,246,0.4); }

        .btn-primary {
          background: linear-gradient(135deg, ${C.accent}, #6D28D9);
          color: #fff; border: none; border-radius: 8px;
          padding: 13px 26px; font-size: 14px; font-weight: 600;
          font-family: 'Inter', sans-serif; cursor: pointer;
          letter-spacing: 0.01em; display: inline-block;
          box-shadow: 0 4px 24px rgba(139,92,246,0.38);
          transition: opacity .2s, transform .2s;
        }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }

        .btn-ghost {
          background: transparent; color: ${C.textSec};
          border: 1px solid ${C.border}; border-radius: 8px;
          padding: 13px 26px; font-size: 14px; font-weight: 600;
          font-family: 'Inter', sans-serif; cursor: pointer;
          display: inline-block;
          transition: color .2s, border-color .2s;
        }
        .btn-ghost:hover { color: ${C.accentLight}; border-color: ${C.borderHover}; }

        .fade-link {
          color: rgba(167,139,250,0.35); font-family: 'Inter', sans-serif;
          font-size: 13px; transition: color .2s;
        }
        .fade-link:hover { color: ${C.accentLight}; }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.accent}; border-radius: 4px; }

        @keyframes blobMorph {
          0%,100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25%     { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          50%     { border-radius: 50% 40% 30% 50% / 30% 50% 70% 50%; }
          75%     { border-radius: 40% 60% 60% 40% / 60% 40% 40% 60%; }
        }
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes shimmer {
          0%,100% { opacity: 0.5; }
          50%     { opacity: 1; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          background: scrolled ? "rgba(7,7,15,0.90)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? `1px solid ${C.border}` : "none",
          transition: "all .3s ease",
        }}
      >
        <button
          onClick={() => go("hero")}
          style={{
            fontFamily: T.display,
            fontWeight: 800,
            fontSize: 18,
            letterSpacing: "0.06em",
            background: "none",
            border: "none",
            cursor: "pointer",
            backgroundImage: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          FS
        </button>
        <div style={{ display: "flex", gap: 26 }}>
          {NAV.map((n) => (
            <button key={n.id} className="nav-link" onClick={() => go(n.id)}>
              {n.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        id="hero"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 40px",
          position: "relative",
          overflow: "hidden",
          background: C.bg,
        }}
        onMouseMove={handleHeroMouseMove}
      >
        <ParticleCanvas />

        {/* Cursor-following glow */}
        <div
          ref={glowRef}
          aria-hidden
          style={{
            position: "absolute",
            left: "60%",
            top: "30%",
            transform: "translate(-50%, -50%)",
            width: 480,
            height: 480,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
            transition: "left 0.08s ease, top 0.08s ease",
          }}
        />

        {/* Secondary static ambient glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: "10%",
            left: "5%",
            width: 260,
            height: 260,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(109,40,217,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 820 }}>
          {/* Location chip */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 100,
              padding: "6px 16px",
              fontFamily: T.mono,
              fontSize: 10.5,
              color: C.textSec,
              marginBottom: 32,
              letterSpacing: "0.08em",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#22c55e",
                display: "inline-block",
              }}
            />
            Casablanca, Morocco
          </div>

          {/* Name */}
          <h1
            style={{
              fontFamily: T.display,
              fontWeight: 800,
              fontSize: "clamp(52px, 10vw, 88px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: "0 0 4px",
              color: C.text,
            }}
          >
            Fadwa
          </h1>
          <h1
            style={{
              fontFamily: T.display,
              fontWeight: 800,
              fontSize: "clamp(52px, 10vw, 88px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: "0 0 22px",
              backgroundImage: `linear-gradient(135deg, ${C.accent} 0%, ${C.accentLight} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Saif.
          </h1>

          <p
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: C.textSec,
              lineHeight: 1.8,
              maxWidth: 440,
              margin: "0 0 36px",
              fontWeight: 400,
            }}
          >
            Full Stack Developer who builds real products — from the first line
            of code to production.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => go("projects")}>
              View My Work
            </button>
            {[
              { label: "GitHub ↗", href: "https://github.com/Fadwa-Saif" },
              {
                label: "LinkedIn ↗",
                href: "https://www.linkedin.com/in/fadwa-saif-a7280922b/",
              },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: 40,
            fontFamily: T.mono,
            fontSize: 10,
            color: C.border,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              display: "block",
              width: 28,
              height: 1,
              background: C.border,
            }}
          />
          scroll
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section
        id="about"
        style={{ background: C.surface, padding: "100px 40px" }}
      >
        <div
          data-id="about"
          style={{ maxWidth: 880, margin: "0 auto", ...anim("about") }}
        >
          <Label>About</Label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "130px 1fr",
              gap: 44,
              alignItems: "start",
            }}
          >
            <div>
              <div
                style={{
                  width: 112,
                  height: 112,
                  borderRadius: 16,
                  backgroundImage: `linear-gradient(135deg, ${C.accent}, #5B21B6)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: T.display,
                  fontWeight: 800,
                  fontSize: 32,
                  color: "#fff",
                  letterSpacing: "0.04em",
                  marginBottom: 14,
                  boxShadow: `0 8px 32px ${C.accentGlow}`,
                }}
              >
                FS
              </div>
              <div
                style={{
                  fontFamily: T.display,
                  fontWeight: 700,
                  fontSize: 15,
                  color: C.text,
                  marginBottom: 3,
                }}
              >
                Fadwa Saif
              </div>
              <div
                style={{ fontFamily: T.mono, fontSize: 10.5, color: C.textSec }}
              >
                Full Stack Dev
              </div>
            </div>

            <div>
              <h2
                style={{
                  fontFamily: T.display,
                  fontWeight: 700,
                  fontSize: "clamp(22px, 3.5vw, 34px)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.25,
                  margin: "0 0 18px",
                  color: C.text,
                }}
              >
                I don't just write code.
                <br />I build products.
              </h2>
              <p
                style={{
                  color: C.textSec,
                  lineHeight: 1.85,
                  fontSize: 15,
                  marginBottom: 14,
                }}
              >
                Based in Casablanca, Morocco. Full Stack Developer completing my
                TS Développement Digital Web Full Stack diploma at ISGI
                Casablanca. My work spans React frontends, Laravel and Spring
                Boot APIs, MySQL & MongoDB databases, and ML experiments with
                Python.
              </p>
              <p
                style={{
                  color: C.textSec,
                  lineHeight: 1.85,
                  fontSize: 15,
                  marginBottom: 32,
                }}
              >
                Beyond the code, I think like a builder — I've pitched a SaaS
                product to a professional jury, care about real-world impact,
                and always ask whether what I'm shipping actually solves a
                problem worth solving.
              </p>
              <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
                {[
                  ["3+", "Shipped projects"],
                  ["6+", "Technologies"],
                  ["2026", "Graduating"],
                ].map(([val, label]) => (
                  <div key={label}>
                    <div
                      style={{
                        fontFamily: T.display,
                        fontWeight: 800,
                        fontSize: 28,
                        backgroundImage: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {val}
                    </div>
                    <div
                      style={{ fontSize: 12, color: C.textSec, marginTop: 3 }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ background: C.bg, padding: "100px 40px" }}>
        <div
          data-id="skills"
          style={{ maxWidth: 880, margin: "0 auto", ...anim("skills") }}
        >
          <Label>Skills &amp; Stack</Label>
          <H2>Technologies I work with</H2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: 16,
            }}
          >
            {Object.entries(SKILLS).map(([cat, items]) => (
              <div key={cat} className="card" style={{ padding: 22 }}>
                <div
                  style={{
                    fontFamily: T.mono,
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                    display: "inline-block",
                    backgroundImage: `linear-gradient(90deg, ${C.accent}, ${C.accentLight})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {cat}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {items.map((s) => (
                    <span key={s} className="pill">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section
        id="projects"
        style={{ background: C.surface, padding: "100px 40px" }}
      >
        <div
          data-id="projects"
          style={{ maxWidth: 880, margin: "0 auto", ...anim("projects") }}
        >
          <Label>Projects</Label>
          <H2>Things I've built</H2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 20,
            }}
          >
            {PROJECTS.map((p) => (
              <div
                key={p.id}
                className="card"
                style={{
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    fontFamily: T.mono,
                    fontSize: 10,
                    color: C.textSec,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {p.tag}
                </div>
                <h3
                  style={{
                    fontFamily: T.display,
                    fontWeight: 700,
                    fontSize: 22,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.15,
                    color: p.featured ? C.accentLight : C.text,
                  }}
                >
                  {p.name}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.8,
                    color: C.textSec,
                    flexGrow: 1,
                  }}
                >
                  {p.desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {p.tech.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: C.accentLight,
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: T.body,
                    marginTop: 4,
                    transition: "opacity .2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.65")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  GitHub ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section
        id="experience"
        style={{ background: C.bg, padding: "100px 40px" }}
      >
        <div
          data-id="experience"
          style={{ maxWidth: 880, margin: "0 auto", ...anim("experience") }}
        >
          <Label>Experience</Label>
          <H2>Where I've worked</H2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "170px 1fr",
              gap: 40,
              borderTop: `1px solid ${C.border}`,
              paddingTop: 36,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: T.mono,
                  fontSize: 11,
                  color: C.textSec,
                  lineHeight: 2,
                }}
              >
                March – April 2026
                <br />
                Casablanca, Morocco
              </div>
            </div>
            <div>
              <h3
                style={{
                  fontFamily: T.display,
                  fontWeight: 700,
                  fontSize: 20,
                  margin: "0 0 5px",
                  color: C.text,
                }}
              >
                Full Stack Developer
              </h3>
              <div
                style={{
                  fontSize: 13.5,
                  fontWeight: 600,
                  marginBottom: 22,
                  fontFamily: T.body,
                  backgroundImage: `linear-gradient(90deg, ${C.accent}, ${C.accentLight})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                }}
              >
                Internship · JOJMA Group
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {EXP_BULLETS.map((pt) => (
                  <div
                    key={pt}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        marginTop: 8,
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: C.accent,
                        flexShrink: 0,
                        display: "inline-block",
                      }}
                    />
                    <span
                      style={{
                        color: C.textSec,
                        fontSize: 14,
                        lineHeight: 1.75,
                      }}
                    >
                      {pt}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section
        id="education"
        style={{ background: C.surface, padding: "100px 40px" }}
      >
        <div
          data-id="education"
          style={{ maxWidth: 880, margin: "0 auto", ...anim("education") }}
        >
          <Label>Education</Label>
          <H2>Where I learned</H2>
          <div className="card" style={{ padding: 32 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 22,
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: T.display,
                    fontWeight: 700,
                    fontSize: 18,
                    marginBottom: 4,
                    color: C.text,
                  }}
                >
                  TS Développement Digital Web Full Stack
                </h3>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 13.5,
                    marginBottom: 6,
                    fontFamily: T.body,
                    backgroundImage: `linear-gradient(90deg, ${C.accent}, ${C.accentLight})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                  }}
                >
                  ISGI Casablanca — OFPPT
                </div>
                <div
                  style={{
                    fontFamily: T.mono,
                    fontSize: 10.5,
                    color: C.textSec,
                    display: "block",
                  }}
                >
                  Completed EFF (national exit exam) · June 2026
                </div>
              </div>
              <div
                style={{
                  fontFamily: T.mono,
                  fontSize: 12,
                  color: C.textSec,
                  whiteSpace: "nowrap",
                }}
              >
                2024 – 2026
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {EDU_TOPICS.map((t) => (
                <span key={t} className="pill">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section
        id="certifications"
        style={{ background: C.bg, padding: "100px 40px" }}
      >
        <div
          data-id="certifications"
          style={{ maxWidth: 880, margin: "0 auto", ...anim("certifications") }}
        >
          <Label>Certifications</Label>
          <H2>Licenses &amp; Certificates</H2>

          <div style={{ position: "relative", paddingLeft: 28 }}>
            {/* Vertical timeline line */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 8,
                bottom: 8,
                width: 1,
                background: `linear-gradient(to bottom, ${C.accent}, rgba(139,92,246,0.05))`,
              }}
            />

            <div style={{ display: "flex", flexDirection: "column" }}>
              {CERTS.map((cert, i) => (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    paddingBottom: i < CERTS.length - 1 ? 36 : 0,
                    paddingLeft: 28,
                  }}
                >
                  {/* Timeline dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: -5,
                      top: 7,
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background:
                        cert.status === "issued" ? C.accent : "transparent",
                      border:
                        cert.status === "incoming"
                          ? `2px solid ${C.accent}`
                          : "none",
                      boxShadow:
                        cert.status === "issued"
                          ? `0 0 10px ${C.accent}`
                          : "none",
                    }}
                  />

                  <div className="card" style={{ padding: "20px 24px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        gap: 12,
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        {/* Name + badge */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 5,
                            flexWrap: "wrap",
                          }}
                        >
                          <h3
                            style={{
                              fontFamily: T.display,
                              fontWeight: 600,
                              fontSize: 16,
                              color: C.text,
                            }}
                          >
                            {cert.name}
                          </h3>
                          {cert.status === "incoming" && (
                            <span
                              style={{
                                background: "rgba(139,92,246,0.12)",
                                border: "1px solid rgba(139,92,246,0.28)",
                                borderRadius: 100,
                                padding: "2px 10px",
                                fontSize: 9.5,
                                fontFamily: T.mono,
                                letterSpacing: "0.1em",
                                color: C.accentLight,
                                textTransform: "uppercase",
                              }}
                            >
                              Incoming
                            </span>
                          )}
                        </div>
                        {/* Issuer */}
                        <div
                          style={{
                            fontFamily: T.body,
                            fontSize: 13,
                            color: C.accent,
                            fontWeight: 500,
                            marginBottom: 6,
                          }}
                        >
                          {cert.issuer}
                        </div>
                        {/* Description */}
                        <div
                          style={{
                            fontFamily: T.body,
                            fontSize: 13,
                            color: C.textSec,
                            lineHeight: 1.65,
                          }}
                        >
                          {cert.desc}
                        </div>
                      </div>

                      {/* Year + link */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          gap: 10,
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: T.mono,
                            fontSize: 11,
                            color: C.textSec,
                          }}
                        >
                          {cert.year}
                        </span>
                        {cert.link && (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: C.accentLight,
                              fontSize: 12,
                              fontWeight: 600,
                              fontFamily: T.body,
                              transition: "opacity .2s",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.opacity = "0.6")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.opacity = "1")
                            }
                          >
                            View ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        style={{
          background: C.bg,
          padding: "100px 40px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 560,
            height: 560,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.13) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          data-id="contact"
          style={{
            maxWidth: 560,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
            ...anim("contact"),
          }}
        >
          <Label>Contact</Label>
          <h2
            style={{
              fontFamily: T.display,
              fontWeight: 800,
              fontSize: "clamp(32px, 6vw, 54px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              margin: "0 0 16px",
              color: C.text,
            }}
          >
            Let's build
            <br />
            <span
              style={{
                backgroundImage: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              something together.
            </span>
          </h2>
          <p
            style={{
              color: C.textSec,
              fontSize: 16,
              lineHeight: 1.75,
              margin: "0 0 44px",
            }}
          >
            Open to full-time opportunities, collaborations,
            <br />
            and interesting projects.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <a href="mailto:your@email.com" className="btn-primary">
              Send an Email
            </a>
            <a
              href="https://www.linkedin.com/in/fadwa-saif-a7280922b/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/Fadwa-Saif"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: C.surface,
          borderTop: `1px solid ${C.border}`,
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: T.display,
            fontWeight: 800,
            fontSize: 16,
            backgroundImage: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          FS
        </span>
        <span style={{ fontFamily: T.mono, fontSize: 10.5, color: C.textSec }}>
          © 2026 Fadwa Saif
        </span>
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { label: "GitHub", href: "https://github.com/Fadwa-Saif" },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/fadwa-saif-a7280922b/",
            },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="fade-link"
            >
              {label}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}
