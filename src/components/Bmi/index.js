import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Bmi.module.css'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { Grid, Typography } from '@mui/material'
import { Route } from 'react-router-dom'
import BmiResult from '../../pages/BmiResult'

function Bmi() {
  const [valueHeight, setValueHeight] = useState(170)
  const [valueWeight, setValueWeight] = useState(60)

  const handleSliderHeightChange = (event, newValue) => {
    setValueHeight(newValue)
  }

  const handleSliderWeightChange = (event, newValue) => {
    setValueWeight(newValue)
  }

  const handleCalculate = () => {
    const bmi =
      Math.round(
        (valueWeight / ((valueHeight / 100) * (valueHeight / 100))) * 10
      ) / 10
    localStorage.setItem('bmi_result', bmi)
  }

  return (
    <div className={styles.container}>
      <div className={styles['top-section']}>
        <p className={styles.title}>CALCULATE</p>
        <p className={styles.header}>YOUR BMI</p>
      </div>
      <div className={styles['middle-section']}>
        <Box>
          <Typography
            className={styles['height-title']}
            id='input-slider-height'
            gutterBottom
          >
            Height
          </Typography>
          <Typography className={styles.height}>
            {valueHeight / 100}m
          </Typography>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs>
              <Slider
                value={typeof valueHeight === 'number' ? valueHeight : 0}
                onChange={handleSliderHeightChange}
                aria-labelledby='input-slider-height'
                max={300}
                min={100}
                defaultValue={170}
              />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Typography
            className={styles['height-title']}
            id='input-slider-weight'
            gutterBottom
          >
            Weight
          </Typography>
          <Typography className={styles.height}>{valueWeight}kg</Typography>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs>
              <Slider
                value={typeof valueWeight === 'number' ? valueWeight : 0}
                onChange={handleSliderWeightChange}
                aria-labelledby='input-slider-weight'
                max={200}
                min={30}
                defaultValue={60}
              />
            </Grid>
          </Grid>
        </Box>
      </div>
      <div className={styles['bottom-section']}>
        <Link to='/result'>
          <button onClick={handleCalculate}>CALCULATE</button>
        </Link>
      </div>
    </div>
  )
}

export default Bmi
