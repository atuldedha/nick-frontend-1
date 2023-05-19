import React, { useContext, useEffect, useState } from "react";
import styles from "../../../../styles/MailsList.module.css";
import EmailCard from "../MailCards/EmailCard";
import DeleteModal from "../../Modals/DeleteModal";
import { useMail } from "../../../../context/MailContext";
import NotPresentHeader from "../MailOptions/NotPresentHeader";
import IndiSendGroup from "../MailOptions/IndiSendGroup";
import IndiSendVolunteer from "../MailOptions/IndiSendVolunteer";
import SentMailCard from "../MailCards/SentMailCard";
import IndiGroupEmailCard from "../MailCards/IndiGroupEmailCard";
import IndiVolunteersEmailCard from "../MailCards/IndiVolunteersEmailCard";
import MassVolunteer from "../MailOptions/MassVolunteer";
import Search from "./Search/Search";
import ReceivedHeader from "../MailOptions/ReceivedHeader";
import VolunteersContext from "../../../../context/VolunteersContext";
import GroupContext from "../../../../context/GroupContext";
import VolunteersSearch from "../../Volunteers/VolunteersSearch/VolunteersSearch";
import GroupsSearch from "../../Groups/GroupsSearch/GroupsSearch";
import { setRequestMeta } from "next/dist/server/request-meta";
import fr from "../../../../locales/fr";
import en from "../../../../locales/en";
import { useRouter } from "next/router";
// component to render the received and sent mails
const MailsList = () => {
  const router = useRouter();
  const { locale } = router;
  // language variable
  const t = locale === "fr" ? fr : en;

  const {
    isCreatingMail,
    senderOption,
    audienceOption,
    audienceMassOption,
    allMails,
    setAllMails,
    allMailsCheck,
    setAllMailsCheck,
    mailButtonText,
    inboxPage,
    setInboxPage,
    sentPage,
    setSentPage,
    fetchMails,
    loading,
    receivedEmails,
    receivedEmailsRef,
    setReceivedEmails,
    sentEmails,
    sentEmailsRef,
    setSentEmails,
    deleteEmails,
  } = useMail();

  const { groups, setGroups, refetchGroups } = useContext(GroupContext);
  const { volunteers, setVolunteers, refetchVolunteers } =
    useContext(VolunteersContext);
  //state to open and close delete mail modal
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  //click hanlder to open delete modal
  const openDeleteModal = () => {
    setOpen(true);
  };

  //function to handle delete of mails
  const handleDelete = () => {
    setDisabled(true);
    if (isCreatingMail) {
      let ids = [];
      if (allMailsCheck) ids = sentEmails.map((m) => m.id);
      else ids = sentEmails.filter((m) => m.checked).map((m) => m.id);

      deleteEmails(ids, "SENT").then(async function () {
        setSentPage(1);
        await fetchMails(1, false, "SENT");
        setDisabled(false);
        setOpen(false);
      });
    } else {
      let ids = [];
      if (allMailsCheck) ids = receivedEmails.map((m) => m.id);
      else ids = receivedEmails.filter((m) => m.checked).map((m) => m.id);

      deleteEmails(ids, "INBOX").then(async function () {
        setInboxPage(1);
        await fetchMails(1, false, "INBOX");

        setDisabled(false);
        setOpen(false);
      });
    }
    setAllMailsCheck(false);
  };

  // function to get button text
  const getMailButtonText = () => {
    const buttonText =
      mailButtonText === "Sent Emails"
        ? t.adminDashboard.emailSection.sentEmailText
        : mailButtonText === "A specific group"
        ? t.adminDashboard.emailSection.individualOptions.individualOption2
        : mailButtonText === "A specific volunteer"
        ? t.adminDashboard.emailSection.individualOptions.individualOption3
        : mailButtonText === "Everyone on the group list"
        ? t.adminDashboard.emailSection.massOptions.massOption1
        : mailButtonText === "Everyone on the volunteer list"
        ? t.adminDashboard.emailSection.massOptions.massOption2
        : mailButtonText === "Groups registered coming to this year’s parade"
        ? t.adminDashboard.emailSection.massOptions.massOption3
        : mailButtonText === "Groups registered coming to this year’s parade"
        ? t.adminDashboard.emailSection.massOptions.massOption4
        : "";
    return buttonText;
  };

  useEffect(
    function () {
      if (senderOption == "Mass") {
        refetchGroups();
        refetchVolunteers();
      }
    },
    [senderOption]
  );

  useEffect(
    function () {
      setAllMailsCheck(false);
    },
    [isCreatingMail]
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.buttonsContainer}>
          <button className={styles.receiveEmailButton}>
            {/* button text based on the selection of the dropdowns */}
            {isCreatingMail
              ? getMailButtonText()
              : t.adminDashboard.emailSection.receivedEmailText}
          </button>
          {audienceOption === "A specific volunteer" ? (
            <VolunteersSearch />
          ) : null}
          {audienceOption === "A specific group" ? <GroupsSearch /> : null}
        </div>
        <div className={styles.emailWrapper}>
          <div className={styles.emailContainer}>
            {/* header of the table */}
            <div className={styles.emailHeader}>
              {isCreatingMail ? (
                // change table header based on the dropdown value
                senderOption === "Individual" ? (
                  audienceOption === "To someone not on any current list" ? (
                    <NotPresentHeader
                      openDeleteModal={openDeleteModal}
                      list={sentEmails}
                      setList={setSentEmails}
                    />
                  ) : audienceOption === "A specific group" ? (
                    <IndiSendGroup />
                  ) : (
                    <IndiSendVolunteer />
                  )
                ) : senderOption === "Mass" ? (
                  audienceMassOption === "Everyone on the group list" ||
                  audienceMassOption ===
                    "Groups registered coming to this year’s parade" ? (
                    <IndiSendGroup />
                  ) : audienceMassOption === "Everyone on the volunteer list" ||
                    audienceMassOption ===
                      "Volunteers registered coming to this year’s parade" ? (
                    <MassVolunteer />
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )
              ) : (
                <ReceivedHeader
                  allMailsCheck={allMailsCheck}
                  setAllMailsCheck={setAllMailsCheck}
                  openDeleteModal={openDeleteModal}
                  list={receivedEmails}
                  setList={setReceivedEmails}
                />
              )}
            </div>
            {/* show all mails based on dropdown */}
            {isCreatingMail
              ? senderOption === "Individual"
                ? audienceOption === "To someone not on any current list"
                  ? sentEmails?.map((mail) => (
                      <div key={mail.id}>
                        <SentMailCard
                          data={mail}
                          sentEmails={sentEmails}
                          setSentEmails={setSentEmails}
                        />
                        <div className={styles.divider}></div>
                      </div>
                    ))
                  : audienceOption === "A specific group"
                  ? groups?.map((group) => (
                      <IndiGroupEmailCard
                        key={group._id}
                        group={group}
                        groups={groups}
                        setGroups={setGroups}
                        defaultChecked={group.checked}
                      />
                    ))
                  : volunteers?.map((volunteer) => (
                      <IndiVolunteersEmailCard
                        key={volunteer._id}
                        volunteer={volunteer}
                        volunteers={volunteers}
                        setVolunteers={setVolunteers}
                        defaultChecked={volunteer.checked}
                      />
                    ))
                : audienceMassOption === "Everyone on the group list"
                ? groups?.map((group) => (
                    <IndiGroupEmailCard
                      key={group._id}
                      group={group}
                      groups={groups}
                      setGroups={setGroups}
                      defaultChecked={group.checked}
                      notShowCheck={true}
                    />
                  ))
                : audienceMassOption === "Everyone on the volunteer list"
                ? volunteers?.map((volunteer) => (
                    <IndiVolunteersEmailCard
                      key={volunteer._id}
                      volunteer={volunteer}
                      volunteers={volunteers}
                      setVolunteers={setVolunteers}
                      defaultChecked={volunteer.checked}
                      notShowCheck={true}
                    />
                  ))
                : audienceMassOption ===
                  "Groups registered coming to this year’s parade"
                ? groups?.map(
                    (group) =>
                      group.registered && (
                        <IndiGroupEmailCard
                          key={group._id}
                          group={group}
                          groups={groups}
                          setGroups={setGroups}
                          defaultChecked={group.checked}
                          notShowCheck={true}
                        />
                      )
                  )
                : volunteers?.map(
                    (volunteer) =>
                      volunteer.registered && (
                        <IndiVolunteersEmailCard
                          key={volunteer._id}
                          volunteer={volunteer}
                          volunteers={volunteers}
                          setVolunteers={setVolunteers}
                          defaultChecked={volunteer.checked}
                          notShowCheck={true}
                        />
                      )
                  )
              : receivedEmails?.map((mail) => (
                  <div key={mail.id}>
                    <EmailCard
                      data={mail}
                      receivedEmails={receivedEmails}
                      setReceivedEmails={setReceivedEmails}
                    />
                    <div className={styles.divider}></div>
                  </div>
                ))}
            {audienceOption == "To someone not on any current list" &&
              senderOption == "Individual" && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "1rem",
                  }}
                >
                  <button
                    style={{
                      border: "none",
                      background: "none",
                      fontSize: "1.1rem",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      if (!isCreatingMail) {
                        // in inbox page
                        setInboxPage(++inboxPage);
                        fetchMails(++inboxPage);
                      } else {
                        setSentPage(++sentPage);
                        fetchMails(++sentPage, true, "SENT");
                      }
                    }}
                    disabled={
                      (loading == "INBOX" && !isCreatingMail) ||
                      (loading == "SENT" && isCreatingMail)
                    }
                  >
                    {loading == "INBOX" && !isCreatingMail
                      ? "LOADING..."
                      : loading == "SENT" && isCreatingMail
                      ? "LOADING..."
                      : "LOAD MORE"}
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* delete modal */}
      {open && (
        <DeleteModal
          closeModal={() => setOpen(false)}
          handleDelete={handleDelete}
          deleting="emails"
          btnsDisabled={disabled}
          loading={loading}
        />
      )}
    </>
  );
};

export default MailsList;
