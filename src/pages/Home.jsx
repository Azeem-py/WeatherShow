import WeatherCard from '../components/Card'

const Home = () => {
  return (
    <div className='w-dvw min-h-dvh px-20  py-14 flex flex-col lg:flex-row justify-center gap-6 items-center lg:items-start'>
      <WeatherCard city={'lagos'} />
      <WeatherCard city={'new york'} />
      <WeatherCard city={'madrid'} />
    </div>
  )
}

export default Home
