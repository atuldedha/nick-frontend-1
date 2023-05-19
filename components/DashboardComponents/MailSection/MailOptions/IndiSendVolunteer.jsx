import React from "react";
import styles from "../../../../styles/MailsList.module.css";

// table header for volunteer option
const IndiSendVolunteer = () => {
  return (
    <>
      <div className={styles.bigCheckboxContainer} />

      <span className={`${styles.person} ${styles.groupEmail}`}>
        Volunteer Name
      </span>
      <span className={`${styles.status} ${styles.groupEmail}`}>Email</span>
      <span className={`${styles.status} ${styles.phone}`}>Phone</span>
    </>
  );
};

export default IndiSendVolunteer;
