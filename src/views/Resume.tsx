import st from "./resume.module.scss";

const CV_PATH = "/Jay_Han_Academic_CV.pdf";
const TRANSCRIPT_PATH = "/transcript-2026.pdf";

const Resume = () => {
  return (
    <section className={st.resume}>
      <header className={st.header}>
        <div>
          <p className={st.eyebrow}>Curriculum Vitae</p>
          <h2 className={st.title}>Jay Han — Academic CV</h2>
        </div>
        <div className={st.documentLinks}>
          <a
            className={st.transcriptDownload}
            href={TRANSCRIPT_PATH}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View full transcript PDF"
          />
          <a
            className={st.download}
            href={CV_PATH}
            target="_blank"
            rel="noopener noreferrer"
          >
            View full PDF <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <div className={st.document}>
        <iframe
          className={st.viewer}
          src={`${CV_PATH}#view=FitH&toolbar=0&navpanes=0`}
          title="Jay Han Academic CV"
        />
        <div className={st.fallback}>
          <p>Your browser may not display PDFs inline.</p>
          <a href={CV_PATH}>Open the CV in a new tab ↗</a>
        </div>
      </div>
    </section>
  );
};

export default Resume;
