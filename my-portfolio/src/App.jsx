import { useState, useEffect, useRef } from "react";

// ─── PALETTE — https://coolors.co/palette/0a1128-001f54-034078 ─────────────
const C = {
  navy: "#0A1128",
  lightNavy: "#001F54",
  accent: "#034078",
  lightestNavy: "rgba(3,64,120,0.35)",
  slate: "#8493B4",
  ltSlate: "#C3D0E8",
  white: "#EAF0FB",
};
const MONO = "'Fira Code', 'SF Mono', 'JetBrains Mono', monospace";
const SANS = "'Inter', -apple-system, 'Segoe UI', sans-serif";

// ─── CONTENT ─────────────────────────────────────────────────────────────────
const NAV = [
  { num: "01", label: "About", id: "about" },
  { num: "02", label: "Experience", id: "experience" },
  { num: "03", label: "Projects", id: "projects" },
  { num: "04", label: "Education", id: "education" },
  { num: "05", label: "Certifications", id: "certifications" },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Fadwa-Saif", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/fadwa-saif-a7280922b/",
    icon: "linkedin",
  },
  { label: "Email", href: "mailto:saiffadoua@gmail.com", icon: "mail" },
];

const SKILLS = [
  {
    cat: "Frontend",
    items: [
      "React.js",
      "Redux",
      "JavaScript ES6+",
      "HTML & CSS",
      "Tailwind CSS",
    ],
  },
  { cat: "Backend", items: ["Laravel", "Spring Boot 3", "Java 17", "PHP"] },
  { cat: "Database", items: ["MySQL", "MongoDB"] },
  {
    cat: "Tools & DevOps",
    items: ["Git", "Docker", "JWT", "REST APIs", "Postman"],
  },
  {
    cat: "AI / ML",
    items: ["Python", "TensorFlow", "Groq API", "Transfer Learning"],
  },
  { cat: "Methods", items: ["Agile / Scrum", "UML", "Merise", "Cloud Native"] },
];

const EXPERIENCE = [
  {
    company: "JOJMA Group",
    role: "Full-Stack Developer Intern",
    range: "Jan 2026 — Feb 2026 · Casablanca, Morocco",
    bullets: [
      "Participated in the development of an internal ERP for managing business processes",
      "Developed backend modules with Spring Boot and Java, and frontend modules with React.js, within an Agile team",
      "Ran tests, fixed bugs, optimized performance, and managed versioning with Git",
    ],
    tech: [
      "Java (Spring Boot)",
      "JavaScript (React)",
      "HTML",
      "Tailwind CSS",
      "MySQL",
    ],
  },
];

const PROJECTS = [
  {
    name: "MediCabinet",
    tag: "Academic Project",
    desc: "A multi-practice, multi-doctor SaaS platform with medical records, appointment scheduling, and an AI chatbot — deployed to production and presented to a professional jury (PIE).",
    tech: ["React.js", "Laravel", "MySQL", "JWT", "Groq API (LLaMA 3.3)"],
    link: "https://gitlab.com/Fadwa-Saif/MediCabinet-Projet-de-synthese-FrontEnd",
  },
  {
    name: "DeliTrack",
    tag: "Cloud-Native Project",
    desc: "A delivery-tracking app with separate microservices for authentication, deliveries, clients, and notifications.",
    tech: ["Microservices", "Docker Compose", "RabbitMQ", "JWT", "RBAC"],
    link: "https://github.com/Fadwa-Saif/Projet-app-cloud-native-Suivi-de-Livraisons",
  },
  {
    name: "Weather App",
    tag: "SheCodes Plus Project",
    desc: "A city weather app with current conditions and a seven-day forecast, including temperature, humidity, and wind speed.",
    tech: ["JavaScript", "HTML", "CSS", "Axios", "Weather API"],
    link: "https://github.com/Fadwa-Saif/Weather-app",
  },
];

const EDUCATION = [
  {
    title: "Specialized Technician in Digital Development",
    org: "ISGI Casablanca (OFPPT)",
    date: "2024 – 2026",
  },
  {
    title: "Entrepreneurial Innovation Program (PIE)",
    org: "ISGI Casablanca / UM6P",
    date: "2024 – 2026",
  },
];

