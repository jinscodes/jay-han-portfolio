"use client";

import { CSSProperties, useEffect, useState } from "react";
import st from "./splash.module.scss";

const GAP = 28;

const Splash = () => {
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);

  useEffect(() => {
    setCols(Math.ceil(window.innerWidth / GAP) + 1);
    setRows(Math.ceil(window.innerHeight / GAP) + 1);
  }, []);

  return (
    <div className={`${st.splash} ${st.fadeOut}`}>
      <div
        className={st.grid}
        style={{ "--cols": cols, "--gap": `${GAP}px` } as CSSProperties}
      >
        {cols > 0 &&
          Array.from({ length: rows }, (_, row) =>
            Array.from({ length: cols }, (_, col) => (
              <div
                key={`${row}-${col}`}
                className={st.dot}
                style={{ "--delay": `${(row + col) * 20}ms` } as CSSProperties}
              />
            )),
          )}
      </div>
      <div className={st.mask} />
      <div className={st.center}>
        <span className={st.name}>Portfolio</span>
        <svg
          viewBox="0 0 460 460"
          width="460"
          height="460"
          className={st.orbitSvg}
        >
          <defs>
            <path id="splashCircle" d="M 230,60 A 170,170 0 1,1 229.999,60" />
          </defs>
          <text className={st.orbitText}>
            <textPath
              href="#splashCircle"
              startOffset="0%"
              textLength="1068"
              lengthAdjust="spacing"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
};

export default Splash;
