import { useState, useEffect } from "react";

// ─── THEME — "SAIF-OS" (dark 2000s desktop / tech-ad chrome) ────────────────
const C = {
  bgDeep: "#050709",
  bgPanel: "#0A0E16",
  panelSteel: "#12161F",
  chrome1: "#F4F6FA",
  chrome2: "#C7CDDA",
  chrome3: "#565D6C",
  hairline: "rgba(199,205,218,0.14)",
  text: "#E9EEF6",
  textSec: "#8B94A6",
  accent: "#0072CE",
  accentLight: "#4FC3FF",
  accentGlow: "rgba(0,140,255,0.30)",
  led: "#3CFF7A",
  ledAmber: "#FFB020",
};

const T = {
  display: "'Orbitron', 'Eurostile', sans-serif",
  body: "Verdana, Geneva, Tahoma, sans-serif",
  mono: "'Space Mono', 'Consolas', monospace",
  pixel: "'VT323', monospace",
};

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

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
  "Built a modular ERP system with a 4-person team from scratch, shipping in 5-6 weeks",
  "Covered full sales cycle (quote to order to delivery to invoice), manufacturing BOMs, stock, and purchases",
  "Learned Spring Boot 3 & Java 17 under real production conditions, no prior experience",
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
    desc: "Python programming fundamentals - syntax, semantics, and the Python Standard Library.",
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
    desc: "Fundamentals of ML - neural networks, transfer learning, model evaluation.",
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
  { label: "About", id: "about", icon: "doc" },
  { label: "Skills", id: "skills", icon: "gear" },
  { label: "Projects", id: "projects", icon: "folder" },
  { label: "Experience", id: "experience", icon: "terminal" },
  { label: "Education", id: "education", icon: "disk" },
  { label: "Certifications", id: "certifications", icon: "doc" },
  { label: "Contact", id: "contact", icon: "mail" },
];
const NAV_ALL = [{ label: "Desktop", id: "desktop", icon: "disk" }, ...NAV];

const DESKTOP_ICONS = [
  { id: "about", label: "About_Me.txt", icon: "doc" },
  { id: "skills", label: "Skills.sys", icon: "gear" },
  { id: "projects", label: "Projects", icon: "folder" },
  { id: "contact", label: "Contact.exe", icon: "mail" },
  {
    id: "gh",
    label: "GitHub.lnk",
    icon: "link",
    href: "https://github.com/Fadwa-Saif",
  },
  {
    id: "li",
    label: "LinkedIn.lnk",
    icon: "link",
    href: "https://www.linkedin.com/in/fadwa-saif-a7280922b/",
  },
];

const BOOT_LINES = [
  "SAIF-OS v3.1  (build 2026.07.16)",
  "(c) 2004-2026 Fadwa Saif Systems — All rights reserved",
  "",
  "CPU .................................. OK",
  "MEMORY ............................... 640K CONVENTIONAL",
  "MOUNTING /skills ..................... OK",
  "MOUNTING /projects ................... OK",
  "LOADING personality.dll .............. OK",
  "STARTING window manager .............. OK",
  "",
  "Press any key to continue_",
];

// ─── PIXEL ICONS ──────────────────────────────────────────────────────────────
const ICONS = {
  folder: (a) => (
    <>
      <rect x="1" y="3" width="6" height="2" fill={a.c1} />
      <rect x="1" y="5" width="14" height="9" fill={a.c1} />
      <rect x="1" y="5" width="14" height="1.4" fill={a.c2} opacity="0.6" />
      <rect
        x="1"
        y="12.6"
        width="14"
        height="1.4"
        fill={a.dark}
        opacity="0.5"
      />
    </>
  ),
  doc: (a) => (
    <>
      <rect x="3" y="1" width="10" height="14" fill={a.c1} />
      <polygon points="9,1 13,5 9,5" fill={a.dark} />
      <rect x="5" y="7" width="6" height="1" fill={a.dark} opacity="0.55" />
      <rect x="5" y="9.5" width="6" height="1" fill={a.dark} opacity="0.55" />
      <rect x="5" y="12" width="4" height="1" fill={a.dark} opacity="0.55" />
    </>
  ),
  gear: (a) => (
    <>
      <circle cx="8" cy="8" r="3.2" fill="none" stroke={a.c1} strokeWidth="2" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => (
        <rect
          key={d}
          x="7.3"
          y="0.6"
          width="1.4"
          height="2.6"
          fill={a.c1}
          transform={`rotate(${d} 8 8)`}
        />
      ))}
      <circle cx="8" cy="8" r="1.3" fill={a.accent} />
    </>
  ),
  mail: (a) => (
    <>
      <rect x="1" y="3" width="14" height="10" fill={a.c1} />
      <polyline
        points="1,3 8,9 15,3"
        fill="none"
        stroke={a.dark}
        strokeWidth="1.2"
      />
    </>
  ),
  terminal: (a) => (
    <>
      <rect
        x="1"
        y="2"
        width="14"
        height="12"
        fill={a.dark}
        stroke={a.c1}
        strokeWidth="0.6"
      />
      <polyline
        points="3,6 6,8 3,10"
        fill="none"
        stroke={a.accent}
        strokeWidth="1.2"
      />
      <rect x="7" y="10" width="5" height="1.2" fill={a.accent} />
    </>
  ),
  disk: (a) => (
    <>
      <rect x="1.5" y="1.5" width="13" height="13" fill={a.c1} />
      <rect x="3.5" y="1.5" width="7" height="5" fill={a.dark} />
      <rect x="3" y="9" width="10" height="4.5" fill={a.c2} />
    </>
  ),
  link: (a) => (
    <>
      <rect
        x="2"
        y="2"
        width="12"
        height="12"
        fill="none"
        stroke={a.c1}
        strokeWidth="1"
      />
      <polyline
        points="6,10 10,6"
        stroke={a.accent}
        strokeWidth="1.4"
        fill="none"
      />
      <polyline
        points="7,6 10,6 10,9"
        fill="none"
        stroke={a.accent}
        strokeWidth="1.4"
      />
    </>
  ),
};

function PixelIcon({ type, size = 16 }) {
  const a = {
    c1: C.chrome1,
    c2: C.chrome2,
    dark: C.chrome3,
    accent: C.accentLight,
  };
  const draw = ICONS[type] || ICONS.doc;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      style={{ flexShrink: 0 }}
      aria-hidden="true"
    >
      {draw(a)}
    </svg>
  );
}

