import React from "react";
import styles from "../../../../styles/MailsList.module.css";

// table header for group option
const VolunteersListHeader = () => {
  return (
    <>
      <div className={styles.bigCheckboxContainer} />

      <span className={`${styles.status} ${styles.groupName}`}>Person</span>
      <span className={`${styles.status}`}>Email</span>
      <span className={`${styles.status} ${styles.volunteersPhone}`}>
        Phone
      </span>
    </>
  );
};

export default VolunteersListHeader;
