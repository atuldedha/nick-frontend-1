import Image from "next/image";
import React from "react";
import styles from "../../../../../styles/EditDialog.module.css";

// Edit Dialog to show menu
const EditDialog = ({ openModal, openDeleteModal }) => {
  return (
    <div className={styles.container}>
      {/* edit option */}
      <div className={styles.optionContainer} onClick={openModal}>
        <Image
          src="/editWhite.png"
          alt="edit"
          height="19px"
          width="19px"
          objectFit="contain"
        />
        <span className={styles.optionText}>Edit</span>
      </div>
      {/* delete option */}
      <div className={styles.optionContainer} onClick={openDeleteModal}>
        <Image
          src="/deleteWhite.png"
          alt="edit"
          height="19px"
          width="19px"
          objectFit="contain"
        />
        <span className={styles.optionText}>Delete</span>
      </div>
    </div>
  );
};

export default EditDialog;
