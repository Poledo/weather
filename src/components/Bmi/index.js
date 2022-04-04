import React from 'react'
import styles from './Bmi.module.css'

function Bmi() {
  return (
    <div className={styles.container}>
      <div className={styles['top-section']}>
        <p className={styles.title}>CALCULATE</p>
        <p className={styles.header}>YOUR BMI</p>
      </div>
      <div className={styles['middle-section']}>
        <p>Height</p>
      </div>
      <div className={styles['bottom-section']}>
        <button>CALCULATE</button>
      </div>
    </div>
  )
}

export default Bmi
