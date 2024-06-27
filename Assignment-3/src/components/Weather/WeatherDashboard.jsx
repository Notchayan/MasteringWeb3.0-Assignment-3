import { useState } from 'react';
import { getCity } from '../../api';
import './style.css';

const WeatherDashboard = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const handleGetCity = async () => {
        try {
            const data = await getCity(city);
            setWeatherData(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="weather-dashboard">
            <div className="weather-container">
                <h2>Enter the city whose weather info you want to see</h2>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                <button onClick={handleGetCity}>Search</button>
                {weatherData && (
                    <div className="weather-data">
                        <h3>City: {weatherData.name}</h3>
                        <p>Description: {weatherData.weather[0].description}</p>
                        <p>Temperature: {weatherData.main.temp}°K</p>
                        <p>Humidity: {weatherData.main.humidity}%</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherDashboard;
