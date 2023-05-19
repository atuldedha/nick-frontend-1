import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../styles/Hero.module.css";
import { useWindowSize } from "../utils/WindowResizeHook";

function Hero({ title, subtitle, image, alt, btn, btnText }) {
  const [width, height] = useWindowSize();
  return (
    <div className={styles.container}>
      {/* content  */}
      <div className={styles.content}>
        <h1>{title}</h1>
        <div className={styles.svgWrapper}>
          <svg
            viewBox="0 0 361 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              y1="1"
              x2="361"
              y2="1"
              stroke={width < parseFloat("768") ? "white" : "black"}
              strokeWidth="2"
            />
            <line y1="1" x2="84" y2="1" stroke="#C70000" strokeWidth="2" />
          </svg>
        </div>

        <p>{subtitle}</p>
        {btn && (
          <Link href="/donation">
            {/* remove class hideButton when app is completed */}
            <a className={`${styles.hideButton} ${styles.button}`}>
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.5 0C4.4122 0 3.34884 0.322569 2.44437 0.926917C1.5399 1.53126 0.834947 2.39025 0.418665 3.39524C0.00238306 4.40023 -0.106535 5.5061 0.105683 6.573C0.317902 7.63989 0.841726 8.6199 1.61091 9.38909C2.3801 10.1583 3.36011 10.6821 4.42701 10.8943C5.4939 11.1065 6.59977 10.9976 7.60476 10.5813C8.60975 10.1651 9.46873 9.4601 10.0731 8.55563C10.6774 7.65116 11 6.5878 11 5.5C11 4.77773 10.8577 4.06253 10.5813 3.39524C10.3049 2.72795 9.89981 2.12163 9.38909 1.61091C8.87837 1.10019 8.27205 0.695063 7.60476 0.418663C6.93747 0.142262 6.22227 0 5.5 0ZM7.865 4.1855L5.3515 7.4855C5.30026 7.55206 5.23446 7.606 5.15915 7.64318C5.08383 7.68036 5.001 7.6998 4.917 7.7C4.83346 7.70045 4.75091 7.68186 4.67563 7.64565C4.60034 7.60944 4.5343 7.55655 4.4825 7.491L3.1405 5.7805C3.09608 5.72344 3.06334 5.65819 3.04413 5.58848C3.02493 5.51876 3.01965 5.44595 3.02858 5.37419C3.03752 5.30243 3.06051 5.23314 3.09622 5.17027C3.13194 5.10739 3.17969 5.05217 3.23675 5.00775C3.35199 4.91804 3.49814 4.87778 3.64306 4.89583C3.71482 4.90477 3.78411 4.92775 3.84698 4.96347C3.90986 4.99919 3.96508 5.04694 4.0095 5.104L4.906 6.248L6.985 3.498C7.02906 3.44022 7.08407 3.39168 7.14688 3.35516C7.2097 3.31863 7.2791 3.29484 7.35111 3.28514C7.42312 3.27543 7.49634 3.28001 7.56658 3.2986C7.63683 3.31719 7.70272 3.34944 7.7605 3.3935C7.81828 3.43756 7.86682 3.49257 7.90334 3.55538C7.93987 3.6182 7.96366 3.68759 7.97336 3.75961C7.98307 3.83162 7.97849 3.90484 7.9599 3.97508C7.94131 4.04532 7.90906 4.11122 7.865 4.169V4.1855Z"
                  fill="white"
                />
              </svg>
              {btnText}
            </a>
          </Link>
        )}
      </div>
      {/* image  */}
      <div className={styles.imageContainer}>
        <Image src={image} alt={alt} layout="fill" />
      </div>
    </div>
  );
}

export default Hero;
