import React, { useState, useEffect } from "react";
import axios from "axios";
import defaultWeatherData from "../default-api_response/default_weather.json";
import defaultForcast from "../default-api_response/default_forcast.json";
import GetLocation from "./GetLocation";
import SideBar from "./SideBar";
import MainContent from "./MainContent";

function DashBoard() {
  const [weatherData, setWeatherData] = useState(null); // state to store weather data
  const [forecastData, setForecastData] = useState(null); // state to store forcast data
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null); // state to store error
  const [location, setLocation] = useState(null); // state to store location passed from GetLocation component

  function handleSearchLocation(locationName) {
    setLocation(locationName);
  }

  useEffect(() => {
    if (location) {
      // http request for api request
      const options = {
        method: "GET",
        url: "https://api.weatherapi.com/v1/current.json",
        params: {
          q: location,
          key: "2da5e55ae42c453c8d362419242706",
        },
        headers: { accept: "application/json" },
      };

      // api request using http thru axios
      axios
        .request(options)
        // if api request successful
        .then(function (response) {
          setWeatherData(response.data); // store json data to weatherdata state
        })
        // if api request unsuccessful
        .catch(function (error) {
          setError(error); // set error
          setWeatherData(defaultWeatherData); // pass default weather data to weatherData state
          window.alert("Error fetching weather data"); // show alert popup
        });

      // Fetch forecast data
      const forecastOptions = {
        method: "GET",
        url: `https://api.tomorrow.io/v4/weather/forecast`,
        params: {
          location: location,
          apikey: "t6iivnCtOCX1VnuNsLbfCSrIiHeMczcN",
        },
        headers: { accept: "application/json" },
      };

      axios
        .request(forecastOptions)
        .then(function (response) {
          setForecastData(response.data);
          setLoading(false); // loading stops
        })
        .catch(function (error) {
          setError(error);
          setForecastData(defaultForcast);
          setLoading(false); // loading stops
          console.error("Error fetching forecast data", error);
        });
    }
  }, [location]); // component updates if location changes

  if (!location) return <GetLocation onLocationFound={setLocation} />; // if location is null it calls the getLocation component to update the onLocation prop and passes it to Location state

  if (loading)
    return (
      <div className="min-h-screen bg-[#100E1D] flex items-center justify-center">
        <h1 className="text-slate-400">Loading</h1>
      </div>
    ); // if loading

  // Get data from weatherData
  const _wind_Speed = weatherData?.current?.wind_kph;
  const _wind_Direction = weatherData?.current?.wind_degree;
  const _humidity = weatherData?.current?.humidity;
  const _visibility = weatherData?.current?.vis_km;
  const _pressure = weatherData?.current?.pressure_mb;
  const _temprature = weatherData?.current?.temp_c;
  const _city = weatherData?.location?.name;
  const _condition = weatherData?.current?.condition?.text;

  console.log(weatherData);
  console.log(forecastData);

  // forcast data list
  const _forcast_data_list = [];
  for (let i = 0; i <= 4; i++) {
    _forcast_data_list.push(
      forecastData?.timelines?.daily[i]?.values?.temperatureMax
    );
    _forcast_data_list.push(
      forecastData?.timelines?.daily[i]?.values?.temperatureMin
    );
  }
  console.log(_forcast_data_list);

  function convertEpochToIST(epochTime) {
    // Create a new Date object with the epoch time
    const date = new Date(epochTime * 1000); // multiply by 1000 to convert from seconds to milliseconds
  
    // India Standard Time (IST) is UTC + 5:30
    const offset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
  
    // Create a new date object with the IST offset
    const istDate = new Date(date.getTime() + offset);
  
    // Retrieve date information
    const day = istDate.getUTCDay();
    const dateNumber = istDate.getUTCDate();
    const month = istDate.getUTCMonth(); // Months are zero-indexed
    const year = istDate.getUTCFullYear();
    const hours = istDate.getUTCHours();
    const minutes = istDate.getUTCMinutes();
    const seconds = istDate.getUTCSeconds();
  
    // Map day index to day name
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = dayNames[day];
  
    // Map month index to month name
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = monthNames[month];
  
    return {
      dayName,
      dateNumber,
      monthName,
      year,
      hours,
      minutes,
      seconds,
    };
  }

  // Example usage:
  const epochTime = weatherData?.location?.localtime_epoch; // Example epoch time
  const istDateInfo = convertEpochToIST(epochTime);
  console.log(istDateInfo);

  return (
    <div className="bg-[#100E1D] flex flex-col lg:flex-row">
      <SideBar
        city={_city}
        temprature={_temprature}
        condition={_condition}
        epochtime={istDateInfo}
        onSearchLocation={handleSearchLocation}
      />
      <MainContent
        forcastDataList={_forcast_data_list}
        windSpeed={_wind_Speed}
        windDirection={_wind_Direction}
        humidity={_humidity}
        pressure={_pressure}
        visibility={_visibility}
      />
    </div>
  );
}

export default DashBoard;
