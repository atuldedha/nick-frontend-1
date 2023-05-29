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
  t,
}) => {
  const [yearOptionActive, setYearOptionActive] = useState(false);

  return (
    <div className={styles.container}>
      <span className={styles.title}>
        {t?.groupPresidentDashboard?.dashboard?.previousApplicationsText}
      </span>
      <div className={styles.applicationFilterLeft}>
        <span className={styles.applicationFilterText}>
          {t?.groupPresidentDashboard?.dashboard?.filterText}
        </span>
        {/* Selected Year dropdown component */}
        <ApplicationYearSelect
          values={values}
          selectedYear={selectedYear}
          setYearOptionActive={setYearOptionActive}
          yearOptionActive={yearOptionActive}
          handleYearOptionChange={(value) => setSelectedYear(value)}
          applyMaxWidth
        />

        <div className={styles.goButtonWrapper}>
          <button className={styles.goButton} onClick={handleClick}>
            {t?.groupPresidentDashboard?.dashboard?.goButtonText} !!
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviousApplications;
