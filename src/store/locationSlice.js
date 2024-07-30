import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  locations: {},
  weatherData: {},
}

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      const { city, lat, lon } = action.payload
      state.locations[city] = { lat, lon }
    },
    setWeatherData: (state, action) => {
      const { city, weatherData } = action.payload
      state.weatherData[city] = weatherData
    },
  },
})

export const { setLocation, setWeatherData } = locationSlice.actions
export default locationSlice.reducer
