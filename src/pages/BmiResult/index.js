import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './BmiResult.module.css'

function BmiResult() {
  const [result, setResult] = useState({
    score: 0,
    conclude: 'Not calculated yet',
    img: 'not',
  })

  useEffect(() => {
    const rs = localStorage.getItem('bmi_result') ?? 0
    let conclude = ''
    let img = ''

    if (rs <= 0) {
      conclude = 'Not calculated yet'
      img = 'not'
    } else if (rs < 18.5) {
      conclude = 'Underweight'
      img = 'under'
    } else if (rs < 24.9) {
      conclude = 'Normal Weight'
      img = 'normal'
    } else if (rs < 29.9) {
      conclude = 'Overweight'
      img = 'over'
    } else if (rs < 39.9) {
      conclude = 'Obesity'
      img = 'obese'
    } else {
      conclude = 'Extreme Obesity'
      img = 'extreme'
    }
    setResult({
      score: rs,
      conclude,
      img,
    })
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles['top-section']}>
        <p className={styles.title}>YOUR RESULT</p>
        <p className={styles.result}>{result.score}</p>
        <p className={styles.conclude}>{result.conclude}</p>
      </div>
      <div className={styles['middle-section']}>
        <img src={require(`../../assets/${result.img}.png`)} alt='bmi' />
      </div>
      <div className={styles['bottom-section']}>
        <Link to='/'>
          <button>Go Back</button>
        </Link>
      </div>
    </div>
  )
}

export default BmiResult
