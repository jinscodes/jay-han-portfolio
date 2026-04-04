"use client";

import Splash from "@layouts/Splash";
import { useEffect, useRef, useState } from "react";
import st from "./layout.module.scss";
import Contact from "./views/Contact";
import FAQ from "./views/FAQ";
import Info from "./views/Info";
import Projects from "./views/Projects";
import Resume from "./views/Resume";

const MENUS = [
  { label: "Home", id: "home" },
  { label: "Projects", id: "projects" },
  { label: "Info", id: "info" },
  { label: "Contact", id: "contact" },
  { label: "FAQ", id: "faq" },
  { label: "Resume", id: "resume" },
];

const SIZE = 460;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 170;
const circlePath = `M ${CX},${CY - R} A ${R},${R} 0 1,1 ${CX - 0.001},${CY - R}`;

type Phase = "splash" | "fading" | "done";

const Layout = () => {
  const [phase, setPhase] = useState<Phase>("splash");
  const [activeId, setActiveId] = useState("home");
  const frameRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("fading"), 1700);
    const t2 = setTimeout(() => setPhase("done"), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const sections = MENUS.map(({ id }) => document.getElementById(id)).filter(
      Boolean,
    ) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { threshold: 0.5 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [phase]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (frameRef.current) {
      const rect = frameRef.current.getBoundingClientRect();
      frameRef.current.style.setProperty(
        "--mouse-x",
        `${e.clientX - rect.left}px`,
      );
      frameRef.current.style.setProperty(
        "--mouse-y",
        `${e.clientY - rect.top}px`,
      );
    }
  };

  return (
    <>
      {phase !== "done" && (
        <div
          className={`${st.splashLayer} ${phase === "fading" ? st.splashFading : ""}`}
        >
          <Splash />
        </div>
      )}
      <div
        className={`${st.layout} ${phase !== "splash" ? st.layoutVisible : ""}`}
      >
        <section
          id="home"
          ref={frameRef}
          className={st.frame}
          onMouseMove={handleMouseMove}
        >
          <div className={st.orbitWrapper}>
            <h1 className={st.name}>Jay Han</h1>
            <svg
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              width={SIZE}
              height={SIZE}
              className={st.orbitSvg}
            >
              <defs>
                <path id="orbitPath" d={circlePath} />
              </defs>
              {MENUS.map(({ label, id }, i) => (
                <text
                  key={id}
                  className={`${st.svgItem} ${activeId === id ? st.svgActive : ""}`}
                  onClick={() => scrollTo(id)}
                >
                  <textPath
                    href="#orbitPath"
                    startOffset={`${(i / MENUS.length) * 100 + 100 / MENUS.length / 2}%`}
                    textAnchor="middle"
                  >
                    {label}
                  </textPath>
                </text>
              ))}
            </svg>
          </div>
        </section>
        <section id="projects" className={st.section}>
          <Projects />
        </section>
        <section id="info" className={st.section}>
          <Info />
        </section>
        <section id="contact" className={st.section}>
          <Contact />
        </section>
        <section id="faq" className={st.section}>
          <FAQ />
        </section>
        <section id="resume" className={st.section}>
          <Resume />
        </section>
      </div>
      {activeId !== "home" && (
        <button
          className={st.scrollTop}
          onClick={() => scrollTo("home")}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </>
  );
};

export default Layout;
