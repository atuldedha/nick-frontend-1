import Image from "next/image";
import React, { useEffect } from "react";
import styles from "../../../../styles/AcceptApplicationModal.module.css";

// Accept Application Modal Component
const AcceptApplicationModal = ({ closeModal }) => {
  useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 2000);
  }, []);
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
        <span className={styles.modalTitle}>
          Application has been accepted!
         
        </span>
      </div>
    </div>
  );
};

export default AcceptApplicationModal;
