import st from "./projects.module.scss";

interface ProjectsType {
  date: string;
  name: string;
  a?: string;
}

const corperateProjects: ProjectsType[] = [
  {
    date: "2022.08 ~ 2022.12",
    name: "OVERWARE",
  },
  {
    date: "2023.01 ~ 2023.04",
    name: "AUTOGREEN",
  },
  {
    date: "2023.05 ~ 2023.11",
    name: "MOVIEBOARD",
  },
  {
    date: "2024.04 ~ 2024.06",
    name: "MAILHERO",
  },
  {
    date: "2024.07 ~ 2024.09",
    name: "MYSO",
  },
];

const personalProjects: ProjectsType[] = [
  {
    date: "2024.02 ~ ing",
    name: "TECH BLOG",
    a: "https://jay-h-blog.vercel.app/",
  },
  {
    date: "2024.01 ~ ing",
    name: "MY ROUTINE",
  },
];

const Projects = () => {
  return (
    <section className={st.projects}>
      <ul>
        {corperateProjects.map(({ date, name }) => (
          <li>
            <span className={st.period}>{date}</span>
            <span className={st.project}>{name}</span>
          </li>
        ))}
        {personalProjects.map(({ date, name, a }) => (
          <li>
            <a href={a} target="_blank"></a>
            <span className={st.period}>{date}</span>
            <span className={st.project}>{name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Projects;
