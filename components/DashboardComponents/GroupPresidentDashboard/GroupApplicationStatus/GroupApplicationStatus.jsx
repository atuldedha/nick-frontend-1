import React from "react";
import styles from "../../../../styles/PreviousApplications.module.css";

// Group Application Status component
const GroupApplicationStatus = ({ status, t }) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>
        {t?.groupPresidentDashboard?.dashboard?.applicationStatusText}:
      </span>
      {/* status of application */}
      <span className={`${styles.applicationFilterText}  ${styles.margin}`}>
        {t?.groupPresidentDashboard.dashboard?.currentApplicationStatusText}:
        <span
          className={`${styles.statusText}`}
          style={{
            color: status.toUpperCase() == "REJECTED" ? "red" : "green",
          }}
        >
          {status}
        </span>
      </span>
    </div>
  );
};

export default GroupApplicationStatus;
