import {useState} from "react";
import GroupCard from "./GroupCard/GroupCard";

const GroupsList = ({ data, setData }) => {
  const [selected, setSelected]= useState([])
  return (
    <div className="">
      {data?.map((item) => (
        <GroupCard 
          key={item._id} 
          data={item} 
          setData={setData}
          selected={selected}
          setSelected={setSelected} 
        />
      ))}
    </div>
  );
};

export default GroupsList;
