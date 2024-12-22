import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import st from "./wrappedNav.module.scss";

interface NavTypes {
  key: string;
  label: string;
  path: string;
}

const WrappedNav = () => {
  const location = useLocation();
  const [curMenu, setCurMenu] = useState<string>("");

  const menus: NavTypes[] = [
    { key: "/", label: "Home", path: "/" },
    { key: "/projects", label: "Projects", path: "/projects" },
    { key: "/info", label: "Info", path: "/info" },
    { key: "/contact", label: "Contact", path: "/contact" },
    { key: "/FAQ", label: "FAQ", path: "/FAQ" },
  ];

  useEffect(() => {
    setCurMenu(location.pathname);
  }, [location]);

  return (
    <nav className={st.nav}>
      {menus.map(({ key, label, path }) =>
        curMenu === key ? (
          <span key={label} className={st.bullet}>
            ●
          </span>
        ) : (
          <NavLink
            key={key}
            to={path}
            className={curMenu === key ? st.active : ""}
            onClick={() => setCurMenu(key)}
          >
            {label}
          </NavLink>
        )
      )}
    </nav>
  );
};

export default WrappedNav;
