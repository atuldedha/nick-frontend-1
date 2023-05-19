import React, { useState } from "react";
import VolunteersCard from "./VolunteersCard/VolunteersCard";

// Render all the volunteers VolunteersList Component
const VolunteersList = ({ volunteers, setVolunteers }) => {
  const [selected, setSelected]= useState([]);
  return (
    <div>
      {volunteers?.map((volunteer) => (
        <VolunteersCard
          key={volunteer._id}
          data={volunteer}
          setData={setVolunteers}
          selected={selected}
          setSelected={setSelected}
        />
      ))}
    </div>
  );
};

export default VolunteersList;
