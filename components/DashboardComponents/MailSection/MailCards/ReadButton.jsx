import React from "react";
import styles from "../../../../styles/MailCards.module.css";

const ReadButton = ({ handleClick }) => {
  return (
    <div
      className={`${styles.readMailContainer} ${styles.readSentMailContainer}`}
    >
      <button className={styles.readButton} onClick={handleClick}>
        Read
      </button>
    </div>
  );
};

export default ReadButton;
