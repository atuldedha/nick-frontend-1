import Image from "next/image";
import React from "react";
import styles from "../../../../../../styles/ViewApplicationModal.module.css";

// Application checkboxes component
const ApplicationCheckboxes = (props) => {
  return (
    <div>
      <div className={styles.flexRow}>
        <div
          className={styles.smallCheck}
          onClick={() => {
            props.isEditable ? props.setYesChecked() : null;
          }}
        >
          {props.yesChecked && (
            <Image
              src="/checkRed.png"
              alt="check"
              height="13px"
              width="13px"
              objectFit="contain"
            />
          )}
        </div>
        <span className={`${styles.formText} ${styles.marginB0}`}>Yes</span>

        <div
          className={`${styles.smallCheck} ${styles.margin}`}
          onClick={() => {
            props.isEditable ? props.setNoChecked() : null;
            //   handleCheck();
          }}
        >
          {props.noChecked && (
            <Image
              src="/checkRed.png"
              alt="check"
              height="13px"
              width="13px"
              objectFit="contain"
            />
          )}
        </div>
        <span className={`${styles.formText} ${styles.marginB0}`}>No</span>
      </div>
    </div>
  );
};

export default ApplicationCheckboxes;
