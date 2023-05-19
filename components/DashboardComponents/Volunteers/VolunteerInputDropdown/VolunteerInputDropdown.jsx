import Image from "next/image";
import React, { useState } from "react";
import styles from "../../../../styles/VolunteerInputDropdown.module.css";

// Custom dropdown component for volunteer position
const VolunteerInputDropdown = ({ selected, values, handleSelect }) => {
  const [optionsActive, setOptionsActive] = useState(false);
  return (
    <div className={styles.formInput}>
      <div
        className={styles.selectedCobnt}
        onClick={() => setOptionsActive((prev) => !prev)}
      >
        <span className={styles.optionText}>{selected}</span>
        <Image
          src={optionsActive ? "/chevronUpBlack.png" : "/chevronDownBlack.png"}
          alt="chevron"
          height="20px"
          width="20px"
          objectFit="contain"
        />
      </div>
      {/* show/hide dropdown  options */}
      {optionsActive && (
        <div className={styles.optionContainer}>
          {values?.map((value, index) => (
            <span
              key={index}
              onClick={() => {
                handleSelect(value);
                setOptionsActive(false);
              }}
              className={styles.optionText}
            >
              {value}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default VolunteerInputDropdown;
