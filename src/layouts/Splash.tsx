import { useEffect, useState } from "react";
import st from "./splash.module.scss";

const Splash = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFadeOut(true);
    }, 1500);
  }, []);

  return (
    <div className={st.splash}>
      <span className={st.name}>Jay Han</span>
      <span className={fadeOut ? st.animPortfolio : st.portfolio}>
        Portfolio
      </span>
    </div>
  );
};

export default Splash;
