import Image from "next/image";
import React, { useState } from "react";
import { useMail } from "../../../../context/MailContext";
import styles from "../../../../styles/MailCards.module.css";
import CheckIcon from "../../../../public/checkRed.png";

// card to render when group opyion is selected
const IndiVolunteersEmailCard = ({ 
      volunteer, 
      volunteers, 
      setVolunteers, 
      notShowCheck,
      defaultChecked
    }) => {
  const { setAllMails, allMails } = useMail();
  //state to check uncheck a card
  const [checked, setChecked] = useState(defaultChecked);

  //handle card check
  const handleCheck = () => {
    let updatedVolunteers = volunteers.map((item) => {
      if (item._id === volunteer._id) {
        return { ...item, checked: item?.checked ? false : true };
      } else {
        return item;
      }
    });

    setVolunteers(updatedVolunteers);
  };
  return (
    <div className={styles.mailCard}>
      <div className={styles.smallCheckContainer}>
        {!notShowCheck && (
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
        )}
      </div>

      <span className={`${styles.name} ${styles.groupEmail}`}>
        {volunteer.fullName}
      </span>

      <span className={`${styles.email} ${styles.groupEmail}`}>
        {volunteer.email}
      </span>

      {!notShowCheck && 
      <span className={styles.name}>
        {volunteer.phoneNumber}
      </span>}
    </div>
  );
};

export default IndiVolunteersEmailCard;
