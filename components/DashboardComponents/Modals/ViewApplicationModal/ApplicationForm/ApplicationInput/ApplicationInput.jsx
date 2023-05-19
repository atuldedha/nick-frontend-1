import React from "react";
import styles from "../../../../../../styles/ViewApplicationModal.module.css";

// Custom Input component
const ApplicationInput = ({
  value,
  isEditable,
  handleChange,
  name,
  placeholder,
  defaultValue
}) => {
  return (
    <input
      type="text"
      disabled={!isEditable}
      name={name}
      className={styles.formInput}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder?.length > 0 ? placeholder : ""}
      onChange={
        isEditable ? (e) => handleChange(name, e.target.value, e) : () => {}
      }
    />
  );
};

export default ApplicationInput;
