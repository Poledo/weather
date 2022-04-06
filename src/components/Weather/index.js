import React, { useEffect, useRef, useState } from 'react'
import { getWeather } from '../../apis'
import styles from './Weather.module.css'
// import { WiHumidity, WiThermometer, WiStrongWind } from 'react-icons/wi'
import { BsSearch } from 'react-icons/bs'
import moment from 'moment'
import AirIcon from '@mui/icons-material/Air'
import ThermostatIcon from '@mui/icons-material/Thermostat'
import OpacityIcon from '@mui/icons-material/Opacity'
// import Clock from '../Clock'

const DEFAULT_VALUE = '--'
var globalDate
function Weather() {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState([])
  const [imgName, setImgName] = useState('weather')
  const cityRef = useRef()
  const [timesString, setTimesString] = useState()
  // const [time, setTime] = useState()
  const intervalRef = useRef()

  useEffect(() => {
    getWeather('ho chi minh')
      .then((res) => {
        setWeatherData(res.data)
      })
      .catch((error) => {
        setWeatherData([])
      })
  }, [])

  const addSeconds = (date) => {
    globalDate = null
    intervalRef.current = setInterval(() => {
      let t = globalDate ?? date

      let d = new Date(moment(t).add(1, 'seconds'))
      globalDate = d
      // console.log(globalDate)

      setTimesString(moment(globalDate).format('HH:mm:ss'))
      // setTime(d)
    }, 1000)
  }

  const convertTimezone = (date, timezone) => {
    let timeZoneFromDB = timezone / 3600
    let tzDifference = timeZoneFromDB * 60 + date.getTimezoneOffset()
    let offsetTime = new Date(date.getTime() + tzDifference * 60 * 1000)
    return offsetTime
  }

  useEffect(() => {
    if (weatherData.main) {
      let targetTime = new Date()
      let offsetTime = convertTimezone(targetTime, +weatherData.timezone)

      clearInterval(intervalRef.current)
      addSeconds(offsetTime)

      let hour = moment(offsetTime).format('HH:mm')

      let sunriseTime = convertTimezone(
        new Date(moment.unix(weatherData.sys.sunrise)),
        +weatherData.timezone
      )
      let sunsetTime = convertTimezone(
        new Date(moment.unix(weatherData.sys.sunset)),
        +weatherData.timezone
      )

      let sunrise = moment(sunriseTime).format('HH:mm')
      let sunset = moment(sunsetTime).format('HH:mm')

      console.log(
        'Giờ hiện tại:',
        hour,
        'Giờ MT mọc:',
        sunrise,
        'Giờ MT lặn:',
        sunset
      )
      if (
        moment(hour, 'HH:mm').isAfter(moment(sunrise, 'HH:mm')) &&
        moment(hour, 'HH:mm').isBefore(moment(sunset, 'HH:mm'))
      ) {
        setImgName('weather')
      } else {
        setImgName('weather-dark')
      }

      return () => {
        clearInterval(intervalRef.current)
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
          setTimesString('')
          // setTime(null)
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
                <p className={styles['time-string']}>{timesString}</p>
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
            <div className={styles['row-times']}>
              {/* <p>{timesString}</p> */}
              {/* <Clock time={time} /> */}
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
