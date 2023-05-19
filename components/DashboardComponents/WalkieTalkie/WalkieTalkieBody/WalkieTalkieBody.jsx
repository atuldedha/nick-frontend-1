import React from "react";
import styles from "../../../../styles/WalkieTalkie.module.css";

// Walkie Talkie component
const WalkieTalkieBody = ({ talking, setTalking }) => {
  return (
    <div className={styles.mainSection}>
      <div
        className={`${styles.rounded} ${talking && styles.talking}`}
        onMouseDown={() => setTalking(true)}
        onMouseUp={() => setTalking(false)}
      >
        {talking ? "Talking" : "Press / Hold to talk"}
      </div>
    </div>
  );
};

export default WalkieTalkieBody;
