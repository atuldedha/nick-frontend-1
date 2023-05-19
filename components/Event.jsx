import React, { useEffect, useState } from "react";
import styles from "../styles/Event.module.css";
import { paradeYear } from "../components/untilLib/ParadeYear";
function Event() {
  const [currentParadeYear, setCurrentParadeYear] = useState();
  useEffect(() => {
    // sets the parade year depending on the month
    setCurrentParadeYear(paradeYear());
  }, []);
  return (
    <div className={styles.container}>
      <h4 className={styles.content}>
        Rue Ste.Catherine O. , 11:00 , July 1st, {currentParadeYear}
      </h4>
    </div>
  );
}

export default Event;
