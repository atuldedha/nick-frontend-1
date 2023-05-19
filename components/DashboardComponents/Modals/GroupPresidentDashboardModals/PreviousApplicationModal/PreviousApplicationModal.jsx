import Image from "next/image";
import React from "react";
import styles from "../../../../../styles/PreviousApplicationModal.module.css";

// Previous Application Modal component
const PreviousApplicationModal = ({ closeModal, groupTitle, groupInfo }) => {
  return (
    <div className={styles.container}>
      <div className={styles.modalContainer}>
        <div className={styles.closeDeleteModalImage}>
          <Image
            src="/closeRed.png"
            alt="cross"
            height="34px"
            width="34px"
            objectFit="contain"
            onClick={closeModal}
          />
        </div>
        <span className={styles.headerText}>Previous Application for 2021</span>
        <div className={styles.flexRow}>
          <div className={styles.flexCol}>
            <span className={styles.groupTitle}>{groupTitle}</span>
            <span className={styles.groupInfo}>{groupInfo}</span>
          </div>
          <button className={styles.button}>View</button>
        </div>
      </div>
    </div>
  );
};

export default PreviousApplicationModal;
