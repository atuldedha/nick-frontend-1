import React from "react";
import styles from "../../../../styles/PreviousApplications.module.css";

// Parade Section or footer of group president dashboard component
const ParadeSection = ({section}) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Section For {new Date().getFullYear()} Parade</span>
      <div className={styles.paradeBlock}>{section}</div>
    </div>
  );
};

export default ParadeSection;
