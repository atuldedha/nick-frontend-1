import Image from "next/image";
import React, { useState } from "react";
import { useMail } from "../../../../context/MailContext";
import styles from "../../../../styles/MailCards.module.css";
import CheckIcon from "../../../../public/checkRed.png";

// card to render when group opyion is selected
const IndiGroupEmailCard = ({
  group,
  groups,
  setGroups,
  notShowCheck,
  defaultChecked,
}) => {
  //state to check uncheck a card
  const [checked, setChecked] = useState(defaultChecked);
  //const {groups, setGroups}= useState(GroupContext)
  //handle card check
  const handleCheck = () => {
    let updatedGroups = groups.map((item) => {
      if (item._id === group._id) {
        return { ...item, checked: item?.checked ? false : true };
      } else {
        return item;
      }
    });

    setGroups(updatedGroups);
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

      <span className={`${styles.name} ${styles.groupName}`}>{group.name}</span>

      <span
        className={`${styles.name} ${styles.groupName} ${styles.removeMargin}`}
      >
        {group.contact.fullName}
      </span>

      <span
        className={`${styles.email} ${styles.bigWidth} ${styles.removeMargin}`}
      >
        {group.contact.email}
      </span>

      <span className={`${styles.countryName} ${styles.groupCountryName}`}>
        {group.country}
      </span>
    </div>
  );
};

export default IndiGroupEmailCard;
