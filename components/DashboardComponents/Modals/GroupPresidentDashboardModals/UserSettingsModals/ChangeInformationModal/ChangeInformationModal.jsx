import React from "react";
import ApplicationInput from "../../../ViewApplicationModal/ApplicationForm/ApplicationInput/ApplicationInput";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import styles from "../../../../../../styles/ChangeInformationModal.module.css";
import AuthContext from "../../../../../../context/AuthContext";
const ChangeInformationModal = ({ data, closeModal }) => {
  const [newData, setNewData] = useState(data);
  const [nameEditable, setNameEditable] = useState(false);
  //   editing state active or not for email input
  const [emailEditable, setEmailEditable] = useState(false);
  //   editing state active or not for phone input
  const [phoneEditable, setPhoneEditable] = useState(false);

  const { updateUser, loading } = useContext(AuthContext);

  const handleChange = (target, value) => {
    setNewData({ ...newData, [target]: value });
  };
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
        <span className={styles.headerText}>Change Information</span>

        <div className={styles.flexRow}>
          {/* show cancel if editing state active */}
          <span
            className={styles.changeText}
            onClick={() => setNameEditable(!nameEditable)}
          >
            {nameEditable ? "cancel" : "change"}
          </span>
          <div className={styles.inputCont}>
            {/* custom input component */}
            <ApplicationInput
              isEditable={nameEditable}
              name="Name"
              handleChange={handleChange}
              value={newData?.Name}
            />
          </div>
        </div>
        <div className={styles.row1}>
          {/* show cancel if editing state active */}
          <div className={styles.row2}>
            <span
              className={styles.changeText}
              onClick={() => setEmailEditable(!emailEditable)}
            >
              {emailEditable ? "cancel" : "change"}
            </span>

            <div className={styles.inputCont}>
              {/* custom input component */}
              <ApplicationInput
                isEditable={emailEditable}
                name="newEmail"
                handleChange={handleChange}
                value={newData?.newEmail || newData?.email}
              />
            </div>
          </div>
          <span className={styles.changeText}>Reset Password</span>
        </div>
        <div className={styles.flexRow}>
          {/* show cancel if editing state active */}
          <span
            className={styles.changeText}
            onClick={() => setPhoneEditable(!phoneEditable)}
          >
            {phoneEditable ? "cancel" : "change"}
          </span>
          <div className={styles.inputCont}>
            {/* custom input component */}
            <ApplicationInput
              isEditable={phoneEditable}
              name="phoneNumber"
              handleChange={handleChange}
              value={newData?.phoneNumber || newData?.phone}
            />
          </div>
        </div>
        <button
          className={`${styles.inputCont} ${styles.addButton}`}
          onClick={() => {
            newData.email = data.email;
            console.log(newData);
            updateUser(null, true, newData).then((res) => {
              closeModal();
            });
          }}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default ChangeInformationModal;
