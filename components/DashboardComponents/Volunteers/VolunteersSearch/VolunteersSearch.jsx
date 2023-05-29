import React, { useState, useMemo, useContext } from "react";
import Search from "../../MailSection/MailsList/Search/Search";
import styles from "../../../../styles/Filter.module.css";
import VolunteerContext from "../../../../context/VolunteersContext";
import fr from "../../../../locales/fr";
import en from "../../../../locales/en";
import { useRouter } from "next/router";

const VolunteersSearch = ({ openModal }) => {
  const router = useRouter();
  const { locale } = router;
  // language variable
  const t = locale === "fr" ? fr : en;

  const [searchData, setSearchData] = useState("");
  const { setVolunteers, refetchVolunteers } = useContext(VolunteerContext);

  const handleClick = async () => {
    if (searchData != "") {
      refetchVolunteers().then(function (volunteers) {
        setVolunteers(
          volunteers.filter(
            (volunteer) =>
              volunteer.fullName.includes(searchData) ||
              volunteer.phoneNumber.toString().includes(searchData) ||
              volunteer.email.includes(searchData)
          )
        );
      });
    } else {
      refetchVolunteers();
    }
  };
  return (
    <div className={styles.container} style={{ minWidth: "85%" }}>
      {/* button text based on the selection of the dropdowns */}
      {openModal && (
        <button className={styles.button} onClick={openModal}>
          + {t?.adminDashboard?.volunteersList?.addVolunteerText}
        </button>
      )}
      <Search
        placeholder={t?.adminDashboard?.searchBar?.volunteerPlaceholderText}
        searchData={searchData}
        setSearchData={setSearchData}
        handleClick={handleClick}
      />
    </div>
  );
};

export default VolunteersSearch;
