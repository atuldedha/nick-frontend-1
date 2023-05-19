import React from "react";
import styles from "../../../../../styles/Filter.module.css";
import Search from "../Search/Search";

const Filter = (props) => {
  return (
    <div className={styles.container}>
      {/* button text based on the selection of the dropdowns */}
      <button className={styles.button} onClick={props?.handleButtonClick}>
        {props?.buttonText}
      </button>
      <Search 
        placeholder={props?.searchPlaceholder || ""} 
        setSearchData={props?.setSearchData}
        handleClick={props?.handleClick}
      />
    </div>
  );
};

export default Filter;
