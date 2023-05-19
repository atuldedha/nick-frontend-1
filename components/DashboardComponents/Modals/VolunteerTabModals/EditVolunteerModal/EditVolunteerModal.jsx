import Image from "next/image";
import React, { useContext, useState, useEffect } from "react";
import styles from "../../../../../styles/EditVolunteerModal.module.css";
import VolunteerInputDropdown from "../../../Volunteers/VolunteerInputDropdown/VolunteerInputDropdown";
import ApplicationInput from "../../ViewApplicationModal/ApplicationForm/ApplicationInput/ApplicationInput";
import AuthContext from "../../../../../context/AuthContext";
import VolunteersContext from "../../../../../context/VolunteersContext";
// EditVolunteer Component to edit existing volunteer
const dropdownValues = [
  {
    text: "Grant Walkie Talkie Access",
    value: true,
  },
  {
    text: "Deny Walkie Talkie Access",
    value: false,
  },
];
const EditVolunteerModal = ({ closeModal, data, setData }) => {
  const [walkieTalkieAccess, setWalkieTalkieAcess] = useState();

  //   editing state active or not for first name input
  const [fisrtNameEditable, setFristNameEditable] = useState(false);

  //   editing state active or not for last name input
  const [lastNameEditable, setLastNameEditable] = useState(false);

  //   editing state active or not for email input
  const [emailEditable, setEmailEditable] = useState(false);
  //   editing state active or not for phone input
  const [phoneEditable, setPhoneEditable] = useState(false);

  //   dropdown position handler function
  const handleSelect = (text) => {
    let value = dropdownValues.find((v) => v.text == text).value;
    setWalkieTalkieAcess(value);
  };

  const { loading, error, updateUser } = useContext(AuthContext);
  const { refetchVolunteers } = useContext(VolunteersContext);

  useEffect(function () {
    setWalkieTalkieAcess(data.walkieTalkieAccess);
  }, []);

  return (
    <div className={styles.container}>
      <form
        onSubmit={(event) => {
          updateUser(event, false).then(function (res) {
            if (res?.error) return;
            closeModal();
            refetchVolunteers();
          });
        }}
        className={styles.modalContainer}
      >
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
        <span className={styles.headerText}>Edit Volunteer</span>

        <div className={styles.flexRow}>
          {/* show cancel if editing state active */}
          <span
            className={styles.changeText}
            onClick={() => setFristNameEditable(!fisrtNameEditable)}
          >
            {fisrtNameEditable ? "cancel" : "change"}
          </span>
          <div className={styles.inputCont}>
            {/* custom input component */}
            <ApplicationInput
              isEditable={fisrtNameEditable}
              name="firstName"
              defaultValue={data?.firstName}
              handleChange={() => {}}
            />
          </div>
        </div>

        <div className={styles.flexRow}>
          {/* show cancel if editing state active */}
          <span
            className={styles.changeText}
            onClick={() => setLastNameEditable(!lastNameEditable)}
          >
            {lastNameEditable ? "cancel" : "change"}
          </span>
          <div className={styles.inputCont}>
            {/* custom input component */}
            <ApplicationInput
              isEditable={lastNameEditable}
              name="lastName"
              defaultValue={data?.lastName}
              handleChange={() => {}}
            />
          </div>
        </div>

        {
          /* old email hidden field */
          emailEditable && (
            <input
              hidden={true}
              name="email"
              value={data?.email}
              readOnly={true}
            />
          )
        }
        <input
          hidden={true}
          name="walkieTalkieAccess"
          value={walkieTalkieAccess}
          readOnly={true}
        />

        <div className={styles.flexRow}>
          {/* show cancel if editing state active */}
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
              name={emailEditable ? "newEmail" : "email"}
              defaultValue={data?.email}
              handleChange={() => {}}
            />
          </div>
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
              defaultValue={data?.phoneNumber}
              handleChange={() => {}}
            />
          </div>
        </div>

        <div className={`${styles.inputCont} ${styles.margin}`}>
          {/* custom dropdown component */}
          <VolunteerInputDropdown
            values={dropdownValues.map((v) => v.text)}
            handleSelect={handleSelect}
            selected={
              dropdownValues.find((v) => v.value == Boolean(walkieTalkieAccess))
                .text
            }
          />
        </div>
        <div style={{ color: "red", fontSize: "1.5rem" }}>{error}</div>
        <button className={`${styles.inputCont} ${styles.addButton}`}>
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default EditVolunteerModal;