const CERTS = [
  {
    name: "Machine Learning Essentials",
    issuer: "Qualifying Training",
    desc: "Fundamentals of Machine Learning: data preprocessing, classification algorithms, and model evaluation.",
    date: "2026",
  },
  {
    name: "Python Essentials 1",
    issuer: "Cisco",
    desc: "Python fundamentals: data structures, algorithms, and object-oriented programming.",
    date: "2025",
  },
  {
    name: "SheCodes Plus",
    issuer: "SheCodes",
    desc: "Advanced web development training: HTML5, CSS3, JavaScript, API integration, Git, and GitHub.",
    date: "2025",
  },
  {
    name: "SheCodes Basics",
    issuer: "SheCodes",
    desc: "Front-end web development: HTML5, CSS3, JavaScript, and responsive design.",
    date: "2024",
  },
];

// ─── ICONS ────────────────────────────────────────────────────────────────────
const ICONS = {
  github: (
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.2.66.79.55A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  ),
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6.5 0h3.8v1.64h.05c.53-.97 1.83-2 3.76-2 4.02 0 4.76 2.5 4.76 5.76V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.44-2.16 2.96V21h-4V9Z" />
  ),
  mail: (
    <>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m3 7 9 6 9-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </>
  ),
  folder: (
    <path
      d="M3 6a1 1 0 0 1 1-1h4.5l1.5 2H20a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    />
  ),
  external: (
    <>
      <path d="M14 4h6v6" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M20 4 10 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </>
  ),
};

