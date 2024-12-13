import st from "./main.module.scss";

const Main = () => {
  return (
    <section className={st.main}>
      <div className={st.animation}>
        <div className={st.frame}></div>
      </div>
    </section>
  );
};

export default Main;
