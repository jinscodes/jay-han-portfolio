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
      "My name is jay Han. I was born in 1999. Now, I'm currently studying at Illinois Tech in Chicago, IL.",
  },
  {
    question: "Where did the portfolio page design come from?",
    answer:
      "The design of this portfolio site was taken from Keita Yamada's portfolio page. The code for the design is different from Keita Yamada. The code I made is published in GitHub.",
  },
  {
    question: "Can I use this code?",
    answer:
      "You can take and use the code 100% of your choice. However, the design is not my own, so what I allow may not be valid.",
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