function Icon({ name, size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

// ─── CURSOR GLOW — soft accent-colored light that follows the mouse ─────────
// Accent color as an "R,G,B" string, e.g. "3,64,120" for #034078
const AR = "3,64,120";
function CursorGlow() {
  const glowRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      // center the 600px glow on the cursor
      target.current.x = e.clientX - 300;
      target.current.y = e.clientY - 300;
    };

    const animate = () => {
      // ease factor: lower = more lag/smoothness, higher = snappier
      const ease = 0.12;

      current.current.x += (target.current.x - current.current.x) * ease;
      current.current.y += (target.current.y - current.current.y) * ease;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow" />;
}

// ─── REVEAL WRAPPER ───────────────────────────────────────────────────────────
function Reveal({ id, as: Tag = "div", className = "", children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal ${visible ? "visible" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// ─── SECTION HEADING ──────────────────────────────────────────────────────────
function SectionHeading({ num, children }) {
  return (
    <div className="sh">
      <span className="sh-num">{num}.</span>
      <h2>{children}</h2>
      <span className="sh-rule" />
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Inter:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);

    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      Boolean,
    );
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        html,body{ margin:0; padding:0; background:${C.navy}; overflow-x:hidden; }
        *,*::before,*::after{ box-sizing:border-box; }
        html{ scroll-behavior:smooth; }
        .pf{ background:${C.navy}; color:${C.slate}; font-family:${SANS}; font-size:18px; line-height:1.6; min-height:100vh; position:relative; overflow-x:hidden; }
        .pf a{ color:inherit; text-decoration:none; }
        .pf ::selection{ background:rgba(${AR},0.35); color:${C.white}; }

        /* ── cursor glow ── */
        .cursor-glow{ position:fixed; top:0; left:0; width:600px; height:600px; border-radius:50%; pointer-events:none; z-index:0; will-change:transform;
          background:radial-gradient(circle, rgba(${AR},0.4) 0%, rgba(${AR},0.14) 35%, transparent 70%); mix-blend-mode:screen; }

        /* ── rails ── */
        .rail-left{ position:fixed; left:40px; top:0; bottom:0; width:210px; display:flex; flex-direction:column; align-items:flex-start; justify-content:space-between; padding:48px 0; z-index:20; }
        .rail-nav{ display:flex; flex-direction:column; gap:18px; }
        .rail-nav-item{ display:flex; align-items:baseline; gap:10px; background:none; border:none; border-left:2px solid transparent; padding:4px 6px 4px 14px; cursor:pointer; text-align:left; transition:border-color .25s ease, transform .25s ease; }
        .rail-nav-item .num{ font-family:${MONO}; font-size:12px; color:${C.accent}; }
        .rail-nav-item .label{ font-family:${SANS}; font-size:13px; color:${C.slate}; transition:color .25s ease; white-space:nowrap; }
        .rail-nav-item:hover{ transform:translateX(3px); }
        .rail-nav-item:hover .label, .rail-nav-item.on .label{ color:${C.white}; }
        .rail-nav-item:hover, .rail-nav-item.on{ border-left-color:${C.accent}; }
        .rail-social{ display:flex; flex-direction:column; align-items:flex-start; gap:18px; position:relative; padding-left:14px; }
        .rail-social::before{ content:""; width:1px; height:70px; background:${C.slate}; margin-bottom:18px; margin-left:4px; }
        .rail-social a{ color:${C.slate}; transition:color .25s ease, transform .25s ease; }
        .rail-social a:hover{ color:${C.accent}; transform:translateY(-3px); }

        .rail-right{ position:fixed; right:24px; bottom:0; top:0; width:40px; display:flex; align-items:flex-end; justify-content:center; padding-bottom:48px; z-index:20; }
        .rail-email{ writing-mode:vertical-rl; font-family:${MONO}; font-size:12px; letter-spacing:.05em; color:${C.slate}; display:flex; flex-direction:column; align-items:center; gap:18px; transition:color .25s ease, transform .25s ease; }
        .rail-email::after{ content:""; width:1px; height:70px; background:${C.slate}; }
        .rail-email:hover{ color:${C.accent}; transform:translateY(-3px); }

        /* ── content ── */
        main{ position:relative; z-index:1; max-width:1180px; margin:0 auto; padding:0 140px 0 300px; }
        .hero{ min-height:100vh; display:flex; flex-direction:column; justify-content:center; }
        .kicker{ font-family:${MONO}; color:${C.accent}; font-size:15px; margin-bottom:20px; }
        .hero h1{ font-family:${SANS}; font-weight:700; color:${C.white}; font-size:clamp(38px,8vw,72px); line-height:1.1; margin:0 0 6px; }
        .hero h2{ font-family:${SANS}; font-weight:600; color:${C.slate}; font-size:clamp(26px,5.5vw,50px); line-height:1.15; margin:0 0 24px; }
        .hero p{ max-width:540px; color:${C.slate}; font-size:18px; }
        .hero-socials{ display:none; align-items:center; gap:24px; margin-top:32px; }
        .hero-socials a{ color:${C.slate}; transition:color .25s ease, transform .25s ease; }
        .hero-socials a:hover{ color:${C.accent}; transform:translateY(-3px); }

        section{ padding:100px 0; }
        .reveal{ opacity:0; transform:translateY(20px); transition:opacity .6s ease, transform .6s ease; }
        .reveal.visible{ opacity:1; transform:none; }

        .sh{ display:flex; align-items:center; gap:12px; margin-bottom:40px; }
        .sh-num{ font-family:${MONO}; color:${C.accent}; font-size:19px; font-weight:500; }
        .sh h2{ font-family:${SANS}; color:${C.white}; font-weight:600; font-size:clamp(22px,4vw,28px); white-space:nowrap; }
        .sh-rule{ flex:1; height:1px; background:${C.lightestNavy}; }

        .about-main{ max-width:640px; }
        .about-main p + p{ margin-top:16px; }
        .stack-list{ margin-top:28px; max-width:720px; border-bottom:1px solid ${C.lightestNavy}; }
        .stack-row{ display:grid; grid-template-columns:140px minmax(0,1fr); gap:16px; padding:10px 0; border-top:1px solid ${C.lightestNavy}; }
        .stack-category h3{ margin:0; color:${C.ltSlate}; font-family:${MONO}; font-size:12px; font-weight:500; }
        .stack-items{ display:flex; flex-wrap:wrap; align-items:center; list-style:none; margin:0; padding:0; color:${C.slate}; font-size:13px; line-height:1.6; }
        .stack-items li + li::before{ content:"·"; color:${C.accent}; margin:0 8px; }

        .exp{ display:flex; gap:32px; }
        .tab-list{ display:flex; flex-direction:column; border-left:2px solid ${C.lightestNavy}; min-width:160px; }
        .tab-list button{ text-align:left; background:none; border:none; padding:12px 20px; font-family:${SANS}; font-size:14px; color:${C.slate}; cursor:pointer; border-left:2px solid transparent; margin-left:-2px; transition:color .25s ease, background .25s ease, border-color .25s ease; }
        .tab-list button.on{ color:${C.white}; background:${C.lightNavy}; border-left:2px solid ${C.accent}; }
        .exp-panel{ flex:1; }
        .exp-panel h3{ font-family:${SANS}; font-size:20px; color:${C.white}; font-weight:600; }
        .exp-panel h3 span{ color:${C.accent}; font-weight:500; }
        .exp-panel .range{ font-family:${MONO}; font-size:13px; color:${C.slate}; margin:6px 0 20px; }
        .exp-panel ul{ list-style:none; margin:0; padding:0; }
        .exp-panel li{ position:relative; padding-left:24px; margin-bottom:14px; font-size:16px; }
        .exp-panel li::before{ content:"▹"; position:absolute; left:0; color:${C.accent}; }

        .proj-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:24px; }
        .proj-card{ background:${C.lightNavy}; border-radius:6px; padding:28px; display:flex; flex-direction:column; transition:transform .25s ease, box-shadow .25s ease; }
        .proj-card:hover{ transform:translateY(-6px); box-shadow:0 18px 34px -14px rgba(0,0,0,0.7); }
        .proj-top{ display:flex; justify-content:space-between; align-items:center; color:${C.accent}; }
        .proj-top a{ color:${C.slate}; transition:color .2s ease, transform .2s ease; }
        .proj-top a:hover{ color:${C.accent}; transform:translateY(-2px); }
        .proj-card h3{ font-family:${SANS}; color:${C.white}; font-size:19px; font-weight:600; margin-top:18px; }
        .proj-tag{ font-family:${MONO}; font-size:11px; color:${C.accent}; text-transform:uppercase; letter-spacing:.04em; margin-top:2px; display:block; }
        .proj-card p{ font-size:14.5px; margin-top:12px; flex:1; }
        .proj-tech{ display:flex; flex-wrap:wrap; gap:8px 14px; margin-top:20px; }
        .proj-tech span{ font-family:${MONO}; font-size:12px; color:${C.ltSlate}; }

        .edu-row{ display:flex; justify-content:space-between; align-items:baseline; gap:20px; padding:18px 0; border-bottom:1px solid ${C.lightestNavy}; flex-wrap:wrap; }
        .edu-row:last-child{ border-bottom:none; }
        .edu-row h3{ font-family:${SANS}; color:${C.white}; font-size:16px; font-weight:600; }
        .edu-row .org{ font-family:${MONO}; font-size:12px; color:${C.accent}; margin-top:4px; }
        .edu-row .date{ font-family:${MONO}; font-size:12px; color:${C.slate}; white-space:nowrap; }
        #education .sh{ margin-bottom:30px; }
        #education .edu-row{ padding:13px 0; }
        #education .edu-row .org{ margin-top:2px; }

        #certifications{ padding:56px 0; }
        #certifications .sh{ margin-bottom:20px; }
        .cert-row{ display:flex; justify-content:space-between; align-items:center; gap:16px; padding:9px 0; border-bottom:1px solid ${C.lightestNavy}; }
        .cert-row:last-child{ border-bottom:none; }
        .cert-row h3{ display:inline; font-family:${SANS}; color:${C.white}; font-size:14px; font-weight:600; }
        .cert-row .issuer{ display:inline; font-family:${MONO}; font-size:11px; color:${C.accent}; margin-left:10px; }
        .cert-row a{ display:inline-block; margin-top:8px; font-family:${MONO}; font-size:12px; color:${C.slate}; border-bottom:1px solid ${C.slate}; }
        .cert-row a:hover{ color:${C.accent}; border-color:${C.accent}; }
        .cert-status{ display:flex; align-items:center; gap:8px; font-family:${MONO}; font-size:12px; color:${C.slate}; white-space:nowrap; flex-shrink:0; }
        .dot{ width:7px; height:7px; border-radius:50%; }
        .dot.on{ background:${C.accent}; box-shadow:0 0 6px ${C.accent}; }
        .dot.off{ border:1.5px solid ${C.slate}; }

        footer{ position:relative; z-index:1; text-align:center; padding:60px 0 100px; font-family:${MONO}; font-size:12px; color:${C.slate}; }

        @media (max-width:1080px){
          .rail-left, .rail-right{ display:none; }
          main{ padding:0 24px; }
          .hero{ min-height:auto; padding:80px 0 60px; }
          .hero-socials{ display:flex; }
          .exp{ flex-direction:column; }
          .tab-list{ flex-direction:row; border-left:none; border-bottom:2px solid ${C.lightestNavy}; overflow-x:auto; }
          .tab-list button{ border-left:none; border-bottom:2px solid transparent; margin-left:0; margin-bottom:-2px; white-space:nowrap; }
          .tab-list button.on{ border-left:none; border-bottom:2px solid ${C.accent}; }
        }
        @media (max-width:640px){
          .pf{ font-size:16px; }
          section{ padding:70px 0; }
          #certifications{ padding:44px 0; }
          .stack-row{ grid-template-columns:110px minmax(0,1fr); gap:10px; padding:9px 0; }
          .cert-row{ gap:8px; }
          .cert-row .issuer{ display:block; margin:3px 0 0; }
        }
        @media (prefers-reduced-motion: reduce){
          *{ transition-duration:.01ms !important; animation-duration:.01ms !important; }
        }
      `}</style>

      <div className="pf">
        <CursorGlow />

        {/* left rail */}
        <aside className="rail-left">
          <nav className="rail-nav" aria-label="Primary">
            {NAV.map((n) => (
              <button
                key={n.id}
                className={`rail-nav-item ${active === n.id ? "on" : ""}`}
                onClick={() => go(n.id)}
              >
                <span className="num">{n.num}</span>
                <span className="label">{n.label}</span>
              </button>
            ))}
          </nav>
          <div className="rail-social">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.icon === "mail" ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
              >
                <Icon name={s.icon} size={19} />
              </a>
            ))}
          </div>
        </aside>

        {/* right rail */}
        <aside className="rail-right">
          <a className="rail-email" href="mailto:saiffadoua@gmail.com">
            saiffadoua@gmail.com
          </a>
        </aside>

        <main>
          {/* hero */}
          <section className="hero" id="hero">
            <p className="kicker">Hi, I'm</p>
            <h1>Fadwa Saif.</h1>
            <h2>I build things for the web.</h2>
            <p>
              I'm a full-stack developer based in Casablanca, Morocco <br></br>
              building stuff • breaking things • fixing them better
            </p>
            <div className="hero-socials">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.icon === "mail" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                >
                  <Icon name={s.icon} size={22} />
                </a>
              ))}
            </div>
          </section>

          {/* about — left as-is */}
          <Reveal as="section" id="about">
            <SectionHeading num="01">About</SectionHeading>
            <div className="about-main">
              <p>
                Hi! I'm Fadwa, I design and build web applications from the
                ground up,I'am a Full-stack Developer, turning ideas into
                products people actually use.
              </p>
              <p>
                My experience includes building an internal ERP system during a
                Spring Boot/React internship at JOJMA Group — my first time
                working with Spring Boot — and MediCabinet, a multi-cabinet
                medical SaaS platform I developed and presented to a
                professional jury.
              </p>
              <p>
                Currently seeking my first full-time opportunity as a full-stack
                developer. In the meantime, I'm working on side projects and
                continuing to sharpen my skills.
              </p>
              <div className="stack-list" aria-label="Technical skills">
                {SKILLS.map((group) => (
                  <div className="stack-row" key={group.cat}>
                    <div className="stack-category">
                      <h3>{group.cat}</h3>
                    </div>
                    <ul className="stack-items">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* experience */}
          <Reveal as="section" id="experience">
            <SectionHeading num="02">Experience</SectionHeading>
            <ExperienceTabs />
          </Reveal>

          {/* projects */}
          <Reveal as="section" id="projects">
            <SectionHeading num="03">Projects</SectionHeading>
            <div className="proj-grid">
              {PROJECTS.map((p) => (
                <div className="proj-card" key={p.name}>
                  <div className="proj-top">
                    <Icon name="folder" size={30} />
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${p.name}`}
                      >
                        <Icon name="external" size={20} />
                      </a>
                    )}
                  </div>
                  <span className="proj-tag">{p.tag}</span>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <div className="proj-tech">
                    {p.tech.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* education */}
          <Reveal as="section" id="education">
            <SectionHeading num="04">Education</SectionHeading>
            <div className="edu-list">
              {EDUCATION.map((e) => (
                <div className="edu-row" key={e.title}>
                  <div>
                    <h3>{e.title}</h3>
                    <p className="org">{e.org}</p>
                  </div>
                  <span className="date">{e.date}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* certifications */}
          <Reveal as="section" id="certifications">
            <SectionHeading num="05">Certifications</SectionHeading>
            {CERTS.map((c) => (
              <div className="cert-row" key={c.name}>
                <div>
                  <h3>{c.name}</h3>
                  <p className="issuer">{c.issuer}</p>
                </div>
                <span className="cert-status">{c.date}</span>
              </div>
            ))}
          </Reveal>

          <footer>Built by Fadwa Saif · 2026</footer>
        </main>
      </div>
    </>
  );
}

function ExperienceTabs() {
  const [tab, setTab] = useState(0);
  const job = EXPERIENCE[tab];
  return (
    <div className="exp">
      <div className="tab-list">
        {EXPERIENCE.map((j, i) => (
          <button
            key={j.company}
            className={i === tab ? "on" : ""}
            onClick={() => setTab(i)}
          >
            {j.company}
          </button>
        ))}
      </div>
      <div className="exp-panel">
        <h3>
          {job.role} <span>@ {job.company}</span>
        </h3>
        <p className="range">{job.range}</p>
        <ul>
          {job.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <div className="proj-tech">
          {job.tech.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
