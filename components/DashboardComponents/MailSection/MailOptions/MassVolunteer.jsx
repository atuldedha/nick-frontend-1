import React from "react";
import styles from "../../../../styles/MailsList.module.css";

// table header for mass volunteer option
const MassVolunteer = ({ t }) => {
  console.log(t?.adminDashboard?.tableHeader);
  return (
    <>
      <div className={styles.bigCheckboxContainer} />

      <span className={`${styles.person} ${styles.volunteerPerson}`}>
        {t?.adminDashboard?.tableHeader?.personHeaderText}
      </span>
      <span className={`${styles.status} ${styles.groupEmail}`}>
        {t?.adminDashboard?.tableHeader?.emailHeaderText}
      </span>
    </>
  );
};

export default MassVolunteer;
