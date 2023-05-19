import React from "react";
import styles from "../../../../../../styles/EditInput.module.css";

// Custom Input component
const EditInput = ({
  value,
  defaultValue,
  isEditable,
  handleChange,
  name,
  placeholder,
  handleButtonClick,
}) => {
  return (
    <div className={styles.form}>
      <input
        disabled={!isEditable}
        type="text"
        name={name}
        className={styles.formInput}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder?.length > 0 ? placeholder : ""}
        onChange={
          isEditable ? (e) => handleChange(name, e.target.value) : () => {}
        }
      />
      {isEditable && (
        <button className={styles.okButton} onClick={handleButtonClick}>
          OK
        </button>
      )}
    </div>
  );
};

export default EditInput;
