import React, { useState, useEffect, useContext } from "react";
import styles from "../../../styles/VolunteersList.module.css";
import allEmails from "../../../utils/staticEmailList";
import Filter from "../MailSection/MailsList/Filter/Filter";
import AddVolunteerModal from "../Modals/VolunteerTabModals/AddVolunteerModal/AddVolunteerModal";
import SortFooter from "./SortFooter/SortFooter";
import VolunteersList from "./VolunteersList/VolunteersList";
import VolunteersListHeader from "./VolunteersListHeader/VolunteersListHeader";
import VolunteersSearch from "./VolunteersSearch/VolunteersSearch";
import VolunteerContext from "../../../context/VolunteersContext";
// Volunteers tab component i.e (sidebar option selected === 5)

const Volunteers = () => {
  const [openAddVolunteerModal, setOpenAddVolunteerModal] = useState(false);
  const { volunteers, setVolunteers, refetchVolunteers, loading } =
    useContext(VolunteerContext);

  useEffect(() => {
    refetchVolunteers();
  }, []);
  return (
    <>
      <div className={styles.container}>
        <span className={styles.heading}>Volunteers List</span>
        {/*search common component */}
        <div className={styles.filterContainer}>
          <VolunteersSearch
            openModal={() => setOpenAddVolunteerModal(true)}
            data={volunteers}
            setData={setVolunteers}
          />
        </div>
        <div className={styles.volunteersListEmailWrapper}>
          <div className={styles.volunteersList}>
            <div className={styles.volunteersListHeader}>
              {/* volunteer listing header */}
              <VolunteersListHeader />
            </div>
            {/* volunteers list */}
            <VolunteersList
              volunteers={volunteers}
              setVolunteers={setVolunteers}
            />
          </div>
        </div>

        <div className={styles.sortFooter}>
          {/* footer */}
          <SortFooter
            data={volunteers}
            setData={setVolunteers}
            field="fullName"
            refetchData={refetchVolunteers}
            loading={loading}
          />
        </div>
      </div>
      {/* add volunteer modal*/}
      {openAddVolunteerModal && (
        <AddVolunteerModal
          closeModal={() => setOpenAddVolunteerModal(false)}
          refetchVolunteers={refetchVolunteers}
        />
      )}
    </>
  );
};

export default Volunteers;
