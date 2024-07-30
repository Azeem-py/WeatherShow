import cloudy from '../assets/cloudy.svg'
import moonclear from '../assets/Moonclear.svg'
import sunny from '../assets/sunny.svg'
import thunderstrom from '../assets/thunderstrom.svg'
import raining from '../assets/raining.svg'

const weatherIconMap = {
  clear: sunny,
  clouds: cloudy,
  rain: raining,
  drizzle: raining,
  thunderstorm: thunderstrom,
  snow: cloudy,
  mist: cloudy,
  smoke: cloudy,
  haze: cloudy,
  dust: cloudy,
  fog: cloudy,
  sand: cloudy,
  ash: cloudy,
  squall: cloudy,
  tornado: cloudy,
}

export const WeatherIcon = ({ condition }) => {
  const icon = weatherIconMap[condition.toLowerCase()] || moonclear // Default to sunny if not found
  return <img src={icon} alt={condition} className='w-5/12 h-auto' />
}
