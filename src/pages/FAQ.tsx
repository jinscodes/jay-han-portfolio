import QA from "@components/Q&A";
import st from "./faq.module.scss";

interface FAQType {
  question: string;
  answer: string;
}

const faq: FAQType[] = [
  {
    question: "What's your name?",
    answer:
      "My name is jay Han. I was born in 1999. Now, I'm currently studying at Stonybrook university at SUNY.",
  },
  {
    question: "Where did the portfolio page design come from?",
    answer:
      "The design of this portfolio site was taken from Keita Yamada's portfolio page. The code for the design is different from Keita Yamada. The code I made is published in GitHub.",
  },
  {
    question: "Can I use this code?",
    answer:
      "  You can take and use the code 100% of your choice. However, the design is not my own, so what I allow may not be valid.",
  },
  {
    question: "Why are you taking a LOA(Leave of Absence) for a long time?",
    answer:
      "Korean men must fulfill their duty of military. There are various forms of handling the duty of military. I'd worked for a software company for more than two years. The reason I did not return to school immediately after that is because I wanted to do various side projects and study web developments that I wanted to do while working.",
  },
  {
    question: "Do you have any plans to go back to school?",
    answer:
      "I have a rough plan for school and graduation. However, I don't have a specific plan yet. I'm planning to return to school as early as next spring semester, and if it's late, I'm planning to return to school in fall next year.",
  },
];

const FAQ = () => {
  return (
    <section className={st.faq}>
      {faq.map(({ question, answer }) => (
        <QA question={question} answer={answer} />
      ))}
    </section>
  );
};

export default FAQ;
