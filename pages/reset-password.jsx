import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import NavBar from "../components/NavBar";
import AuthContext from "../context/AuthContext";
import styles from "../styles/Signin.module.css";

const Signin = () => {

  const { error, setError,  loading, resetPassword}= useContext(AuthContext);
  const [email, setEmail]= useState("");
  const errorTimeout=3;
  function resetUserPassword(e){
    e.preventDefault();
    let resetToken=new URLSearchParams(window.location.search).get("token")
    resetToken= resetToken.trim();

    const password= e.target.password.value;
    const confirmPassword= e.target.confirmPassword.value;
    if(!password || !confirmPassword){
      setTimeout(setError, errorTimeout*1000)
      return setError("Fill all fields.");
    }
    if(password!= confirmPassword){
      setTimeout(setError, errorTimeout*1000)
      return setError("Password field do not match.")
    }
    resetPassword(resetToken, password)
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.bgImage}>
          <Image src="/signinBackground.png" alt="background" layout="fill" />
        </div>

        <div className={styles.modalContainer}>
          {/* close modal */}

          <div className={styles.formContainer}>
            <Image
              src="/logo.svg"
              alt="logo"
              width="250px"
              height="130px"
              objectFit="contain"
            />

            <span className={styles.formHeading}>
              Reset Password
            </span>
            {/* input fields container */}
            <form onSubmit={resetUserPassword}>
              <input
                placeholder="Password"
                name="password"
                type="password"
                className={`${styles.formInput} ${styles.bottomMargin}`}
              />
            
              <input
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
                className={`${styles.formInput} ${styles.bottomMargin}`}
              />
        
            
              {error && <p className={styles.error}>{error}</p>}{" "}
              {/* register button */}
              <button className={styles.registerButton}>
                {loading ? "Reseting...":  "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
