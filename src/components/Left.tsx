import { NavLink } from "react-router";
import st from "./Left.module.scss";

const Left = () => {
  return (
    <section className={st.left_section}>
      <p className={st.name}>Jay Han</p>
      <p className={st.title}>Frontend & App Developer</p>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/info">Info</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/faq">FAQ</NavLink>
      </nav>
    </section>
  );
};

export default Left;
