import React from "react";
import styles from "../../../../../styles/DeleteAccountModal.module.css";
import Image from "next/image";

const Position = ({ isChecked, name, handleRadioChange, positionText }) => {
  return (
    <div className={styles.dFlex}>
      {/* checkbox */}
      <div className={styles.smallCheckContainer}>
        <div
          className={styles.smallCheck}
          onClick={() => handleRadioChange(name, !isChecked)}
        >
          {isChecked && (
            <Image
              src="/checkRed.png"
              alt="check"
              height="10px"
              width="10px"
              objectFit="contain"
            />
          )}
        </div>
      </div>
      {/* text */}
      <span className={styles.positionText}>{positionText}</span>
    </div>
  );
};

export default Position;
