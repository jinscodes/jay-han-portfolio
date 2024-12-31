interface Props {
  question: string;
  answer: string;
}

const QA = ({ question, answer }: Props) => {
  return (
    <div>
      <b>{question}</b>
      <p>{answer}</p>
    </div>
  );
};

export default QA;
