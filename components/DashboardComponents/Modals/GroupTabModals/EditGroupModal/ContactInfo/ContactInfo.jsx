import React, { useState, useEffect } from "react";
import styles from "../../../../../../styles/ContactInfo.module.css";
import EditInput from "../../../VolunteerTabModals/EditVolunteerModal/EditInput/EditInput";
import { useMail } from "../../../../../../context/MailContext";
import axios from "axios";
// Contact Info component
const ContactInfo = ({
  title,
  name,
  handleButtonClick,
  handleChange,
  newData,
  t,
}) => {
  const [firstNameEditable, setFirstNameEditable] = useState(false);
  const [lastNameEditable, setLastNameEditable] = useState(false);
  const [emailEditable, setEmailEditable] = useState(false);
  const [phoneEditable, setPhoneEditable] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { sendEmail, getToken } = useMail();
  const [email, setEmail] = useState(
    newData.members.find((m) => m.role == name)?.email
  );
  const messageTimeout = 3;

  useEffect(
    function () {
      if (error) setTimeout(setError, messageTimeout * 1000);
    },
    [error]
  );

  useEffect(
    function () {
      if (success) setTimeout(setSuccess, messageTimeout * 1000);
    },
    [success]
  );

  function resetPassword() {
    var options = {
      method: "POST",
      url: "/api/user/reset-password-request",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
      data: { email },
    };

    axios
      .request(options)
      .then(function ({ data }) {
        sendEmail("SIMPLE", data).then(function (sent) {
          if (sent) setSuccess("A password reset email has been sent to user.");
          else setError("Something went wrong while sending email. Try again.");
        });
      })
      .catch(function (error) {
        setError("An error occured... " + error.response?.data?.error);
      });
  }
  return (
    <div className={styles.container}>
      <span className={styles.title}>{title}</span>
      <div className={styles.flexRow}>
        {/* show cancel if editing state active */}
        <span
          className={styles.changeText}
          onClick={() => setFirstNameEditable(!firstNameEditable)}
        >
          {firstNameEditable
            ? t?.editGroupModal?.cancelText
            : t?.editGroupModal?.changeText}
        </span>
        <div className={styles.inputCont}>
          {/* custom input component */}
          <EditInput
            isEditable={firstNameEditable}
            name={`${name}:firstName`}
            handleChange={handleChange}
            defaultValue={
              newData.members.find((m) => m.role == name)?.firstName
            }
            handleButtonClick={() => setFirstNameEditable(false)}
          />
        </div>
      </div>

      <div className={styles.flexRow}>
        {/* show cancel if editing state active */}
        <span
          className={styles.changeText}
          onClick={() => setLastNameEditable(!lastNameEditable)}
        >
          {lastNameEditable
            ? t?.editGroupModal?.cancelText
            : t?.editGroupModal?.changeText}
        </span>
        <div className={styles.inputCont}>
          {/* custom input component */}

          <EditInput
            isEditable={lastNameEditable}
            name={`${name}:lastName`}
            handleChange={handleChange}
            defaultValue={newData.members.find((m) => m.role == name)?.lastName}
            handleButtonClick={() => setLastNameEditable(false)}
          />
        </div>
      </div>

      <div className={styles.row1}>
        <div className={styles.row2}>
          {/* show cancel if editing state active */}
          <span
            className={styles.changeText}
            onClick={() => setEmailEditable(!emailEditable)}
          >
            {emailEditable
              ? t?.editGroupModal?.cancelText
              : t?.editGroupModal?.changeText}
          </span>
          <div className={styles.inputCont}>
            {/* custom input component */}
            <EditInput
              isEditable={emailEditable}
              name={`${name}:newEmail`}
              handleChange={(target, value) => {
                handleChange(target, value);
                setEmail(value);
              }}
              defaultValue={newData.members.find((m) => m.role == name)?.email}
              handleButtonClick={() => setEmailEditable(false)}
            />
          </div>
        </div>
        <span
          className={`${styles.changeText} ${styles.marginRight}`}
          onClick={resetPassword}
        >
          Reset Password
        </span>
      </div>
      <div className={styles.flexRow}>
        {/* show cancel if editing state active */}
        <span
          className={styles.changeText}
          onClick={() => setPhoneEditable(!phoneEditable)}
        >
          {phoneEditable
            ? t?.editGroupModal?.cancelText
            : t?.editGroupModal?.changeText}
        </span>
        <div className={styles.inputCont}>
          {/* custom input component */}
          <EditInput
            isEditable={phoneEditable}
            name={`${name}:phone`}
            handleChange={handleChange}
            defaultValue={
              newData.members.find((m) => m.role == name)?.phoneNumber
            }
            handleButtonClick={() => setPhoneEditable(false)}
          />
        </div>
      </div>
      <div style={{ color: "green", fontSize: "1.5rem" }}>{success}</div>
      <div style={{ color: "red", fontSize: "1.5rem" }}>{error}</div>
    </div>
  );
};

export default ContactInfo;
