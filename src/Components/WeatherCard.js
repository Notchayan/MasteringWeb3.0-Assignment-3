import React from 'react'
import './Style_Sheets/WeatherCard.css'

const WeatherCard = ({weather_cards, handleDelete}) => {
  return (
    <div >
        <div className='weather-card-wrapper'>
            <div className="ui cards">
                {weather_cards.map((card) => (
                    <div className="card">
                        <div className="content">
                            <div className="header">Temperature: {card.temperature}°C 
                                <div className="icon">
                                <i className="delete_button" class="fa-solid fa-trash" role="button" tabIndex="0" onClick={() =>handleDelete(card.id)}></i> 
                                </div>
                            </div>

                            <div className="meta">
                                City: {card.city}
                            </div>

                            <pre className="description">
                                Humidity: {card.humidity} %   Wind Speed: {card.wind_speed} m/s
                            </pre>

                            <pre className="description">
                                Precipitation: {card.precipitation} mm 
                            </pre>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div> 
  )
}

export default WeatherCard
