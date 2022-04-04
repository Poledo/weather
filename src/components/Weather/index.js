import React, { useEffect, useState } from 'react'
import { getWeather } from '../../apis'
import styles from './Weather.module.css'
import { WiHumidity, WiThermometer, WiStrongWind } from 'react-icons/wi'

const DEFAULT_VALUE = '--'

function Weather() {
  const [weatherData, setWeatherData] = useState([])
  const [city, setCity] = useState('')

  useEffect(() => {
    getWeather().then((res) => {
      console.log(res.data)
      setWeatherData(res.data)
    })

    // const getCountriesData = async () => {
    //   fetch(
    //     'https://api.openweathermap.org/data/2.5/weather?lat=11.594186&lon=108.955560&appid=d5b31b61ba42ab3b7e12c2f24a5c1520&units=metric&lang=vi'
    //   )
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log(data)
    //       setWeatherData(data)
    //       setCity(data.name)
    //     })
    // }

    // getCountriesData()
  }, [])

  const handleChangeCity = (e) => {
    setCity(e.target.value)
  }

  return (
    <div className={styles.container}>
      {weatherData.main ? (
        <>
          <div className={styles['top-section']}>
            {/* <input value={city} onChange={handleChangeCity} /> */}
            <div className={styles.row}>
              <div className={styles.item}>
                <p className={styles.temperature}>
                  {Math.round(weatherData.main.temp) || DEFAULT_VALUE}
                </p>
                <p className={styles['city-name']}>
                  {weatherData.name || DEFAULT_VALUE}
                </p>
              </div>
              <div className={styles.item}>
                <img
                  className={styles['weather-icon']}
                  alt='weather icon'
                  src={`http://openweathermap.org/img/wn/${
                    weatherData.weather[0].icon || '02d'
                  }@2x.png`}
                />
                <p className={styles['weather-state']}>
                  {weatherData.weather[0].description || DEFAULT_VALUE}
                </p>
              </div>
            </div>
          </div>

          <div className={styles['bottom-section']}>
            <div className={styles.row}>
              <div className={styles.humidity}>
                <p>
                  <WiHumidity />
                  {weatherData.main.humidity || DEFAULT_VALUE}
                </p>
              </div>
              <div className={styles['temperature-max-min']}>
                <WiThermometer />
                <span className={styles['temperature-max']}>
                  {Math.round(weatherData.main.temp_max) || DEFAULT_VALUE}
                </span>
                <span className={styles['temperature-min']}>
                  {Math.round(weatherData.main.temp_min) || DEFAULT_VALUE}
                </span>
              </div>
              <div className={styles['win-speed']}>
                <p>
                  <WiStrongWind />
                  {(weatherData.wind.speed * 3.6).toFixed(2) || DEFAULT_VALUE}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  )
}

export default Weather
