import React, { useEffect, useState } from "react";
import styles from "../../../../styles/MailCards.module.css";
import CheckIcon from "../../../../public/checkRed.png";
import Image from "next/image";
import ReadEmailModal from "../../Modals/ReadEmailModal";
import { useMail } from "../../../../context/MailContext";

// mail card to render when seeing sent mails
const SentMailCard = ({ 
  data,
  sentEmails,
  setSentEmails
 }) => {
  //state to check uncheck a card
  const [checked, setChecked] = useState(false);
  // state to open and close modal
  const [openModal, setOpenModal] = useState(false);

  const { allMailsCheck} = useMail();

  //to see if all cards to be checked or not
  useEffect(() => {
    if (allMailsCheck) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [allMailsCheck]);

  //handle a single card selections
  const handleCheck = () => {
    let updatedMails = sentEmails.map((item) => {
      if (item.id === data.id) {
        return { ...item, checked: item?.checked ? false : true };
      } else {
        return item;
      }
    });

    setSentEmails(updatedMails);
  };
  return (
    <>
      <div className={styles.mailCard}>
        <div className={styles.smallCheckContainer}>
          <div
            className={styles.smallCheck}
            onClick={() => {
              setChecked((prev) => !prev);
              handleCheck();
            }}
          >
            {checked && (
              <Image
                src={CheckIcon}
                alt="check"
                height=""
                width=""
                objectFit="contain"
              />
            )}
          </div>
        </div>

        <div className={styles.flexColContainer} style={{
          minWidth: "46%"
        }}>
          <span className={`${styles.name} ${styles.sentName}`}>
            {data.name}
          </span>
          <span className={styles.sentMessage}>{data.messageBody}</span>
        </div>

        <div className={styles.flexRowContainer}>
          <Image
            src="/greenCheck.png"
            alt="check"
            width="25px"
            height="25px"
            objectFit="contain"
          />
          <span className={styles.date}>{`Sent ${new Date(data.date).toDateString()}`}</span>
        </div>

        <div
          className={`${styles.readMailContainer} ${styles.readSentMailContainer}`}
        >
          <button
            className={styles.readButton}
            onClick={() => setOpenModal(true)}
          >
            Read
          </button>
        </div>
      </div>
      {/* read send email modal */}
      {openModal && (
        <ReadEmailModal data={data} closeModal={() => setOpenModal(false)} />
      )}
    </>
  );
};

export default SentMailCard;
