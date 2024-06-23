import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultWeatherData from './api_response_default.json';
import GetLocation from './GetLocation';
import SideBar from './components/SideBar'
import MainContent from './components/MainContent';

function App() {
  const [weatherData, setWeatherData] = useState(null); // state to store weather data
  const [loading, setLoading] = useState(true); // loading state 
  const [error, setError] = useState(null);// state to store error
  const [location, setLocation] = useState(null);// state to store location passed from GetLocation component

  useEffect(() => {
    if (location) {
      // http request for api request
      const options = {
        method: 'GET',
        url: 'https://api.tomorrow.io/v4/weather/realtime',
        params: {
          location: `${location.latitude},${location.longitude}`,
          apikey: 't6iivnCtOCX1VnuNsLbfCSrIiHeMczcN'
        },
        headers: { accept: 'application/json' }
      };
      
      // api request using http thru axios
      axios.request(options)
      // if api request successful
        .then(function (response) {
          setWeatherData(response.data); // store json data to weatherdata state
          setLoading(false); // loading should stop, hence state is set to false
        })
        // if api request unsuccessful 
        .catch(function (error) {
          setError(error); // set error
          setWeatherData(defaultWeatherData); // pass default weather data to weatherData state
          setLoading(false); // loading stops
          window.alert('Error fetching weather data'); // show alert popup
        });
    }
  }, [location]); // component updates if location changes

  if (!location) return <GetLocation onLocationFound={setLocation} />; // if location is null it calls the getLocation component to update the onLocation prop and passes it to Location state

  if (loading) return <h1>Loading...</h1>; // if loading 

  // Extract relevant data from weatherData
  const _wind_Speed = weatherData?.data?.values?.windSpeed;
  const _wind_Direction = weatherData?.data?.values?.windDirection;
  const _humidity = weatherData?.data?.values?.humidity;
  const _visibility = weatherData?.data?.values?.visibility;
  const _pressure = weatherData?.data?.values?.pressureSurfaceLevel;
  const _temprature = weatherData?.data?.values?.temperature;

  console.log(weatherData)

  return (
    <div className="bg-[#100E1D] flex flex-col lg:flex-row">
        <SideBar  temprature={_temprature}/>
        <MainContent 
        windSpeed={_wind_Speed} 
        windDirection={_wind_Direction} 
        humidity={_humidity} 
        pressure={_pressure} 
        visibility={_visibility}
        />
      </div>
  );
}

export default App;
