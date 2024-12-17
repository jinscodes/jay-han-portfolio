import Header from "@components/Header";
import Splash from "@layouts/Splash";
import { useState } from "react";
import { Outlet } from "react-router";
import st from "./app.module.scss";

function App() {
  const [splash, setSplash] = useState(true);

  setTimeout(() => {
    setSplash(false);
  }, 2500);

  return (
    <>
      {splash && <Splash />}
      {!splash && (
        <div>
          <section className={st.main}>
            <div className={st.frame}>
              <Header />
              <Outlet />
            </div>

            <p className={st.copyright}>© Jay Han</p>
          </section>
        </div>
      )}
    </>
  );
}

export default App;
