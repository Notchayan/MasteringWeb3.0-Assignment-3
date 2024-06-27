import React, { useState, useEffect } from "react";

function GetLocation({ onLocationFound }) {
  // onLocationFound prop used to pass data to app component
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // if successful
        (position) => {
          const { latitude, longitude } = position.coords; // set lat,lon
          onLocationFound(`${latitude},${longitude}`); // pass it to the prop
        },
        // if unsuccessful
        (error) => {
          console.error("Error fetching location: ", error); // pass error
          onLocationFound(null); // passed null
        }
      );
      // if navigator,geolocation didnt work
    } else {
      console.error("Geolocation is not supported by this browser.");
      onLocationFound(null);
    }
  }, [onLocationFound]); // component updates if prop changed

  return (
    <div className="min-h-screen bg-[#100E1D] flex items-center justify-center">
      <h1 className="text-slate-400">Fetching your location...</h1>
    </div>
  );
}

export default GetLocation;
