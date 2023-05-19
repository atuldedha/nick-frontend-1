import React from 'react'
import styles from '../../styles/VipInvite.module.css';
const VipInput = ({value,handleChange,name}) => {
  return (
    <div>
    <input
      type="text"
      className={styles.formInput}
      value={value}
      name={name}
      onChange={
         (e) => handleChange(name, e.target.value)
      }
    />
    </div>
  )
}

export default VipInput