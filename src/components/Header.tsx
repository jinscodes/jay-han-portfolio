import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import st from "./header.module.scss";

const Header = () => {
  const location = useLocation();
  const [menu, setMenu] = useState<string>("");

  const menuItems = [
    { key: "/", label: "Home", path: "/" },
    { key: "/projects", label: "Projects", path: "/projects" },
    { key: "/info", label: "Info", path: "/info" },
    { key: "/contact", label: "Contact", path: "/contact" },
    { key: "/FAQ", label: "FAQ", path: "/FAQ" },
  ];

  useEffect(() => {
    setMenu(location.pathname);
  }, [location]);

  console.log(menu);

  return (
    <section className={st.left_section}>
      <p className={st.name}>Jay Han</p>
      <p className={st.title}>Frontend & App Developer</p>
      <nav>
        {menuItems.map(({ key, label, path }) =>
          menu === key ? (
            <span key={label} className={st.bullet}>
              ●
            </span>
          ) : (
            <NavLink
              key={key}
              to={path}
              className={menu === key ? st.active : ""}
              onClick={() => setMenu(key)}
            >
              {label}
            </NavLink>
          )
        )}
      </nav>
    </section>
  );
};

export default Header;
