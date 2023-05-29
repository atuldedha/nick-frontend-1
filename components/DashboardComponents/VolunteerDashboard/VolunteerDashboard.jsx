import React, { useContext } from "react";
import { useState } from "react";
import PositionModal from "../Modals/GroupPresidentDashboardModals/PositionModal/PositionModal";
import PreviousApplicationModal from "../Modals/GroupPresidentDashboardModals/PreviousApplicationModal/PreviousApplicationModal";
import PreviousApplications from "../GroupPresidentDashboard/PreviousApplications/PreviousApplications";
import styles from "../../../styles/GroupPresidentDashboard.module.css";
import VolunteerButton from "./VolunteerButton/VolunteerButton";
import AuthContext from "../../../context/AuthContext";
import { useRouter } from "next/router";
import fr from "../../../locales/fr";
import en from "../../../locales/en";
const VolunteerDashboard = () => {
  // router for language
  const router = useRouter();
  const { locale } = router;
  // language variable
  const t = locale === "fr" ? fr : en;
  // state to open previous application modal
  const [openPreviousApplicationModal, setOpenPreviousApplicationModal] =
    useState(false);
  // state to open position details modal
  const [openPositionModal, setOpenPositionModal] = useState(false);

  // selected year for previous year selection application
  const [selectedYear, setSelectedYear] = useState("2022");

  const { user } = useContext(AuthContext);

  return (
    <>
      <div className={styles.volunteerDashboardContainer}>
        <div className={styles.volunteerHeaderButtonWrapper}>
          {/* Join Parade button component */}
          <VolunteerButton
            handleClick={() => {
              setOpenPositionModal(true);
            }}
          />
        </div>
        <div className={styles.volunteerContentWrapper}>
          <div className={styles.divider} />
          {/* PreviousApplication component */}
          <PreviousApplications
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            handleClick={setOpenPreviousApplicationModal}
            t={t}
          />
          <div className={styles.divider} />
        </div>
      </div>
      {/* previous application modal */}
      {openPreviousApplicationModal && (
        <PreviousApplicationModal
          closeModal={() => setOpenPreviousApplicationModal(false)}
          groupTitle="Group1 application"
          groupInfo="Lorem Ipsum is simply dummy text of the printing  "
        />
      )}
      {/* position application modal */}
      {openPositionModal && (
        <PositionModal
          user={user}
          closeModal={() => setOpenPositionModal(false)}
          t={t}
        />
      )}
    </>
  );
};

export default VolunteerDashboard;
