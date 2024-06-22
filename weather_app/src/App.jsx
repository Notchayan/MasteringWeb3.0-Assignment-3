import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultWeatherData from './api_response_default.json';
import GetLocation from './GetLocation';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (location) {
      const options = {
        method: 'GET',
        url: 'https://api.tomorrow.io/v4/weather/realtime',
        params: {
          location: `${location.latitude},${location.longitude}`,
          apikey: 't6iivnCtOCX1VnuNsLbfCSrIiHeMczcN'
        },
        headers: { accept: 'application/json' }
      };

      axios.request(options)
        .then(function (response) {
          setWeatherData(response.data);
          setLoading(false);
        })
        .catch(function (error) {
          setError(error);
          setWeatherData(defaultWeatherData);
          setLoading(false);
        });
    }
  }, [location]);

  if (!location) return <GetLocation onLocationFound={setLocation} />;

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      {error ? (
        <div>
          <h1>Error: {error.message}</h1>
          <h2>Showing default weather data:</h2>
        </div>
      ) : (
        <h1>Weather Data</h1>
      )}
      <pre>{JSON.stringify(weatherData, null, 2)}</pre>
    </div>
  );
}

export default App;
