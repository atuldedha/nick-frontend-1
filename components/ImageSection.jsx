import Image from "next/image";
import React from "react";

import styles from "../styles/ImageSection.module.css";
import { useWindowSize } from "../utils/WindowResizeHook";

function ImageSection({ direction, title, paragraph, src, alt }) {
  const [width, height] = useWindowSize();
  return (
    <div
      className={styles.container}
      style={{
        flexDirection:
          width < parseFloat("768")
            ? "column"
            : direction === "left"
            ? "row"
            : "row-reverse",
        // columnGap: direction === 'left' ? '120px' : '90px',
      }}
    >
      {width < parseFloat("768") && (
        <h4 className={styles.contentHeading}>{title}</h4>
      )}
      <div className={styles.imageWrapper}>
        <div className={styles.border1} />
        <div className={styles.border2} />
        <div className={styles.mainImage}>
          <Image src={src} alt={alt} layout="fill" />
        </div>
      </div>
      <div className={styles.contentWrapper}>
        {width > parseFloat("768") && (
          <h4 className={styles.contentHeading}>{title}</h4>
        )}
        {/* Need key prop */}
        {paragraph.map((content, index) => (
          <div key={index} className={styles.list}>
            <span className={styles.listStyle}></span>
            <p>{content}</p>
          </div>
        ))}
        {/* <div className={styles.list}>
                    <span className={styles.listStyle}></span>
                    <p><strong>July 1st 2023 11:00AM</strong> St. Catherine street and Fort street Finishes at Place Du Canada</p>
                </div>
 */}
      </div>
    </div>
  );
}

export default ImageSection;
