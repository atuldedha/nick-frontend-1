import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../styles/MobileMenu.module.css";

const MobileMenu = ({ t, locale, closeMenu }) => {
  const router = useRouter();

  const [token, setToken] = useState("");

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      setToken(window.localStorage.getItem("token"));
    }
  }, []);

  return (
    <>
      <Link href="/">
        <a className={styles.mobileMenuItem} onClick={() => closeMenu()}>
          {t.nav.home}
        </a>
      </Link>
      <div
        className={styles.flagItem}
        onClick={() => {
          router.push("/", "/", {
            locale: locale === "en-US" ? "fr" : "en-US",
          });
          closeMenu();
        }}
      >
        <span>{locale === "en-US" ? "FR" : "EN"}</span>
        <div
          style={{
            marginBottom: "0px",
            padding: "0px",
          }}
        >
          {locale === "en-US" ? (
            <Image
              src="/frenchflag.png"
              alt="flag"
              width={20}
              height={10}
              objectFit="cover"
            />
          ) : (
            <Image
              src="/ukflag.png"
              alt="flag"
              width={20}
              height={10}
              objectFit="cover"
            />
          )}
        </div>
      </div>
      <Link href="/information">
        <a className={styles.mobileMenuItem} onClick={() => closeMenu()}>
          {t.nav.information}
        </a>
      </Link>
      <Link href="/group">
        <a className={styles.mobileMenuItem} onClick={() => closeMenu()}>
          {t.nav.group}
        </a>
      </Link>
      <Link href="/history">
        <a className={styles.mobileMenuItem} onClick={() => closeMenu()}>
          {t.nav.history}
        </a>
      </Link>
      <Link href="/contact">
        <a className={styles.mobileMenuItem} onClick={() => closeMenu()}>
          {t.nav.contact}
        </a>
      </Link>
      {token ? (
        ""
      ) : (
        <button className={styles.button} onClick={() => closeMenu()}>
          <Link href="/signin">{t.nav.signIn}</Link>
        </button>
      )}
    </>
  );
};

export default MobileMenu;
