"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import st from "./wrappedNav.module.scss";

interface NavTypes {
  key: string;
  label: string;
  path: string;
}

const WrappedNav = () => {
  const pathname = usePathname();

  const menus: NavTypes[] = [
    { key: "/", label: "Home", path: "/" },
    { key: "/projects", label: "Projects", path: "/projects" },
    { key: "/info", label: "Info", path: "/info" },
    { key: "/contact", label: "Contact", path: "/contact" },
    { key: "/faq", label: "FAQ", path: "/faq" },
  ];

  return (
    <nav className={st.nav}>
      {menus.map(({ key, label, path }) =>
        pathname === key ? (
          <span key={label} className={st.bullet}>
            ●
          </span>
        ) : (
          <Link key={key} href={path} className={pathname === key ? st.active : ""}>
            {label}
          </Link>
        )
      )}
    </nav>
  );
};

export default WrappedNav;
