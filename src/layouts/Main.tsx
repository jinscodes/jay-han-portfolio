import Left from "@components/Left";
import Right from "@components/Right";
import st from "./main.module.scss";

const Main = () => {
  return (
    <section className={st.main}>
      <div className={st.animation}>
        <div className={st.frame}>
          <Left />
          <Right />
        </div>
      </div>

      <p className={st.copyright}>© Jay Han</p>
    </section>
  );
};

export default Main;
