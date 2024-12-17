import { useState } from "react";
import { NavLink } from "react-router";
import st from "./header.module.scss";
// ●
const Header = () => {
  const [menu, setMenu] = useState<string>("");

  return (
    <section className={st.left_section}>
      <p className={st.name}>Jay Han</p>
      <p className={st.title}>Frontend & App Developer</p>
      <nav>
        <NavLink
          to="/"
          className={menu === "" ? st.active : ""}
          onClick={() => setMenu("")}
        >
          Home
        </NavLink>
        <NavLink
          to="/projects"
          className={menu === "projects" ? st.active : ""}
          onClick={() => setMenu("projects")}
        >
          Projects
        </NavLink>
        <NavLink to="/info">Info</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/faq">FAQ</NavLink>
      </nav>
    </section>
  );
};

export default Header;
