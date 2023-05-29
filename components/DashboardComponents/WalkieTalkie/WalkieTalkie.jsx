import React, { useState } from "react";
import styles from "../../../styles/WalkieTalkie.module.css";
import WalkieTalkieBody from "./WalkieTalkieBody/WalkieTalkieBody";
import WalkieTalkieHeader from "./WalkieTalkieHeader/WalkieTalkieHeader";
import WalkieTalkieUsers from "./WalkieTalkieUsers/WalkieTalkieUsers";
import { useRouter } from "next/router";
import fr from "../../../locales/fr";
import en from "../../../locales/en";

// Walkie Talkie Component
const WalkieTalkie = () => {
  // router for language
  const router = useRouter();
  const { locale } = router;
  // language variable
  const t = locale === "fr" ? fr : en;

  // toogle state for user or walkie talkie
  const [selected, setSelected] = useState(2);
  const [talking, setTalking] = useState(false);
  return (
    <div className={`${styles.container}  ${talking && styles.darkBg}`}>
      {/* Header component for walkie talkie */}
      <WalkieTalkieHeader
        selected={selected}
        setSelected={setSelected}
        talking={talking}
        t={t}
      />

      {/* body */}
      {selected === 1 && <WalkieTalkieUsers t={t} />}
      {selected === 2 && (
        <WalkieTalkieBody talking={talking} setTalking={setTalking} t={t} />
      )}
      <div className={`${talking ? styles.coverCorner : styles.absolute}`} />
    </div>
  );
};

export default WalkieTalkie;
