import React from "react";
import Image from "next/image";
import ApplicationInput from "../../../ViewApplicationModal/ApplicationForm/ApplicationInput/ApplicationInput";
import styles from "../../../../../../styles/DeleteAccountModal.module.css";
const DeleteAccountModal = ({ closeModal, formData }) => {
  return (
    <div className={styles.container}>
      <div className={styles.modalContainer}>
        <div className={styles.closeDeleteModalImage}>
          <Image
            src="/closeRed.png"
            alt="cross"
            height="28px"
            width="28px"
            objectFit="contain"
            onClick={closeModal}
          />
        </div>
        <span className={styles.headerText}>
          In order to delete your account please contact your secreatary
        </span>
        <div className={styles.formContainer} style={{ paddingBottom: "5rem" }}>
          <div className={styles.inputContainer}>
            {/* custom input component */}
            <ApplicationInput
              name="secretaryName"
              placeholder="Person"
              value={formData?.Name || ""}
            />
            {/* custom input component */}
            <ApplicationInput
              name="secretaryEmail"
              placeholder="Email"
              value={formData?.email || ""}
            />
            {/* custom input component */}
            <ApplicationInput
              name="secretaryPhone"
              placeholder="Phone"
              value={formData?.phone || ""}
            />
          </div>
          {/* button to add new volunteer */}
          {/* <button className={styles.ContactButton}>Contact</button> */}
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
