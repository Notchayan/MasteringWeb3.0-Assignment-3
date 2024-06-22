import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultWeatherData from './api_response_default.json';
import GetLocation from './GetLocation';

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
          setLoading(false); // loading should stop, hnece state is set to false
        })
        // if api request unsuccessful 
        .catch(function (error) {
          setError(error); // set error
          setWeatherData(defaultWeatherData); // pass default weather data to weatherData state
          setLoading(false); // loading stops
        });
    }
  }, [location]); // component updates if location changes

  if (!location) return <GetLocation onLocationFound={setLocation} />; // if location is null it calls the getLocation component to update the onLOcation prop and passes it to Location state

  if (loading) return <h1>Loading...</h1>; // if loading 

  return (
    <div>
      {error ? (
        // if error 
        <div>
          <h1>Error: {error.message}</h1>
          <h2>Showing default weather data:</h2>
        </div>
      ) : (
        // if no error
        <h1>Weather Data</h1>
      )}
      <pre>{JSON.stringify(weatherData, null, 2)}</pre>
    </div>
  );
}

export default App;
