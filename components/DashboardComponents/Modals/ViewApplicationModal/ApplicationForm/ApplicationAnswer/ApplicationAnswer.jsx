import React from "react";
import styles from "../../../../../../styles/ViewApplicationModal.module.css";

// Application Answer component
const ApplicationAnswer = ({ isEditable, value, handleChange, name }) => {
  return isEditable ? (
    <input
      type="text"
      value={value}
      onChange={(e) => handleChange(name, e.target.value)}
      className={styles.formInput2}
    />
  ) : (
    <span className={styles.bottomBorder}>{value}</span>
  );
};

export default ApplicationAnswer;
