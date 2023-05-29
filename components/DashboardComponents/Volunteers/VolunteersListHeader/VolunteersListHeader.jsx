import React from "react";
import styles from "../../../../styles/MailsList.module.css";

// table header for group option
const VolunteersListHeader = ({ t }) => {
  return (
    <>
      <div className={`${styles.bigCheckboxContainer} ${styles.widthLimit}`} />

      <span className={`${styles.status} ${styles.groupName}`}>
        {t?.adminDashboard?.tableHeader?.personHeaderText}
      </span>
      <span className={`${styles.status}`}>
        {t?.adminDashboard?.tableHeader?.emailHeaderText}
      </span>
      <span className={`${styles.status} ${styles.volunteersPhone}`}>
        {t?.adminDashboard?.tableHeader?.phoneHeaderText}
      </span>
    </>
  );
};

export default VolunteersListHeader;
