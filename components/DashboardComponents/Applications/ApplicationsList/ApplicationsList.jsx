import React, { useState } from "react";
import ApplicationReceivedCard from "../ApplicationReceivedCard/ApplicationReceivedCard";
import styles from "../../../../styles/Applications.module.css";

// All Received Applications listing component
const ApplicationsList = ({
  allCheck,
  filter,
  applications,
  setApplications,
  setOpenAcceptModal,
}) => {
  return (
    <div className={styles.applicationList}>
      {applications?.map((application) =>
        // show only those applications which are from year 2022
        filter.year === new Date().getFullYear.toString()
          ? // show only those applications which are from year 2022 and are not approved yet
            filter.status === "to be accepted"
            ? filter.year === application.applicationDate &&
              !application.approved && (
                <ApplicationReceivedCard
                  key={application.id}
                  data={application}
                  setAllData={setApplications}
                  allCheck={allCheck}
                  setOpenAcceptModal={setOpenAcceptModal}
                />
              )
            : // show only those applications which are from year 2022 and are approved.
              filter.year === application.applicationDate &&
              application.approved && (
                <ApplicationReceivedCard
                  key={application.id}
                  data={application}
                  setAllData={setApplications}
                  allCheck={allCheck}
                  setOpenAcceptModal={setOpenAcceptModal}
                />
              )
          : // // show only those applications which are from the filtered year.
            filter.year === application.applicationDate && (
              <ApplicationReceivedCard
                key={application.id}
                data={application}
                setAllData={setApplications}
                allCheck={allCheck}
                setOpenAcceptModal={setOpenAcceptModal}
              />
            )
      )}
    </div>
  );
};

export default ApplicationsList;
