import Image from "next/image";
import React from "react";
import styles from "../../../../../styles/Applications.module.css";

// Application status dropdown filter component
const ApplicationStatusSelect = (props) => {
  return (
    (props.selectedYear === new Date().getFullYear().toString() ||
      props.selectedYear.toLowerCase() == "all") && (
      <div className={styles.applicationStatusFilterContainer}>
        <span className={`${styles.applicationFilterText} ${styles.margin}`}>
          {
            props?.t?.adminDashboard?.receivedApplications
              ?.applicationFilterText2
          }
        </span>

        <div
          className={styles.applicationFilterInputContainer}
          onClick={() => props.setStatusOptionActive(!props.statusOptionActive)}
        >
          <div className={styles.applicationFilterInputValue}>
            <span>{props.selectedStatus}</span>
            <Image
              src="/chevDown.png"
              alt="down"
              width="10px"
              height="7px"
              objectFit="contain"
            />
          </div>
          {/* dropdown options for status selection (only shown for current year) */}
          {props.statusOptionActive && (
            // dropdown options and click handlers
            <div className={styles.applicationFilterInputOptions}>
              {props.status.map((value, index) => (
                <div
                  key={index}
                  className={styles.applicationFilterInputOptionName}
                  onClick={() => props.handleStatusOptionChange(value)}
                >
                  <div className={styles.circleContainer}>
                    <span className={styles.circle} />
                  </div>
                  <span className={styles.optionText}>{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default ApplicationStatusSelect;
