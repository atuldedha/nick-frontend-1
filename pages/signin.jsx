import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import NavBar from "../components/NavBar";
import AuthContext from "../context/AuthContext";
import styles from "../styles/Signin.module.css";
import fr from "../locales/fr";
import en from "../locales/en";

const Signin = () => {
  // router for language
  const router = useRouter();
  const { locale } = router;
  // language variable
  const t = locale === "fr" ? fr : en;

  const { error, loading, loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  return (
    <>
      <div className={styles.container}>
        <div className={styles.bgImage}>
          <Image src="/signinBackground.png" alt="background" layout="fill" />
        </div>

        <div className={styles.modalContainer}>
          {/* close modal */}

          <div className={styles.formContainer}>
            <Image
              src="/logo.svg"
              alt="logo"
              width="250px"
              height="130px"
              objectFit="contain"
            />

            <span className={styles.formHeading}>{t?.login?.loginText}</span>
            {/* input fields container */}
            <form onSubmit={loginUser}>
              <input
                placeholder={t?.login?.emailText}
                name="email"
                value={email}
                className={`${styles.formInput} ${styles.bottomMargin}`}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                placeholder={t?.login?.passwordText}
                name="password"
                type="password"
                className={`${styles.formInput} ${styles.bottomMargin}`}
              />
              {error && <p className={styles.error}>{error}</p>}{" "}
              {/* register button */}
              <button className={styles.registerButton}>
                {loading ? t?.login?.loadingText : t?.login?.signInText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
