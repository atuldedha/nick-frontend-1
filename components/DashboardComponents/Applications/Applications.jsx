import React, { useContext, useEffect, useState } from "react";
import styles from "../../../styles/Applications.module.css";
import allEmails from "../../../utils/staticEmailList";
import NotPresentHeader from "../MailSection/MailOptions/NotPresentHeader";
import Filter from "../MailSection/MailsList/Filter/Filter";
import AcceptApplicationModal from "../Modals/AcceptApplicationModal/AcceptApplicationModal";
import DeleteModal from "../Modals/DeleteModal";
import ApplicationListHeader from "./ApplicationListHeader/ApplicationListHeader";
import ApplicationsFilter from "./ApplicationsFilter/ApplicationsFilter";
import ApplicationsList from "./ApplicationsList/ApplicationsList";
import AuthContext from "../../../context/AuthContext";
import axios from "axios";

// Applications Component i.e, "tabSelected === 3"
const Applications = () => {
  // static data
  const [applications, setApplications] = useState();
  // year dropdown state
  const [yearOptionActive, setYearOptionActive] = useState(false);
  // selected year state
  const [selectedYear, setSelectedYear] = useState("2023");
  //   status dropdown state
  const [statusOptionActive, setStatusOptionActive] = useState(false);
  //   selected status state
  const [selectedStatus, setSelectedStatus] = useState("to be accepted");
  const [filter, setFilter] = useState({
    year: "2023",
    status: "to be accepted",
  });
  // delete application state
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // state to check uncheck all the mails
  const [allMailsCheck, setAllMailsCheck] = useState(false);
  // show application accepted modal state
  const [openAcceptModal, setOpenAcceptModal] = useState(false);

  const [loading, setLoading] = useState(false);

  // click handler function to open delete application modal
  const handleOpen = () => {
    setOpenDeleteModal(true);
  };

  // click handler function to filter year option
  const handleYearOptionChange = (year) => {
    setSelectedYear(year);
  };
  // click handler function to filter status option
  const handleStatusOptionChange = (status) => {
    setSelectedStatus(status);
  };
  // click handler function to show the changes according to the filters selected i.e, year and status
  const filterClick = () => {
    fetchApplications({ status: selectedStatus, year: selectedYear }).then(
      function (applications) {
        setApplications(applications.map(convertObject));
        setFilter({ ...filter, year: selectedYear, status: selectedStatus });
      }
    );
  };
  // click handler function to handle deleting of the application
  async function deleteApplications(ids) {
    try {
      const response = await axios.delete("/api/application/delete", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        },
        data: { ids },
      });
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  const handleDelete = () => {
    console.log(applications);
    let deleteIds = applications
      .filter((application) => application.checked)
      .map((application) => application.id);
    setLoading(true);
    deleteApplications(deleteIds).then((response) => {
      setApplications(applications.filter((item) => item.checked !== true));
      setOpenDeleteModal(false);
      setAllMailsCheck(false);
      setLoading(false);
    });
  };

  const [searchData, setSearchData] = useState("");

  const { token, getToken } = useContext(AuthContext);

  function convertObject(inputObject) {
    if (!inputObject.group) inputObject.group = {};
    if (!inputObject.group?.mainContact)
      inputObject.group.mainContact = "groupPresident";
    const groupContact = inputObject.group?.members?.find(
      (m) => m.role == inputObject.group.mainContact
    );

    const outputObject = {
      id: inputObject._id,
      name: `${groupContact?.firstName} ${groupContact?.lastName}`,
      email: groupContact?.email,
      acceptDate: new Date(inputObject.acceptDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      rejectDate: new Date(inputObject.rejectDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      applicationDate: inputObject.year.toString(),
      status: inputObject.status.toLowerCase(),
      orgName: inputObject.group.name,
      groupPresident: `${groupContact?.firstName} ${groupContact?.lastName}`,
      phone: groupContact?.phoneNumber.toString(),
      representingCountry: inputObject.group.country !== "",
      countryName: inputObject.group?.country,
      haveWalkers: inputObject.walkers > 0,
      noOfWalkers: inputObject.walkers.toString(),
      bringingCar: inputObject.cars > 0,
      noOfCars: inputObject.cars.toString(),
      bringingSUV: inputObject.suvs > 0,
      noOfSUV: inputObject.suvs.toString(),
      bringingTruck: inputObject.pickups.quantity > 0,
      noOfTrucks: inputObject.pickups.quantity.toString(),
      brandOfTruck: inputObject.pickups.brands
        .map((brand) => brand.name)
        .join(", "),
      trailersAttached: inputObject.trailer?.length > 0,
      trailerLength: `${inputObject.trailer?.length}ft`,
      bringingFloats: inputObject.float?.length > 0,
      floatsLength: `${inputObject.float?.length}ft`,
      isThereFireExtinguisher: inputObject.float?.fireExtinguisher
        ? "Yes"
        : "No",
      bringingHorses: inputObject.animals.horses > 0,
      areHorsesInsured: inputObject.horseCertificateOfInsurance,
      noOfHorses: inputObject.animals.horses.toString(),
      bringingDogs: inputObject.animals.dogs > 0,
      noOfDogs: inputObject.animals.dogs.toString(),
      anyOtherAnimal: inputObject.animals.others !== "",
      anyOtherAnimalNoAndDescription: inputObject.animals.others,
    };
    outputObject.bringingAnimals =
      outputObject.bringingHorses ||
      outputObject.bringingDogs ||
      outputObject.anyOtherAnimal;
    return outputObject;
  }

  async function fetchApplications(options) {
    var options = {
      method: "GET",
      url: "/api/application/get",
      params: { groupId: "all", year: options.year, status: options.status },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
    };

    return axios
      .request(options)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
        return error;
      });
  }

  const handleSearchClick = async () => {
    if (searchData != "") {
      fetchApplications().then(function (applications) {
        setApplications(
          applications
            .map(convertObject)
            .filter(
              (application) =>
                application.name.includes(searchData) ||
                application.phone.toString().includes(searchData) ||
                application.email.includes(searchData)
            )
        );
      });
    } else {
      fetchApplications().then(function (applications) {
        setApplications(applications.map(convertObject));
      });
    }
  };

  useEffect(
    function () {
      filterClick();
    },
    [selectedStatus, selectedYear]
  );

  useEffect(() => {
    fetchApplications(filter).then(function (applications) {
      setApplications(applications.map(convertObject));
    });
  }, []);

  return (
    <>
      <div className={styles.container}>
        <span className={styles.headerText}>Applications</span>

        {/* Application filter component */}
        <ApplicationsFilter
          yearOptionActive={yearOptionActive}
          setYearOptionActive={setYearOptionActive}
          handleYearOptionChange={handleYearOptionChange}
          filterClick={filterClick}
          selectedYear={selectedYear}
          statusOptionActive={statusOptionActive}
          setStatusOptionActive={setStatusOptionActive}
          selectedStatus={selectedStatus}
          handleStatusOptionChange={handleStatusOptionChange}
        />
        {/*Search common component */}
        <div className={styles.filterContainer}>
          <Filter
            buttonText="Applications"
            searchPlaceholder="Search by approved, rejected or need approval applications"
            handleButtonClick={() => {}}
            setSearchData={setSearchData}
            handleClick={handleSearchClick}
          />
        </div>

        <div className={styles.listContainer}>
          <div className={styles.applicationList}>
            {/* Applications list header */}
            <div className={styles.applicationListHeader}>
              <ApplicationListHeader
                allMailsCheck={allMailsCheck}
                setAllMailsCheck={setAllMailsCheck}
                openDeleteModal={handleOpen}
                smallStatus={false}
              />
            </div>

            {/* Applications List */}
            <ApplicationsList
              filter={filter}
              allCheck={allMailsCheck}
              applications={applications}
              setApplications={setApplications}
              setOpenAcceptModal={setOpenAcceptModal}
            />
          </div>
        </div>
      </div>
      {/* delete application modal */}
      {openDeleteModal && (
        <DeleteModal
          closeModal={() => setOpenDeleteModal(false)}
          deleting="applications"
          handleDelete={handleDelete}
          loading={loading}
        />
      )}

      {/* if application is accepted show the accept application modal */}
      {openAcceptModal && (
        <AcceptApplicationModal closeModal={() => setOpenAcceptModal(false)} />
      )}
    </>
  );
};

export default Applications;
