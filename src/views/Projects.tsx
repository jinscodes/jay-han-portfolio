import SittingDog from "@components/SittingDog";
import Snow from "@components/Snow";
import st from "./projects.module.scss";

interface ProjectType {
  date: string;
  name: string;
  role: string;
  stack: string[];
  description: string;
  url?: string;
}

const corporateProjects: ProjectType[] = [
  {
    date: "2022.08 — 2022.12",
    name: "Overware",
    role: "Frontend Developer",
    stack: ["React", "TypeScript", "SCSS"],
    description:
      "Developed UI components and interactive features for a gaming gear e-commerce platform.",
  },
  {
    date: "2023.01 — 2023.04",
    name: "Autogreen",
    role: "Frontend Developer",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    description:
      "Built a dashboard for EV charging station management with real-time data visualization.",
  },
  {
    date: "2023.05 — 2023.11",
    name: "Movieboard",
    role: "Frontend Developer",
    stack: ["React", "Redux", "SCSS"],
    description:
      "Created a movie review and discovery platform with dynamic filtering and search.",
  },
  {
    date: "2024.04 — 2024.06",
    name: "Mailhero",
    role: "Frontend Developer",
    stack: ["React", "TypeScript", "REST API"],
    description:
      "Developed an email marketing campaign management tool with drag-and-drop editor.",
  },
  {
    date: "2024.07 — 2024.09",
    name: "Myso",
    role: "Frontend Developer",
    stack: ["React Native", "TypeScript", "Firebase"],
    description:
      "Built a mobile social app for sharing daily routines and habit tracking.",
  },
];

const personalProjects: ProjectType[] = [
  {
    date: "2024.02 — Present",
    name: "Tech Blog",
    role: "Full Stack",
    stack: ["Next.js", "MDX", "Vercel"],
    description:
      "Personal technical blog covering frontend development, experiments, and engineering thoughts.",
    url: "https://jay-h-blog.vercel.app/",
  },
  {
    date: "2024.01 — Present",
    name: "Tact",
    role: "Full Stack",
    stack: ["React Native", "Expo", "SQLite"],
    description:
      "Developed a high-performance cross-platform link management app using Flutter, featuring robust state management and seamless data persistence.",
    url: "https://github.com/jinscodes/app_tact",
  },
  {
    date: "2024.10 — Present",
    name: "Breedge",
    role: "Full Stack",
    stack: ["Next.js", "TypeScript", "Supabase"],
    description:
      "Platform connecting developers and designers to form project teams and collaborate.",
  },
  {
    date: "2025.09 — 2025.12",
    name: "Practo",
    role: "Frontend Developer",
    stack: ["React", "JavaScript", "Web Speech API"],
    description:
      "Engineered an AI doctor matchmaking and voice-activated booking system using Web Speech API for hands-free patient scheduling.",
    url: "https://github.com/jinscodes/PRACTO",
  },
];

const ProjectCard = ({
  date,
  name,
  role,
  stack,
  description,
  url,
}: ProjectType) => (
  <li className={st.card}>
    <div className={st.cardLeft}>
      <span className={st.date}>{date}</span>
      <span className={st.role}>{role}</span>
    </div>
    <div className={st.cardRight}>
      <div className={st.nameRow}>
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={st.nameLink}
          >
            {name} <span className={st.arrow}>↗</span>
          </a>
        ) : (
          <span className={st.name}>{name}</span>
        )}
      </div>
      <p className={st.description}>{description}</p>
      <div className={st.stack}>
        {stack.map((s) => (
          <span key={s} className={st.tag}>
            {s}
          </span>
        ))}
      </div>
    </div>
  </li>
);

const Projects = () => (
  <div className={st.projects}>
    <Snow />
    <SittingDog />
    <header className={st.header}>
      <h2 className={st.title}>Projects</h2>
      <p className={st.subtitle}>
        Selected work from corporate & personal projects
      </p>
    </header>
    <div className={st.body}>
      <div className={st.group}>
        <h3 className={st.groupLabel}>Corporate</h3>
        <ul className={st.list}>
          {corporateProjects.map((p) => (
            <ProjectCard key={p.name} {...p} />
          ))}
        </ul>
      </div>
      <div className={st.group}>
        <h3 className={st.groupLabel}>Personal</h3>
        <ul className={st.list}>
          {personalProjects.map((p) => (
            <ProjectCard key={p.name} {...p} />
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default Projects;
