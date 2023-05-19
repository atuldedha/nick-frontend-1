import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";

const GroupContext = createContext();
export default GroupContext;

export function GroupContextProvider({ children }) {
  const [groups, setGroups] = useState([]);
  const [token, setToken] = useState();
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(false)
 
  const getUser = () => {
    return localStorage.getItem("authToken")
      ? jwt_decode(localStorage.getItem("authToken"))
      : null;
  }

  const getToken = () => {
    return localStorage.getItem("authToken");
  }
  async function refetchGroups() {
    setLoading(true);
    var options = {
      method: 'GET',
      url: '/api/group',
      headers: { 'Content-Type': 'application/json' },
    }

    return axios.request(options).then(function (response) {
      const _groups = response.data;
      _groups.forEach(function (group) {
        if (group.mainContact == "groupPresident")
          group.contact = group.members.find(m => m.role == "groupPresident")
        else
          group.contact = group.members.find(m => m.role == "groupVicePresident")
        if (group.contact)
          group.contact.fullName = group.contact?.firstName + ' ' + group.contact?.lastName;

        if(group.application && !group.application.status)
          group.application.status="to be accepted";
        group.registered = (group?.application?.status.toLowerCase() == "accepted"  ||
                            group?.application?.status.toLowerCase() == "to be accepted") &&
                            group?.application?.year.toString() == new Date().getFullYear().toString()
      })
      setLoading(false);
      setGroups(_groups);
      return _groups
    }).catch(function (error) {
      console.error("error while fetching groups", error);
      return error.response.data;
    });
  }



  async function findGroup(id) {
    var options = {
      method: 'GET',
      params: { id },
      url: '/api/group',
      headers: { 'Content-Type': 'application/json' },
    }

    return axios.request(options).then(function (response) {
      return response.data
    }).catch(function (error) {
      console.log(error)
      return error.response?.data;
    });
  }

  useEffect(function () {
    setToken(getToken());
    setUser(getUser());
    refetchGroups();
  }, [])

  async function handleEditGroup(event, id) {
    const group = groups.find(g => g._id == id);
    event.preventDefault();
    let body = {
      id,
      name: event.target.groupName.value,
      country: event.target.country?.value || "",
      mainContact: event.target.mainContact?.value || "groupPresident",
      toUpdate: [
        {
          firstName: event.target['groupPresident:firstName'].value,
          lastName: event.target['groupPresident:lastName'].value,
          phoneNumber: event.target['groupPresident:phone'].value,
          email: group.members.find(m => m.role == "groupPresident")?.email,
          newEmail: event.target['groupPresident:newEmail']?.value
        },
        {
          firstName: event.target['groupVicePresident:firstName'].value,
          lastName: event.target['groupVicePresident:lastName'].value,
          phoneNumber: event.target['groupVicePresident:phone'].value,
          email: group.members.find(m => m.role == "groupVicePresident")?.email,
          newEmail: event.target['groupVicePresident:newEmail']?.value
        }
      ]
    }

    body.toUpdate.forEach(function (member) {
      if (member.email == member.newEmail) delete member['newEmail'];
    })
    setLoading(true);
    var options = {
      method: 'POST',
      url: '/api/group/update',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken()
      },
      data: body
    };

    return axios.request(options).then(function (response) {
      setLoading(false)
      return response.data;
    }).catch(function (error) {
      setLoading(false)
      return error.response.data;
    });
  }



  async function handleChangeContact(newMainContact, groupId) {
    setLoading(true);
    var options = {
      method: 'POST',
      url: '/api/group/update',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken()
      },
      data: {
        id: groupId,
        mainContact: newMainContact,
        tokenInResponse: true
      }
    };

    return axios.request(options).then(function (response) {
      setLoading(false)
      return response.data;
    }).catch(function (error) {
      setLoading(false)
      console.log(error);
      return error?.response?.data;
    });
  }

  function handleDeleteGroups(ids) {

    var options = {
      method: 'POST',
      url: '/api/group/delete',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken()
      },
      data: {
        ids
      }
    };

    axios.request(options).then(function (response) {
      refetchGroups();
    }).catch(function (error) {
      console.error(error);
    });
  }

  const contextData = {
    loading,
    groups,
    setGroups,
    refetchGroups,
    handleEditGroup,
    handleDeleteGroups,
    findGroup,
    handleChangeContact
  }
  return (
    <GroupContext.Provider value={contextData}>
      {children}
    </GroupContext.Provider>
  );
}

