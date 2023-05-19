import Image from "next/image";
import React from "react";
import styles from "../../../../styles/MailsList.module.css";
import DeleteIcon from "../../../../public/deleteRed.png";
import CheckIcon from "../../../../public/checkRed.png";

const ReceivedHeader = ({
  setAllMailsCheck,
  allMailsCheck,
  list,
  setList,
  openDeleteModal,
}) => {
  function checkAll() {
    setList(
      list.map((item) => {
        return { ...item, checked: allMailsCheck };
      })
    );
    setAllMailsCheck(!allMailsCheck);
  }
  return (
    <>
      <div className={styles.bigCheckboxContainer}>
        <div className={styles.bigCheckbox} onClick={checkAll}>
          {allMailsCheck && (
            <Image
              src={CheckIcon}
              alt="check"
              width="18px"
              height="18px"
              objectFit="contain"
            />
          )}
        </div>
      </div>

      <span className={styles.person}>Person</span>
      <span className={styles.status}>Email</span>
      <div className={styles.headerDeleteIcon}>
        <Image
          src={DeleteIcon}
          alt="delete"
          width="23px"
          height="28px"
          objectFit="contain"
          onClick={openDeleteModal}
        />
      </div>
    </>
  );
};

export default ReceivedHeader;
