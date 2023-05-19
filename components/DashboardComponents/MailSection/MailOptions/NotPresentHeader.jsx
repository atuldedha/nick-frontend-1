import Image from "next/image";
import React from "react";
import styles from "../../../../styles/MailsList.module.css";
import DeleteIcon from "../../../../public/deleteRed.png";
import CheckIcon from "../../../../public/checkRed.png";
import { useMail } from "../../../../context/MailContext";

// header to show when sending "to someone not on any current list" option is selected
const NotPresentHeader = ({ openDeleteModal, list, setList }) => {
  // state to check and uncheck all cards inside "to someone not on any current list" option
  const { allMailsCheck, setAllMailsCheck } = useMail(false);
  function checkAll(){
    setList(list.map(item=>{ return {...item, checked: allMailsCheck}}))
    setAllMailsCheck(!allMailsCheck);
  
  }
  
  return (
    <>
      <div className={`${styles.bigCheckboxContainer} ${styles.smallWidth}`}>
        {/* big checkbox */}
        <div
          className={styles.bigCheckbox}
          onClick={checkAll}
        >
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
      {/* title */}
      <span className={`${styles.title} ${styles.person}`}>Title</span>
      {/* status */}
      <span className={`${styles.status} ${styles.smallStatus}`}>Status</span>
      {/* delete icon to delete selected mail */}
      <div className={styles.alignEnd}>
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

export default NotPresentHeader;
