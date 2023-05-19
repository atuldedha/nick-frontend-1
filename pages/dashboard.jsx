import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Dashboard.module.css";
import MailSection from "../components/DashboardComponents/MailSection/MailSection";
import Sidebar from "../components/DashboardComponents/Sidebar/Sidebar";
import WalkieTalkie from "../components/DashboardComponents/WalkieTalkie/WalkieTalkie";
import Applications from "../components/DashboardComponents/Applications/Applications";
import Volunteers from "../components/DashboardComponents/Volunteers/Volunteers";
import Groups from "../components/DashboardComponents/Groups/Groups";
import GroupPresidentDashboard from "../components/DashboardComponents/GroupPresidentDashboard/GroupPresidentDashboard";
import UserSettings from "../components/DashboardComponents/UserSettings/UserSettings";
import VolunteerDashboard from "../components/DashboardComponents/VolunteerDashboard/VolunteerDashboard";
import AuthContext from "../context/AuthContext";
import GroupContext from "../context/GroupContext";
import { useMail } from "../context/MailContext";
import { useRouter } from 'next/router'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
//Dashborad Page
const Dashboard = () => {
  {
    /* state to manage which option of the sidebar is currently selected */
  }

  const router = useRouter()
  const [selected, setSelected] = useState(1);
  const { user, token, setToken, getToken, setUser } = useContext(AuthContext);
  const [group, setGroup] = useState(null);

  // creating mail state from context
  const { setIsCreatingMail } = useMail();
  {
    /* state for changing the screen
  if user.role="volunteer" screen=Volunteer Dashboard
  if user.role="groupPresident" screen= PresidentDashboard 
  if user.role="sysOp" acreen= system operator Dashboard*/
  }

  function isSysOp(role) {
    if (!role) return false;

    const sysOpRoles = ["organizer", "secretary", "ASecretary"];

    return sysOpRoles.some(
      (sysOpRole) => sysOpRole.toLowerCase() == role.toLowerCase()
    );
  }

  const { findGroup } = useContext(GroupContext);


  const checkTokenExpiration = (token) => {
    if (!token) return undefined;
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp - currentTime;
  };

  const refreshToken = async () => {
    const response = await axios.post('/api/user/refresh-token', {
      token: getToken(),
    });
    const newToken = response.data.token;
    localStorage.setItem('authToken', newToken);
    setUser(jwt_decode(newToken));
    setToken(newToken);
  };
  

  useEffect(function () {
    const intervalId = setInterval(async () => {
      const remainingTime = checkTokenExpiration(getToken());

      if (remainingTime !== undefined && remainingTime <= 0) {
        setToken(null);
        setUser(null);
        localStorage.removeItem('authToken');
        if (router.asPath === '/dashboard') {
          router.push('/signin');
        }
      } else if (remainingTime < 4 * 60) {
        await refreshToken();
      }
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [])
  




  useEffect(
    function () {
      findGroup(user?.group?._id).then(function (_group) {
        setGroup(_group);
        console.log(user?.role, _group);
      });
    },
    [user]
  );

  // to change back the creating mail state whenevr we change tab on sideba
  useEffect(() => {
    setIsCreatingMail(false);
  }, [selected, setIsCreatingMail]);

  return (
    <div className={styles.container}>
      {/* Left section */}
      <div className={styles.leftSection}>
        <Sidebar
          isSysOp={isSysOp(user && user.role)}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
      {/* Right section based on tab selection of sidebar*/}
      {user &&
        (user.role === "groupPresident" || user.role === "groupVicePresident") ? (
        <div className={styles.rightSection}>
          {selected === 1 && <GroupPresidentDashboard />}
          {selected === 2 && (
            <UserSettings isPresident={user.role === group?.mainContact} />
          )}
        </div>
      ) : user && user.role === "volunteer" ? (
        <div className={styles.rightSection}>
          {selected === 1 && <VolunteerDashboard />}
          {selected === 2 && <UserSettings isPresident={false} />}
        </div>
      ) : isSysOp(user && user.role) ? (
        <div className={styles.rightSection}>
          {selected === 1 && <MailSection />}
          {selected === 2 && <WalkieTalkie />}
          {selected === 3 && <Applications />}
          {selected === 4 && <Groups />}
          {selected === 5 && <Volunteers />}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Dashboard;
