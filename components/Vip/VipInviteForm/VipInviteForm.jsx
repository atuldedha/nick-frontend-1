import React from 'react'
import styles from '../../../styles/VipInvite.module.css';
import VipInput from '../VipInput';
import { useState } from 'react';
const VipInviteForm = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      organization: "",
      role: "",
      extra:"",
      extraName:"",
      extraEmail:"",
      extraPhone:"",
      extraOrganization:"",
      extraRole:"",
    });
  
    const handleChange = (name, value) => {
      setFormData((formData) => ({ ...formData, [name]: value }));
  };
  
  const handleRadioChange = (e) => {
      setFormData((formData) => ({ ...formData, extra: e.target.value }));
  };

  return (
    <div className={styles.formContainer}>
          <form>
            <div className={styles.formGroup}>
              <span>VIP Name</span>
              <VipInput value={formData.name} handleChange={handleChange} name='name' />
            </div>
            <div className={styles.flexRow}>
              <div className={styles.formGroup}>
                <span>Phone Number</span>
                <VipInput value={formData.phone} handleChange={handleChange} name='phone' />
              </div>
              <div className={styles.formGroup}>
                <span>Email</span>
                <VipInput value={formData.email} handleChange={handleChange} name='email' />
              </div>
            </div>
            <div className={styles.formGroup}>
              <span>Organization Name</span>
              <VipInput value={formData.organization} handleChange={handleChange} name='organiztion' />
            </div>

            <div className={styles.formGroup}>
              <span>Your Role in Organiztion</span>
              <VipInput value={formData.role} />
            </div>
            <div className={styles.formGroup}>
              <span>Do you want to bring someone else with you?</span>
              <div className={styles.checkboxContainer}>
                <label class={styles.checkInput}>
                  Yes
                  <input type="radio" checked={formData.extra === "Yes"}  name="ExtraVIP" value={"Yes"} onChange={handleRadioChange} />
                  <span class={styles.checkmark}></span>
                </label>
                <label class={styles.checkInput}>
                  No
                  <input type="radio" checked="checked" name="ExtraVIP" value={"No"} onChange={handleRadioChange} />
                  <span class={styles.checkmark}></span>
                </label>
              </div>
            </div>
{formData.extra=="Yes"?
            
            <div>
            <div className={styles.formGroup}>
              <span>VIP Name</span>
              <VipInput value={formData.extraName} handleChange={handleChange} name='extraName'/>
            </div>
            <div className={styles.flexRow}>
              <div className={styles.formGroup}>
                <span>Phone Number</span>
                <VipInput value={formData.extraPhone} handleChange={handleChange} name='extraPhone'/>
              </div>
              <div className={styles.formGroup}>
                <span>Email</span>
                <VipInput value={formData.extraEmail} handleChange={handleChange} name='extraEmail'/>
              </div>
            </div>
            <div className={styles.formGroup}>
              <span>Organization Name</span>
              <VipInput value={formData.extraOrganization} handleChange={handleChange} name='extraOrganiztion'/>
            </div>

            <div className={styles.formGroup}>
              <span>Role in Organiztion</span>
              <VipInput value={formData.extraRole} handleChange={handleChange} name='extraRole'/>
            </div>
            </div>
:<div></div>}
            <div className={styles.buttonContainer}>
              <button className={styles.SubmitButton}>Submit</button>
            </div>
          </form>
        </div>
  )
}

export default VipInviteForm