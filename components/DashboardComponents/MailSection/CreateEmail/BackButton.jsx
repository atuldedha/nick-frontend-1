import React from "react";
import { useMail } from "../../../../context/MailContext";
import styles from "../../../../styles/CreateEmail.module.css";

const BackButton = ({ t }) => {
  const { setIsCreatingMail } = useMail();
  return (
    <div className={styles.backButtonContainer}>
      <button
        className={styles.backButton}
        onClick={() => setIsCreatingMail(false)}
      >
        <span className={styles.arrow} />
        {t.adminDashboard.emailSection.backButtonText}
      </button>
    </div>
  );
};

export default BackButton;
