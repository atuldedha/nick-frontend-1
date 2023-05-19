import Image from "next/image";
import React from "react";
import styles from "../../../../styles/MailsList.module.css";
import DeleteIcon from "../../../../public/deleteRed.png";
import CheckIcon from "../../../../public/checkRed.png";

// Header Compoent for listing of all received applications
const ApplicationListHeader = ({
  openDeleteModal,
  allMailsCheck,
  setAllMailsCheck,
  smallStatus,
}) => {
  return (
    <>
      <div className={`${styles.bigCheckboxContainer} ${styles.smallWidth}`}>
        {/* big checkbox */}
        <div
          className={styles.bigCheckbox}
          onClick={() => setAllMailsCheck((prev) => !prev)}
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
      <span
        className={`${styles.status} ${styles.applicationListHeaderStatus} ${
          smallStatus == false ? "" : styles.smallStatus
        }`}
      >
        Status
      </span>
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

export default ApplicationListHeader;
