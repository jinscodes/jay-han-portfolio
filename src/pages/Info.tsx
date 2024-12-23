import Arrow from "@assets/svg/arrow.svg?react";
import st from "./info.module.scss";

const Info = () => {
  return (
    <section className={st.info}>
      <ul>
        <li>
          Google
          <Arrow />
        </li>
        <li>
          Instagram
          <Arrow />
        </li>
        <li>
          LinkedIn
          <Arrow />
        </li>
        <br />
        <br />
        <li>
          Jay's Blog
          <Arrow />
        </li>
        <li>
          Github
          <Arrow />
        </li>
        <br />
        <br />
        <li>
          Stonybrook University at SUNY
          <Arrow />
        </li>
        <li>
          Union Contents
          <Arrow />
        </li>
      </ul>
    </section>
  );
};

export default Info;
