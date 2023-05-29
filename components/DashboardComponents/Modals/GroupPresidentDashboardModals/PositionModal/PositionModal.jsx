import React from "react";
import styles from "../../../../../styles/DeleteAccountModal.module.css";
import Image from "next/image";
import { useState } from "react";
import Position from "./Position";
import { availablePositions } from "./staticData";
import { useMail } from "../../../../../context/MailContext";

const PositionModal = ({ user, closeModal, t }) => {
  // send mail function to send mail
  const { sendEmail } = useMail();
  {
    /*state for changing  the postion*/
  }
  const [positions, setPositions] = useState({
    SeniorLineController: true,
  });
  const [mailSent, setMailSent] = useState(false);
  const [disableApplyButton, setDisableApplyButton] = useState(false);
  {
    /*Function for changing the state*/
  }
  const handleRadioChange = (name, value) => {
    setPositions({ ...positions, [name]: value });
  };

  // handle apply button click
  const handleApply = (e) => {
    e.preventDefault();
    setDisableApplyButton(true);
    const templateParams = {
      ...user,
      fullName: user?.firstName + " " + user?.lastName,
      positionsApplying: Object.keys(positions),
    };

    sendEmail("CONTACT", templateParams)
      .then(function (success) {
        if (success) {
          setMailSent(true);
          setTimeout(() => {
            closeModal();
          }, 2500);
        }
        setDisableApplyButton(false);
      })
      .catch((err) => {
        console.log(err);
        setDisableApplyButton(false);
      });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.positionModalContainer}>
          <div className={styles.closeDeleteModalImage}>
            <Image
              src="/closeRed.png"
              alt="cross"
              height="24px"
              width="24px"
              objectFit="contain"
              onClick={closeModal}
            />
          </div>
          {mailSent ? (
            <span className={styles.volunteerApplyMailSent}>
              {t?.volunteerPositionModal?.mailSentText}
            </span>
          ) : (
            <>
              <p className={styles.headerText}>
                {t?.volunteerPositionModal?.headerText}
              </p>
              <div className={styles.formContainer}>
                {/* Options for changing the position */}
                <div className={styles.checkboxContainer}>
                  {availablePositions.map((position, index) => (
                    // Custom Component for Positions
                    <Position
                      key={position.key}
                      name={position.key}
                      positionText={
                        t?.volunteerPositionModal?.positions?.[index]
                      }
                      handleRadioChange={handleRadioChange}
                      isChecked={positions?.[position.key]}
                    />
                  ))}
                </div>
                {/* button to apply for the position of volunteer */}
                <div className={styles.flexRow}>
                  <button
                    onClick={closeModal}
                    className={styles.CancelButton}
                    style={{ marginBottom: "1em" }}
                  >
                    {t?.volunteerPositionModal?.cancelText}
                  </button>
                  <button
                    onClick={handleApply}
                    style={{ marginBottom: "1em" }}
                    className={styles.SubmitButton}
                    disabled={disableApplyButton}
                  >
                    {t?.volunteerPositionModal?.applyText}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PositionModal;
