import axios from 'axios'

export const getWeather = () =>
  axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=11.594186&lon=108.955560&appid=d5b31b61ba42ab3b7e12c2f24a5c1520&units=metric&lang=vi`
  )
