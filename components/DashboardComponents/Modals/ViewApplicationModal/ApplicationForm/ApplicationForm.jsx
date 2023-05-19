import React, { useState, useContext } from "react";
import styles from "../../../../../styles/ViewApplicationModal.module.css";
import AcceptApplicationModal from "../../AcceptApplicationModal/AcceptApplicationModal";
import ApplicationAllQuestions from "./ApplicationAllQuestions/ApplicationAllQuestions";
import ApplicationCheckboxes from "./ApplicationCheckboxes/ApplicationCheckboxes";
import ApplicationInput from "./ApplicationInput/ApplicationInput";
import axios from "axios";
import AuthContext from "../../../../../context/AuthContext";
import SectionApplicationModal from "../../SectionApplicationModal/SectionApplicationModal";
// Application Form component
const ApplicationForm = ({
  data,
  setAllData,
  openAcceptModal,
  closeModal,
  noButtons,
}) => {
  // editable state
  const [isEditable, setIsEditable] = useState(false);
  // form initial data
  const [formData, setFormData] = useState({
    orgName: data?.orgName,
    groupPresident: data?.groupPresident,
    email: data?.email,
    phone: data?.phone,
    representingCountry: data?.representingCountry,
    countryName: data?.countryName,
    haveWalkers: data?.haveWalkers,
    noOfWalkers: data?.noOfWalkers,
    bringingCar: data?.bringingCar,
    noOfCars: data?.noOfCars,
    bringingSUV: data?.bringingSUV,
    noOfSUV: data?.noOfSUV,
    bringingTruck: data?.bringingTruck,
    noOfTrucks: data?.noOfTrucks,
    brandOfTruck: data?.brandOfTruck,
    trailersAttached: data?.trailersAttached,
    trailerLength: data?.trailerLength,
    bringingFloats: data?.bringingFloats,
    floatsLength: data?.floatsLength,
    isThereFireExtinguisher: data?.isThereFireExtinguisher,
    bringingAnimals: data?.bringingAnimals,
    bringingHorses: data?.bringingHorses,
    areHorsesInsured: data?.areHorsesInsured,
    noOfHorses: data?.noOfHorses,
    bringingDogs: data?.bringingDogs,
    noOfDogs: data?.noOfDogs,
    anyOtherAnimal: data?.anyOtherAnimal,
    anyOtherAnimalNoAndDescription: data?.anyOtherAnimalNoAndDescription,
  });

  const [sectionModal, setSectionModal] = useState(false);
  const [section, setSection] = useState("");

  // input change handler
  const handleEdit = (target, newValue) => {
    setFormData({ ...formData, [target]: newValue });
  };

  const { token, getToken } = useContext(AuthContext);

  function convertToInput(outputObject) {
    const inputObject = {
      _id: data.id,
      section: section,
      year: parseInt(outputObject.applicationDate),
      status: outputObject.status,
      walkers: outputObject.haveWalkers
        ? parseInt(outputObject.noOfWalkers)
        : 0,
      cars: outputObject.bringingCar ? parseInt(outputObject.noOfCars) : 0,
      suvs: outputObject.bringingSUV ? parseInt(outputObject.noOfSUV) : 0,
      pickups: {
        quantity: outputObject.bringingTruck
          ? parseInt(outputObject.noOfTrucks)
          : 0,
        brands: [],
      },
      trailer: outputObject.trailersAttached
        ? { length: parseInt(outputObject.trailerLength.slice(0, -2)) }
        : null,
      float: {
        length: outputObject.bringingFloats
          ? parseInt(outputObject.floatsLength.slice(0, -2))
          : 0,
        fireExtinguisher: outputObject.isThereFireExtinguisher === "Yes",
      },
      animals: {
        horses: outputObject.bringingHorses
          ? parseInt(outputObject.noOfHorses)
          : 0,
        horseCertificateOfInsurance: outputObject.areHorsesInsured,
        dogs: outputObject.bringingDogs ? parseInt(outputObject.noOfDogs) : 0,
        others: outputObject.anyOtherAnimal
          ? outputObject.anyOtherAnimalNoAndDescription
          : "",
      },
    };

    return inputObject;
  }

  // handle save
  const handleSave = async (updatedStatus) => {
    const inputObj = convertToInput(formData);

    inputObj.year = parseInt(data.applicationDate);

    if (updatedStatus) {
      inputObj.status = updatedStatus;
      formData.status = updatedStatus;
      if (updatedStatus == "ACCEPTED") {
        inputObj.acceptDate = new Date();
        formData.acceptDate = new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
      }

      if (updatedStatus == "REJECTED") {
        inputObj.rejectDate = new Date();
        formData.rejectDate = new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
      }
    }

    return axios
      .request({
        method: "PUT",
        url: `/api/application/update`,
        params: { id: data.id },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        },
        data: inputObj,
      })
      .then((response) => {
        setAllData((prev) =>
          prev.map((item) => {
            if (item.id === data.id) {
              return { ...item, ...formData };
            } else {
              return item;
            }
          })
        );
        setIsEditable(false);
        closeModal();
        return response.data;
      })
      .catch((error) => {
        console.error("Failed to update application", error);
        return error;
      });
  };

  // accept button click handler
  const handleAccept = () => {
    if (!sectionModal) return setSectionModal(true);

    openAcceptModal();
    setFormData({ ...formData, status: "ACCEPTED", section });

    handleSave("ACCEPTED").then(function () {
      setAllData((prev) =>
        prev.filter((item) => {
          return item.id !== data.id;
        })
      );
      setIsEditable(false);
      setSectionModal(false);
    });
  };
  // accept button click handler
  const handleReject = () => {
    setFormData({ ...formData, status: "REJECTED" });

    handleSave("REJECTED").then(function () {
      setAllData((prev) =>
        prev.filter((item) => {
          return item.id !== data.id;
        })
      );
      setIsEditable(false);
    });
  };
  return (
    <>
      <div className={styles.applicationForm}>
        <span className={styles.formText}>Name of organization</span>
        {/* custom component for input */}
        <ApplicationInput
          value={formData.orgName}
          name="orgName"
          isEditable={false}
          handleChange={handleEdit}
        />

        <span className={styles.formText}>Group President</span>
        {/* custom component for input */}
        <ApplicationInput
          value={formData.groupPresident}
          name="groupPresident"
          isEditable={false}
          handleChange={handleEdit}
        />

        <div className={styles.gridCol2}>
          <div className={`${styles.flexColumn}`}>
            <span>Email</span>
            {/* custom component for input */}
            <ApplicationInput
              value={formData.email}
              name="email"
              isEditable={false}
              handleChange={handleEdit}
            />
          </div>
          <div className={`${styles.flexColumn}`}>
            <span>Phone</span>
            {/* custom component for input */}
            <ApplicationInput
              value={formData.phone}
              name="phone"
              isEditable={false}
              handleChange={handleEdit}
            />
          </div>
        </div>

        <div className={`${styles.gridCol2} ${styles.transformGrid}`}>
          <div className={`${styles.flexColumn}`}>
            <span>Represent any country</span>
            {/* custom component for checkboxes */}
            <ApplicationCheckboxes
              yesChecked={formData.representingCountry}
              isEditable={false}
              setYesChecked={() =>
                setFormData({ ...formData, representingCountry: true })
              }
              noChecked={formData.representingCountry === false}
              setNoChecked={() =>
                setFormData({ ...formData, representingCountry: false })
              }
            />
          </div>
          {formData.representingCountry && (
            <div className={`${styles.flexColumn}`}>
              <span>Which Country</span>
              {/* custom component for input */}
              <ApplicationInput
                value={formData.countryName}
                name="countryName"
                isEditable={false}
                handleChange={handleEdit}
              />
            </div>
          )}
        </div>
        {sectionModal && (
          <SectionApplicationModal
            section={section}
            setSection={setSection}
            closeModal={() => setSectionModal(false)}
            handleClick={handleAccept}
          />
        )}

        {/* custom component for all question of the form */}
        <ApplicationAllQuestions
          isEditable={isEditable}
          setIsEditable={setIsEditable}
          formData={formData}
          setFormData={setFormData}
          handleEdit={handleEdit}
          handleAccept={handleAccept}
          handleSave={handleSave}
          handleReject={handleReject}
          noButtons={noButtons}
        />
      </div>
    </>
  );
};

export default ApplicationForm;
