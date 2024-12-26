import Arrow from "@assets/svg/arrow.svg?react";
import st from "./contact.module.scss";

const Contact = () => {
  return (
    <section className={st.contact}>
      <div>
        <a href="">
          About the request
          <Arrow />
        </a>
      </div>
    </section>
  );
};

export default Contact;
