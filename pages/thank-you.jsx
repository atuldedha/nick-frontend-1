import Head from "next/head";
import React from "react";
import styles from "../styles/Thanks.module.css";
import Hero from "../components/Hero";
import Event from "../components/Event";
import Sponsors from "../components/Sponsors";
import { useRouter } from "next/router";
import en from "../locales/en";
import fr from "../locales/fr";
import { useWindowSize } from "../utils/WindowResizeHook";

function Successful() {
  const router = useRouter();
  const { locale } = router;

  const [width, height] = useWindowSize();

  const t = locale === "en-US" ? en : fr;
  return (
    <div>
      <Head>
        <title>{t.thankYou.title}</title>
      </Head>
      <div>
        <Hero
          title={t.donate.title}
          subtitle={t.donate.subtitle}
          image="/donation.png"
          alt={t.donate.title}
        />
        <Event />
        <div className={styles.container}>
          <h2 className={styles.heading}>{t.thankYou.form.title}</h2>
          <p className={styles.subHeading}>{t.thankYou.title}</p>
          <div className={styles.icon}>
            <svg
              width={width >= parseFloat("768") ? "94" : "61"}
              height={width >= parseFloat("768") ? "94" : "61"}
              viewBox="0 0 94 94"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M47 0C21.15 0 0 21.15 0 47C0 72.85 21.15 94 47 94C72.85 94 94 72.85 94 47C94 21.15 72.85 0 47 0ZM66.74 39.01L44.18 61.57C42.3 63.45 39.48 63.45 37.6 61.57L27.26 51.23C25.38 49.35 25.38 46.53 27.26 44.65C29.14 42.77 31.96 42.77 33.84 44.65L40.89 51.7L60.16 32.43C62.04 30.55 64.86 30.55 66.74 32.43C68.62 34.31 68.62 37.13 66.74 39.01Z"
                fill="#C70000"
              />
            </svg>
          </div>
        </div>
        <Sponsors />
      </div>
    </div>
  );
}

export default Successful;
