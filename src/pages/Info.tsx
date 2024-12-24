import Arrow from "@assets/svg/arrow.svg?react";
import st from "./info.module.scss";

interface LinksType {
  domain: string;
  url: string;
}

const Info = () => {
  const techLinks: LinksType[] = [
    {
      domain: "LinkedIn",
      url: "https://www.linkedin.com/in/jin-sung-han-49974920a/",
    },
    {
      domain: "Jay's Blog",
      url: "https://jay-h-blog.vercel.app/",
    },
    {
      domain: "Github",
      url: "https://github.com/jinscodes",
    },
  ];
  const personalLinks: LinksType[] = [
    {
      domain: "Facebook",
      url: "https://www.facebook.com/profile.php?id=100021292740024",
    },
    {
      domain: "Instagram",
      url: "https://www.instagram.com/jin_sung_h/",
    },
  ];

  return (
    <section className={st.info}>
      <ul>
        {techLinks.map((el) => (
          <li>
            <a href={el.url} target="_blank">
              {el.domain}
              <Arrow />
            </a>
          </li>
        ))}
        <br />
        <br />
        {personalLinks.map((el) => (
          <li>
            <a href={el.url} target="_blank">
              {el.domain}
              <Arrow />
            </a>
          </li>
        ))}
        <br />
        <br />
        <li>Stonybrook University at SUNY</li>
        <li>Union Contents</li>
        <li>Team Breeders</li>
      </ul>
    </section>
  );
};

export default Info;
