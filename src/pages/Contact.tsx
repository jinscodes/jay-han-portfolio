import Arrow from "@assets/svg/arrow.svg?react";
import st from "./contact.module.scss";

const Contact = () => {
  const NOTION_PORTFOLIO_PAGE =
    "https://www.notion.so/Developer-Portfolio-FE-Developer-168337c3bbd1804d9482c2316bb2a7d8";

  return (
    <section className={st.contact}>
      <div>
        <a href={NOTION_PORTFOLIO_PAGE} target="_blank">
          To contact me
          <Arrow />
        </a>
      </div>
    </section>
  );
};

export default Contact;
