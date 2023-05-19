import Image from "next/image";
import React from "react";
import { useMail } from "../../../../context/MailContext";
import styles from "../../../../styles/CreateEmail.module.css";

const SenderSelection = ({
  senderOptionsActive,
  handleSenderOptionChange,
  setSenderOptionsActive,
  t,
}) => {
  const { senderOption } = useMail();
  return (
    <div className={styles.emailOptionsContainer}>
      <span className={styles.senderText}>
        {t.adminDashboard.emailSection.creatingMailText1}
      </span>
      {/* dropdown for selection of individual or mass */}
      <div
        className={styles.senderInputContainer}
        onClick={() => setSenderOptionsActive(!senderOptionsActive)}
      >
        <div className={styles.senderInputValue}>
          <span className={styles.selectedOption}>{senderOption}</span>
          <Image
            src="/chevDown.png"
            alt="down"
            width="10px"
            height="7px"
            objectFit="contain"
          />
        </div>

        {senderOptionsActive && (
          // dropdown options and click handlers
          <div className={styles.senderInputOptions}>
            <div
              className={styles.senderInputOptionName}
              onClick={() => handleSenderOptionChange("Individual")}
            >
              <div className={styles.circleContainer}>
                <span className={styles.circle} />
              </div>
              <span className={styles.optionText}>
                {t.adminDashboard.emailSection.individual}
              </span>
            </div>
            <div
              className={styles.senderInputOptionName}
              onClick={() => handleSenderOptionChange("Mass")}
            >
              <div className={styles.circleContainer}>
                <span className={styles.circle} />
              </div>
              <span className={styles.optionText}>
                {t.adminDashboard.emailSection.mass}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SenderSelection;
