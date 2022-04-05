import axios from 'axios'

var latitude = 11.594186
var longitude = 108.95556

const getMyLocation = () => {
  const location = window.navigator && window.navigator.geolocation

  if (location) {
    location.getCurrentPosition(
      (position) => {
        latitude = position.coords.latitude
        longitude = position.coords.longitude
      },
      (error) => {}
    )
  }
}

export const getWeather = (city) =>
  // axios.get(
  //   `https://api.openweathermap.org/data/2.5/weather?lat=11.594186&lon=108.955560&appid=d5b31b61ba42ab3b7e12c2f24a5c1520&units=metric&lang=vi`
  // )
  axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d5b31b61ba42ab3b7e12c2f24a5c1520&units=metric&lang=vi`
  )
