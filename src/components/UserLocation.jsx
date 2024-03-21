import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker } from "@vis.gl/react-google-maps";

const userLocation = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  if (!currentLocation) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      center={currentLocation}
      zoom={15}
    >
      <Marker position={currentLocation} />
    </GoogleMap>
  );
};

export default App;