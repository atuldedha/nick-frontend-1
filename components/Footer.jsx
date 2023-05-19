import React, { useEffect, useState } from "react";
import styles from "../styles/Footer.module.css";
import { paradeYear } from "../components/untilLib/ParadeYear";
import Image from "next/image";
import { useRouter } from "next/router";
import en from "../locales/en";
import fr from "../locales/fr";

function Footer() {
  const router = useRouter();
  const { locale } = router;

  // const t = locale === "en-US" ? en : fr;
  const t = locale === "fr" ? fr : en;

  const [currentParadeYear, setCurrentParadeYear] = useState();
  useEffect(() => {
    // sets the parade year depending on the month
    setCurrentParadeYear(paradeYear());
  }, []);

  return (
    <footer className={styles.container}>
      <div className={styles.arrow}>
        <Image src="/arrow.svg" layout="fill" alt="arrow" />
      </div>
      <h6 className={styles.heading}> {t.footer.title}</h6>
      <p className={styles.eventDate}>
        {t.footer.date}{" "}
        <span className={styles.eventSpan}>{currentParadeYear}</span>
      </p>
      <div className={styles.followUs}>
        <p className={styles.followUsHeading}>{t.footer.followText}</p>
        <div className={styles.socialWrapper}>
          <a
            target="_blank"
            href="https://www.facebook.com/Montreal.Canada.Day.Parade/"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.5 0H3.5C1.56975 0 0 1.56975 0 3.5V24.5C0 26.4303 1.56975 28 3.5 28H24.5C26.4303 28 28 26.4303 28 24.5V3.5C28 1.56975 26.4303 0 24.5 0Z"
                fill="#C70000"
                fillOpacity="0.8"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.625 14H19.25V10.5C19.25 9.534 20.034 9.625 21 9.625H22.75V5.25H19.25C17.8576 5.25 16.5223 5.80312 15.5377 6.78769C14.5531 7.77226 14 9.10761 14 10.5V14H10.5V18.375H14V28H19.25V18.375H21.875L23.625 14Z"
                fill="#FAFAFA"
              />
            </svg>
          </a>
          <a target="_blank" href="https://twitter.com/MTLCDParade">
            <svg
              width="29"
              height="29"
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.39 0H6.48C2.90119 0 0 2.90119 0 6.48V22.39C0 25.9688 2.90119 28.87 6.48 28.87H22.39C25.9688 28.87 28.87 25.9688 28.87 22.39V6.48C28.87 2.90119 25.9688 0 22.39 0Z"
                fill="#C70000"
                fillOpacity="0.8"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.74 18.11C11.058 18.0932 10.398 17.8646 9.85161 17.4562C9.30517 17.0477 8.89923 16.4794 8.69 15.83C9.15437 15.9329 9.63563 15.9329 10.1 15.83C9.66081 15.7268 9.24763 15.5341 8.8863 15.264C8.52496 14.9939 8.22324 14.6521 8 14.26C7.67343 13.7357 7.50663 13.1276 7.52 12.51C7.96825 12.7568 8.46858 12.8939 8.98 12.91C8.29366 12.4377 7.81139 11.7232 7.63 10.91C7.44662 10.1018 7.57898 9.25396 8 8.54004C8.82374 9.55569 9.85054 10.3881 11.0146 10.9839C12.1787 11.5797 13.4544 11.9258 14.76 12C14.76 11.87 14.76 11.76 14.71 11.64C14.6201 10.9594 14.746 10.2677 15.07 9.66242C15.394 9.05713 15.8998 8.56877 16.516 8.26616C17.1323 7.96355 17.828 7.86195 18.505 7.97567C19.1821 8.08939 19.8064 8.4127 20.29 8.90004C20.311 8.9232 20.338 8.94012 20.368 8.94894C20.398 8.95776 20.4298 8.95814 20.46 8.95004C21.1307 8.80741 21.7751 8.56112 22.37 8.22004C22.1311 8.95297 21.6473 9.58144 21 10C21.6312 9.92988 22.2482 9.76468 22.83 9.51004L22.5 10C22.1531 10.4259 21.7532 10.8057 21.31 11.13C21.2935 11.1407 21.2801 11.1556 21.2713 11.1732C21.2626 11.1908 21.2586 11.2104 21.26 11.23C21.2792 11.7175 21.2591 12.2058 21.2 12.69C21.0726 13.7021 20.7857 14.6877 20.35 15.61C19.9086 16.5661 19.3103 17.4415 18.58 18.2C17.3625 19.4702 15.7911 20.3447 14.07 20.71C13.4683 20.8408 12.8556 20.9144 12.24 20.93C10.3918 20.9932 8.56692 20.5022 7 19.52L6.92 19.47C8.02889 19.5897 9.15005 19.428 10.18 19C10.7385 18.7766 11.2635 18.4771 11.74 18.11Z"
                fill="white"
              />
            </svg>
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/company/montrealcanadadayparade/"
          >
            <svg
              width="29"
              height="29"
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.39 0H6.48C2.90119 0 0 2.90119 0 6.48V22.39C0 25.9688 2.90119 28.87 6.48 28.87H22.39C25.9688 28.87 28.87 25.9688 28.87 22.39V6.48C28.87 2.90119 25.9688 0 22.39 0Z"
                fill="#C70000"
                fillOpacity="0.8"
              />
              <path
                d="M8 12H11V21.68H8V12ZM9.53 7.19C9.87371 7.19001 10.2097 7.29181 10.4956 7.48256C10.7816 7.67332 11.0046 7.94448 11.1366 8.26184C11.2686 8.57921 11.3036 8.92855 11.2373 9.2658C11.1709 9.60305 11.0062 9.9131 10.7639 10.1568C10.5215 10.4006 10.2124 10.5671 9.87554 10.6353C9.53868 10.7036 9.18914 10.6706 8.87103 10.5404C8.55292 10.4102 8.28048 10.1888 8.08809 9.90395C7.8957 9.61913 7.79197 9.28371 7.79 8.94C7.78868 8.71066 7.83271 8.48332 7.91957 8.27106C8.00642 8.0588 8.13438 7.8658 8.29608 7.70317C8.45779 7.54053 8.65005 7.41147 8.86181 7.3234C9.07357 7.23533 9.30066 7.19 9.53 7.19Z"
                fill="white"
              />
              <path
                d="M12.92 12H15.81V13.32C16.0993 12.8263 16.5172 12.4204 17.0192 12.1457C17.5211 11.8709 18.0882 11.7376 18.66 11.76C21.66 11.76 22.27 13.76 22.27 16.37V21.68H19.27V17C19.27 15.88 19.27 14.43 17.71 14.43C16.15 14.43 15.91 15.65 15.91 16.91V21.7H12.91L12.92 12Z"
                fill="white"
              />
            </svg>
          </a>
          <a
            target="_blank"
            href="https://www.youtube.com/channel/UCA2PUT_VE1Rx4c2lsSG2Mog"
          >
            <svg
              width="29"
              height="29"
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.39 0H6.48C2.90119 0 0 2.90119 0 6.48V22.39C0 25.9688 2.90119 28.87 6.48 28.87H22.39C25.9688 28.87 28.87 25.9688 28.87 22.39V6.48C28.87 2.90119 25.9688 0 22.39 0Z"
                fill="#C70000"
                fillOpacity="0.8"
              />
              <path
                d="M22.6441 9.8784C22.5523 9.51002 22.3654 9.1725 22.1022 8.89993C21.839 8.62735 21.5088 8.42938 21.1451 8.326C19.8161 8 14.5 8 14.5 8C14.5 8 9.18391 8 7.85489 8.35705C7.49115 8.46042 7.161 8.6584 6.8978 8.93098C6.6346 9.20355 6.44766 9.54107 6.35588 9.90944C6.11265 11.2643 5.99367 12.6388 6.00044 14.0155C5.99177 15.4026 6.11076 16.7876 6.35588 18.1527C6.45707 18.5095 6.64819 18.8342 6.91078 19.0953C7.17336 19.3564 7.49854 19.545 7.85489 19.6429C9.18391 20 14.5 20 14.5 20C14.5 20 19.8161 20 21.1451 19.6429C21.5088 19.5396 21.839 19.3416 22.1022 19.069C22.3654 18.7964 22.5523 18.4589 22.6441 18.0906C22.8854 16.7459 23.0044 15.3819 22.9996 14.0155C23.0082 12.6284 22.8892 11.2435 22.6441 9.8784Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13 17L17 14L13 11V17Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
      <p className={styles.copyright}>{t.footer.copyright}</p>
    </footer>
  );
}

export default Footer;
