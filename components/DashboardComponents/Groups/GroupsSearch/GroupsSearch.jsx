import React, { useState, useMemo, useContext } from "react";
import Search from "../../MailSection/MailsList/Search/Search";
import styles from "../../../../styles/Filter.module.css";
import GroupContext from "../../../../context/GroupContext";
import { useRouter } from "next/router";
import fr from "../../../../locales/fr";
import en from "../../../../locales/en";

const GroupsSearch = ({ openModal }) => {
  const router = useRouter();
  const { locale } = router;
  // language variable
  const t = locale === "fr" ? fr : en;

  const [searchData, setSearchData] = useState("");
  const { setGroups, refetchGroups } = useContext(GroupContext);

  const handleClick = async () => {
    if (searchData != "") {
      refetchGroups().then(function (groups) {
        setGroups(
          groups.filter(
            (group) =>
              group.name.includes(searchData) ||
              group.contact.fullName.includes(searchData) ||
              group.contact.phoneNumber.toString().includes(searchData) ||
              group.contact.email.includes(searchData)
          )
        );
      });
    } else {
      refetchGroups();
    }
  };
  return (
    <div className={styles.container} style={{ minWidth: "85%" }}>
      {/* button text based on the selection of the dropdowns */}
      {openModal && (
        <button className={styles.button} onClick={openModal}>
          + {t?.adminDashboard?.groupList?.addGroupText}
        </button>
      )}
      <Search
        placeholder={t?.adminDashboard?.searchBar?.groupPlaceholderText}
        searchData={searchData}
        setSearchData={setSearchData}
        handleClick={handleClick}
      />
    </div>
  );
};

export default GroupsSearch;
