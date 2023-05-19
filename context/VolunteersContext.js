import React, { createContext, useEffect, useState} from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";

const VolunteerContext = createContext();
export default VolunteerContext;

export function VolunteerContextProvider({ children }) {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading]= useState(false);

  const getUser= () => {
    return localStorage.getItem("authToken") 
            ? jwt_decode(localStorage.getItem("authToken"))
            : null;
  }

  const getToken= () => {
    return localStorage.getItem("authToken");
  }


  async function refetchVolunteers(){
    setLoading(true);
    var options = {
        method: 'GET',
        url: '/api/user',
        params: {role: 'volunteer'},
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+getToken()
        },
    };

    return axios.request(options).then(function (response) {
        response.data.forEach(function(volunteer){
            volunteer.fullName= volunteer.firstName+' '+volunteer.lastName;    
        })
        setLoading(false)
        setVolunteers(response.data);
        return response.data;
    }).catch(function (error) {
        console.error(error);
        return error.response;
    });
  }

  useEffect(()=>{refetchVolunteers()}, []);

  function handleDeleteVolunteers(ids) {
    
    var options = {
      method: 'POST',
      url: '/api/user/delete',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+getToken()
      },
      data: {
        ids
      }
    };

    axios.request(options).then(function (response) {
      refetchVolunteers();
    }).catch(function (error) {
      console.error(error);
    });
  }


  const contextData={ 
    loading,
    volunteers,
    setVolunteers,
    refetchVolunteers,
    handleDeleteVolunteers 
}
  return (
    <VolunteerContext.Provider value={contextData}>
        {children}
    </VolunteerContext.Provider>
  );
}

