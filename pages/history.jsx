import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Event from "../components/Event";
import Hero from "../components/Hero";
import en from "../locales/en";
import fr from "../locales/fr";
import styles from "../styles/History.module.css";

function History() {
  const router = useRouter();
  const { locale } = router;

  const t = locale === "en-US" ? en : fr;
  return (
    <div>
      <Head>
        <title>{t.history.title}</title>
      </Head>
      <Hero
        title={t.history.title}
        subtitle={t.history.subtitle}
        image="/history.png"
        alt={t.history.title}
      />
      <Event />

      <p className={styles.textContainer}>{t.history.text}</p>
    </div>
  );
}

export default History;
