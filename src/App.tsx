import Header from "@components/Header";
import Splash from "@layouts/Splash";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import st from "./app.module.scss";

function App() {
  const [splash, setSplash] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  setTimeout(() => {
    setSplash(false);
  }, 2500);

  useEffect(() => {
    if (location.pathname !== "/") navigate("/");
  }, []);

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
