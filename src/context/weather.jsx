import { createContext, useState } from "react";
import { getWeatherData, getWeatherDataForLocation } from "../api/apiFetch";


export const WeatherContext = createContext(null);

export const WeatherProvider = (props) => {
    const [data,setData]=useState(null);
    const [search,setSearch]=useState("");

    const fetchData =async()=>{
        const response =await getWeatherData(search)
        setData(response);
    };

    const fetchCurrentLocation = async ()=>{
        await navigator.geolocation.getCurrentPosition((position)=>{
            getWeatherDataForLocation(
                position.coords.latitude,
                position.coords.longitude
            ).then((response)=>setData(response));
        })
    };

    return (
        <WeatherContext.Provider value={{search,data,setSearch,fetchData,fetchCurrentLocation}}>
            {props.children}
        </WeatherContext.Provider>
    )
}