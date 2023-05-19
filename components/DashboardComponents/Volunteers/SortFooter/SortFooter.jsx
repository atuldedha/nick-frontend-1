import React, { useState,useEffect, useContext } from "react";
import styles from "../../../../styles/SortFooter.module.css";
import VolunteerContext from "../../../../context/VolunteersContext";
import GroupContext from "../../../../context/GroupContext";
// Volunteer Footer component
const SortFooter = ({ data, setData, refetchData, field }) => {

  const [selected, setSelected] = useState(null);
  const array = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",];
  
 

  const { loading: volunteerLoading } = useContext(VolunteerContext);
  const { loading: groupLoading } = useContext(GroupContext);

  useEffect(() => {
    if(volunteerLoading || groupLoading)
      setSelected(null);
  }, [volunteerLoading, groupLoading]);

  return (
    <div className={styles.container}>
      {array.map((item, index) => (
        <span
          key={index}
          className={`${selected === index ? styles.selectedText : ""} ${
            styles.text
          }`}
          onClick={() => {
            if (selected === index) {
              refetchData().then(function(data){;
                setSelected(null);
              })
            } else {
              refetchData().then(function(data){
                setSelected(index);
                setData(data.filter((item) => item[field][0].toLowerCase() === array[index]));
              });
            }
          }}>
          {item}
        </span>
      ))}
    </div>
  );
};

export default SortFooter;
