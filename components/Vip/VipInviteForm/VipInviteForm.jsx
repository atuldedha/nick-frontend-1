import React from "react";
import styles from "../../../styles/VipInvite.module.css";
import VipInput from "../VipInput";
import { useState } from "react";
import { useMail } from "../../../context/MailContext";
import Image from "next/image";
const VipInviteForm = ({ t }) => {
  // send mail function
  const { sendEmail } = useMail();
  // data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    role: "",
    extra: "No",
    extraName: "",
    extraEmail: "",
    extraPhone: "",
    extraOrganization: "",
    extraRole: "",
  });

  const [butttonDisable, setButtonDisable] = useState(false);
  // mail sent state
  const [mailSent, setMailSent] = useState(false);

  // input change
  const handleChange = (name, value) => {
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  // checkbox change
  const handleRadioChange = (e) => {
    setFormData((formData) => ({ ...formData, extra: e.target.value }));
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonDisable(true);
    const templateParams = { ...formData };
    sendEmail("CONTACT", templateParams, e)
      .then(function (success) {
        if (success) {
          setMailSent(true);
          setFormData({
            name: "",
            email: "",
            phone: "",
            organization: "",
            role: "",
            extra: "No",
            extraName: "",
            extraEmail: "",
            extraPhone: "",
            extraOrganization: "",
            extraRole: "",
          });
        } else {
          setButtonDisable(false);
          setMailSent(false);
        }
      })
      .catch((err) => {
        setButtonDisable(false);
        setMailSent(false);
        console.log(err);
      });
  };

  return (
    <>
      {mailSent ? (
        <div className={styles.emailSendContainer}>
          <div className={styles.doneImage}>
            <Image
              src="/done.svg"
              alt="doneIcon"
              width="100%"
              height="100%"
              objectFit="contain"
            />
          </div>
          <span className={styles.emailSentText}>
            {t?.vipInvite?.vipForm?.mailSentText}
          </span>
        </div>
      ) : (
        <div className={styles.formContainer}>
          <form>
            <div className={styles.formGroup}>
              <span>{t?.vipInvite?.vipForm?.vipNameText}</span>
              <VipInput
                value={formData.name}
                handleChange={handleChange}
                name="name"
              />
            </div>
            <div className={styles.flexRow}>
              <div className={styles.formGroup}>
                <span>{t?.vipInvite?.vipForm?.phoneText}</span>
                <VipInput
                  value={formData.phone}
                  handleChange={handleChange}
                  name="phone"
                />
              </div>
              <div className={styles.formGroup}>
                <span>{t?.vipInvite?.vipForm?.emailText}</span>
                <VipInput
                  value={formData.email}
                  handleChange={handleChange}
                  name="email"
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <span>{t?.vipInvite?.vipForm?.organizationNameText}</span>
              <VipInput
                value={formData.organization}
                handleChange={handleChange}
                name="organization"
              />
            </div>

            <div className={styles.formGroup}>
              <span>{t?.vipInvite?.vipForm?.roleInOrganizationText}</span>
              <VipInput
                value={formData.role}
                handleChange={handleChange}
                name="role"
              />
            </div>
            <div className={styles.formGroup}>
              <span>{t?.vipInvite?.vipForm?.bringSomeoneText}</span>
              <div className={styles.checkboxContainer}>
                <label className={styles.checkInput}>
                  Yes
                  <input
                    type="radio"
                    checked={formData.extra === "Yes"}
                    name="ExtraVIP"
                    value={"Yes"}
                    onChange={handleRadioChange}
                  />
                  <span className={styles.checkmark}></span>
                </label>
                <label className={styles.checkInput}>
                  No
                  <input
                    type="radio"
                    checked={formData.extra === "No"}
                    name="ExtraVIP"
                    value={"No"}
                    onChange={handleRadioChange}
                  />
                  <span className={styles.checkmark}></span>
                </label>
              </div>
            </div>
            {formData.extra == "Yes" ? (
              <div>
                <div className={styles.formGroup}>
                  <span>{t?.vipInvite?.vipForm?.vipNameText}</span>
                  <VipInput
                    value={formData.extraName}
                    handleChange={handleChange}
                    name="extraName"
                  />
                </div>
                <div className={styles.flexRow}>
                  <div className={styles.formGroup}>
                    <span>{t?.vipInvite?.vipForm?.phoneText}r</span>
                    <VipInput
                      value={formData.extraPhone}
                      handleChange={handleChange}
                      name="extraPhone"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <span>{t?.vipInvite?.vipForm?.emailText}</span>
                    <VipInput
                      value={formData.extraEmail}
                      handleChange={handleChange}
                      name="extraEmail"
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <span>{t?.vipInvite?.vipForm?.organizationNameText}</span>
                  <VipInput
                    value={formData.extraOrganization}
                    handleChange={handleChange}
                    name="extraOrganization"
                  />
                </div>

                <div className={styles.formGroup}>
                  <span>{t?.vipInvite?.vipForm?.roleInOrganizationText}</span>
                  <VipInput
                    value={formData.extraRole}
                    handleChange={handleChange}
                    name="extraRole"
                  />
                </div>
              </div>
            ) : (
              <div></div>
            )}
            <div className={styles.buttonContainer}>
              <button
                className={styles.SubmitButton}
                onClick={handleSubmit}
                disabled={butttonDisable}
              >
                {t?.vipInvite?.vipForm?.submitText}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default VipInviteForm;
