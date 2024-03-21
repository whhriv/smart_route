let autocomplete;

function initAutocomplete() {
  // Create the autocomplete object
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('addressInput'),
    { types: ['geocode'] }
  );

  // Listen for the 'place_changed' event
  autocomplete.addListener('place_changed', geocodeSelectedPlace);
}

async function geocodeSelectedPlace() {
  // Get the selected place from the autocomplete object
  const place = autocomplete.getPlace();

  // Check if the place has a valid geometry
  if (place.geometry && place.geometry.location) {
    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();

    // Output the coordinates
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  } else {
    console.log('Invalid place. Please select a valid location from the suggestions.');
  }
}

// Initialize the autocomplete when the page loads
document.addEventListener('DOMContentLoaded', () => {
  initAutocomplete();
});

// Function to convert address to coordinates
async function geocodeAddress() {
  const addressInput = document.getElementById('addressInput');
  const address = addressInput.value;

  if (!address) {
    console.log('Please enter an address.');
    return;
  }

  // Replace 'YOUR_API_KEY' with your actual API key
  const apiKey = 'AIzaSyDbUVVfWx2Ghaty0_o6toUor2W2UZLH1ro';
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    // Fetch geocoding data from Google API
    
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Check if the request was successful
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