import Image from "next/image";
import React, { useState } from "react";
import { useMail } from "../../../../context/MailContext";
import styles from "../../../../styles/CreateEmail.module.css";
import SendMailModal from "../../Modals/SendMailModal";
import AudienceSelection from "./AudienceSelection";
import BackButton from "./BackButton";
import SenderSelection from "./SenderSelection";
import { useRouter } from "next/router";
import en from "../../../../locales/en";
import fr from "../../../../locales/fr";

const CreateEmail = () => {
  const router = useRouter();
  const { locale } = router;
  // language variable
  const t = locale === "fr" ? fr : en;

  const {
    handleSenderOptionChange,
    isCreatingMail,
    setIsCreatingMail,
    senderOption,
    audienceOption,
  } = useMail();
  // state to check dropdown of email selection is open or not
  const [senderOptionsActive, setSenderOptionsActive] = useState(false);
  // state to check dropdown of audience selection is open or not
  const [audienceOptionActive, setAudienceOptionActive] = useState(false);
  // state to check modal is open or not
  const [sendMailModalOpen, setSendMailModalOpen] = useState(false);
  // click handler to open modal
  const openSendMailModal = () => {
    setSendMailModalOpen(true);
  };

  return (
    <>
      <div className={styles.container}>
        {/* cheking whether create mail is clicked or not based on that layout changes */}
        {isCreatingMail ? (
          <div className={styles.cretaeEmailContainer}>
            {/* back button component */}
            <BackButton t={t} />

            <div className={styles.contentContainer}>
              <div className={styles.selectionContainer}>
                {/* component for individual and mass selection */}
                <SenderSelection
                  handleSenderOptionChange={handleSenderOptionChange}
                  senderOptionsActive={senderOptionsActive}
                  setSenderOptionsActive={setSenderOptionsActive}
                  t={t}
                />
                {/* component for audience slelection */}
                <AudienceSelection
                  setAudienceOptionActive={setAudienceOptionActive}
                  audienceOptionActive={audienceOptionActive}
                  t={t}
                />
              </div>
              {/* Send mail button */}
              <button className={styles.goButton} onClick={openSendMailModal}>
                {t.adminDashboard.emailSection.goButtonText} !!
              </button>
            </div>
          </div>
        ) : (
          //create mail button
          <div className={styles.createEmailButtonContainer}>
            <button
              className={styles.createMailButton}
              onClick={() => setIsCreatingMail(true)}
            >
              + {t.adminDashboard.emailSection.createEmailButtonText}
            </button>
          </div>
        )}
      </div>
      {/* send mail modal */}
      {sendMailModalOpen && (
        <SendMailModal closeModal={() => setSendMailModalOpen(false)} />
      )}
    </>
  );
};

export default CreateEmail;
