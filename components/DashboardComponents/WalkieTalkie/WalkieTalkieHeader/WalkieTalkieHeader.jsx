import React from "react";
import styles from "../../../../styles/WalkieTalkie.module.css";

const WalkieTalkieHeader = ({ selected, setSelected, talking, t }) => {
  return (
    <div className={styles.headerContainer}>
      <span className={`${styles.headingText} ${talking && styles.textWhite}`}>
        {selected === 1
          ? t?.adminDashboard?.walkieTalkie?.usersText
          : t?.adminDashboard?.walkieTalkie?.walkieTalkieText}
      </span>
      <div className={styles.headerToggleContainer}>
        <button
          className={`${selected === 1 && styles.selectedButton} 
          ${styles.button} ${styles.margin}`}
          onClick={() => setSelected(1)}
        >
          {t?.adminDashboard?.walkieTalkie?.usersText}
        </button>
        <button
          className={`${selected === 2 && styles.selectedButton}
           ${styles.button}`}
          onClick={() => setSelected(2)}
        >
          {t?.adminDashboard?.walkieTalkie?.walkieTalkieText}
        </button>
      </div>
    </div>
  );
};

export default WalkieTalkieHeader;