// ─── CHIP BADGE (kept — chip/orbit signature mark) ───────────────────────────
function ChipBadge({ size = 60 }) {
  const cx = size / 2,
    cy = size / 2;
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      style={{ width: "100%", height: "100%", display: "block" }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="chipMetal" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#EDF1F7" />
          <stop offset="35%" stopColor="#B7BFCC" />
          <stop offset="70%" stopColor="#5B6270" />
          <stop offset="100%" stopColor="#20242D" />
        </radialGradient>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.accentLight} />
          <stop offset="100%" stopColor={C.accent} />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={size * 0.46} fill="url(#chipMetal)" />
      <circle
        cx={cx}
        cy={cy}
        r={size * 0.46}
        fill="none"
        stroke="rgba(0,0,0,0.4)"
        strokeWidth={1.5}
      />
      {[0.38, 0.3].map((r, i) => (
        <ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx={size * r}
          ry={size * r * 0.38}
          fill="none"
          stroke={C.accentLight}
          strokeWidth={1}
          opacity={0.55}
          transform={`rotate(${i * 60} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={size * 0.16} fill="url(#coreGlow)" />
    </svg>
  );
}

// ─── Y2K WALLPAPER (abstract chrome wisps, swirl, sparkle dust) ──────────────
const SPARKLES = [
  { x: 120, y: 90, r: 2, delay: "0s" },
  { x: 260, y: 220, r: 1.6, delay: "0.6s" },
  { x: 80, y: 400, r: 2.2, delay: "1.2s" },
  { x: 340, y: 560, r: 1.4, delay: "1.8s" },
  { x: 520, y: 120, r: 2, delay: "0.3s" },
  { x: 650, y: 340, r: 1.8, delay: "2.1s" },
  { x: 780, y: 60, r: 1.5, delay: "1.5s" },
  { x: 900, y: 420, r: 2.4, delay: "0.9s" },
  { x: 1020, y: 220, r: 1.6, delay: "2.6s" },
  { x: 1120, y: 520, r: 2, delay: "1.1s" },
  { x: 200, y: 650, r: 1.8, delay: "2.9s" },
  { x: 460, y: 700, r: 1.4, delay: "0.4s" },
  { x: 980, y: 640, r: 2.2, delay: "1.7s" },
  { x: 1150, y: 120, r: 1.6, delay: "2.3s" },
  { x: 40, y: 220, r: 1.8, delay: "0.8s" },
  { x: 620, y: 480, r: 1.4, delay: "3.1s" },
];

function Y2KWallpaper() {
  return (
    <div className="hero-wallpaper" aria-hidden="true">
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <defs>
          <radialGradient id="bgDepth" cx="72%" cy="18%" r="75%">
            <stop offset="0%" stopColor="#101B33" />
            <stop offset="55%" stopColor="#0A1020" />
            <stop offset="100%" stopColor="#050709" />
          </radialGradient>
          <linearGradient id="gradWispA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor={C.accentLight} />
            <stop offset="100%" stopColor="#8A5CF6" />
          </linearGradient>
          <linearGradient id="gradWispB" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8A5CF6" />
            <stop offset="55%" stopColor={C.accentLight} />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <linearGradient id="gradWispC" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={C.accent} />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <radialGradient id="gradSwirl" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor={C.accentLight} stopOpacity="0" />
          </radialGradient>
          <filter id="blurLg" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="20" />
          </filter>
          <filter id="blurSm" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        <rect x="0" y="0" width="1200" height="800" fill="url(#bgDepth)" />

        <circle
          cx="920"
          cy="140"
          r="220"
          fill="url(#gradSwirl)"
          opacity="0.5"
        />
        <g className="swirl" style={{ transformOrigin: "920px 140px" }}>
          <circle
            cx="920"
            cy="140"
            r="60"
            fill="none"
            stroke={C.accentLight}
            strokeWidth="1.4"
            opacity="0.55"
            strokeDasharray="3 9"
          />
          <circle
            cx="920"
            cy="140"
            r="90"
            fill="none"
            stroke="#8A5CF6"
            strokeWidth="1"
            opacity="0.4"
            strokeDasharray="2 13"
          />
          <circle
            cx="920"
            cy="140"
            r="34"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.6"
            opacity="0.6"
          />
        </g>

        <g className="ribbon ribbon-a">
          <path
            d="M -100,620 C 180,720 360,430 610,480 C 860,530 940,240 1320,140"
            fill="none"
            stroke="url(#gradWispA)"
            strokeWidth="46"
            strokeLinecap="round"
            opacity="0.14"
            filter="url(#blurLg)"
          />
          <path
            d="M -100,620 C 180,720 360,430 610,480 C 860,530 940,240 1320,140"
            fill="none"
            stroke="url(#gradWispA)"
            strokeWidth="20"
            strokeLinecap="round"
            opacity="0.32"
            filter="url(#blurSm)"
          />
          <path
            d="M -100,620 C 180,720 360,430 610,480 C 860,530 940,240 1320,140"
            fill="none"
            stroke="url(#gradWispA)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.85"
          />
        </g>
        <g className="ribbon ribbon-b">
          <path
            d="M -60,120 C 240,20 400,280 660,230 C 920,180 1000,470 1320,560"
            fill="none"
            stroke="url(#gradWispB)"
            strokeWidth="40"
            strokeLinecap="round"
            opacity="0.13"
            filter="url(#blurLg)"
          />
          <path
            d="M -60,120 C 240,20 400,280 660,230 C 920,180 1000,470 1320,560"
            fill="none"
            stroke="url(#gradWispB)"
            strokeWidth="18"
            strokeLinecap="round"
            opacity="0.3"
            filter="url(#blurSm)"
          />
          <path
            d="M -60,120 C 240,20 400,280 660,230 C 920,180 1000,470 1320,560"
            fill="none"
            stroke="url(#gradWispB)"
            strokeWidth="2.6"
            strokeLinecap="round"
            opacity="0.8"
          />
        </g>
        <g className="ribbon ribbon-c">
          <path
            d="M 60,800 C 260,600 480,650 690,440 C 900,230 1010,300 1180,30"
            fill="none"
            stroke="url(#gradWispC)"
            strokeWidth="30"
            strokeLinecap="round"
            opacity="0.12"
            filter="url(#blurLg)"
          />
          <path
            d="M 60,800 C 260,600 480,650 690,440 C 900,230 1010,300 1180,30"
            fill="none"
            stroke="url(#gradWispC)"
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.26"
            filter="url(#blurSm)"
          />
          <path
            d="M 60,800 C 260,600 480,650 690,440 C 900,230 1010,300 1180,30"
            fill="none"
            stroke="url(#gradWispC)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
          />
        </g>

        {SPARKLES.map((s, i) => (
          <circle
            key={i}
            className="sparkle"
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="#FFFFFF"
            style={{ animationDelay: s.delay }}
          />
        ))}
      </svg>
      <div className="shine-sweep" />
    </div>
  );
}

// ─── LED MARQUEE ──────────────────────────────────────────────────────────────
function Marquee() {
  const words = [
    "FULL STACK",
    "CASABLANCA",
    "REACT.JS",
    "SPRING BOOT 3",
    "LARAVEL",
    "STATUS: ONLINE",
    "PYTHON",
    "GROQ AI",
    "MONGODB",
    "MACHINE LEARNING",
  ];
  const all = [...words, ...words];
  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: `1px solid ${C.hairline}`,
        borderBottom: `1px solid ${C.hairline}`,
        padding: "12px 0",
        background: "#000",
        boxShadow: "inset 0 2px 6px rgba(0,0,0,0.6)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "marqueeScroll 22s linear infinite",
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
              fontWeight: 700,
              color: C.led,
              textShadow: "0 0 6px rgba(60,255,122,0.75)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              padding: "0 20px",
              whiteSpace: "nowrap",
            }}
          >
            {w}
            <span style={{ color: C.chrome3, marginLeft: 20 }}>▪</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── BOOT SCREEN ──────────────────────────────────────────────────────────────
function BootScreen({ onDone }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= BOOT_LINES.length) {
      const t = setTimeout(onDone, 750);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCount((c) => c + 1), count < 2 ? 260 : 110);
    return () => clearTimeout(t);
  }, [count, onDone]);

  useEffect(() => {
    const skip = () => onDone();
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, [onDone]);

  return (
    <div
      className="boot-screen"
      onClick={onDone}
      role="button"
      aria-label="Skip boot sequence"
    >
      <div className="boot-text">
        {BOOT_LINES.slice(0, count).map((l, i) => (
          <div key={i}>{l || "\u00A0"}</div>
        ))}
        {count < BOOT_LINES.length && <span className="boot-cursor">█</span>}
      </div>
      <div className="boot-skip">SKIP ▸▸</div>
    </div>
  );
}

// ─── WINDOW CHROME ────────────────────────────────────────────────────────────
function Win({ id, title, icon, statusText, children, bodyStyle }) {
  return (
    <div className="win" id={id}>
      <div className="win-title">
        <div className="win-title-left">
          {icon && <PixelIcon type={icon} size={13} />}
          <span>{title}</span>
        </div>
        <div className="win-buttons">
          <span className="win-btn">–</span>
          <span className="win-btn">▢</span>
          <span className="win-btn win-btn-close">×</span>
        </div>
      </div>
      <div className="win-body" style={{ padding: 26, ...bodyStyle }}>
        {children}
      </div>
      {statusText && (
        <div className="win-status">
          <span>{statusText}</span>
          <span>SAIF-OS</span>
        </div>
      )}
    </div>
  );
}

function Label({ children }) {
  return (
    <div
      style={{
        fontFamily: T.mono,
        fontSize: 10.5,
        fontWeight: 700,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        marginBottom: 14,
        display: "flex",
        alignItems: "center",
        gap: 8,
        color: C.accentLight,
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          background: C.led,
          boxShadow: `0 0 8px ${C.led}`,
          display: "inline-block",
        }}
      />
      SYS://{children}
    </div>
  );
}

function H2({ children }) {
  return (
    <h2
      style={{
        fontFamily: T.display,
        fontWeight: 700,
        fontSize: "clamp(21px, 3vw, 30px)",
        letterSpacing: "0.01em",
        lineHeight: 1.25,
        margin: "0 0 22px",
        color: C.text,
        textTransform: "uppercase",
      }}
    >
      {children}
    </h2>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [booted, setBooted] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });
  const [scrolled, setScrolled] = useState(false);
  const [vis, setVis] = useState({});
  const [active, setActive] = useState("desktop");
  const [startOpen, setStartOpen] = useState(false);
  const [clock, setClock] = useState(() => new Date());
  const [meters, setMeters] = useState({ cpu: 34, ram: 58 });

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;800;900&family=VT323&family=Space+Mono:wght@400;700&display=swap";
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

    const io2 = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    NAV_ALL.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io2.observe(el);
    });

    const clockT = setInterval(() => setClock(new Date()), 10000);
    const meterT = setInterval(() => {
      setMeters((m) => ({
        cpu: clamp(m.cpu + (Math.random() * 16 - 8), 12, 94),
        ram: clamp(m.ram + (Math.random() * 10 - 5), 30, 88),
      }));
    }, 2200);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      io2.disconnect();
      clearInterval(clockT);
      clearInterval(meterT);
    };
  }, []);

  const anim = (id, delay = 0) => ({
    opacity: vis[id] ? 1 : 0,
    transform: vis[id] ? "none" : "translateY(24px)",
    transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
  });

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setStartOpen(false);
  };

  const clockStr = clock.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.bgDeep}; overflow-x: hidden; color: ${C.text}; }
        a { text-decoration: none; color: inherit; }
        button { font: inherit; }

        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: ${C.bgDeep}; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, ${C.chrome2}, ${C.chrome3}); border: 1px solid ${C.bgDeep}; }
        .scroll-row::-webkit-scrollbar { display: none; }
        .scroll-row { scrollbar-width: none; }

        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.25; } }
        @keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes bootBlink { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }

        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }

        .boot-screen {
          position: fixed; inset: 0; z-index: 999; background: #010203;
          display: flex; flex-direction: column; justify-content: center; align-items: flex-start;
          padding: 8vw; cursor: pointer;
        }
        .boot-text { font-family: ${T.pixel}; font-size: clamp(16px, 2.4vw, 22px); color: ${C.led}; line-height: 1.5; text-shadow: 0 0 6px rgba(60,255,122,0.5); }
        .boot-cursor { animation: bootBlink 1s step-end infinite; color: ${C.led}; }
        .boot-skip { position: absolute; bottom: 26px; right: 30px; font-family: ${T.pixel}; font-size: 15px; color: ${C.chrome3}; letter-spacing: 0.1em; }

        .win {
          background: ${C.panelSteel};
          border: 1px solid #000;
          box-shadow: inset 1px 1px 0 rgba(255,255,255,0.14), inset -1px -1px 0 rgba(0,0,0,0.6), 0 14px 34px rgba(0,0,0,0.45);
          border-radius: 3px;
          overflow: hidden;
        }
        .win-title {
          display: flex; align-items: center; justify-content: space-between;
          padding: 7px 9px 7px 11px;
          background: linear-gradient(180deg, #38455A 0%, #1B2230 55%, #12161F 100%);
          border-bottom: 1px solid rgba(0,0,0,0.6);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.18);
        }
        .win-title-left { display: flex; align-items: center; gap: 8px; font-family: ${T.body}; font-weight: 700; font-size: 11.5px; letter-spacing: 0.05em; color: ${C.chrome1}; text-transform: uppercase; }
        .win-buttons { display: flex; gap: 5px; }
        .win-btn {
          width: 15px; height: 15px; display: flex; align-items: center; justify-content: center;
          background: linear-gradient(180deg, ${C.chrome1}, ${C.chrome3});
          box-shadow: inset 1px 1px 0 rgba(255,255,255,0.7), inset -1px -1px 0 rgba(0,0,0,0.5);
          border-radius: 2px; font-size: 10px; line-height: 1; color: #1a1d24; font-weight: 900;
        }
        .win-btn-close:hover { background: linear-gradient(180deg, #FF8A80, #C4291D); color: #fff; }
        .win-status {
          display: flex; align-items: center; justify-content: space-between;
          padding: 5px 12px; background: #0A0D13; border-top: 1px solid rgba(255,255,255,0.06);
          font-family: ${T.mono}; font-size: 10px; color: ${C.textSec}; letter-spacing: 0.04em;
        }

        .taskbar {
          position: fixed; left: 0; right: 0; bottom: 0; z-index: 90; height: 46px;
          display: flex; align-items: center; gap: 10px; padding: 0 10px;
          background: linear-gradient(180deg, #1A2230 0%, #0A0D14 100%);
          border-top: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 -6px 20px rgba(0,0,0,0.5);
        }
        .dock-icon { display: flex; flex-direction: column; align-items: center; gap: 2px; background: none; border: none; cursor: pointer; padding: 2px 8px; border-radius: 4px; transition: transform 0.18s ease, background 0.18s ease; }
        .dock-icon:hover, .dock-icon:focus-visible { transform: translateY(-4px) scale(1.1); background: rgba(79,195,255,0.12); }
        .dock-icon span { font-family: 'Space Mono', monospace; font-size: 9px; color: #8B94A6; text-align: center; letter-spacing: 0.02em; max-width: 56px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .dock-icon:hover span, .dock-icon:focus-visible span { color: #4FC3FF; }
        .start-btn {
          display: flex; align-items: center; gap: 6px;
          background: linear-gradient(180deg, #1E8AE8, #00417A);
          border: 1px solid #002d55; border-radius: 4px; color: #fff;
          padding: 7px 14px; font-family: ${T.display}; font-weight: 800; font-size: 11.5px;
          letter-spacing: 0.05em; cursor: pointer; box-shadow: inset 0 1px 0 rgba(255,255,255,0.5);
          text-transform: uppercase; flex-shrink: 0;
        }
        .tray { display: flex; align-items: center; gap: 12px; padding: 0 6px 0 14px; border-left: 1px solid rgba(255,255,255,0.1); flex-shrink: 0; }
        .meter { display: flex; align-items: center; gap: 5px; }
        .meter span { font-family: ${T.mono}; font-size: 9px; color: ${C.textSec}; }
        .meter-track { width: 30px; height: 6px; background: #03050a; border: 1px solid rgba(255,255,255,0.1); }
        .meter-fill { height: 100%; background: ${C.led}; transition: width 0.6s ease; }
        .tray-clock { font-family: ${T.pixel}; font-size: 17px; color: ${C.chrome1}; letter-spacing: 0.04em; }

        .start-menu {
          position: fixed; left: 10px; bottom: 52px; width: 236px; z-index: 95;
          background: linear-gradient(180deg, #1B2230, #0D1119);
          border: 1px solid rgba(255,255,255,0.12); border-radius: 4px;
          box-shadow: 0 14px 40px rgba(0,0,0,0.6);
          display: flex; overflow: hidden;
        }
        .start-menu-rail { width: 20px; background: linear-gradient(180deg, ${C.accent}, #003E73); display: flex; align-items: center; justify-content: center; }
        .start-menu-rail span { writing-mode: vertical-rl; font-family: ${T.display}; font-size: 11px; font-weight: 800; color: #fff; letter-spacing: 0.15em; }
        .start-menu-items { flex: 1; padding: 6px; }
        .start-menu-item { display: flex; align-items: center; gap: 10px; width: 100%; text-align: left; background: none; border: none; color: ${C.text}; padding: 9px 10px; border-radius: 3px; font-family: ${T.body}; font-size: 12.5px; cursor: pointer; }
        .start-menu-item:hover { background: ${C.accent}; color: #fff; }
        .start-menu-div { height: 1px; background: rgba(255,255,255,0.1); margin: 6px 4px; }

        .menubar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 90; height: 52px;
          display: flex; align-items: center; justify-content: space-between; padding: 0 18px;
          background: linear-gradient(180deg, #1D2431, #0B0E15);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .hero-wallpaper { position: absolute; inset: 0; overflow: hidden; z-index: 0; }
        .ribbon { animation: driftRibbon 26s ease-in-out infinite; }
        .ribbon-b { animation-duration: 32s; animation-direction: alternate; }
        .ribbon-c { animation-duration: 22s; animation-direction: alternate-reverse; }
        @keyframes driftRibbon { 0%,100% { transform: translate(0,0); } 50% { transform: translate(18px,-14px); } }
        .swirl { animation: spin 90s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .sparkle { animation: twinkle 3.2s ease-in-out infinite; }
        @keyframes twinkle { 0%,100% { opacity: 0.15; } 50% { opacity: 0.95; } }
        .shine-sweep { position: absolute; top: 0; bottom: 0; width: 26%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent); animation: sweepShine 9s ease-in-out infinite; pointer-events: none; }
        @keyframes sweepShine { 0% { transform: translateX(-120%) skewX(-12deg); } 100% { transform: translateX(420%) skewX(-12deg); } }

        .dock-handle { position: relative; z-index: 3; display: flex; justify-content: center; align-items: center; gap: 3px; width: 60px; height: 9px; margin: 16px auto -1px; background: linear-gradient(180deg, #2E3542, #161B24); border: 1px solid rgba(255,255,255,0.12); border-bottom: none; border-radius: 5px 5px 0 0; }
        .dock-handle span { width: 3px; height: 3px; border-radius: 50%; background: rgba(255,255,255,0.35); }
        .icon-dock { position: relative; z-index: 2; display: flex; justify-content: center; flex-wrap: wrap; gap: 4px; margin: 0 auto 0; padding: 10px 12px; max-width: 560px; background: linear-gradient(180deg, #232A36, #12161F); border: 1px solid rgba(255,255,255,0.1); border-top-color: rgba(255,255,255,0.2); border-radius: 12px; box-shadow: inset 0 1px 0 rgba(255,255,255,0.1), 0 12px 28px rgba(0,0,0,0.4); }
        .icon-dock-btn { display: flex; flex-direction: column; align-items: center; gap: 5px; width: 78px; background: none; border: none; cursor: pointer; padding: 8px 4px; border-radius: 7px; transition: transform 0.18s ease, background 0.18s ease; }
        .icon-dock-btn:hover, .icon-dock-btn:focus-visible { transform: translateY(-5px); background: rgba(79,195,255,0.12); }
        .icon-dock-btn span { font-family: ${T.mono}; font-size: 9.5px; color: ${C.textSec}; text-align: center; letter-spacing: 0.02em; }
        .icon-dock-btn:hover span, .icon-dock-btn:focus-visible span { color: ${C.accentLight}; }

        .about-grid { display: grid; grid-template-columns: 128px 1fr; gap: 40px; align-items: start; }
        .exp-grid { display: grid; grid-template-columns: 168px 1fr; gap: 34px; }
        @media (max-width: 680px) { .about-grid, .exp-grid { grid-template-columns: 1fr; } }

        .proj-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 26px; }
        .proj-card { transform: rotate(var(--r, 0deg)); transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .proj-card:hover { transform: rotate(0deg) translateY(-4px); position: relative; z-index: 5; }

        .cert-header { display: grid; grid-template-columns: 1fr 140px 90px; gap: 10px; padding: 0 10px 10px; font-family: ${T.mono}; font-size: 10px; color: ${C.textSec}; text-transform: uppercase; letter-spacing: 0.06em; border-bottom: 1px solid ${C.hairline}; }
        .cert-row { display: grid; grid-template-columns: 1fr 140px 90px; gap: 10px; align-items: center; padding: 12px 10px; border-bottom: 1px solid rgba(255,255,255,0.06); font-family: ${T.body}; font-size: 12.5px; color: ${C.textSec}; }
        .cert-row:hover { background: ${C.accent}; color: #fff; }
        .cert-row:hover .cert-issuer, .cert-row:hover .cert-name { color: #fff; }
        @media (max-width: 680px) { .cert-header { display: none; } .cert-row { grid-template-columns: 1fr; gap: 4px; } }

        .term-line { font-family: ${T.pixel}; font-size: 16px; color: ${C.led}; line-height: 1.85; text-shadow: 0 0 4px rgba(60,255,122,0.4); }

        .pill { background: linear-gradient(180deg, #1B202B, #0E1119); border: 1px solid rgba(255,255,255,0.08); border-radius: 3px; padding: 5px 11px; font-family: ${T.mono}; font-size: 11px; font-weight: 700; color: ${C.textSec}; }
        .tag { background: rgba(0,114,206,0.16); border: 1px solid rgba(79,195,255,0.3); border-radius: 3px; padding: 3px 9px; font-family: ${T.mono}; font-weight: 700; font-size: 10px; letter-spacing: 0.03em; color: ${C.accentLight}; text-transform: uppercase; }

        .btn-primary { background: linear-gradient(180deg, #1E8AE8, #00417A); color: #fff; border: 1px solid #002d55; border-radius: 4px; padding: 12px 24px; font-family: ${T.display}; font-weight: 800; font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; box-shadow: inset 0 1px 0 rgba(255,255,255,0.5), 0 6px 18px rgba(0,114,206,0.35); }
        .btn-ghost { background: linear-gradient(180deg, #20262F, #12161F); color: ${C.textSec}; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; padding: 12px 24px; font-family: ${T.display}; font-weight: 800; font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; display: inline-block; }
        .btn-ghost:hover, .btn-primary:hover { filter: brightness(1.08); }

        .fade-link { color: ${C.chrome3}; font-family: ${T.mono}; font-size: 11px; letter-spacing: 0.05em; text-transform: uppercase; }
        .fade-link:hover { color: ${C.accentLight}; }

        button:focus-visible, a:focus-visible { outline: 2px solid ${C.accentLight}; outline-offset: 2px; }

        @media (max-width: 680px) { .win-body { padding: 18px !important; } }
      `}</style>

      {!booted && <BootScreen onDone={() => setBooted(true)} />}

      <div style={{ opacity: booted ? 1 : 0, transition: "opacity 0.6s ease" }}>
        {/* ── MENU BAR ── */}
        <div
          className="menubar"
          style={{
            boxShadow: scrolled ? "0 6px 18px rgba(0,0,0,0.5)" : "none",
          }}
        >
          <button
            type="button"
            onClick={() => go("desktop")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: C.led,
                boxShadow: `0 0 8px ${C.led}`,
                animation: "blink 2.4s ease-in-out infinite",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: T.display,
                fontWeight: 800,
                fontSize: 14,
                letterSpacing: "0.1em",
                color: C.chrome1,
              }}
            >
              FS.SYS
            </span>
          </button>
          <div
            className="scroll-row"
            style={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              maxWidth: "56%",
            }}
          >
            {NAV.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => go(n.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: active === n.id ? C.accentLight : C.textSec,
                  fontFamily: T.mono,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "6px 10px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {n.label}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 24, height: 24 }}>
              <ChipBadge size={48} />
            </div>
          </div>
        </div>

        {/* ── DESKTOP / HERO ── */}
        <section
          id="desktop"
          style={{
            minHeight: "100vh",
            position: "relative",
            overflow: "hidden",
            paddingTop: 70,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: C.bgDeep,
          }}
        >
          <Y2KWallpaper />

          <div
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: 620,
              margin: "0 auto",
              width: "100%",
              padding: "0 20px",
            }}
          >
            <Win
              title="WHOAMI.EXE"
              icon="terminal"
              statusText="STATUS: ONLINE — v3.1"
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#0D1119",
                    border: `1px solid ${C.hairline}`,
                    borderRadius: 4,
                    padding: "6px 14px",
                    fontFamily: T.mono,
                    fontSize: 10.5,
                    fontWeight: 700,
                    color: C.textSec,
                    marginBottom: 26,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: C.led,
                      boxShadow: `0 0 6px ${C.led}`,
                      display: "inline-block",
                      animation: "blink 2s ease-in-out infinite",
                    }}
                  />
                  LOC: Casablanca, Morocco
                </div>
                <h1
                  style={{
                    fontFamily: T.display,
                    fontWeight: 900,
                    fontSize: "clamp(34px, 8vw, 58px)",
                    letterSpacing: "0.01em",
                    lineHeight: 1.1,
                    margin: "0 0 20px",
                    textTransform: "uppercase",
                    backgroundImage: `linear-gradient(180deg, ${C.chrome1} 0%, ${C.chrome2} 45%, ${C.accentLight} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 2px 0 rgba(0,0,0,0.6))",
                  }}
                >
                  Fadwa Saif.
                </h1>
                <p
                  style={{
                    fontFamily: T.body,
                    fontSize: "clamp(13.5px, 1.6vw, 15.5px)",
                    color: C.textSec,
                    lineHeight: 1.8,
                    maxWidth: 420,
                    margin: "0 auto 30px",
                  }}
                >
                  Full Stack Developer who builds real products — from the first
                  line of code to production.
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => go("projects")}
                  >
                    View My Work
                  </button>
                  <a
                    href="https://github.com/Fadwa-Saif"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    GitHub ↗
                  </a>
                  <a
                    href="https://www.linkedin.com/in/fadwa-saif-a7280922b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </div>
            </Win>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section
          id="about"
          style={{ background: C.bgPanel, padding: "96px 20px" }}
        >
          <div
            data-id="about"
            style={{ maxWidth: 900, margin: "0 auto", ...anim("about") }}
          >
            <Label>ABOUT</Label>
            <Win title="ABOUT_ME.SYS" icon="doc" statusText="Ready.">
              <div className="about-grid">
                <div>
                  <div
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 6,
                      backgroundImage: `linear-gradient(160deg, ${C.chrome1} 0%, ${C.chrome2} 40%, ${C.chrome3} 100%)`,
                      border: "1px solid rgba(0,0,0,0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: T.display,
                      fontWeight: 900,
                      fontSize: 26,
                      color: "#12161F",
                      marginBottom: 14,
                      boxShadow:
                        "0 8px 26px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.6)",
                    }}
                  >
                    FS
                  </div>
                  <div
                    style={{
                      fontFamily: T.display,
                      fontWeight: 700,
                      fontSize: 13,
                      color: C.text,
                      marginBottom: 3,
                      textTransform: "uppercase",
                    }}
                  >
                    Fadwa Saif
                  </div>
                  <div
                    style={{
                      fontFamily: T.mono,
                      fontSize: 10,
                      color: C.textSec,
                    }}
                  >
                    UNIT: FULL_STACK_DEV
                  </div>
                </div>
                <div>
                  <h2
                    style={{
                      fontFamily: T.display,
                      fontWeight: 700,
                      fontSize: "clamp(18px, 2.6vw, 25px)",
                      lineHeight: 1.35,
                      margin: "0 0 16px",
                      color: C.text,
                      textTransform: "uppercase",
                    }}
                  >
                    I don't just write code.
                    <br />I build products.
                  </h2>
                  <p
                    style={{
                      fontFamily: T.body,
                      color: C.textSec,
                      lineHeight: 1.85,
                      fontSize: 14,
                      marginBottom: 12,
                    }}
                  >
                    Based in Casablanca, Morocco. Full Stack Developer
                    completing my TS Développement Digital Web Full Stack
                    diploma at ISGI Casablanca. My work spans React frontends,
                    Laravel and Spring Boot APIs, MySQL & MongoDB databases, and
                    ML experiments with Python.
                  </p>
                  <p
                    style={{
                      fontFamily: T.body,
                      color: C.textSec,
                      lineHeight: 1.85,
                      fontSize: 14,
                      marginBottom: 28,
                    }}
                  >
                    Beyond the code, I think like a builder — I've pitched a
                    SaaS product to a professional jury, care about real-world
                    impact, and always ask whether what I'm shipping actually
                    solves a problem worth solving.
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {[
                      ["3+", "Shipped projects"],
                      ["6+", "Technologies"],
                      ["2026", "Graduating"],
                    ].map(([val, label], i) => (
                      <div
                        key={label}
                        style={{
                          padding: "0 26px",
                          borderLeft:
                            i > 0 ? `1px solid ${C.hairline}` : "none",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: T.display,
                            fontWeight: 800,
                            fontSize: 24,
                            color: C.accentLight,
                            textShadow: `0 0 14px ${C.accentGlow}`,
                          }}
                        >
                          {val}
                        </div>
                        <div
                          style={{
                            fontFamily: T.mono,
                            fontSize: 10,
                            color: C.textSec,
                            marginTop: 4,
                            textTransform: "uppercase",
                          }}
                        >
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Win>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section
          id="skills"
          style={{ background: C.bgDeep, padding: "96px 20px" }}
        >
          <div
            data-id="skills"
            style={{ maxWidth: 900, margin: "0 auto", ...anim("skills") }}
          >
            <Label>SKILLS</Label>
            <H2>Technologies I work with</H2>
            <Win
              title="DEVICE_MANAGER.SYS"
              icon="gear"
              statusText={`${Object.values(SKILLS).flat().length} devices found — all functioning properly`}
            >
              {Object.entries(SKILLS).map(([cat, items]) => (
                <div key={cat} style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 10,
                      fontFamily: T.body,
                      fontWeight: 700,
                      fontSize: 12.5,
                      color: C.accentLight,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    <span style={{ color: C.chrome3 }}>▸</span>
                    {cat}
                    <span
                      style={{
                        marginLeft: "auto",
                        fontFamily: T.mono,
                        fontSize: 10,
                        color: C.textSec,
                      }}
                    >
                      {items.length} item{items.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                      paddingLeft: 18,
                      borderLeft: `1px dashed ${C.hairline}`,
                    }}
                  >
                    {items.map((s) => (
                      <span key={s} className="pill">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </Win>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section
          id="projects"
          style={{ background: C.bgPanel, padding: "96px 20px" }}
        >
          <div
            data-id="projects"
            style={{ maxWidth: 980, margin: "0 auto", ...anim("projects") }}
          >
            <Label>PROJECTS</Label>
            <H2>Things I've built</H2>
            <Win
              title="PROJECTS"
              icon="folder"
              statusText={`${PROJECTS.length} items — 1 featured`}
            >
              <div className="proj-grid">
                {PROJECTS.map((p, i) => (
                  <div
                    key={p.id}
                    className="win proj-card"
                    style={{ "--r": i % 2 === 0 ? "-1deg" : "1.2deg" }}
                  >
                    <div className="win-title">
                      <div className="win-title-left">
                        <PixelIcon type="folder" size={13} />
                        <span>
                          {p.name.toUpperCase().replace(/\s+/g, "_")}.EXE
                        </span>
                      </div>
                      <div className="win-buttons">
                        <span className="win-btn">–</span>
                        <span className="win-btn">▢</span>
                        <span className="win-btn win-btn-close">×</span>
                      </div>
                    </div>
                    <div
                      className="win-body"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                        padding: 22,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: T.mono,
                          fontSize: 10,
                          color: C.textSec,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {p.tag}
                      </div>
                      <h3
                        style={{
                          fontFamily: T.display,
                          fontWeight: 700,
                          fontSize: 18,
                          color: p.featured ? C.accentLight : C.text,
                          textTransform: "uppercase",
                        }}
                      >
                        {p.name}
                      </h3>
                      <p
                        style={{
                          fontFamily: T.body,
                          fontSize: 13,
                          lineHeight: 1.75,
                          color: C.textSec,
                        }}
                      >
                        {p.desc}
                      </p>
                      <div
                        style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
                      >
                        {p.tech.map((t) => (
                          <span key={t} className="tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="win-status">
                      <span>▶ github.com/Fadwa-Saif</span>
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: C.accentLight, fontWeight: 700 }}
                      >
                        OPEN ↗
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Win>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section
          id="experience"
          style={{ background: C.bgDeep, padding: "96px 20px" }}
        >
          <div
            data-id="experience"
            style={{ maxWidth: 900, margin: "0 auto", ...anim("experience") }}
          >
            <Label>EXPERIENCE</Label>
            <H2>Where I've worked</H2>
            <Win
              title="TERMINAL — JOJMA_INTERNSHIP"
              icon="terminal"
              statusText="bash — internship/jojma_erp"
              bodyStyle={{
                background: "#02040a",
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 3px)",
              }}
            >
              <div className="term-line">
                fadwa@jojma:~$ cat internship_log.txt
              </div>
              <div className="term-line" style={{ color: C.textSec }}>
                March – April 2026 · Casablanca, Morocco
              </div>
              <div
                className="term-line"
                style={{ color: C.text, marginBottom: 14 }}
              >
                Role: Full Stack Developer Intern
              </div>
              {EXP_BULLETS.map((pt) => (
                <div key={pt} className="term-line">
                  [OK] {pt}
                </div>
              ))}
              <div className="term-line" style={{ marginTop: 8 }}>
                fadwa@jojma:~${" "}
                <span className="boot-cursor" style={{ color: C.led }}>
                  █
                </span>
              </div>
            </Win>
          </div>
        </section>

        {/* ── EDUCATION ── */}
        <section
          id="education"
          style={{ background: C.bgPanel, padding: "96px 20px" }}
        >
          <div
            data-id="education"
            style={{ maxWidth: 900, margin: "0 auto", ...anim("education") }}
          >
            <Label>EDUCATION</Label>
            <H2>Where I learned</H2>
            <Win
              title="SETUP WIZARD — TS_DDWFS.EXE"
              icon="disk"
              statusText="Step 3 of 3 — Installation complete."
            >
              <h3
                style={{
                  fontFamily: T.display,
                  fontWeight: 700,
                  fontSize: 16,
                  marginBottom: 6,
                  color: C.text,
                  textTransform: "uppercase",
                }}
              >
                TS Développement Digital Web Full Stack
              </h3>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 12,
                  marginBottom: 6,
                  fontFamily: T.mono,
                  color: C.accentLight,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                ISGI Casablanca — OFPPT
              </div>

              <div
                style={{
                  marginTop: 22,
                  height: 8,
                  background: "#03050a",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    background: `linear-gradient(90deg, ${C.accent}, ${C.accentLight})`,
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: T.mono,
                  fontSize: 10,
                  marginTop: 6,
                  color: C.textSec,
                }}
              >
                100% — 9 modules installed
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  marginTop: 24,
                }}
              >
                {EDU_TOPICS.map((t) => (
                  <div
                    key={t}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      background: "#0D1119",
                      border: `1px solid ${C.hairline}`,
                      borderRadius: 3,
                      padding: "6px 10px",
                    }}
                  >
                    <span
                      style={{
                        width: 12,
                        height: 12,
                        border: `1px solid ${C.led}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 9,
                        color: C.led,
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>
                    <span
                      style={{
                        fontFamily: T.mono,
                        fontSize: 11,
                        color: C.text,
                      }}
                    >
                      {t}
                    </span>
                  </div>
                ))}
              </div>
            </Win>
          </div>
        </section>

        {/* ── CERTIFICATIONS ── */}
        <section
          id="certifications"
          style={{ background: C.bgDeep, padding: "96px 20px" }}
        >
          <div
            data-id="certifications"
            style={{
              maxWidth: 900,
              margin: "0 auto",
              ...anim("certifications"),
            }}
          >
            <Label>CERTIFICATIONS</Label>
            <H2>Licenses &amp; Certificates</H2>
            <Win
              title="LICENSE_MANAGER.SYS"
              icon="doc"
              statusText={`${CERTS.length} licenses found`}
            >
              <div className="cert-header">
                <span>Name</span>
                <span>Status</span>
                <span>Date</span>
              </div>
              {CERTS.map((cert, i) => (
                <div key={i} className="cert-row">
                  <div>
                    <div
                      className="cert-name"
                      style={{
                        fontFamily: T.display,
                        fontWeight: 700,
                        fontSize: 13,
                        color: C.text,
                        textTransform: "uppercase",
                      }}
                    >
                      {cert.name}
                    </div>
                    <div
                      className="cert-issuer"
                      style={{
                        fontFamily: T.mono,
                        fontSize: 10.5,
                        color: C.accentLight,
                        margin: "3px 0",
                      }}
                    >
                      {cert.issuer}
                    </div>
                    <div style={{ fontSize: 12, lineHeight: 1.5 }}>
                      {cert.desc}
                    </div>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-block",
                          marginTop: 5,
                          fontSize: 10,
                          fontWeight: 700,
                          fontFamily: T.mono,
                          color: C.accentLight,
                          textTransform: "uppercase",
                        }}
                      >
                        View ↗
                      </a>
                    )}
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        flexShrink: 0,
                        background:
                          cert.status === "issued" ? C.led : "transparent",
                        border:
                          cert.status !== "issued"
                            ? `1.5px solid ${C.ledAmber}`
                            : "none",
                        boxShadow:
                          cert.status === "issued"
                            ? `0 0 6px ${C.led}`
                            : "none",
                      }}
                    />
                    <span style={{ fontFamily: T.mono, fontSize: 10.5 }}>
                      {cert.status === "issued" ? "INSTALLED" : "PENDING"}
                    </span>
                  </div>
                  <div style={{ fontFamily: T.mono, fontSize: 11 }}>
                    {cert.year}
                  </div>
                </div>
              ))}
            </Win>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section
          id="contact"
          style={{
            background: C.bgPanel,
            padding: "96px 20px",
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
              width: 520,
              height: 520,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${C.accentGlow} 0%, transparent 70%)`,
              pointerEvents: "none",
            }}
          />
          <div
            data-id="contact"
            style={{
              maxWidth: 620,
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
              ...anim("contact"),
            }}
          >
            <Label>CONTACT</Label>
            <Win
              title="NEW MESSAGE — CONTACT.SYS"
              icon="mail"
              statusText="1 recipient"
            >
              <div style={{ textAlign: "center", padding: "8px 0" }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    margin: "0 auto 20px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle at 35% 30%, ${C.accentLight}, ${C.accent})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: T.display,
                    fontWeight: 900,
                    fontSize: 22,
                    color: "#fff",
                    boxShadow: `0 0 30px ${C.accentGlow}`,
                  }}
                >
                  @
                </div>
                <h2
                  style={{
                    fontFamily: T.display,
                    fontWeight: 900,
                    fontSize: "clamp(24px, 4.6vw, 36px)",
                    lineHeight: 1.2,
                    margin: "0 0 14px",
                    color: C.text,
                    textTransform: "uppercase",
                  }}
                >
                  Let's build
                  <br />
                  <span
                    style={{
                      backgroundImage: `linear-gradient(180deg, ${C.accentLight}, ${C.accent})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    something together.
                  </span>
                </h2>
                <p
                  style={{
                    fontFamily: T.body,
                    color: C.textSec,
                    fontSize: 14,
                    lineHeight: 1.75,
                    margin: "0 0 30px",
                  }}
                >
                  Open to full-time opportunities, collaborations, and
                  interesting projects.
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
                    Send Email
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
            </Win>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer
          style={{
            background: "#03050a",
            borderTop: `1px solid ${C.hairline}`,
            padding: "16px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 46,
          }}
        >
          <span style={{ fontFamily: T.mono, fontSize: 10, color: C.textSec }}>
            ● SYSTEM READY
          </span>
          <span style={{ fontFamily: T.mono, fontSize: 10, color: C.textSec }}>
            © 2026 FADWA SAIF — ALL RIGHTS RESERVED
          </span>
          <div style={{ display: "flex", gap: 18 }}>
            <a
              href="https://github.com/Fadwa-Saif"
              target="_blank"
              rel="noopener noreferrer"
              className="fade-link"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/fadwa-saif-a7280922b/"
              target="_blank"
              rel="noopener noreferrer"
              className="fade-link"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </div>

      {/* ── TASKBAR ── */}
      {startOpen && (
        <div
          onClick={() => setStartOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 94 }}
        />
      )}
      {startOpen && (
        <div className="start-menu">
          <div className="start-menu-rail">
            <span>SAIF•OS</span>
          </div>
          <div className="start-menu-items">
            {NAV.map((n) => (
              <button
                key={n.id}
                type="button"
                className="start-menu-item"
                onClick={() => go(n.id)}
              >
                <PixelIcon type={n.icon} size={14} /> {n.label}
              </button>
            ))}
            <div className="start-menu-div" />
            <button
              type="button"
              className="start-menu-item"
              onClick={() => go("desktop")}
            >
              <PixelIcon type="disk" size={14} /> Restart Desktop...
            </button>
          </div>
        </div>
      )}
      <div className="taskbar">
        <button
          type="button"
          className="start-btn"
          onClick={() => setStartOpen((s) => !s)}
        >
          ⊞ Start
        </button>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {DESKTOP_ICONS.map((ic) => (
            <button
              key={ic.id}
              type="button"
              className="dock-icon"
              onClick={() =>
                ic.href
                  ? window.open(ic.href, "_blank", "noopener,noreferrer")
                  : go(ic.id)
              }
            >
              <PixelIcon type={ic.icon} size={22} />
              <span>{ic.label}</span>
            </button>
          ))}
        </div>{" "}
        <div className="tray">
          <div className="meter" title="CPU load">
            <span>CPU</span>
            <div className="meter-track">
              <div className="meter-fill" style={{ width: meters.cpu + "%" }} />
            </div>
          </div>
          <div className="meter" title="Memory load">
            <span>RAM</span>
            <div className="meter-track">
              <div
                className="meter-fill"
                style={{ width: meters.ram + "%", background: C.accentLight }}
              />
            </div>
          </div>
          <span className="tray-clock">{clockStr}</span>
        </div>
      </div>
    </>
  );
}
