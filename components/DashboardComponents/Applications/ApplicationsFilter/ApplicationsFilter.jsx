import Image from "next/image";
import React from "react";
import styles from "../../../../styles/Applications.module.css";
import ApplicationStatusSelect from "./ApplicationStatusSelect/ApplicationStatusSelect";
import ApplicationYearSelect from "./ApplicationYearSelect/ApplicationYearSelect";


function getPreviousYears(numYears) {
  const currentYear = new Date().getFullYear();
  const years = [currentYear.toString()];
  for (let i = 1; i < numYears; i++) {
    years.push((currentYear - i).toString());
  }
  return years;
}

// Application Filter component
const values = [...getPreviousYears(3)];
const status = ["to be accepted", "Accepted"];
const ApplicationsFilter = (props) => {
  return (
    <div className={styles.applicationFilterContainer}>
      <div className={styles.applicationFilterLeft}>
        <span className={styles.applicationFilterText}>
          I want to see the group applications for
        </span>
        {/* Selected Year dropdown component */}
        <ApplicationYearSelect
          values={values}
          selectedYear={props.selectedYear}
          setYearOptionActive={props.setYearOptionActive}
          yearOptionActive={props.yearOptionActive}
          handleYearOptionChange={props.handleYearOptionChange}
        />
        {/* status selection dropdown based on selected year */}
        <ApplicationStatusSelect
          selectedYear={props.selectedYear}
          setStatusOptionActive={props.setStatusOptionActive}
          statusOptionActive={props.statusOptionActive}
          selectedStatus={props.selectedStatus}
          handleStatusOptionChange={props.handleStatusOptionChange}
          status={status}
        />
      </div>
      <button className={styles.goButton} onClick={props.filterClick}>
        Go !!
      </button>
    </div>
  );
};

export default ApplicationsFilter;
