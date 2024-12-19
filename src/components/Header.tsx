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
        {menu === "" ? (
          <span className={st.bullet}>●</span>
        ) : (
          <NavLink
            to="/"
            className={menu === "" ? st.active : ""}
            onClick={() => setMenu("")}
          >
            Home
          </NavLink>
        )}
        {menu === "projects" ? (
          <span className={st.bullet}>●</span>
        ) : (
          <NavLink
            to="/projects"
            className={menu === "projects" ? st.active : ""}
            onClick={() => setMenu("projects")}
          >
            Projects
          </NavLink>
        )}
        {menu === "info" ? (
          <span className={st.bullet}>●</span>
        ) : (
          <NavLink
            to="/info"
            className={menu === "info" ? st.active : ""}
            onClick={() => setMenu("info")}
          >
            Info
          </NavLink>
        )}
        {menu === "contact" ? (
          <span className={st.bullet}>●</span>
        ) : (
          <NavLink
            to="/contact"
            className={menu === "contact" ? st.active : ""}
            onClick={() => setMenu("contact")}
          >
            Contact
          </NavLink>
        )}
        {menu === "FAQ" ? (
          <span className={st.bullet}>●</span>
        ) : (
          <NavLink
            to="/FAQ"
            className={menu === "FAQ" ? st.active : ""}
            onClick={() => setMenu("FAQ")}
          >
            FAQ
          </NavLink>
        )}
      </nav>
    </section>
  );
};

export default Header;
