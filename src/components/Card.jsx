import { WiHumidity } from 'react-icons/wi'
import { LuWind } from 'react-icons/lu'
import { useEffect, useState } from 'react'
import { capitalizeFirstLetter } from '../helpers/formatText'

import { WeatherIcon } from './WeatherIcon'
import Loader from './Loader'
import { getWeatherData, weatherService } from '../helpers/fetcher'
import { useDispatch, useSelector } from 'react-redux'
import { setLocation, setWeatherData } from '../store/locationSlice'

const WeatherCard = ({ city }) => {
  const [condition, setCondition] = useState('clear')
  const [temp, setTemp] = useState(0)
  const [windSpeed, setWindSpeed] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const dispatch = useDispatch()
  const { locations, weatherData } = useSelector((state) => state.location)

  const setData = (data) => {
    setTemp(data['main']['temp'])
    setCondition(data['weather'][0]['main'])
    setHumidity(data['main']['humidity'])
    setWindSpeed(data['wind']['speed'])
  }

  useEffect(() => {
    if (city) {
      const fetchWeather = async () => {
        if (locations[city]) {
          if (weatherData[city]) {
            setData(weatherData[city])
            return null
          }
          const { lat, lon } = locations[city]
          const { weatherData: data } = await getWeatherData({ lat, lon })
          setData(data)
          return null
        } else {
          setLoading(true)
          setError(null)
          try {
            const { weatherData: data, lat, lon } = await weatherService(city)
            setData(data)
            dispatch(setLocation({ city, lat, lon }))
            dispatch(setWeatherData({ city, weatherData: data }))
          } catch (err) {
            setError('Failed to fetch weather data')
          } finally {
            setLoading(false)
          }
        }
      }

      fetchWeather()
    }
  }, [city, dispatch, locations, weatherData])

  if (loading) return <Loader />

  if (error) return <p>{error}</p>

  return (
    <div className='bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200 min-w-fit w-[25rem] min-h-[35rem] text-center flex flex-col items-center justify-center px-5 py-3 rounded-2xl shadow-lg '>
      <p className='text-[3rem] font-medium mb-3'>
        {capitalizeFirstLetter(city)}
      </p>

      <div className='flex gap-5 flex-col  items-center w-full text-[5rem] font-semibold  justify-center'>
        <p>{temp}°</p>
        <WeatherIcon condition={condition} />
      </div>

      <section className='flex gap-10 text-lg mt-5'>
        <span className='flex flex-col items-center justify-center'>
          <LuWind fontSize={30} />
          <p>{windSpeed}km/h</p>
        </span>
        <span className='flex flex-col items-center justify-center'>
          <WiHumidity fontSize={30} />
          <p>{humidity}%</p>
        </span>
      </section>
    </div>
  )
}

export default WeatherCard
