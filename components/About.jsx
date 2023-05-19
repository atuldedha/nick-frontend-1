import Image from "next/image";
import React from "react";
import styles from "../styles/About.module.css";
import { useRouter } from "next/router";
import en from "../locales/en";
import fr from "../locales/fr";

function About() {
  const router = useRouter();
  const { locale } = router;

  // const t = locale === "en-US" ? en : fr;
  const t = locale === "fr" ? fr : en;

  return (
    <div className={styles.container}>
      <div className={styles.lightBackground} />
      <h1 className={styles.heading}>
        {t.aboutEvent.title1}
        <span className={styles.headingSpan}>{t.aboutEvent.title2}</span>
        {t.aboutEvent.title3}
      </h1>
      <div className={styles.contentWrapper}>
        <div className={styles.imageWrapper}>
          <div className={styles.heartImage}>
            <Image src="/heart.svg" width={25} height={25} alt="Heart SVG" />
          </div>
          <Image
            className={styles.image}
            src="/about.png"
            layout="fill"
            alt="about image"
          />
          <div className={styles.border} />
        </div>
        <div className={styles.content}>
          {t.aboutEvent.options.map((option, index) => (
            <div key={index} className={styles.options}>
              <h4 className={styles.contentHeading}>{option.title}</h4>
              <p className={styles.contentDescription}>{option.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
