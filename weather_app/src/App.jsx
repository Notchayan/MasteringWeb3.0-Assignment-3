import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultWeatherData from './api_response_default.json';

const options = {
  method: 'GET',
  url: 'https://api.tomorrow.io/v4/weather/realtime',
  params: { location: 'toronto', apikey: 't6iivnCtOCX1VnuNsLbfCSrIiHeMczcN' },
  headers: { accept: 'application/json' }
};

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);

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
