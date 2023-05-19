import React from "react";
import styles from "../../../../../../styles/ViewApplicationModal.module.css";
import ApplicationCheckboxes from "../ApplicationCheckboxes/ApplicationCheckboxes";

// Application Question Component
const ApplicationQuestion = (props) => {
  return (
    <div>
      <span className={styles.question}>{props.question}</span>
      <ApplicationCheckboxes
        isEditable={props.isEditable}
        yesChecked={props.yesChecked}
        setYesChecked={props.setYesChecked}
        noChecked={props.noChecked}
        setNoChecked={props.setNoChecked}
      />
    </div>
  );
};

export default ApplicationQuestion;
