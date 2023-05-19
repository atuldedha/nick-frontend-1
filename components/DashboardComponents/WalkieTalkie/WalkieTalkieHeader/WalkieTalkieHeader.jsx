import React from "react";
import styles from "../../../../styles/WalkieTalkie.module.css";

const WalkieTalkieHeader = ({ selected, setSelected, talking }) => {
  return (
    <div className={styles.headerContainer}>
      <span className={`${styles.headingText} ${talking && styles.textWhite}`}>
        {selected === 1 ? "Users" : "WalkieTalkie"}
      </span>
      <div className={styles.headerToggleContainer}>
        <button
          className={`${selected === 1 && styles.selectedButton} 
          ${styles.button} ${styles.margin}`}
          onClick={() => setSelected(1)}
        >
          Users
        </button>
        <button
          className={`${selected === 2 && styles.selectedButton}
           ${styles.button}`}
          onClick={() => setSelected(2)}
        >
          Walkie Talkie
        </button>
      </div>
    </div>
  );
};

export default WalkieTalkieHeader;
