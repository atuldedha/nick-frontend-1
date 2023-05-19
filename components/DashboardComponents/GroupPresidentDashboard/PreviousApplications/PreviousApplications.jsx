import React, { useState } from "react";
import styles from "../../../../styles/PreviousApplications.module.css";
import ApplicationYearSelect from "../../Applications/ApplicationsFilter/ApplicationYearSelect/ApplicationYearSelect";

function getPreviousTwoYears() {
  const currentYear = new Date().getFullYear();
  return [currentYear - 1, currentYear - 2].map((year) => year.toString());
}

//Group Previous Application Component
const values = getPreviousTwoYears();
const PreviousApplications = ({
  selectedYear,
  setSelectedYear,
  handleClick,
}) => {
  const [yearOptionActive, setYearOptionActive] = useState(false);

  return (
    <div className={styles.container}>
      <span className={styles.title}>Previous Applications</span>
      <div className={styles.applicationFilterLeft}>
        <span className={styles.applicationFilterText}>
          I want to see the group applications for
        </span>
        {/* Selected Year dropdown component */}
        <ApplicationYearSelect
          values={values}
          selectedYear={selectedYear}
          setYearOptionActive={setYearOptionActive}
          yearOptionActive={yearOptionActive}
          handleYearOptionChange={(value) => setSelectedYear(value)}
        />

        <div className={styles.goButtonWrapper}>
          <button className={styles.goButton} onClick={handleClick}>
            Go !!
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviousApplications;
