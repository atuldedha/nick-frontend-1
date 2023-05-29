import Image from "next/image";
import React from "react";
import styles from "../../../styles/ReadEmailModal.module.css";
import { useRouter } from "next/router";
import fr from "../../../locales/fr";
import en from "../../../locales/en";

// delete confirmation modal
const DeleteModal = ({
  closeModal,
  handleDelete,
  deleting,
  btnsDisabled,
  loading,
}) => {
  const router = useRouter();
  const { locale } = router;
  // language variable
  const t = locale === "fr" ? fr : en;

  const handleClick = () => {
    handleDelete();
    closeModal();
  };
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
            {t?.deleteModal?.text} <b>{t?.deleteModal?.boldText}</b>{" "}
            {t?.deleteModal?.selectedText} {deleting}?
          </span>
          <div className={styles.deleteButtonContainer}>
            <button
              className={styles.noButton}
              onClick={closeModal}
              disabled={btnsDisabled}
            >
              {t?.deleteModal?.noButtonText}
            </button>
            <button
              className={styles.yesButton}
              onClick={handleClick}
              disabled={btnsDisabled}
            >
              {loading
                ? t?.deleteModal?.deletingText
                : t?.deleteModal?.yesButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
