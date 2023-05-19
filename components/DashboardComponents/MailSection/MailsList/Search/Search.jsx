import Image from "next/image";
import React from "react";
import styles from "../../../../../styles/MailsList.module.css";
import { useMail } from "../../../../../context/MailContext";

const Search = ({ placeholder, handleClick, searchData, setSearchData }) => {
  const { audienceOption } = useMail();
  const handleChange = (e) => {
    setSearchData(e.target.value);
  };

  function handleBlur(e) {
    if (e.target.value == "") {
      setSearchData("");
      handleClick();
    }
  }
  return (
    <div className={styles.searchInputButonWrapper}>
      <div className={styles.searchContainer} style={{ maxWidth: "80%" }}>
        <Image
          src="/search.png"
          alt="search"
          width="20px"
          height="20px"
          objectFit="contain"
        />
        <input
          type="text"
          value={searchData}
          placeholder={
            placeholder?.length > 0
              ? placeholder
              : audienceOption === "A specific group"
              ? "Search Group, name or email"
              : "Search by name , email , phone"
          }
          className={styles.searchInput}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <button onClick={handleClick} className={styles.searchButton}>
        Search
      </button>
    </div>
  );
};

export default Search;
