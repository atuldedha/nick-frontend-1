import React, { useContext, useState, useEffect } from "react";
import styles from "../../../styles/GroupPresidentDashboard.module.css";
import PreviousApplicationModal from "../Modals/GroupPresidentDashboardModals/PreviousApplicationModal/PreviousApplicationModal";
import SecretaryDetailsModal from "../Modals/GroupPresidentDashboardModals/SecretaryDetailsModal/SecretaryDetailsModal";
import GroupApplicationStatus from "./GroupApplicationStatus/GroupApplicationStatus";
import JoinParadeButton from "./JoinParadeButton/JoinParadeButton";
import ParadeSection from "./ParadeSection/ParadeSection";
import PreviousApplications from "./PreviousApplications/PreviousApplications";
import SecretaryContactInfo from "./SecretaryContactInfo/SecretaryContactInfo";
import ViewApplicationModal from "../Modals/ViewApplicationModal/ViewApplicationModal";
import NotFoundApplicationModal from "../Modals/NotFoundApplicationModal/NotFoundApplicationModal";
import AuthContext from "../../../context/AuthContext";
import axios from 'axios';


// Group President Dashboard component
const GroupPresidentDashboard = () => {
  // state to open previous application modal
  const [openPreviousApplicationModal, setOpenPreviousApplicationModal] =
    useState(false);


  // state to open secretary details modal
  const [openSecretaryModal, setOpenSecretaryModal] = useState(false);

  const [application, setApplication] = useState(null)
  const [prevApplication, setPrevApplication]= useState(null);
  const { user, token, getToken } = useContext(AuthContext)
  const [ group, setGroup ]= useState(user?.group)
  const [ secretary, setSecretary]= useState(null);
  const [selectedYear, setSelectedYear]= useState((new Date().getFullYear()-1).toString())
  const [applicationFetched, setApplicationFetched]= useState()

  async function fetchSecretaryInfo() {
    try {
      const response = await axios.get('/api/secretary');
      setSecretary(response.data)
    } catch (error) {
      console.error(error); 
    }
  }
  
  useEffect(function () {
    var options = {
      method: 'GET',
      url: '/api/application/get',
      params: { groupId: user.group._id, year: new Date().getFullYear() },
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken()
      },
    };

    axios.request(options).then(function (response) {
      setApplicationFetched(true)
      setApplication(response.data)
    }).catch(function (error) {
      console.error(error);

    });


    var options = {
      method: 'GET',
      url: '/api/group',
      params: { id: user.group._id },
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken()
      },
    };

    axios.request(options).then(function (response) {
      setGroup(response.data)
    }).catch(function (error) {
      console.error(error);
    });

    fetchSecretaryInfo();

  }, [])


  async function fetchApplication(groupId, year) {
    var options = {
      method: 'GET',
      url: '/api/application/get',
      params:  { groupId, year },
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken()
      },
    };

    return axios.request(options).then(function (response) {
      return response.data
    }).catch(function (error) {
      console.error(error);
      return error;
    });
  }

  function convertObject(inputObject) {
    if (!inputObject.group.mainContact)
      inputObject.group.mainContact = "groupPresident"
    const groupContact = inputObject
      .group
      .members
      .find(m => m.role == inputObject.group.mainContact)

    const outputObject = {
      id: inputObject._id,
      name: `${groupContact.firstName} ${groupContact.lastName}`,
      email: groupContact.email,
      acceptDate: new Date(inputObject.acceptDate).toLocaleDateString('en-US', { 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric' 
                  }),
      rejectDate: new Date(inputObject.rejectDate).toLocaleDateString('en-US', { 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric' 
                  }),
      applicationDate: inputObject.year.toString(),
      status: inputObject.status.toLowerCase(),
      orgName: inputObject.group.name,
      groupPresident: `${groupContact.firstName} ${groupContact.lastName}`,
      phone: groupContact.phoneNumber.toString(),
      representingCountry: inputObject.group.country !== "",
      countryName: inputObject.group.country,
      haveWalkers: inputObject.walkers > 0,
      noOfWalkers: inputObject.walkers.toString(),
      bringingCar: inputObject.cars > 0,
      noOfCars: inputObject.cars.toString(),
      bringingSUV: inputObject.suvs > 0,
      noOfSUV: inputObject.suvs.toString(),
      bringingTruck: inputObject.pickups.quantity > 0,
      noOfTrucks: inputObject.pickups.quantity.toString(),
      brandOfTruck: inputObject.pickups.brands.map(brand => brand.name).join(", "),
      trailersAttached: inputObject.trailer?.length > 0,
      trailerLength: `${inputObject.trailer?.length}ft`,
      bringingFloats: inputObject.float?.length > 0,
      floatsLength: `${inputObject.float?.length}ft`,
      isThereFireExtinguisher: inputObject.float?.fireExtinguisher ? "Yes" : "No",
      bringingHorses: inputObject.animals.horses > 0,
      areHorsesInsured: inputObject.horseCertificateOfInsurance,
      noOfHorses: inputObject.animals.horses.toString(),
      bringingDogs: inputObject.animals.dogs > 0,
      noOfDogs: inputObject.animals.dogs.toString(),
      anyOtherAnimal: inputObject.animals.others !== "",
      anyOtherAnimalNoAndDescription: inputObject.animals.others,
    };
    outputObject.bringingAnimals =  outputObject.bringingHorses ||
                                    outputObject.bringingDogs ||
                                    outputObject.anyOtherAnimal;
    return outputObject;
  }

  function handlePreviousApplicationView(){
    fetchApplication(user.group._id, selectedYear).then(function(previousApplication){
      if(!previousApplication){ 
        setOpenPreviousApplicationModal(true);
        setPrevApplication(null)
        return;
      }
      setPrevApplication(convertObject(previousApplication))
      setOpenPreviousApplicationModal(true)
    })
  }

  function areApplicationsOpen() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    const startApplicationDate = new Date(currentYear, 2, 17); // Months are 0-indexed, so 2 is March
    const endApplicationDate = new Date(currentYear, 5, 1); // Months are 0-indexed, so 5 is June
  
    return currentDate >= startApplicationDate && currentDate < endApplicationDate;
  }
  return (
    <>
      <div className={styles.container}>
        {/* Join Parade button component */}
        {
          user.role==group.mainContact && 
          applicationFetched &&
          areApplicationsOpen() && 
          (!application || application?.status.toUpperCase()=="REJECTED") &&(
            <JoinParadeButton />        
          )
        }
        {
          !areApplicationsOpen() && (
            <p style={{fontSize: "1.5rem", fontWeight: "600"}}
            >Application are closed</p>
          )
        }
        <div className={styles.divider} />
        {/* PreviousApplication component */}
        <PreviousApplications
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          handleClick={handlePreviousApplicationView}
        />
        <div className={styles.divider} />
        {/* secretary info component */}
        <SecretaryContactInfo handleClick={() => setOpenSecretaryModal(true)} />
        <div className={styles.divider} />
        {/* application status component */}
        <GroupApplicationStatus status={application? application.status.toUpperCase(): "NOT APPLIED"} />
        <div className={styles.divider} />
        {/* footer component */}
        {(application && application.status.toUpperCase()=="ACCEPTED") && (
          <ParadeSection section={application.section}/>
        )}
      </div>
      {/* secretary details modal */}
      {openSecretaryModal && (
        <SecretaryDetailsModal
          closeModal={() => setOpenSecretaryModal(false)}
          formData={{
            secretaryName: secretary?.firstName+" "+secretary?.lastName,
            secretaryEmail: secretary?.email,
            secretaryPhone: secretary?.phoneNumber,
          }}
        />
      )}
      {/* previous application modal */}
      {openPreviousApplicationModal && prevApplication && (
         <ViewApplicationModal
            data={prevApplication}
            closeModal={() => { 
              setOpenPreviousApplicationModal(false); 
              setApplication(null)
            }}
            setAllData={()=>{}}
            openAcceptModal={() => {}}
            noButtons={true}
          />
      )}

     {openPreviousApplicationModal && !prevApplication &&(
      <NotFoundApplicationModal closeModal={()=> setOpenPreviousApplicationModal(false)}/>
     )}

    </>
  );
};

export default GroupPresidentDashboard;
