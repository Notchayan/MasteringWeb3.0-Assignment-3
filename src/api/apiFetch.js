const baseURL="https://api.weatherapi.com/v1/current.json?key=19e7b368acc64bcc85052856242506";

//fetching weather data using city name
export const getWeatherData = async (city) => {
    const response =await fetch(`${baseURL}&q=${city}&aqi=yes`)

    return await response.json();         
};

//fetching weather data using latitude and longitude
export const getWeatherDataForLocation = async (lat,lon) => {
    const response =await fetch(`${baseURL}&q=${lat},${lon}&aqi=yes`)
    return await response.json();
};