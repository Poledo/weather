import axios from 'axios'
import { OPENWEATHERMAP_APID } from '../constants/index'

export const getWeather = (city) =>
  axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHERMAP_APID}&units=metric&lang=vi`
  )
