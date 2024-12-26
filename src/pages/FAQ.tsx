import st from "./faq.module.scss";

const FAQ = () => {
  return (
    <section className={st.faq}>
      <div>
        <b>What's your name?</b>
        <p>
          My name is jay Han. I was born in 1999. Now, I'm currently studying at
          Stonybrook university at SUNY.
        </p>
      </div>
      <div>
        <b>Where did the portfolio page design come from?</b>
        <p>
          The design of this portfolio site was taken from Keita Yamada's
          portfolio page. The code for the design is different from Keita
          Yamada. The code I made is published in GitHub.
        </p>
      </div>
      <div>
        <b>Can I use this code?</b>
        <p>
          You can take and use the code 100% of your choice. However, the design
          is not my own, so what I allow may not be valid.
        </p>
      </div>
      <div>
        <b>Why are you taking a LOA(Leave of Absence) for a long time?</b>
        <p>
          Korean men must fulfill their duty of military. There are various
          forms of handling the duty of military. I'd worked for a software
          company for more than two years. The reason I did not return to school
          immediately after that is because I wanted to do various side projects
          and study web developments that I wanted to do while working.
        </p>
      </div>
      <div>
        <b>Do you have any plans to go back to school?</b>
        <p>
          I have a rough plan for school and graduation. However, I don't have a
          specific plan yet. I'm planning to return to school as early as next
          spring semester, and if it's late, I'm planning to return to school in
          fall next year.
        </p>
      </div>
    </section>
  );
};

export default FAQ;
