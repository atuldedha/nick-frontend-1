import Image from "next/image";
import React from "react";
import { useMail } from "../../../../context/MailContext";
import styles from "../../../../styles/CreateEmail.module.css";

const AudienceSelection = ({
  audienceOptionActive,
  setAudienceOptionActive,
  t,
}) => {
  const {
    senderOption,
    audienceOption,
    handleIndividualSenderSelection,
    audienceMassOption,
    handleMassSenderSelection,
  } = useMail();

  const translateSelectedOption = () => {
    let translatedOption;
    if (senderOption === "Individual") {
      translatedOption =
        audienceOption === "To someone not on any current list"
          ? t?.adminDashboard?.emailSection?.individualOptions
              ?.individualOption1
          : audienceOption === "A specific group"
          ? t?.adminDashboard?.emailSection?.individualOptions
              ?.individualOption2
          : audienceOption === "A specific volunteer"
          ? t?.adminDashboard?.emailSection?.individualOptions
              ?.individualOption3
          : "";
    } else {
      translatedOption =
        audienceMassOption === "Everyone on the group list"
          ? t?.adminDashboard?.emailSection?.massOptions?.massOption1
          : audienceMassOption === "Everyone on the volunteer list"
          ? t?.adminDashboard?.emailSection?.massOptions?.massOption2
          : audienceMassOption ===
            "Groups registered coming to this year’s parade"
          ? t?.adminDashboard?.emailSection?.massOptions?.massOption3
          : audienceMassOption ===
            "Volunteers registered coming to this year’s parade"
          ? t?.adminDashboard?.emailSection?.massOptions?.massOption4
          : "";
    }

    return translatedOption;
  };

  return (
    <div className={styles.audienceOptionsContainer}>
      <span className={`${styles.senderText} ${styles.senderText2}`}>
        {t.adminDashboard.emailSection.creatingMailText2}
      </span>
      {/* audience selection dropdown */}
      <div
        className={styles.senderInputContainer}
        onClick={() => setAudienceOptionActive(!audienceOptionActive)}
      >
        <div className={styles.audienceInputValue}>
          <span className={styles.selectedOption}>
            {translateSelectedOption()}
          </span>
          <Image
            src="/chevDown.png"
            alt="down"
            width="10px"
            height="7px"
            objectFit="contain"
          />
        </div>

        {audienceOptionActive &&
          // audience selection dropdown options and click handles
          (senderOption === "Individual" ? (
            <div className={styles.audienceInputOption}>
              <div
                className={styles.senderInputOptionName}
                onClick={() =>
                  handleIndividualSenderSelection(
                    "To someone not on any current list"
                  )
                }
              >
                <div className={styles.circleContainer}>
                  <span className={styles.circle} />
                </div>
                <span className={styles.optionText}>
                  {
                    t.adminDashboard.emailSection.individualOptions
                      .individualOption1
                  }
                </span>
              </div>
              <div
                className={styles.senderInputOptionName}
                onClick={() =>
                  handleIndividualSenderSelection("A specific group")
                }
              >
                <div className={styles.circleContainer}>
                  <span className={styles.circle} />
                </div>
                <span className={styles.optionText}>
                  {
                    t.adminDashboard.emailSection.individualOptions
                      .individualOption2
                  }
                </span>
              </div>
              <div
                className={styles.senderInputOptionName}
                onClick={() =>
                  handleIndividualSenderSelection("A specific volunteer")
                }
              >
                <div className={styles.circleContainer}>
                  <span className={styles.circle} />
                </div>
                <span className={styles.optionText}>
                  {
                    t.adminDashboard.emailSection.individualOptions
                      .individualOption3
                  }
                </span>
              </div>
            </div>
          ) : (
            <div className={styles.audienceInputOptionMass}>
              <div
                className={styles.senderInputOptionName}
                onClick={() =>
                  handleMassSenderSelection("Everyone on the group list")
                }
              >
                <div className={styles.circleContainer}>
                  <span className={styles.circle} />
                </div>
                <span className={styles.optionText}>
                  {t.adminDashboard.emailSection.massOptions.massOption1}
                </span>
              </div>
              <div
                className={styles.senderInputOptionName}
                onClick={() =>
                  handleMassSenderSelection("Everyone on the volunteer list")
                }
              >
                <div className={styles.circleContainer}>
                  <span className={styles.circle} />
                </div>
                <span className={styles.optionText}>
                  {t.adminDashboard.emailSection.massOptions.massOption2}
                </span>
              </div>
              <div
                className={styles.senderInputOptionName}
                onClick={() =>
                  handleMassSenderSelection(
                    "Groups registered coming to this year’s parade"
                  )
                }
              >
                <div className={styles.circleContainer}>
                  <span className={styles.circle} />
                </div>
                <span className={styles.optionText}>
                  {t.adminDashboard.emailSection.massOptions.massOption3}
                </span>
              </div>
              <div
                className={styles.senderInputOptionName}
                onClick={() =>
                  handleMassSenderSelection(
                    "Volunteers registered coming to this year’s parade"
                  )
                }
              >
                <div className={styles.circleContainer}>
                  <span className={styles.circle} />
                </div>
                <span className={styles.optionText}>
                  {t.adminDashboard.emailSection.massOptions.massOption4}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AudienceSelection;
