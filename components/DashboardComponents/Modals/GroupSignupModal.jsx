import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../../styles/GroupSignupModal.module.css";
import AuthContext from "../../../context/AuthContext";

// modal for signup as a group
const GroupSignupModal = ({ closeModal, t, usedInAdminDashboard = false }) => {
  const [countryRepresentative, setCountryRepresentative] = useState(false);
  const { error, loading, registerGroup } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <div className={styles.modalContainer}>
        <div className={styles.closeImage}>
          <Image
            src="/close.png"
            alt="close"
            width="20px"
            height="20px"
            objectFit="contain"
            onClick={closeModal}
          />
        </div>

        {/* form container */}
        <div className={styles.formContainer}>
          <Image
            src="/logo.svg"
            alt="logo"
            width="250px"
            height="130px"
            objectFit="contain"
          />

          <span className={styles.formHeading}>
            {t.signupModal.groupSignupTitle}
          </span>

          <form onSubmit={registerGroup}>
            <input
              className={styles.groupNameInput}
              required={true}
              name="groupName"
              placeholder={t.signupModal.form.groupName}
            />
            {/* President */}
            <label htmlFor="president">Contact 1</label>
            <div id="president" className={styles.inputContainer}>
              <input
                placeholder={t.signupModal.form.firstName}
                required={true}
                name="president:firstName"
                className={styles.formInput}
              />
              <input
                placeholder={t.signupModal.form.lastName}
                name="president:lastName"
                className={`${styles.formInput} ${styles.leftMargin}`}
              />
              <input
                hidden={true}
                readOnly={true}
                placeholder={t.signupModal.form.role}
                name="president:role"
                value="groupPresident"
                className={`${styles.formInput} ${styles.leftMargin}`}
              />
            </div>
            <input
              required={true}
              placeholder={t.signupModal.form.email}
              name="president:email"
              className={`${styles.formInput} ${styles.bottomMargin}`}
            />
            <input
              required={true}
              placeholder={t.signupModal.form.phoneNumber}
              name="president:phone"
              className={`${styles.formInput} ${styles.bottomMargin}`}
            />{" "}
            {!usedInAdminDashboard && (
              <>
                <input
                  required={true}
                  placeholder={t.signupModal.form.password}
                  type="password"
                  name="president:password"
                  className={`${styles.formInput} ${styles.bottomMargin}`}
                />{" "}
                <input
                  required={true}
                  placeholder={t.signupModal.form.confirmPassword}
                  type="password"
                  name="president:confirmPassword"
                  className={`${styles.formInput} ${styles.bottomMargin}`}
                />{" "}
              </>
            )}
            {/* Vice President */}
            <label htmlFor="vicePresident">{t.signupModal.contact2}</label>
            <div id="vicePresident" className={styles.inputContainer}>
              <input
                required={true}
                placeholder={t.signupModal.form.firstName}
                name="vicePresident:firstName"
                className={styles.formInput}
              />
              <input
                placeholder={t.signupModal.form.lastName}
                name="vicePresident:lastName"
                className={`${styles.formInput} ${styles.leftMargin}`}
              />
            </div>
            <input
              required={true}
              placeholder={t.signupModal.form.email}
              name="vicePresident:email"
              className={`${styles.formInput} ${styles.bottomMargin}`}
            />
            <input
              required={true}
              placeholder={t.signupModal.form.phoneNumber}
              name="vicePresident:phone"
              className={`${styles.formInput} ${styles.bottomMargin}`}
            />{" "}
            <input
              hidden={true}
              readOnly={true}
              placeholder={t.signupModal.form.role}
              name="vicePresident:role"
              value="groupVicePresident"
              className={`${styles.formInput} ${styles.leftMargin}`}
            />
            <input
              hidden={true}
              readOnly={true}
              placeholder={t.signupModal.countryRepresentative}
              name="countryRepresentative"
              value={countryRepresentative}
              className={`${styles.formInput} ${styles.leftMargin}`}
            />
            {/* checkbox for country representative */}
            <div className={styles.checkboxContainer}>
              <span className={styles.countryText}>
                {t.signupModal.countryRepresentative}:{" "}
              </span>
              <div>
                <input
                  type="checkbox"
                  checked={countryRepresentative}
                  onChange={(e) => setCountryRepresentative(e.target.checked)}
                />
                <span className={styles.checkText}>Yes</span>
              </div>

              <div>
                <input
                  type="checkbox"
                  checked={!countryRepresentative}
                  onChange={(e) => setCountryRepresentative(!e.target.checked)}
                />
                <span className={styles.checkText}>No</span>
              </div>
            </div>
            <div style={{ color: "red" }}>{error}</div>
            {/* if country representative then take country name */}
            {countryRepresentative && (
              <input
                required={true}
                placeholder={t.signupModal.form.countryRepresentation}
                name="country"
                className={`${styles.formInput} ${styles.bottomMargin}`}
              />
            )}
            <button className={styles.registerButton}>
              {loading ? t.signupModal.loading : t.signupModal.register}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GroupSignupModal;
