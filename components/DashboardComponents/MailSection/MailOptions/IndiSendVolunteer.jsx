import React from "react";
import styles from "../../../../styles/MailsList.module.css";

// table header for volunteer option
const IndiSendVolunteer = ({ t }) => {
  return (
    <>
      <div className={styles.bigCheckboxContainer} />

      <span className={`${styles.person} ${styles.groupEmail}`}>
        {t.adminDashboard?.tableHeader?.volunteerNameHeaderText}
      </span>
      <span className={`${styles.status} ${styles.groupEmail}`}>
        {" "}
        {t.adminDashboard?.tableHeader?.emailHeaderText}
      </span>
      <span className={`${styles.status} ${styles.phone}`}>
        {t.adminDashboard?.tableHeader?.phoneHeaderText}
      </span>
    </>
  );
};

export default IndiSendVolunteer;
