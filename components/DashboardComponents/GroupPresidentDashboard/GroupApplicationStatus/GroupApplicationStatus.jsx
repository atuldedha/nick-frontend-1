import React from "react";
import styles from "../../../../styles/PreviousApplications.module.css";

// Group Application Status component
const GroupApplicationStatus = ({ status }) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Application Status</span>
      {/* status of application */}
      <span className={`${styles.applicationFilterText}  ${styles.margin}`}>
        Current Application Status:
        <span 
          className={`${styles.statusText}`} 
          style={{color: status.toUpperCase()=="REJECTED" ? "red": "green"}}>{status}</span>
      </span>
    </div>
  );
};

export default GroupApplicationStatus;
