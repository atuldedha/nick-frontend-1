import React, { useContext, useEffect, useState } from "react";
import styles from "../../../../../../styles/DeleteAccountModal.module.css";
import ApplicationInput from "../../../ViewApplicationModal/ApplicationForm/ApplicationInput/ApplicationInput";
import Image from "next/image";
import AuthContext from "../../../../../../context/AuthContext";
import GroupContext from "../../../../../../context/GroupContext";

const ChangeContactModal = ({ formData, closeModal, changeSucessfull }) => {
  const { token, user, setToken, getToken } = useContext(AuthContext);
  const { findGroup, handleChangeContact } = useContext(GroupContext);

  const [secondaryContact, setSecondaryContact] = useState(null);
  useEffect(function () {
    (async () => {
      const group = await findGroup(user.group._id);
      if (!group.mainContact) group.mainContact = "groupPresident";
      const _secondaryContact = group.members.find(
        (m) =>
          (m.role == "groupPresident" || m.role == "groupVicePresident") &&
          m.role != group.mainContact
      );
      setSecondaryContact(_secondaryContact);
    })();
  }, []);

  function handleMainContactChange() {
    handleChangeContact(secondaryContact.role, user.group._id).then(function (
      response
    ) {
      if (!response.token) return console.log(response);
      localStorage.setItem("authToken", response.token);
      setToken(response.token);
      changeSucessfull();
    });
  }

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
        <p className={styles.headerText}>
          Are you Sure you want to make Contact <br />
          Number 2 as Contact Number 1?
        </p>
        <div className={styles.formContainer}>
          <div className={styles.inputContainer}>
            {/* custom input component */}
            <ApplicationInput
              name="secretaryName"
              placeholder="Person"
              value={
                secondaryContact?.firstName + " " + secondaryContact?.lastName
              }
            />
            {/* custom input component */}
            <ApplicationInput
              name="secretaryEmail"
              placeholder="Email"
              value={secondaryContact?.email}
            />
            {/* custom input component */}
            <ApplicationInput
              name="secretaryPhone"
              placeholder="Phone"
              value={secondaryContact?.phoneNumber}
            />
          </div>
          {/* button to add new volunteer */}
          <div className={styles.flexRow}>
            <button onClick={closeModal} className={styles.CancelButton}>
              No
            </button>
            <button
              onClick={handleMainContactChange}
              className={styles.SubmitButton}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeContactModal;
