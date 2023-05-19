import Image from "next/image";
import React from "react";
import styles from "../../../../../styles/Applications.module.css";

// Year selection component for received applications tab
const ApplicationYearSelect = (props) => {
  return (
    <div
      className={styles.applicationFilterInputContainer}
      onClick={() => props.setYearOptionActive(!props.yearOptionActive)}
    >
      <div className={styles.applicationFilterInputValue}>
        <span>{props.selectedYear}</span>
        <Image
          src="/chevDown.png"
          alt="down"
          width="10px"
          height="7px"
          objectFit="contain"
        />
      </div>
      {/* year options dropdown */}
      {props.yearOptionActive && (
        // dropdown options and click handlers
        <div
          className={`${styles.applicationFilterInputOptions} ${styles.applicationFilterYearInputOptions}`}
        >
          {props.values.map((value, index) => (
            <div
              key={index}
              className={styles.applicationFilterInputOptionName}
              onClick={() => props.handleYearOptionChange(value)}
            >
              <div className={styles.circleContainer}>
                <span className={styles.circle} />
              </div>
              <span className={styles.optionText}>{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationYearSelect;
