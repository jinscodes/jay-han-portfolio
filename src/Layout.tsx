"use client";

import Header from "@layouts/Header";
import Splash from "@layouts/Splash";
import WrappedNav from "@layouts/WrappedNav";
import { useState } from "react";
import st from "./layout.module.scss";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [splash, setSplash] = useState<boolean>(true);

  setTimeout(() => {
    setSplash(false);
  }, 2500);

  return (
    <>
      {splash && <Splash />}
      {!splash && (
        <main className={st.layout}>
          <section className={st.frame}>
            <Header />
            <div className={st.contents}>
              <WrappedNav />
              {children}
            </div>
            <p className={st.copyright}>© Jay Han</p>
          </section>
        </main>
      )}
    </>
  );
};

export default Layout;
