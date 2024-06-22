import React, { useState, useEffect } from 'react';

function GetLocation({ onLocationFound }) {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationFound({ latitude, longitude });
        },
        (error) => {
          console.error("Error fetching location: ", error);
          onLocationFound(null); // Handle location error by passing null or a default value
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      onLocationFound(null); // Handle location error by passing null or a default value
    }
  }, [onLocationFound]);

  return <div>Fetching your location...</div>;
}

export default GetLocation;
