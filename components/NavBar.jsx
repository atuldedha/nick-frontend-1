import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/Nav.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import en from "../locales/en";
import fr from "../locales/fr";
import { useWindowSize } from "../utils/WindowResizeHook";
import TabletMenu from "./TabletMenu";
import MobileMenu from "./MobileMenu";
import AuthContext from "../context/AuthContext";

function NavBar() {
  const router = useRouter();
  const { locale } = router;
  const [width, height] = useWindowSize();

  const { token, user } = useContext(AuthContext);

  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    if (width > parseFloat("1200")) {
      setOpenMenu(false);
    }
  }, [width, height]);

  // const t = locale === "en-US" ? en : fr;
  const t = locale === "fr" ? fr : en;
  return (
    <nav
      className={`${styles.nav} ${openMenu && styles.redBackground} ${
        router.pathname === "signin" && styles.transparentBg
      }`}
    >
      {/* Logo  */}
      {router.pathname === "/signin" ? null : (
        <div className={styles.logo}>
          <Image
            className={styles.logoImage}
            src="/logo.svg"
            alt="logo"
            width={150}
            height={60}
          />
        </div>
      )}

      {/* Nav Links */}
      {width >= parseFloat("1200") ? (
        <div className={styles.menu}>
          <Link href="/">
            <a>{t.nav.home}</a>
          </Link>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              columnGap: "0.5rem",
            }}
            onClick={() =>
              router.push("/", "/", {
                locale: locale === "en-US" ? "fr" : "en-US",
              })
            }
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
                  width="20px"
                  height="10px"
                />
              ) : (
                <Image
                  src="/ukflag.png"
                  alt="flag"
                  width="20px"
                  height="10px"
                />
              )}
            </div>
          </div>
          <Link href="/information">
            <a>{t.nav.information}</a>
          </Link>
          <Link href="/group">
            <a>{t.nav.group}</a>
          </Link>
          <Link href="/history">
            <a>{t.nav.history}</a>
          </Link>
          <Link href="/contact">
            <a>{t.nav.contact}</a>
          </Link>
          {user && (
            <Link href="/dashboard">
              <a>{t.nav.dashboard}</a>
            </Link>
          )}
          {!user && (
            <button
              className={styles.button}
              onClick={() => router.push("/signin")}
            >
              {t.nav.signIn}
            </button>
          )}
        </div>
      ) : width < parseFloat("1200") && width >= parseFloat("768") ? (
        <>
          <div
            className={`${styles.tabletMenu}
          ${router.pathname === "/signin" ? styles.justifyStart : ""}
          `}
          >
            <div
              className={styles.flagTab}
              onClick={() =>
                router.push("/", "/", {
                  locale: locale === "en-US" ? "fr" : "en-US",
                })
              }
            >
              <span>{locale === "en-US" ? "FR" : "EN"}</span>
              <div
                style={{
                  marginBottom: "0px",
                  padding: "0px",
                  marginRight: "3px",
                  marginLeft: "3px",
                  marginTop: "5px",
                }}
              >
                {locale === "en-US" ? (
                  <Image
                    src="/frenchflag.png"
                    alt="flag"
                    width="20x"
                    height="20px"
                    objectFit="cover"
                  />
                ) : (
                  <Image
                    src="/ukflag.png"
                    alt="flag"
                    width="20px"
                    height="20px"
                    objectFit="cover"
                  />
                )}
              </div>
            </div>
            <div
              className={styles.menuImage}
              onClick={() => setOpenMenu(!openMenu)}
            >
              {openMenu ? (
                <Image
                  src="/close.png"
                  alt="menu"
                  width="24px"
                  height="24px"
                  objectFit="contain"
                />
              ) : (
                <Image
                  src="/menuWhite.png"
                  alt="menu"
                  width="24px"
                  height="24px"
                  objectFit="contain"
                />
              )}
            </div>
          </div>
          <div className={openMenu ? styles.tabletMenuOpen : styles.hideMenu}>
            <TabletMenu
              t={t}
              locale={locale}
              closeMenu={() => setOpenMenu(false)}
            />
          </div>
        </>
      ) : (
        <>
          <div
            className={`${styles.mobileView} ${
              router.pathname === "/signin" ? styles.justifyStart : ""
            }`}
          >
            <div
              className={styles.blackMenu}
              onClick={() => {
                setOpenMenu(!openMenu);
              }}
            >
              {openMenu ? (
                <Image
                  src="/closeBlackMenu.png"
                  alt="menu"
                  width="100%"
                  height="100%"
                  objectFit="contain"
                />
              ) : (
                <Image
                  src="/blackMenuOpen.png"
                  alt="menu"
                  width="100%"
                  height="100%"
                  objectFit="contain"
                />
              )}
            </div>
          </div>
          <div className={`${openMenu ? styles.menuMobile : styles.hideMenu}`}>
            <MobileMenu
              t={t}
              locale={locale}
              closeMenu={() => setOpenMenu(false)}
            />
          </div>
        </>
      )}
    </nav>
  );
}

export default NavBar;
