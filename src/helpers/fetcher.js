import axios from 'axios'

//could have made these keys enviroment virables but I'm leaving it here to make it easy to test
const OPENCAGE_API_KEY = '30ce61c96b36467cba64a732547de608'
const OPENWEATHER_API_KEY = 'fbb22f7d78b4e4641a65218fa01bb0e4'

export const getCoordinate = async (city) => {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        city
      )}&key=${OPENCAGE_API_KEY}`
    )
    const { lat, lng } = response.data.results[0].geometry
    return { lat, lng }
  } catch (error) {
    console.error('Error fetching coordinates:', error)
    throw error
  }
}

export const getWeatherData = async ({ lat, lon }) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw error
  }
}

export const weatherService = async (city) => {
  try {
    const { lat, lng: lon } = await getCoordinate(city)
    const weatherData = await getWeatherData({ lat, lon })
    return { lat, lon, weatherData }
  } catch (error) {
    console.error('Error in weather service:', error)
    throw error
  }
}
