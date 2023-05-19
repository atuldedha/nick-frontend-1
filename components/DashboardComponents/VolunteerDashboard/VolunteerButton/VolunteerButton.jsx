import React from "react";
import styles from "../../../../styles/Dashboard.module.css";

const VolunteerButton = ({ handleClick }) => {
  // Join Parade button component
  return (
    <button className={styles.volunteerHeaderButton} onClick={handleClick}>
      Volunteer for 2023 Parade
    </button>
  );
};

export default VolunteerButton;
