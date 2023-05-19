import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState, useContext } from "react";
import styles from "../../../styles/VolunteerSignupModal.module.css";
import AuthContext from "../../../context/AuthContext";

// modal for signup as a volunteer
const VolunteerSignupModal = ({ closeModal, open, t }) => {
  const { error, loading, registerUser } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <div className={styles.modalContainer}>
        {/* close modal */}
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

        <div className={styles.formContainer}>
          <Image
            src="/logo.svg"
            alt="logo"
            width="250px"
            height="130px"
            objectFit="contain"
          />

          <span className={styles.formHeading}>
            {t.signupModal.volunteerSignupTitle}
          </span>
          {/* input fields container */}
          <form onSubmit={registerUser}>
            <div className={styles.inputContainer}>
              <input
                placeholder={t.signupModal.form.firstName}
                name="firstName"
                required={true}
                className={styles.formInput}
              />
              <input
                placeholder={t.signupModal.form.lastName}
                name="lastName"
                className={`${styles.formInput} ${styles.leftMargin}`}
              />
            </div>
            <input
              placeholder={t.signupModal.form.phoneNumber}
              name="phoneNumber"
              required={true}
              className={`${styles.formInput} ${styles.bottomMargin}`}
            />
            <input
              placeholder={t.signupModal.form.email}
              name="email"
              className={`${styles.formInput} ${styles.bottomMargin}`}
            />
            <input
              placeholder={t.signupModal.form.password}
              name="password"
              type="password"
              required={true}
              className={`${styles.formInput} ${styles.bottomMargin}`}
            />
            <input
              placeholder={t.signupModal.form.confirmPassword}
              name="confirmPassword"
              type="password"
              required={true}
              className={`${styles.formInput} ${styles.bottomMargin}`}
            />
            {error && <p className={styles.error}>{error}</p>}{" "}
            {/* register button */}
            <button className={styles.registerButton}>
              {loading ? t.signupModal.loading : t.signupModal.register}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VolunteerSignupModal;
