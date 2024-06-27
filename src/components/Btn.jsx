import React, { useContext } from 'react'
import { WeatherContext } from '../context/weather'

const Btn = () => {
    const weather=useContext(WeatherContext);
  return (
    
    <button className='btn' onClick={weather.fetchData}>
        Search
    </button>
  )
}

export default Btn