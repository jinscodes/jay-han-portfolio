import st from "./info.module.scss";

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
