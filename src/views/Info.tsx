import st from "./info.module.scss";

// ECG: 2 cycles each 500 units tall. Long flat → sharp QRS only.
// Center x=3, viewBox width=18 (viewBox "-6 0 18 TOTAL")
function ecgCycle(y0: number): string {
  const x = 3;
  return [
    // long flat approach
    `L ${x}       ${y0 + 300}`,
    // sharp Q dip
    `L ${x - 1.5} ${y0 + 308}`,
    // sharp R peak
    `L ${x + 6}   ${y0 + 320}`,
    // sharp S dip
    `L ${x - 5}   ${y0 + 332}`,
    // back to baseline
    `L ${x}       ${y0 + 340}`,
    // flat tail
    `L ${x}       ${y0 + 500}`,
  ].join(" ");
}

const CYCLES = 2;
const ecgPath = [
  "M 3 0",
  "L 3 0",
  ...Array.from({ length: CYCLES }, (_, i) => ecgCycle(i * 500)),
].join(" ");
const TOTAL = CYCLES * 500;

const socialLinks = [
  { label: "GitHub", url: "https://github.com/jinscodes" },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/jay-han-49974920a/",
  },
  { label: "Blog", url: "https://jay-h-blog.vercel.app/" },
  { label: "Instagram", url: "https://www.instagram.com/_jay_h_99/" },
];

const education = [
  {
    name: "Illinois Institute of Technology",
    detail: "B.S. Information Technology Management",
    period: "2025 — 2026",
  },
  {
    name: "Stony Brook University, SUNY",
    detail: "B.S. Computer Science",
    period: "2019 — 2022",
  },
];

const experience = [
  {
    name: "Union Contents",
    detail: "Frontend Developer",
    period: "2022 — 2024",
  },
  { name: "Team Breedge", detail: "Co-founder, Fullstack", period: "2024 —" },
  { name: "Team Practo", detail: "Frontend Developer", period: "2025" },
];

const Info = () => (
  <div className={st.info}>
    <div className={st.left}>
      <div className={st.identity}>
        <span className={st.tag}>Frontend Developer</span>
        <h2 className={st.name}>Jay Han</h2>
        <p className={st.location}>Chicago, IL · Seoul, KR</p>
      </div>
      <ul className={st.links}>
        {socialLinks.map(({ label, url }) => (
          <li key={label}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={st.link}
            >
              <span>{label}</span>
              <span className={st.arrow}>↗</span>
            </a>
          </li>
        ))}
      </ul>
    </div>

    {/* ECG heartbeat divider */}
    <div className={st.dividerWrap}>
      <svg
        className={st.ecgSvg}
        viewBox={`-6 0 18 ${TOTAL}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="ecgGlow" x="-500%" y="0%" width="1100%" height="100%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
            <feColorMatrix in="blur" type="matrix"
              values="0 0 0 0 0  0 0 0 0 0.9  0 0 0 0 0.9  0 0 0 3 0"
              result="coloredBlur"
            />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Static dim line */}
        <line x1="3" y1="0" x2="3" y2={TOTAL}
          stroke="rgba(255,255,255,0.07)" strokeWidth="0.3" />

        {/* Animated heartbeat — dim base */}
        <path d={ecgPath} fill="none"
          stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeLinecap="round" />

        {/* Animated heartbeat — neon traveling pulse */}
        <path d={ecgPath} fill="none"
          stroke="#00eeff" strokeWidth="0.8" strokeLinecap="round"
          filter="url(#ecgGlow)"
          strokeDasharray={`120 ${TOTAL - 120}`}
          className={st.ecgPulse}
        />
      </svg>
    </div>

    <div className={st.right}>
      <p className={st.bio}>
        I&apos;m a frontend developer with a focus on building clean, performant
        interfaces. I care deeply about user experience, design systems, and
        writing code that is both readable and maintainable. Currently pursuing
        a Master&apos;s at Illinois Tech while working on side projects that
        push what the web can do.
      </p>

      <div className={st.section}>
        <h3 className={st.sectionTitle}>Education</h3>
        {education.map(({ name, detail, period }) => (
          <div key={name} className={st.row}>
            <div className={st.rowLeft}>
              <span className={st.rowName}>{name}</span>
              <span className={st.rowDetail}>{detail}</span>
            </div>
            <span className={st.period}>{period}</span>
          </div>
        ))}
      </div>

      <div className={st.section}>
        <h3 className={st.sectionTitle}>Experience</h3>
        {experience.map(({ name, detail, period }) => (
          <div key={name} className={st.row}>
            <div className={st.rowLeft}>
              <span className={st.rowName}>{name}</span>
              <span className={st.rowDetail}>{detail}</span>
            </div>
            <span className={st.period}>{period}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Info;
