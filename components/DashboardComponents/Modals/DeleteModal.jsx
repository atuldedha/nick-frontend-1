import Image from "next/image";
import React from "react";
import styles from "../../../styles/ReadEmailModal.module.css";

// delete confirmation modal
const DeleteModal = ({ closeModal, handleDelete, deleting, btnsDisabled, loading }) => {
 const handleClick=()=>{
  handleDelete()
  closeModal()
 }
  return (
    <div className={styles.container}>
      <div className={styles.modalContainer}>
        <div className={styles.closeDeleteModalImage}>
          <Image
            src="/closeBlack.png"
            alt="cross"
            height="21px"
            width="19px"
            objectFit="contain"
            onClick={closeModal}
          />
        </div>
        <div className={styles.deleteTextContainer}>
          <span className={styles.deleteText}>
            Are you sure you want to delete <b>ALL</b> selected {deleting}?
          </span>
          <div className={styles.deleteButtonContainer}>
            <button className={styles.noButton} onClick={closeModal} disabled={btnsDisabled}>
              No
            </button>
            <button className={styles.yesButton} onClick={handleClick} disabled={btnsDisabled}>
              {loading? "Deleting..." : "Yes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
