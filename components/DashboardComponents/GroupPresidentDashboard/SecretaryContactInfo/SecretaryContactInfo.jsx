import React from "react";
import styles from "../../../../styles/PreviousApplications.module.css";

// Secretary Contact info component
const SecretaryContactInfo = ({ handleClick, t }) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>
        {t?.groupPresidentDashboard?.dashboard?.contactInformationText}
      </span>

      <button
        className={`${styles.goButton} ${styles.margin} ${styles.removeMarginLeft}`}
        onClick={handleClick}
      >
        {t?.groupPresidentDashboard?.dashboard?.contactSecretaryButtonText}
      </button>
    </div>
  );
};

export default SecretaryContactInfo;
