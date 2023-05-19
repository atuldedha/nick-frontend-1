import React from "react";
import styles from "../../../../styles/MailsList.module.css";

// table header for mass volunteer option
const MassVolunteer = () => {
  return (
    <>
      <div className={styles.bigCheckboxContainer} />

      <span className={`${styles.person} ${styles.volunteerPerson}`}>
        Person
      </span>
      <span className={`${styles.status} ${styles.groupEmail}`}>Email</span>
    </>
  );
};

export default MassVolunteer;
