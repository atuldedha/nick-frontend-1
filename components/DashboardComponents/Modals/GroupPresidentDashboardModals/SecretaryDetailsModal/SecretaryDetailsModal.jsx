import Image from "next/image";
import React from "react";
import ApplicationInput from "../../ViewApplicationModal/ApplicationForm/ApplicationInput/ApplicationInput";
import styles from "../../../../../styles/AddVolunteerModal.module.css";

// Secretary Details modal component
const SecretaryDetailsModal = ({ formData, closeModal }) => {
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
        <span className={styles.headerText}>Secretary Details</span>
        <div className={styles.formContainer} style={{paddingBottom: "5rem"}}>
          <div className={styles.inputContainer}>
            {/* custom input component */}
            <ApplicationInput
              name="secretaryName"
              placeholder="Person"
              value={formData?.secretaryName || ""}
            />
            {/* custom input component */}
            <ApplicationInput
              name="secretaryEmail"
              placeholder="Email"
              value={formData?.secretaryEmail || ""}
            />
            {/* custom input component */}
            <ApplicationInput
              name="secretaryPhone"
              placeholder="Phone"
              value={formData?.secretaryPhone || ""}
            />
          </div>
          {/* button to add new volunteer */}
        </div>
      </div>
    </div>
  );
};

export default SecretaryDetailsModal;
