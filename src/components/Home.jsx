import React, { useContext, useEffect } from 'react'
import { WeatherContext } from '../context/weather'
import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
    const {user}=useAuth0();
    const weather=useContext(WeatherContext);

    useEffect(() => {
        weather.fetchCurrentLocation()
    },[user]);

  return (
    <div className='home'>
        <h2>{weather?.data?.location?.name},{weather?.data?.location?.region},{weather?.data?.location?.country}</h2>
        <img src={weather?.data?.current?.condition?.icon} alt="icon" className='weathericon'/>
        <h4>{weather?.data?.current?.condition?.text}</h4>
        <h3>Temperature- {weather.data?.current?.temp_c} °C</h3>
        <h4>Humidity- {weather?.data?.current?.humidity}%</h4>

    </div>
  )
}

export default Home