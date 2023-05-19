import React from "react";
import { useState, useContext } from "react";
import styles from "../styles/ApplicationForm.module.css";
import ApplicationSubmitModal from "../components/DashboardComponents/Modals/ApplicationSubmitModal/ApplicationSubmitModal";
import Link from "next/link";
import radioQuestions from "../utils/applicationQuestions";
import axios from 'axios';
import AuthContext from "../context/AuthContext";
const applicationForm = () => {
  // use state for values
  const [values, setValues] = useState({});
  const [openModal, setOpenModal] = useState(false);


  // changes the value
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const { getToken, getUser}= useContext(AuthContext)


  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.target.blur(); 
      return false;
    }
  };

  function convertToObject(data) {
    const application = {};

    if (data['1'] === 'yes') {
      application.walkers = parseInt(data['1A']);
    }

    if (data['2'] === 'yes') {
      application.cars = parseInt(data['2A']);
    }

    if (data['3'] === 'yes') {
      application.suvs = parseInt(data['3A']);
    }

    if (data['4'] === 'yes') {
      const pickupsData = data['4B'].split(',').map(brand => ({ name: brand.trim() }));
      application.pickups = {
        quantity: parseInt(data['4A']),
        brands: pickupsData
      };
    }

    if (data['5'] === 'yes') {
      application.trailer = { length: parseInt(data['5A']) };
    }

    if (data['6'] === 'yes') {
      application.float = {
        length: parseInt(data['6A']),
        fireExtinguisher: data['6B'] === 'yes'
      };
    }

    if (data['7'] === 'yes') {
      application.animals = {}
      if (data['7A']) {
        application.horseCertificateOfInsurance = data['7A-1'] == 'yes'
        application.animals.horses = parseInt(data['7A-2']);
      }


      application.animals.dogs = data['7B'] ? parseInt(data['7B']) : 0;
      application.animals.others = data['7C'] ? data['7C'] : "";

    }



    return application;
  }


  //Submits the form
  const handleSubmit = (event) => {
    event.preventDefault();

    var options = {
      method: 'POST',
      url: '/api/application/create',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken()
      },
      data:{... convertToObject(values), group: getUser().group._id}
    };

    axios.request(options).then(function (response) {
      setOpenModal(true);
    }).catch(function (error) {
      console.error(error);
    });
    
  };

  
  return (
    <>
      <div className={styles.mainContainer}>
        <h1 className={styles.mainHeading}>
          Montreal Canada Day Parade Group Application Form {new Date().getFullYear()}
        </h1>
        <div className={styles.header}></div>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          {/* Maps the radioQuestions Array */}
          {radioQuestions.map((question, index) => {
            const initialValue = question.options.find(
              (option) => option.value === "no"
            ).value;
            // Initial Value for Radio
            const [selectedOption, setSelectedOption] = useState(initialValue);
            // initial Values for sub radios for 7th radio input
            const [subRadioOption1, setSubRadioOption1] = useState("no");
            const [subRadioOption2, setSubRadioOption2] = useState("no");
            const [subRadioOption3, setSubRadioOption3] = useState("no");
            //RadioInput for 7-A1
            const [radioInput7, setRadioInput7] = useState("no");
            //RadioINput for 6-B
            const [radioInput6, setRadioInput6] = useState("no");

            return (
              //Returns the formItem
              <div key={index} className={styles.formItem}>
                <h3 className={styles.heading}>{question.heading}</h3>
                <div className={styles.flexRow}>
                  {/* Mapping the Radio Options */}
                  {question.options.map((option, index) => (
                    <div key={index} className={styles.radioContainer}>
                      <label class={styles.checkInput}>
                        {option.label}
                        <input
                          required={true}
                          type="radio"
                          name={question.id}
                          value={option.value}
                          checked={selectedOption === option.value}
                          onChange={(e) => {
                            setSelectedOption(e.target.value);
                            handleChange(e);
                          }}
                        />
                        <span class={styles.checkmark}></span>
                      </label>
                    </div>
                  ))}
                </div>
                {/* Input Container for id 4 since 4 has 2 inputs */}
                {selectedOption === "yes" && question.id === 4 ? (
                  <div className={styles.flexInput}>
                    <div className={styles.InputContainer}>
                      <label className={styles.InputLabel}>
                        {question.textInput1.label}
                      </label>
                      <input
                        required={true}
                        type={"text"}
                        className={styles.textInput}
                        placeholder={question.textInput1.placeholder}
                        name={question.textInput1.id}
                        onKeyDown={handleKeyDown}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles.InputContainer}>
                      <label className={styles.InputLabel}>
                        {question.textInput2.label}
                      </label>
                      <input
                        required={true}
                        type={"text"}
                        className={styles.textInput}
                        placeholder={question.textInput2.placeholder}
                        name={question.textInput2.id}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                  </div>
                ) : // Input Container for 7 since 7 has 3 sub radio options
                  selectedOption === "yes" && question.id === 7 ? (
                    <div>
                      {question.subRadios.map((subRadio, subIndex) => {
                        const handleSubRadioChange = (e) => {
                          if (subRadio.id === '7A') {
                            setSubRadioOption1(e.target.value);
                          } else if (subRadio.id === '7B') {
                            setSubRadioOption2(e.target.value);
                          } else {
                            setSubRadioOption3(e.target.value);
                          }
                          handleChange(e);
                        };
                        return (
                          <div key={subIndex}>
                            <h3>{subRadio.label}</h3>
                            <div className={styles.flexRow}>
                              {subRadio.options.map((option, index) => (
                                <div
                                  key={index}
                                  className={styles.radioContainer}
                                >
                                  <label class={styles.checkInput}>
                                    {option.label}
                                    <input
                                      required={true}
                                      type="radio"
                                      name={option.id}
                                      value={option.value}
                                      checked={
                                        subRadio.id === '7A'
                                          ? subRadioOption1 === option.value
                                          : subRadio.id === '7B'
                                            ? subRadioOption2 === option.value
                                            : subRadioOption3 === option.value
                                      }
                                      onChange={handleSubRadioChange}
                                    />
                                    <span class={styles.checkmark}></span>
                                  </label>
                                </div>
                              ))}
                            </div>
                            {/* Both 2nd and 3rd has 1 single text option so both have smae container */}
                            {(subRadioOption2 === "yes" && subRadio.id === '7B') ||
                              (subRadioOption3 == "yes" && subRadio.id === '7C') ? (
                              <div className={styles.InputContainer}>
                                <label className={styles.InputLabel}>
                                  {subRadio.textInput.label}
                                </label>
                                <input
                                  required={true}
                                  type={"text"}
                                  placeholder={subRadio.textInput.placeholder}
                                  name={subRadio.id}
                                  onChange={handleChange}
                                  className={styles.textInput}
                                  onKeyDown={handleKeyDown}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {/* For 1st sub radio it will have 1 radio and 1 text input */}
                            {subRadioOption1 === "yes" && subRadio.id === '7A' && (
                              <div>
                                <h3 className={styles.heading}>
                                  {subRadio.radioInput.label}
                                </h3>
                                <div className={styles.flexRow}>
                                  {subRadio.radioInput.options.map(
                                    (option, index) => (
                                      <div
                                        key={index}
                                        className={styles.radioContainer}
                                      >
                                        <label class={styles.checkInput}>
                                          {option.label}
                                          <input
                                            required={true}
                                            type="radio"
                                            name={option.id}
                                            value={option.value}
                                            checked={radioInput7 === option.value}
                                            onChange={(e) => {
                                              setRadioInput7(e.target.value);
                                              handleChange(e);
                                            }}
                                          />
                                          <span class={styles.checkmark}></span>
                                        </label>
                                      </div>
                                    )
                                  )}
                                </div>
                                <div className={styles.InputContainer}>
                                  <label className={styles.InputLabel}>
                                    {subRadio.textInput.label}
                                  </label>
                                  <input
                                    required={true}
                                    type={"text"}
                                    placeholder={subRadio.textInput.placeholder}
                                    name={subRadio.textInput.id}
                                    onChange={handleChange}
                                    className={styles.textInput}
                                    onKeyDown={handleKeyDown}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : // 6th id will have 1 text and 1 radio input
                    selectedOption === "yes" && question.id === 6 ? (
                      <div className={styles.flexInput}>
                        <div className={styles.InputContainer}>
                          <label className={styles.InputLabel}>
                            {question.textInput.label}
                          </label>
                          <input
                            required={true}
                            type={"text"}
                            placeholder={question.textInput.placeholder}
                            name={question.textInput.id}
                            onChange={handleChange}
                            className={styles.textInput}
                            onKeyDown={handleKeyDown}
                          />
                        </div>
                        <div className={styles.RadioInputContainer}>
                          <label className={styles.InputLabel}>
                            {question.radioInput.label}
                          </label>
                          <div className={styles.flexRow}>
                            {question.radioInput.options.map((option, index) => (
                              <div key={index} className={styles.radioContainer}>
                                <label class={styles.checkInput}>
                                  {option.label}
                                  <input
                                    required={true}
                                    type="radio"
                                    name={option.id}
                                    value={option.value}
                                    checked={radioInput6 === option.value}
                                    onChange={(e) => {
                                      setRadioInput6(e.target.value);
                                      handleChange(e);
                                    }}
                                  />
                                  <span class={styles.checkmark}></span>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : // Every Other id except 4,6 and 7 will have 1 text input each
                      selectedOption === "yes" ? (
                        <div className={styles.InputContainer}>
                          <label className={styles.InputLabel}>
                            {question.textInput.label}
                          </label>
                          <input
                            required={true}
                            type={"text"}
                            placeholder={question.textInput.placeholder}
                            name={question.textInput.id}
                            onChange={handleChange}
                            className={styles.textInput}
                            onKeyDown={handleKeyDown}
                          />
                        </div>
                      ) : (
                        <div></div>
                      )}
              </div>
            );
          })}
          <div className={styles.buttonContainer}>
            <Link href={"/dashboard"}>
             
                <button className={styles.backButton}>Back</button>
            
            </Link>
            <button className={styles.submitButton} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      {/* Opens Modal if the application is submitted sucessfully */}
      {openModal && (
        <ApplicationSubmitModal closeModal={() => setOpenModal(false)} />
      )}
    </>
  );
};

export default applicationForm;
