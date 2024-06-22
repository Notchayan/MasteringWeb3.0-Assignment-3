import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultWeatherData from './api_response_default.json';
import GetLocation from './GetLocation';
import SideBar from './components/SideBar';
import SmallCard from './components/SmallCard';
import LargeCard from './components/LargeCard';

function App() {
  const [weatherData, setWeatherData] = useState(null); // state to store weather data
  const [loading, setLoading] = useState(true); // loading state 
  const [error, setError] = useState(null);// state to store error
  const [location, setLocation] = useState(null);// state to store location passed from GetLocation component
  const [temp, setTemp] = useState("C"); // state to store temperature unit

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
  const windSpeed = weatherData?.data?.values?.windSpeed;
  const windDirection = weatherData?.data?.values?.windDirection;
  const humidity = weatherData?.data?.values?.humidity;
  const visibility = weatherData?.data?.values?.visibility;
  const pressure = weatherData?.data?.values?.pressureSurfaceLevel;

  return (
    <div className="bg-[#100E1D] flex flex-col lg:flex-row">
        <SideBar />
        <div className="text-gray-150 p-10 flex-grow">
          <div className="space-x-3 text-right">
            <button
              className={`${
                temp === "C"
                  ? "bg-gray-150 text-darkblue"
                  : "bg-[#585676] text-gray-150"
              } rounded-full w-10 h-10 font-bold text-xl`}
              onClick={() => setTemp("C")}
            >
              &deg;C
            </button>
            <button
              className={`${
                temp === "F"
                  ? "bg-gray-150 text-darkblue"
                  : "bg-[#585676] text-gray-150"
              } rounded-full w-10 h-10 font-bold text-xl`}
              onClick={() => setTemp("F")}
            >
              &deg;F
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 my-5 gap-10 justify-center">
            <SmallCard
              dayTitle="Tomorrow"
              img="Shower"
              max={20}
              min={12}
              temp={temp}
            />
            <SmallCard
              dayTitle="Sun, 7 Jun"
              img="Clear"
              max={27}
              min={18}
              temp={temp}
            />
          </div>

          <div className="my-10">
            <h3 className="text-2xl font-bold mb-5">Today's Highlights</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center">
              <LargeCard title="Wind Status" num={windSpeed} desc=" km/h">
                <div className="flex justify-between space-x-5 items-center">
                  <div className="bg-gray-500 rounded-full w-[30px] h-[30px] flex justify-center items-center">
                    <i className="fas fa-location-arrow"></i>
                  </div>
                  <p className="text-gray-150 text-sm">{windDirection}°</p>
                </div>
              </LargeCard>

              <LargeCard title="Humidity" num={humidity} desc="%">
                <div className="self-stretch text-gray-250 text-xs space-y-1">
                  <div className="flex justify-between space-x-5 items-center px-1">
                    <p>0</p>
                    <p>50</p>
                    <p>100</p>
                  </div>
                  <div className="w-full h-2 bg-gray-150 rounded-full overflow-hidden">
                    <div
                      className="bg-[#FFEC65] h-2"
                      style={{ width: `${humidity}%` }}
                    ></div>
                  </div>
                  <p className="text-right">%</p>
                </div>
              </LargeCard>

              <LargeCard title="Visibility" num={visibility} desc=" meters" />

              <LargeCard title="Air Pressure" num={pressure} desc=" mb" />
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
