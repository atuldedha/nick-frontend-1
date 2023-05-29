import React, { useState, useContext, useEffect } from "react";
import styles from "../../../styles/Groups.module.css";
import allEmails from "../../../utils/staticEmailList";
import IndiSendGroup from "../MailSection/MailOptions/IndiSendGroup";
import Filter from "../MailSection/MailsList/Filter/Filter";
import AddGroupModal from "../Modals/GroupTabModals/AddGroupModal/AddGroupModal";
import SortFooter from "../Volunteers/SortFooter/SortFooter";
import GroupsList from "./GroupsList/GroupsList";
import GroupContext from "../../../context/GroupContext";
import GroupsSearch from "./GroupsSearch/GroupsSearch";
import { useRouter } from "next/router";
import GroupSignupModal from "../Modals/GroupSignupModal";
// language imports
import en from "../../../locales/en";
import fr from "../../../locales/fr";

const Groups = () => {
  // router for language
  const router = useRouter();
  const [openAddGroupModal, setOpenAddGroupModal] = useState(false);
  const { locale } = router;

  const t = locale === "en-US" ? en : fr;

  const { groups, setGroups, refetchGroups, loading } =
    useContext(GroupContext);

  useEffect(() => {
    refetchGroups();
  }, []);
  return (
    <>
      <div className={styles.container}>
        <span className={styles.heading}>
          {t?.adminDashboard?.groupList?.headerText}
        </span>
        <div className={styles.filterContainer}>
          {/* <Filter
            buttonText="+ Add Group"
            handleButtonClick={() => setOpenAddGroupModal(true)}
            searchPlaceholder="Search by group name , email , phone"
          /> */}

          <GroupsSearch openModal={() => setOpenAddGroupModal(true)} />
        </div>
        <div className={styles.groupsListEmailWrapper}>
          <div className={styles.groupList}>
            <div className={styles.groupsListHeader}>
              <IndiSendGroup showPhone t={t} />
            </div>
            <GroupsList data={groups} setData={setGroups} />
          </div>
        </div>
        <div className={styles.sortFooter}>
          {/* footer */}
          <SortFooter
            data={groups}
            setData={setGroups}
            refetchData={refetchGroups}
            field="name"
            loading={loading}
          />
        </div>
      </div>
      {/* add volunteer modal*/}
      {openAddGroupModal && (
        // replacing this with  new modal
        // <AddGroupModal
        //   closeModal={() => setOpenAddGroupModal(false)}
        //   setGroups={setGroups}
        // />
        <GroupSignupModal
          closeModal={() => setOpenAddGroupModal(false)}
          t={t}
          usedInAdminDashboard
        />
      )}
    </>
  );
};

export default Groups;
