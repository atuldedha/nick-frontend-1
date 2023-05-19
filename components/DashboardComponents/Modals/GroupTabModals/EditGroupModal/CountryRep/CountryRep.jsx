import React, { useEffect, useState } from "react";
import ApplicationCheckboxes from "../../../ViewApplicationModal/ApplicationForm/ApplicationCheckboxes/ApplicationCheckboxes";
import styles from "../../../../../../styles/CountryRep.module.css";
import ApplicationInput from "../../../ViewApplicationModal/ApplicationForm/ApplicationInput/ApplicationInput";
// Country Representative component
const CountryRep = ({ newData, setNewData }) => {
  const [countryValue, setCountryValue]= useState(newData.country)
  return (
    <div className={styles.container}>
      <span className={styles.title}>Are you representing any country?</span>
      <ApplicationCheckboxes
        isEditable
        yesChecked={newData?.country!="" }
        noChecked={newData?.country=="" }
        setYesChecked={() =>
          setNewData((prev) => ({ ...prev, country: true }))
        }
        setNoChecked={() =>
          setNewData((prev) => ({ ...prev, country: "" }))
        }
      />
      {newData?.country!=""  && (
        <div className={styles.inputCont}>
          <ApplicationInput
            name="country"
            placeholder="Country"
            defaultValue={countryValue}
            handleChange={(target, value) =>
              setNewData({ ...newData, [target]: value })
            }
            isEditable={true}
          />
        </div>
      )}
    </div>
  );
};

export default CountryRep;
