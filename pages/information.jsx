import Head from "next/head";
import React, { useEffect, useState } from "react";
import Event from "../components/Event";
import Hero from "../components/Hero";
import ImageSection from "../components/ImageSection";
import styles from "../styles/Information.module.css";
import { paradeYear } from "../components/untilLib/ParadeYear";
import { useRouter } from "next/router";
import en from "../locales/en";
import fr from "../locales/fr";
import { useWindowSize } from "../utils/WindowResizeHook";

function Information() {
  const router = useRouter();
  const { locale } = router;

  const [width, height] = useWindowSize();

  const t = locale === "en-US" ? en : fr;
  const [currentParadeYear, setCurrentParadeYear] = useState();
  useEffect(() => {
    // sets the parade year depending on the month
    setCurrentParadeYear(paradeYear());
  }, []);

  return (
    <div>
      <Head>
        <title>{t.information.title}</title>
      </Head>
      <Hero
        title={t.information.title}
        subtitle={
          t.information.subtitle + currentParadeYear + t.information.subtitle2
        }
        image="/map.png"
      />
      <Event />
      <ImageSection
        direction={"right"}
        title={t.information.section1.title}
        paragraph={t.information.section1.options}
        src="/information1.png"
        alt={t.information.section1.title}
      />
      <ImageSection
        direction={"left"}
        title={t.information.section2.title}
        paragraph={t.information.section2.options}
        src="/information2.png"
        alt={t.information.section2.title}
      />

      {width > parseFloat("768") && (
        <div className={styles.container}>
          <div className={styles.background} />
          <div className={styles.content}>
            <h4 className={styles.title}>
              {t.information.downloadSection.title}
            </h4>
            <p className={styles.subtitle}>
              {t.information.downloadSection.subtitle}
            </p>
            <p className={styles.pdfTitle}>
              {t.information.downloadSection.file}
            </p>
            <button className={styles.download}>
              {t.information.downloadSection.btn}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Information;
