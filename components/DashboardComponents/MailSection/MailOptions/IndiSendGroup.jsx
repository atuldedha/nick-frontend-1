import React from "react";
import styles from "../../../../styles/MailsList.module.css";

// table header for group option
const IndiSendGroup = ({ showPhone, t }) => {
  return (
    <>
      {!showPhone && <div className={styles.bigCheckboxContainer} />}

      <span className={`${styles.person} ${styles.groupName}`}>
        {t?.adminDashboard?.tableHeader?.groupNameHeaderText}
      </span>
      <span className={`${styles.status} ${styles.groupName}`}>
        {t?.adminDashboard?.tableHeader?.personHeaderText}
      </span>
      <span className={`${styles.status} ${styles.groupEmail}`}>
        {t?.adminDashboard?.tableHeader?.emailHeaderText}
      </span>
      {showPhone && (
        <span className={`${styles.status} ${styles.groupName}`}>
          {t?.adminDashboard?.tableHeader?.phoneHeaderText}
        </span>
      )}
      <span className={`${styles.status} ${styles.groupName}`}>
        {t?.adminDashboard?.tableHeader?.countryHeaderText}
      </span>
    </>
  );
};

export default IndiSendGroup;
