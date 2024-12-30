import st from "./projects.module.scss";

const Projects = () => {
  return (
    <section className={st.projects}>
      <ul>
        <li>
          <span className={st.period}>date</span>
          <span className={st.project}>Project</span>
        </li>
        <li>
          <span className={st.period}>date</span>
          <span className={st.project}>Project</span>
        </li>
        <li>
          <span className={st.period}>date</span>
          <span className={st.project}>Project</span>
        </li>
      </ul>
    </section>
  );
};

export default Projects;
