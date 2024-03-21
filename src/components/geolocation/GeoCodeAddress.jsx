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
        const location = data.results[0].geometry.location;
        const latitude = location.lat;
        const longitude = location.lng;
  
        // Output the coordinates
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      } else {
        console.error(`Error: ${data.status}`);
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
    }
  }

  
  const handleSubmit = (e) => {
    e.preventDefault();
    geocodeAddress()
  }
  
  const apiKey = 'AIzaSyDbUVVfWx2Ghaty0_o6toUor2W2UZLH1ro'
    return (
      <div>
        <ReactGoogleAutocomplete
          apiKey={apiKey}
          placeholder="Enter a location"
          onSelect={handlePlaceSelect}
        />
        <p>Selected location: {selectedPlace ? selectedPlace.formatted_address : ""}</p>
        <p>Latitude: {latitude}</p>
        <p>Longitude: {longitude}</p>
        <Button type="submit" onClick={handleSubmit} >Engage</Button>
      </div>
    );
  };
  
  export default LocationSearch;
  