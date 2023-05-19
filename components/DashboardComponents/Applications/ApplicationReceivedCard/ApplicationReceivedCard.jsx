import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../../../../styles/MailCards.module.css";
import CheckIcon from "../../../../public/checkRed.png";
import ReadButton from "../../MailSection/MailCards/ReadButton";
import ViewApplicationModal from "../../Modals/ViewApplicationModal/ViewApplicationModal";

// Individual Application Component
const ApplicationReceivedCard = ({
  data,
  allCheck,
  setAllData,
  setOpenAcceptModal,
}) => {
  //state to check uncheck a card
  const [checked, setChecked] = useState();
  // state to open and close modal
  const [openModal, setOpenModal] = useState(false);

  //to see if all cards to be checked or not
  useEffect(() => {
    if (allCheck) {
      setAllData((prev) =>
        prev.map((item) => {
          return { ...item, checked: true };
        })
      );
      setChecked(true);
    } else {
      setAllData((prev) =>
        prev.map((item) => {
          return { ...item, checked: false };
        })
      );
      setChecked(false);
    }
  }, [allCheck, setAllData]);

  //handle a single card selections
  const handleCheck = () => {
    setAllData((prev) =>
      prev.map((item) => {
        if (item.id === data.id) {
          return { ...item, checked: item?.checked ? false : true };
        } else {
          return item;
        }
      })
    );
  };

  // click handler function to open the read application form
  const handleClick = () => {
    setOpenModal(true);
  };
  return (
    <>
      <div className={styles.mailCard}>
        <div className={styles.smallCheckContainer}>
          {/* checkbox */}
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

        <div className={styles.flexColContainer}>
          <span className={`${styles.name} ${styles.sentName}`}>
            {data.name}
          </span>
          <span className={styles.sentMessage}>{data.messageBody}</span>
        </div>

        <div className={styles.flexRowContainer}>
          {/* if application is approved show green tick */}
          {data.status.toUpperCase()=='ACCEPTED' && (
            <Image
              src="/greenCheck.png"
              alt="check"
              width="25px"
              height="25px"
              objectFit="contain"
            />
          )}

          {data.status.toUpperCase()=='REJECTED' && (
            <Image
              src="/rejected.png"
              alt="check"
              width="25px"
              height="25px"
              objectFit="contain"
            />
          )}

          {data.status.toUpperCase()=='TO BE ACCEPTED' && (
            <Image
              src="/pending.png"
              alt="check"
              width="25px"
              height="25px"
              objectFit="contain"
            />
          )}
          <span className={styles.date}>
            { data.status.toUpperCase()=="ACCEPTED" 
                ? `Accepted ${data.acceptDate ? data.acceptDate : ""}` : 
                  data.status.toUpperCase()=="TO BE ACCEPTED"?
                    "to be accepted": `Rejected ${data.rejectDate ? data.rejectDate : "" }`
            }
          </span>
        </div>

        <ReadButton handleClick={handleClick} />
      </div>
      {/* read application */}
      {openModal && (
        <ViewApplicationModal
          data={data}
          closeModal={() => setOpenModal(false)}
          setAllData={setAllData}
          openAcceptModal={() => setOpenAcceptModal(true)}
        />
      )}
    </>
  );
};

export default ApplicationReceivedCard;
