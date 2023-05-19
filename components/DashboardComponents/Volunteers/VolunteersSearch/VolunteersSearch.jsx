import React, { useState,useMemo, useContext } from "react";
import Search from "../../MailSection/MailsList/Search/Search";
import styles from "../../../../styles/Filter.module.css"
import VolunteerContext from "../../../../context/VolunteersContext";

const VolunteersSearch = ({ openModal}) => {
  const [searchData,setSearchData]=useState("");
  const {
    setVolunteers, 
    refetchVolunteers
  }= useContext(VolunteerContext)
  
   const handleClick= async ()=>{
    if(searchData!=""){
      refetchVolunteers().then(function(volunteers){
        setVolunteers(
          volunteers.filter((volunteer) => 
                volunteer.fullName.includes(searchData) ||
                volunteer.phoneNumber.toString().includes(searchData) ||
                volunteer.email.includes(searchData)
          )
        );
      })
    }else{
      refetchVolunteers();
    }
  }
  return (
    <div className={styles.container} style={{minWidth: "85%"}}>
      {/* button text based on the selection of the dropdowns */}
      {openModal &&(
        <button className={styles.button} onClick={openModal}>
          + Add volunteer
        </button>
        )
      }
      <Search placeholder="Search by volunteer name , email , phone" 
      searchData={searchData} 
      setSearchData={setSearchData} 
      handleClick={handleClick} />
    </div>
  );
};

export default VolunteersSearch;
