import React, { useState } from "react";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import Button from 'react-bootstrap/Button'
import geocodeAddress from '../../scripts/JSScripts'

const LocationSearch = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [apiDataStored, setApiDataStored] = useState(null);

  const handlePlaceSelect = (place) => {
    
    if (place && place.geometry && place.geometry.location) {
    setSelectedPlace(place);

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    setLatitude(lat);
    setLongitude(lng);
  };
}
async function geocodeAddress() {
  // const addressInput = document.getElementById('addressInput');
  const address = '4318 valeta st. san diego, ca';

  if (!address) {
    console.log('Please enter an address.');
    return;
  }

 
  const apiKey = 'AIzaSyDbUVVfWx2Ghaty0_o6toUor2W2UZLH1ro';
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === 'OK') {
      // Extract latitude and longitude from the response
      console.log(data)
      const location = data.results[0].geometry.location;
      const latitude = location.lat;
      console.log('print', latitude)
      const longitude = location.lng;
      console.log(location)
      setApiDataStored(data)

      // Output the coordinates
      console.log(`From Da App Latitude: ${latitude}, Longitude: ${longitude}`);
    } else {
      console.error(`Error: ${data.status}`);
    }
  } catch (error) {
    console.error('Error fetching geocoding data:', error);
  }
}


// const handleSubmit = () => {
//   geocodeAddress()
// }
// let ApiDataStored = localStorage.getItem("APIdata")
const apiKey = 'AIzaSyDbUVVfWx2Ghaty0_o6toUor2W2UZLH1ro'
  return (
    <div>
      <ReactGoogleAutocomplete
        apiKey={apiKey}
        placeholder="Enter a location"
        onSelect={handlePlaceSelect}
      />
      

      <p>API Data: {JSON.stringify(apiDataStored)}</p>
      <p>asdfl {JSON.stringify(apiDataStored)}</p>

      <Button type="submit" onClick={geocodeAddress}>Engage</Button>
      
    </div>
   
  );
};

export default LocationSearch;

// <p>Formatted Address: {apiDataStored.results[0].formatted_address}</p> 
// <p>Latitude: {apiDataStored.results[0].geometry.location.lat}</p>
// <p>Longitude: {apiDataStored.results[0].geometry.location.lng}</p>