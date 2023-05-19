import React, { useEffect, useState } from "react";
import styles from "../../../../styles/MailCards.module.css";
import CheckIcon from "../../../../public/checkRed.png";
import Image from "next/image";
import ReadEmailModal from "../../Modals/ReadEmailModal";
import { useMail } from "../../../../context/MailContext";

//card to render when showing received emails
const EmailCard = ({ data, receivedEmails, setReceivedEmails }) => {
  //state to check and uncheck a particular card
  const [checked, setChecked] = useState(false);
  //state to open and close reading modal
  const [openModal, setOpenModal] = useState(false);

  const { allMailsCheck, setAllMails, allMails } = useMail();

  // to check whether all cards should be selected on the basis of header checkbox
  useEffect(() => {
    if (allMailsCheck) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [allMailsCheck]);

  // handler to make a check field iin the data object to specify which cards are checked
  const handleCheck = () => {
    let updatedMails = receivedEmails.map((item) => {
      if (item.id === data.id) {
        return { ...item, checked: item?.checked ? false : true };
      } else {
        return item;
      }
    });

    setReceivedEmails(updatedMails);
  };

  return (
    <>
      <div className={styles.mailCard}>
        {/* small checkbox */}
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

        <span className={styles.name} style={{ overflowWrap: "anywhere" }}>
          {data.name}
        </span>
        <span
          className={styles.messageBody}
          style={{
            width: "30%",
            marginRight: "10px",
            overflowWrap: "anywhere",
          }}
        >
          {data.messageBody.length > 40
            ? data.messageBody.slice(0, 40) + "..."
            : data.messageBody}
        </span>
        <span
          className={styles.email}
          style={{
            width: "50%",
            marginRight: "20px",
            overflowWrap: "break-word",
          }}
        >
          from: {data.from}
        </span>
        {/* button to open read email modal */}
        <div className={styles.readButtonContainer}>
          <button
            className={styles.readButton}
            onClick={() => setOpenModal(true)}
          >
            Read
          </button>
        </div>
      </div>
      {/* Read email modal */}
      {openModal && (
        <ReadEmailModal
          data={data}
          closeModal={() => setOpenModal(false)}
          mailType="RECEIVED"
        />
      )}
    </>
  );
};

export default EmailCard;
