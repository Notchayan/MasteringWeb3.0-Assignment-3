import React, { useContext } from 'react'
import { WeatherContext } from '../context/weather'

const search = () => {
    const weather=useContext(WeatherContext)
  return (
    <input type="text"
    className='search'
    placeholder=' City Name'
    value={weather.search}
    onChange={(e)=>weather.setSearch(e.target.value)} 
/>
  )
}

export default search