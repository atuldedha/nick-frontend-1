import React, { useState } from "react";
import styles from "../../../styles/WalkieTalkie.module.css";
import WalkieTalkieBody from "./WalkieTalkieBody/WalkieTalkieBody";
import WalkieTalkieHeader from "./WalkieTalkieHeader/WalkieTalkieHeader";
import WalkieTalkieUsers from "./WalkieTalkieUsers/WalkieTalkieUsers";

// Walkie Talkie Component
const WalkieTalkie = () => {
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
      />

      {/* body */}
      {selected === 1 && <WalkieTalkieUsers />}
      {selected === 2 && (
        <WalkieTalkieBody talking={talking} setTalking={setTalking} />
      )}
      <div className={`${talking ? styles.coverCorner : styles.absolute}`} />
    </div>
  );
};

export default WalkieTalkie;
