import React, { useEffect, useRef, useState } from 'react'
import { getWeather } from '../../apis'
import styles from './Weather.module.css'
// import { WiHumidity, WiThermometer, WiStrongWind } from 'react-icons/wi'
import { BsSearch } from 'react-icons/bs'
import moment from 'moment'
import AirIcon from '@mui/icons-material/Air'
import ThermostatIcon from '@mui/icons-material/Thermostat'
import OpacityIcon from '@mui/icons-material/Opacity'

const DEFAULT_VALUE = '--'
function Weather() {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState([])
  const [imgName, setImgName] = useState('weather')
  const cityRef = useRef()

  useEffect(() => {
    getWeather('ho chi minh')
      .then((res) => {
        setWeatherData(res.data)
      })
      .catch((error) => {
        setWeatherData([])
      })
  }, [])

  useEffect(() => {
    if (weatherData.main) {
      let hour = new Date().getHours()
      let sunrise = +moment.unix(weatherData.sys.sunrise).format('H')
      let sunset = +moment.unix(weatherData.sys.sunset).format('H')

      if (hour < sunrise && hour > sunset) {
        setImgName('weather-dark')
      } else {
        setImgName('weather')
      }
    }
  }, [weatherData])

  const handleChangeCity = (e) => {
    setCity(e.target.value)
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      getWeather(e.target.value)
        .then((res) => {
          setWeatherData(res.data)
          setCity('')
          cityRef.current.focus()
        })
        .catch((error) => {
          setWeatherData([])
        })
    }
  }

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${require(`../../assets/${imgName}.png`)})`,
      }}
    >
      {weatherData ? (
        <>
          <div className={styles['top-section']}>
            <div className={styles['search-bar']}>
              <BsSearch />
              <input
                className={styles.city}
                value={city}
                onChange={handleChangeCity}
                onKeyDown={handleKeyPress}
                ref={cityRef}
              />
            </div>
            <div className={styles.row}>
              <div className={styles.item}>
                <p className={styles.temperature}>
                  {Math.round(weatherData.main && weatherData.main.temp) ||
                    DEFAULT_VALUE}
                </p>
                <p className={styles['city-name']}>
                  {weatherData.name || DEFAULT_VALUE}
                </p>
              </div>
              <div className={styles.item}>
                <div className={styles['item-right']}>
                  <img
                    className={styles['weather-icon']}
                    alt='weather icon'
                    src={`http://openweathermap.org/img/wn/${
                      (weatherData.main && weatherData.weather[0].icon) || '02d'
                    }@2x.png`}
                  />
                  <p className={styles['weather-state']}>
                    {(weatherData.main && weatherData.weather[0].description) ||
                      DEFAULT_VALUE}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles['bottom-section']}>
            <div className={styles.row}>
              <div className={styles.humidity}>
                <OpacityIcon fontSize='large' />
                <span>
                  {/* <WiHumidity /> */}
                  {(weatherData.main && weatherData.main.humidity) ||
                    DEFAULT_VALUE}
                </span>
              </div>
              <div className={styles['temperature-max-min']}>
                <ThermostatIcon fontSize='large' />
                {/* <WiThermometer /> */}
                <span className={styles['temperature-max']}>
                  {Math.round(weatherData.main && weatherData.main.temp_max) ||
                    DEFAULT_VALUE}
                </span>
                <span> </span>
                <span className={styles['temperature-min']}>
                  {Math.round(weatherData.main && weatherData.main.temp_min) ||
                    DEFAULT_VALUE}
                </span>
              </div>
              <div className={styles['win-speed']}>
                <AirIcon fontSize='large' />
                <span>
                  {(weatherData.main &&
                    (weatherData.wind.speed * 3.6).toFixed(2)) ||
                    DEFAULT_VALUE}
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1 style={{ textAlign: 'center' }}>Loading...</h1>
      )}
    </div>
  )
}

export default Weather
