import Head from "next/head";
import React, { useState } from "react";
import styles from "./Thanks.module.css";
import Hero from "../../components/Hero";
import Event from "../../components/Event";
import Sponsors from "../../components/Sponsors";
import { useRouter } from "next/router";
import en from "../../locales/en";
import fr from "../../locales/fr";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function getServerSideProps({ query }) {
  const { session_id } = query;
  if (!session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const session = await stripe.paymentIntents.retrieve(session_id);
  if (!session || session.status !== "succeeded" || session.amount < 10000) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      data: session,
    },
  };
}
function Thanks({ data }) {
  const router = useRouter();
  const { locale } = router;

  const t = locale === "en-US" ? en : fr;

  const [imgUrl, setImageUrl] = useState(null);
  const [image, setImage] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setImageUrl(URL.createObjectURL(i));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    router.push("/thank-you");
    const body = new FormData();
    body.append("file", image);
    await fetch("/api/image", {
      method: "POST",
      body,
    });
  };
  const skip = (e) => {
    e.preventDefault();
    router.push("/thank-you");
  };
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
          <div className={styles.subHeading}>
            <p>{t.thankYou.form.subtitle}</p>
            <p className={styles.dimensions}>
              {t.thankYou.form.dimensions} 80*80
            </p>
          </div>

          <form>
            <div className={styles.inputContainer}>
              <input
                hidden
                type="file"
                name="file"
                id="file"
                accept="image/*"
                // onChange={(e) => {
                // set image url state with preview
                // setImageUrl(URL.createObjectURL(e.target.files[0]));
                onChange={uploadToClient}
                // }}
                className={styles.input}
              />
              {
                // IF IMAGE IS NULL
                imgUrl === null ? (
                  <label htmlFor="file" className={styles.label}>
                    <svg
                      width="281"
                      height="202"
                      viewBox="0 0 281 202"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M238.85 0H42.15C18.8814 0.0184941 0.025727 13.5731 0 30.3V121.89V171.7C0.025727 188.427 18.8814 201.982 42.15 202H238.85C241.411 201.998 243.938 201.778 246.431 201.445C247.359 201.323 248.245 201.139 249.152 200.974C250.641 200.7 252.103 200.381 253.542 199.992C254.589 199.71 255.61 199.415 256.615 199.076C257.795 198.677 258.923 198.214 260.049 197.735C261.106 197.289 262.173 196.87 263.168 196.362C263.25 196.32 263.342 196.292 263.424 196.25C263.528 196.195 263.618 196.128 263.719 196.07C263.911 195.958 264.152 195.903 264.328 195.777C264.421 195.71 264.45 195.62 264.537 195.55C274.474 190.007 280.985 181.439 281 171.7V142.11V30.3C280.974 13.5731 262.119 0.0184941 238.85 0ZM246.928 190.945C244.307 191.528 241.597 191.899 238.85 191.9H42.15C26.6387 191.886 14.0697 182.85 14.05 171.7V123.981L66.9159 85.9782C76.5264 79.0937 92.0736 79.0937 101.684 85.9782L149.522 120.364C149.549 120.384 149.556 120.41 149.583 120.43L247.497 190.817C247.309 190.861 247.118 190.903 246.928 190.945ZM266.95 171.7C266.941 176.915 264.112 181.62 259.596 185.203L164.499 116.848L179.33 106.188C189.041 99.5008 204.359 99.5008 214.07 106.188L266.95 144.201V171.7ZM266.95 129.919L224.004 99.0471C208.918 88.2172 184.482 88.2172 169.396 99.0471L154.565 109.708L111.618 78.8372C96.5217 68.0073 72.0783 68.0073 56.9821 78.8372L14.05 109.699V30.3C14.0697 19.1496 26.6387 10.1142 42.15 10.1H238.85C254.361 10.1142 266.93 19.1496 266.95 30.3V129.919ZM161.575 40.4C149.936 40.4 140.5 47.1829 140.5 55.55C140.5 63.9171 149.936 70.7 161.575 70.7C173.209 70.6908 182.637 63.9134 182.65 55.55C182.65 47.1829 173.214 40.4 161.575 40.4ZM161.575 60.6C157.695 60.6 154.55 58.3388 154.55 55.55C154.55 52.7612 157.695 50.5 161.575 50.5C165.452 50.5056 168.592 52.763 168.6 55.55C168.6 58.3388 165.455 60.6 161.575 60.6Z"
                        fill="#616161"
                      />
                    </svg>
                  </label>
                ) : (
                  <img src={imgUrl} alt="preview" className={styles.preview} />
                )
              }
              {imgUrl === null ? (
                <div className={styles.skipUploadContainer}>
                  <label htmlFor="file" className={styles.uploadImageButton}>
                    {t.thankYou.form.uploadBtn}
                  </label>
                  <button className={styles.skipButton} onClick={skip}>
                    {t.thankYou.form.skipBtn}
                  </button>
                </div>
              ) : (
                <button
                  // IF IMAGE IS NULL
                  disabled={imgUrl === null ? true : false}
                  className={styles.save}
                  type="submit"
                  onClick={handleSave}
                >
                  {t.thankYou.form.btn}
                </button>
              )}
            </div>
          </form>
        </div>
        <Sponsors />
      </div>
    </div>
  );
}

export default Thanks;
