import Image from "next/image";
import React, { useState, useContext } from "react";
import styles from "../../../../../styles/AddVolunteerModal.module.css";
import ApplicationInput from "../../ViewApplicationModal/ApplicationForm/ApplicationInput/ApplicationInput";
import AuthContext from "../../../../../context/AuthContext";
import { useRouter } from "next/router";
import fr from "../../../../../locales/fr";
import en from "../../../../../locales/en";
// AddVolunteerModal component to add a new volunteer
const AddVolunteerModal = ({ closeModal, refetchVolunteers }) => {
  // router for language
  const router = useRouter();
  const { locale } = router;
  // language variable
  const t = locale === "fr" ? fr : en;

  const { error, loading, registerUser } = useContext(AuthContext);

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
        <span className={styles.headerText}>
          {t?.addVolunteer?.addVolunteerText}
        </span>
        <form
          onSubmit={(event) => {
            registerUser(event, false).then((res) => {
              if (res?.error) return;
              closeModal();
              refetchVolunteers();
            });
          }}
          className={styles.formContainer}
        >
          <div className={styles.inputContainer}>
            {/* custom input component */}
            <ApplicationInput
              isEditable={true}
              name="firstName"
              placeholder={t?.addVolunteer?.firstNameText}
              handleChange={() => {}}
            />
            <ApplicationInput
              isEditable={true}
              name="lastName"
              placeholder={t?.addVolunteer?.lastNameText}
              handleChange={() => {}}
            />
            {/* custom input component */}
            <ApplicationInput
              isEditable={true}
              name="email"
              placeholder={t?.addVolunteer?.emailText}
              handleChange={() => {}}
            />
            {/* custom input component */}
            <ApplicationInput
              isEditable={true}
              name="phoneNumber"
              placeholder={t?.addVolunteer?.phoneNumberText}
              handleChange={() => {}}
            />
          </div>
          <div style={{ color: "red", fontSize: "1.5rem" }}>{error}</div>
          {/* button to add new volunteer */}
          <button className={styles.addButton}>
            {loading ? t?.addVolunteer?.addingText : t?.addVolunteer?.addText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVolunteerModal;
