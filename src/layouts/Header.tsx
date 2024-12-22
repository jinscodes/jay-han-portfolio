import st from "./header.module.scss";

const Header = () => {
  return (
    <section className={st.header}>
      <p className={st.name}>Jay Han</p>
      <p className={st.title}>Frontend & App Developer</p>
    </section>
  );
};

export default Header;
