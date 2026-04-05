import st from "./contact.module.scss";

const Contact = () => (
  <div className={st.contact}>
    <div className={st.inner}>
      <span className={st.label}>Contact</span>

      <div className={st.headline}>
        <span className={st.line}>Let&apos;s build</span>
        <span className={st.line}>
          something
          <span className={st.dot}>.</span>
        </span>
      </div>

      <div className={st.divider} />

      <div className={st.bottom}>
        <div className={st.contactInfo}>
          <div className={st.contactRow}>
            <span className={st.contactMeta}>School</span>
            <a href="mailto:jhan38@hawk.illinoistech.edu" className={st.email}>
              jhan38@hawk.illinoistech.edu
            </a>
          </div>
          <div className={st.contactRow}>
            <span className={st.contactMeta}>Personal</span>
            <a href="mailto:jayhan0215@gmail.com" className={st.email}>
              jayhan0215@gmail.com
            </a>
          </div>
          <div className={st.contactRow}>
            <span className={st.contactMeta}>Phone</span>
            <a href="tel:+13126175072" className={st.email}>
              (312) 617-5072
            </a>
          </div>
        </div>
        <div className={st.right}>
          <span className={st.available}>
            &#x25cf;&nbsp; Open to opportunities
          </span>
          <div className={st.socials}>
            <a
              href="https://github.com/jinscodes"
              target="_blank"
              rel="noopener noreferrer"
              className={st.socialLink}
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/jay-han-49974920a/"
              target="_blank"
              rel="noopener noreferrer"
              className={st.socialLink}
            >
              LinkedIn
            </a>
            <a
              href="https://jay-h-blog.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={st.socialLink}
            >
              Blog
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
