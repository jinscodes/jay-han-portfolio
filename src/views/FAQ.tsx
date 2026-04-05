"use client";

import { useState } from "react";
import Tree from "../components/Tree";
import st from "./faq.module.scss";

const faqs = [
  {
    question: "Who are you?",
    answer:
      "I'm Jay Han — a frontend developer born in 1999, currently based in Chicago, IL. I study at Illinois Institute of Technology and spend most of my time thinking about how interfaces feel, not just how they look.",
  },
  {
    question: "What do you specialize in?",
    answer:
      "I focus on frontend development with React and Next.js, building performant and accessible UIs. I care about clean architecture, design systems, and the small details that make an experience feel polished.",
  },
  {
    question: "Where did this portfolio design come from?",
    answer:
      "The visual direction was inspired by Keita Yamada's portfolio. The code and structure are entirely my own — written from scratch with Next.js, TypeScript, and SCSS modules.",
  },
  {
    question: "Can I use or reference this code?",
    answer:
      "The code is freely available on GitHub — feel free to use or fork it. The design direction is inspired by existing work, so take that into account before replicating it wholesale.",
  },
  {
    question: "What are you working on right now?",
    answer:
      "I'm actively working on Breedge (a team-matching platform), Tact (a cross-platform link manager), and this portfolio. I'm also open to freelance or full-time frontend roles.",
  },
  {
    question: "How can I reach you?",
    answer:
      "Email me at jayhan0215@gmail.com or jhan38@hawk.illinoistech.edu. You can also reach me on LinkedIn or check my work on GitHub.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className={st.faq}>
      <Tree />
      <div className={st.header}>
        <span className={st.label}>FAQ</span>
        <p className={st.sub}>Frequently asked questions</p>
      </div>
      <ul className={st.list}>
        {faqs.map(({ question, answer }, i) => (
          <li
            key={question}
            className={`${st.item} ${openIndex === i ? st.itemOpen : ""}`}
            onClick={() => toggle(i)}
          >
            <div className={st.row}>
              <span className={st.num}>0{i + 1}</span>
              <span className={st.question}>{question}</span>
              <span className={st.toggle}>{openIndex === i ? "−" : "+"}</span>
            </div>
            <div
              className={`${st.answer} ${openIndex === i ? st.answerOpen : ""}`}
            >
              <p className={st.answerText}>{answer}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQ;
