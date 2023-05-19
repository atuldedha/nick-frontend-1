import Head from "next/head";
import React, { useState } from "react";
import styles from "../styles/Donation.module.css";
import Hero from "../components/Hero";
import Event from "../components/Event";
import Sponsors from "../components/Sponsors";

import CheckoutForm from "../components/CheckoutForm";
import { useRouter } from "next/router";
import en from "../locales/en";
import fr from "../locales/fr";
import { useWindowSize } from "../utils/WindowResizeHook";

function Donation() {
  const router = useRouter();
  const { locale } = router;

  const [width, height] = useWindowSize();

  const t = locale === "en-US" ? en : fr;
  const [selected, setSelected] = useState({
    id: null,
    amount: 0,
    type: null,
  });

  return (
    <div>
      <Head>
        <title>{t.donate.title}</title>
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
          <h2 className={styles.heading}>
            {t.donate.form.title1}
            <span className={styles.headingSpan}>{t.donate.form.title2}</span>
            {"  "}
            {t.donate.form.title3}
          </h2>
          <p className={styles.subHeading}>{t.donate.form.subtitle}</p>

          <div className={styles.buttonContainer}>
            <button
              onClick={() => setSelected({ ...selected, type: "company" })}
              className={
                selected.type === "company"
                  ? styles.companySelected
                  : styles.company
              }
            >
              {width < parseFloat("768")
                ? locale === "en-US"
                  ? "Company"
                  : "l'enterprise"
                : t.donate.form.company}
            </button>
            <button
              onClick={() => setSelected({ ...selected, type: "individual" })}
              className={
                selected.type === "individual"
                  ? styles.companySelected
                  : styles.company
              }
            >
              {width < parseFloat("768")
                ? locale === "en-US"
                  ? "Individual"
                  : "Individuelle"
                : t.donate.form.individual}
            </button>
          </div>

          <CheckoutForm
            price={selected.amount}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
        <Sponsors />
      </div>
    </div>
  );
}

export default Donation;
