import React from "react";
import styles from "../../../../styles/PreviousApplications.module.css";

// Secretary Contact info component
const SecretaryContactInfo = ({ handleClick }) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Previous Applications</span>

      <button
        className={`${styles.goButton} ${styles.margin} ${styles.removeMarginLeft}`}
        onClick={handleClick}
      >
        Contact Secretary
      </button>
    </div>
  );
};

export default SecretaryContactInfo;
