import React from "react";
import ApplicationAnswer from "../ApplicationAnswer/ApplicationAnswer";
import ApplicationCheckboxes from "../ApplicationCheckboxes/ApplicationCheckboxes";
import ApplicationQuestion from "../ApplicationQuestion/ApplicationQuestion";
import styles from "../../../../../../styles/ViewApplicationModal.module.css";

// Application All Questions component
const ApplicationAllQuestions = ({
  isEditable,
  setIsEditable,
  formData,
  setFormData,
  handleEdit,
  handleAccept,
  handleSave,
  handleReject,
  noButtons,
}) => {
  return (
    <div className={styles.flexColumn}>
      {/* custom question component */}
      <ApplicationQuestion
        question="1- Will your group have walkers"
        yesChecked={formData.haveWalkers}
        isEditable={isEditable}
        setYesChecked={() => setFormData({ ...formData, haveWalkers: true })}
        noChecked={formData.haveWalkers === false}
        setNoChecked={() => setFormData({ ...formData, haveWalkers: false })}
      />

      {formData.haveWalkers && (
        <span className={`${styles.formText} ${styles.marginBottom}`}>
          1a- How many people will be walking in your group?
          {/* custom answer component */}
          <ApplicationAnswer
            isEditable={isEditable}
            value={formData.noOfWalkers}
            name="noOfWalkers"
            handleChange={handleEdit}
          />
        </span>
      )}
      {/* custom question component */}
      <ApplicationQuestion
        question="2- Are you going to bring any cars?"
        yesChecked={formData.bringingCar}
        isEditable={isEditable}
        setYesChecked={() => setFormData({ ...formData, bringingCar: true })}
        noChecked={formData.bringingCar === false}
        setNoChecked={() => setFormData({ ...formData, bringingCar: false })}
      />

      {formData.bringingCar && (
        <span className={`${styles.formText} ${styles.marginBottom}`}>
          2a- How many cars (All cars must be decorated and any undecorated car
          will be remoe from parade)?
          {/* custom answer component */}
          <ApplicationAnswer
            isEditable={isEditable}
            value={formData.noOfCars}
            name="noOfCars"
            handleChange={handleEdit}
          />
        </span>
      )}
      {/* custom question component */}
      <ApplicationQuestion
        question="3- Are you going to bring any SUVs?"
        yesChecked={formData.bringingSUV}
        isEditable={isEditable}
        setYesChecked={() => setFormData({ ...formData, bringingSUV: true })}
        noChecked={formData.bringingSUV === false}
        setNoChecked={() => setFormData({ ...formData, bringingSUV: false })}
      />

      {formData.bringingSUV && (
        <span className={`${styles.formText} ${styles.marginBottom}`}>
          3a- How many SUVs
          {/* custom answer component */}
          <ApplicationAnswer
            isEditable={isEditable}
            value={formData.noOfSUV}
            name="noOfSUV"
            handleChange={handleEdit}
          />
        </span>
      )}
      {/* custom question component */}
      <ApplicationQuestion
        question="4- Are you going to bring any Pick-Up Trucks?"
        yesChecked={formData.bringingTruck}
        isEditable={isEditable}
        setYesChecked={() => setFormData({ ...formData, bringingTruck: true })}
        noChecked={formData.bringingTruck === false}
        setNoChecked={() => setFormData({ ...formData, bringingTruck: false })}
      />

      {formData.bringingTruck && (
        <>
          <span className={`${styles.formText} ${styles.marginBottom}`}>
            4a- How many?
            {/* custom answer component */}
            <ApplicationAnswer
              isEditable={isEditable}
              name="noOfTrucks"
              value={formData.noOfTrucks}
              handleChange={handleEdit}
            />
          </span>

          <span className={`${styles.formText} ${styles.marginBottom}`}>
            4b- What brand / type?
            {/* custom answer component */}
            <ApplicationAnswer
              isEditable={isEditable}
              name="brandOfTruck"
              value={formData.brandOfTruck}
              handleChange={handleEdit}
            />
          </span>
        </>
      )}
      {/* custom question component */}
      <ApplicationQuestion
        question="5- Are you going to bring any trailers attached to your SUV, Car or Pickup Truck?"
        yesChecked={formData.trailersAttached}
        isEditable={isEditable}
        setYesChecked={() =>
          setFormData({ ...formData, trailersAttached: true })
        }
        noChecked={formData.trailersAttached === false}
        setNoChecked={() =>
          setFormData({ ...formData, trailersAttached: false })
        }
      />

      {formData.trailersAttached && (
        <span className={`${styles.formText} ${styles.marginBottom}`}>
          5a- How long is the total length from the front of the car to the end
          of the trailer in feet(Round up to the nearest foot, Please note we
          have a maximum limit of 28 ft in length)?
          {/* custom answer component */}
          <ApplicationAnswer
            isEditable={isEditable}
            value={formData.trailerLength}
            name="trailerLength"
            handleChange={handleEdit}
          />
        </span>
      )}
      {/* custom question component */}
      <ApplicationQuestion
        question="6- Are you bringing any floats?"
        yesChecked={formData.bringingFloats}
        isEditable={isEditable}
        setYesChecked={() => setFormData({ ...formData, bringingFloats: true })}
        noChecked={formData.bringingFloats === false}
        setNoChecked={() => setFormData({ ...formData, bringingFloats: false })}
      />

      {formData.bringingFloats && (
        <>
          <span className={`${styles.formText} ${styles.marginBottom}`}>
            6a- What is the length of the float in feet (maximum limit of 28 ft
            in length)?
            {/* custom answer component */}
            <ApplicationAnswer
              isEditable={isEditable}
              value={formData.floatsLength}
              name="floatsLength"
              handleChange={handleEdit}
            />
          </span>

          <span className={`${styles.formText} ${styles.marginBottom}`}>
            6b- Do you have a fire extinguisher on the float (mandatory)?
            {/* custom answer component */}
            <ApplicationAnswer
              isEditable={isEditable}
              value={formData.isThereFireExtinguisher}
              name="isThereFireExtinguisher"
              handleChange={handleEdit}
            />
          </span>
        </>
      )}
      {/* custom question component */}
      <ApplicationQuestion
        question="7- Are you bringing any animals?"
        yesChecked={formData.bringingAnimals}
        isEditable={isEditable}
        setYesChecked={() =>
          setFormData({ ...formData, bringingAnimals: true })
        }
        noChecked={formData.bringingAnimals === false}
        setNoChecked={() =>
          setFormData({ ...formData, bringingAnimals: false })
        }
      />

      {formData.bringingAnimals && (
        <>
          <div className={styles.flexColumn}>
            <span className={`${styles.formText} ${styles.marginBottom}`}>
              7a- Will you be bringing horses?
            </span>
            {/* custom checkbox component */}
            <ApplicationCheckboxes
              yesChecked={formData.bringingHorses}
              isEditable={isEditable}
              setYesChecked={() =>
                setFormData({ ...formData, bringingHorses: true })
              }
              noChecked={formData.bringingHorses === false}
              setNoChecked={() =>
                setFormData({ ...formData, bringingHorses: false })
              }
            />
          </div>
          {formData.bringingHorses && (
            <>
              <div className={styles.flexColumn}>
                <span className={`${styles.formText}`}>
                  7a-1- You will need to provide the parade with a certificate
                  of insurance papers Are they insured?
                </span>
                {/* custom checkbox component */}
                <ApplicationCheckboxes
                  yesChecked={formData.areHorsesInsured}
                  isEditable={isEditable}
                  setYesChecked={() =>
                    setFormData({ ...formData, areHorsesInsured: true })
                  }
                  noChecked={formData.areHorsesInsured === false}
                  setNoChecked={() =>
                    setFormData({ ...formData, areHorsesInsured: false })
                  }
                />
              </div>
              <span className={`${styles.formText} ${styles.marginBottom}`}>
                7a-2- How many you will be bringing?
                {/* custom answer component */}
                <ApplicationAnswer
                  isEditable={isEditable}
                  value={formData.noOfHorses}
                  name="noOfHorses"
                  handleChange={handleEdit}
                />
              </span>
            </>
          )}
          <div className={styles.flexColumn}>
            <span className={`${styles.formText} ${styles.marginBottom}`}>
              7b- Will you be bringing any dogs?
            </span>
            {/* custom checkbox component */}
            <ApplicationCheckboxes
              yesChecked={formData.bringingDogs}
              isEditable={isEditable}
              setYesChecked={() =>
                setFormData({ ...formData, bringingDogs: true })
              }
              noChecked={formData.bringingDogs === false}
              setNoChecked={() =>
                setFormData({ ...formData, bringingDogs: false })
              }
            />
          </div>
          {formData.bringingDogs && (
            <span className={`${styles.formText} ${styles.marginBottom}`}>
              7b-1- How many dogs?
              {/* custom answer component */}
              <ApplicationAnswer
                isEditable={isEditable}
                value={formData.noOfDogs}
                name="noOfDogs"
                handleChange={handleEdit}
              />
            </span>
          )}
          <div className={styles.flexColumn}>
            <span className={`${styles.formText} ${styles.marginBottom}`}>
              7c- Are you bringing any other animals?
            </span>
            {/* custom checkbox component */}
            <ApplicationCheckboxes
              yesChecked={formData.anyOtherAnimal}
              isEditable={isEditable}
              setYesChecked={() =>
                setFormData({ ...formData, anyOtherAnimal: true })
              }
              noChecked={formData.anyOtherAnimal === false}
              setNoChecked={() =>
                setFormData({ ...formData, anyOtherAnimal: false })
              }
            />
          </div>
          {/* textarea */}
          {formData.anyOtherAnimal && (
            <div className={styles.flexColumn}>
              <span className={`${styles.formText} ${styles.marginBottom}`}>
                7c-1- Specify number and type of each?
              </span>
              <textarea
                type="text"
                rows={5}
                name="anyOtherAnimalNoAndDescription"
                className={styles.formInput2}
                value={formData.anyOtherAnimalNoAndDescription}
                onChange={
                  isEditable
                    ? (e) => handleEdit(e.target.name, e.target.value)
                    : () => {}
                }
              />
            </div>
          )}
        </>
      )}
      {!noButtons && (
        <div className={styles.applicationButtonsWrapper}>
          <div className={styles.editButtonWrapper}>
            <div
              className={`${styles.modalButton} ${styles.rejectButton}`}
              onClick={handleReject}
            >
              <span>Reject</span>
            </div>
            <div
              className={`${styles.modalButton} ${styles.editButton}`}
              onClick={() => setIsEditable(!isEditable)}
            >
              {/* show canel and edit based on edit state */}
              <span>{isEditable ? "Cancel" : "Edit"}</span>
            </div>
          </div>
          <div
            className={`${styles.modalButton}`}
            onClick={
              isEditable
                ? () => {
                    setIsEditable(false);
                    handleSave();
                  }
                : handleAccept
            }
          >
            {/* show Save and Accept based on edit state */}
            <span>{isEditable ? "Save" : "Accept"}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationAllQuestions;
