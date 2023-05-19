
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import styles from "../styles/TabletMenu.module.css";
import AuthContext from "../context/AuthContext";

const TabletMenu = ({ t, locale, closeMenu }) => {
  const { token } = useContext(AuthContext);
  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      setToken(window.localStorage.getItem("token"));
    }
  }, []);

  return (
    <>
      <Link href="/">
        <a className={styles.tabletMenuItem} onClick={() => closeMenu()}>
          {t.nav.home}
        </a>
      </Link>
      <div className={styles.divider} />
      <Link href="/information">
        <a className={styles.tabletMenuItem} onClick={() => closeMenu()}>
          {t.nav.information}
        </a>
      </Link>
      <div className={styles.divider} />
      <Link href="/group">
        <a className={styles.tabletMenuItem} onClick={() => closeMenu()}>
          {t.nav.group}
        </a>
      </Link>
      <div className={styles.divider} />
      <Link href="/history">
        <a className={styles.tabletMenuItem} onClick={() => closeMenu()}>
          {t.nav.history}
        </a>
      </Link>
      <div className={styles.divider} />
      <Link href="/contact">
        <a className={styles.tabletMenuItem} onClick={() => closeMenu()}>
          {t.nav.contact}
        </a>
      </Link>

      {token && (
        <Link href="/dashboard">
          <a className={styles.tabletMenuItem} onClick={() => closeMenu()}>
            {t.nav.dashboard}
          </a>
        </Link>
      )}
      <div className={styles.divider} />
      {!token && (
        <button className={styles.button} onClick={() => closeMenu()}>
          <Link href="/signin">
         
            {t.nav.signIn}
         
        </Link>
        </button>
      )}
    </>
  );
};

export default TabletMenu;
