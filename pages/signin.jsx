import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import NavBar from "../components/NavBar";
import AuthContext from "../context/AuthContext";
import styles from "../styles/Signin.module.css";

const Signin = () => {

  const { error, loading, loginUser }= useContext(AuthContext);
  const [email, setEmail]= useState("");
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
              Login
            </span>
            {/* input fields container */}
            <form onSubmit={loginUser}>
              <input
                placeholder="Email"
                name="email"
                value={email}
                className={`${styles.formInput} ${styles.bottomMargin}`}
                onChange={(e)=>setEmail(e.target.value)}
              />
              <input
                placeholder="Password"
                name="password"
                type="password"
                className={`${styles.formInput} ${styles.bottomMargin}`}
              />
              
              {error && <p className={styles.error}>{error}</p>}{" "}
              {/* register button */}
              <button className={styles.registerButton}>
                {loading ? "Loading..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
