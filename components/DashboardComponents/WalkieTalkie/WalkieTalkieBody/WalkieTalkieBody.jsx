import React from "react";
import styles from "../../../../styles/WalkieTalkie.module.css";

// Walkie Talkie component
const WalkieTalkieBody = ({ talking, setTalking, t }) => {
  return (
    <div className={styles.mainSection}>
      <div
        className={`${styles.rounded} ${talking && styles.talking}`}
        onMouseDown={() => setTalking(true)}
        onMouseUp={() => setTalking(false)}
      >
        {talking
          ? t?.adminDashboard?.walkieTalkie?.containerActiveButtonText
          : t?.adminDashboard?.walkieTalkie?.containerInactiveButtonText}
      </div>
    </div>
  );
};

export default WalkieTalkieBody;
