import React from "react";
import styles from "../../../../../styles/DeleteAccountModal.module.css";
import Image from "next/image";
import { useState } from "react";
import Position from "./Position";
import { availablePositions } from "./staticData";

const PositionModal = ({ closeModal }) => {
  {
    /*state for changing  the postion*/
  }
  const [positions, setPositions] = useState({
    SeniorLineController: true,
  });
  {
    /*Function for changing the state*/
  }
  const handleRadioChange = (name, value) => {
    setPositions({ ...positions, [name]: value });
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.positionModalContainer}>
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
          <p className={styles.headerText}>
            Which Postition you would like to be in?
          </p>
          <div className={styles.formContainer}>
            {/*Options for changing the position*/}
            <div className={styles.checkboxContainer}>
              {availablePositions.map((position) => (
                // Custom Component for Positions
                <Position
                  key={position.key}
                  name={position.key}
                  positionText={position.value}
                  handleRadioChange={handleRadioChange}
                  isChecked={positions?.[position.key]}
                />
              ))}
            </div>
            {/* button to apply for the position of volunteer */}
            <div className={styles.flexRow}>
              <button onClick={closeModal} className={styles.CancelButton}>
                Cancel
              </button>
              <button onClick={closeModal} className={styles.SubmitButton}>
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PositionModal;
