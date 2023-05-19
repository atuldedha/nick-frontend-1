import Image from "next/image";
import React, { useEffect } from "react";
import styles from "../../../../styles/AcceptApplicationModal.module.css";
import ApplicationInput from "../ViewApplicationModal/ApplicationForm/ApplicationInput/ApplicationInput";
// Accept Application Modal Component
const SectionApplicationModal = ({ closeModal,section, setSection, handleClick }) => {
 
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
        <span className={styles.modalTitle} style={{paddingBottom: "2rem"}}>
          What section is this group in?
          
        </span>
        <div style={{padding: "0 3rem"}}>
          <ApplicationInput
              value={section}
              name="groupSection"
              isEditable={true}
              handleChange={(name, value)=>setSection(value)}
              
          />
        </div>

        <button onClick={handleClick} style={{
              display: "block",
              width: "50%",
              margin: "auto",
              padding: "1rem",
              marginBottom: "2rem",
              borderRadius: "2rem",
              color: "white",
              background: "#c70000",
              cursor: "pointer",
              fontSize: "1.1rem"
        }}>
          Accept
        </button>

      </div>
    </div>
  );
};

export default SectionApplicationModal;
