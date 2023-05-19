import React from "react";
import styles from "../../../../styles/MailsList.module.css";

// table header for group option
const IndiSendGroup = ({ showPhone }) => {
  return (
    <>
      {!showPhone && <div className={styles.bigCheckboxContainer} />}

      <span className={`${styles.person} ${styles.groupName}`}>Group Name</span>
      <span className={`${styles.status} ${styles.groupName}`}>Person</span>
      <span className={`${styles.status} ${styles.groupEmail}`}>Email</span>
      {showPhone && (
        <span className={`${styles.status} ${styles.groupName}`}>Phone</span>
      )}
      <span className={`${styles.status} ${styles.groupName}`}>Country</span>
    </>
  );
};

export default IndiSendGroup;
