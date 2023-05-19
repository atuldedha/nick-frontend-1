import React, { useState } from "react";
import styles from "../../styles/VipInvite.module.css";
import Event from "../../components/Event";
import VipInviteForm from "../../components/Vip/VipInviteForm/VipInviteForm";
import { useWindowSize } from "../../utils/WindowResizeHook";
const vipInvite = () => {
  // VIP Invitation Page
    const [width, height] = useWindowSize();

  return (
    <div>
      <div className={styles.imgContainer}>
        <img src="/history.png" className={styles.mainImg} alt="img"/>
      </div>
      <Event />
      <div className={styles.MainContainer}>
        <div className={styles.headContainer}>
          <h1  className={styles.mainHeading}>
          Canada Day Parade 2023</h1>
          <h1 className={styles.mainHeading}>VIP Invitaion</h1>
          <div className={styles.svgWrapper}>
          <svg
            viewBox="0 0 361 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              y1="1"
              x2="361"
              y2="1"
              stroke={width < parseFloat("768") ? "white" : "black"}
              strokeWidth="4"
            />
            <line y1="1" x2="84" y2="1" stroke="#C70000" strokeWidth="3" />
          </svg>
        </div>
        </div>
        <VipInviteForm />
      </div>
    </div>
  );
};

export default vipInvite;
