import Arrow from "@assets/svg/arrow.svg?react";
import st from "./info.module.scss";

interface LinkGroup {
  title?: string;
  links: Links[];
}

interface Links {
  domain: string;
  url: string;
}

const Info = () => {
  const linkGroup: LinkGroup[] = [
    {
      title: "Tech",
      links: [
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
      ],
    },
    {
      title: "Personal",
      links: [
        {
          domain: "Facebook",
          url: "https://www.facebook.com/profile.php?id=100021292740024",
        },
        {
          domain: "Instagram",
          url: "https://www.instagram.com/_jay_h_99/",
        },
      ],
    },
  ];

  const otherItems = [
    "Stonybrook University at SUNY (2019 ~ 2022)",
    "Union Contents Software Company (2022.08 ~ 2024.10)",
    "Illinois Tech (2025.08 ~ ing)",
    "Team Breeders",
  ];

  return (
    <section className={st.info}>
      <ul>
        {linkGroup.map((group) => (
          <>
            {group.links.map((el) => (
              <li>
                <a href={el.url} target="_blank">
                  {el.domain}
                  <Arrow />
                </a>
              </li>
            ))}
            <br />
            <br />
          </>
        ))}

        {otherItems.map((el) => (
          <li>{el}</li>
        ))}
      </ul>
    </section>
  );
};

export default Info;
