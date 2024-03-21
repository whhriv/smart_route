async function geocodeAddress(address) {
    // const addressInput = document.getElementById('addressInput');
    // const address = '4318 valeta st. san diego, ca';
  
    if (!address) {
      console.log('Please enter an address.');
      return;
    }
  
   
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
  export default geocodeAddress()
let myCoordinates = localStorage.setItem("MyCoordinates", geocodeAddress('San Diego, ca'))

geocodeAddress(myCoordinates)
// let myCoodrinates = localStorage.setItem("MyCoordinates", geocodeAddress('San Diego, ca'))
// localStorage.setItem("APIdata", data)
// console.log(myCoodrinates)

// function getSessionStorageData() {
//   const sessionStorageData = {};

//   for (let i = 1; i <= sessionStorage.length; i++) {
//     const stretch = JSON.parse(sessionStorage.getItem(`stretches${i}`));
//     const origin = JSON.parse(sessionStorage.getItem(`origin${i}`));
//     const destination = JSON.parse(sessionStorage.getItem(`destination${i}`));
//     const time = JSON.parse(sessionStorage.getItem(`TIME${i}`));

//     sessionStorageData[`stretch${i}`] = {
//       origin,
//       destination,
//       time
//     };
//   }

//   return sessionStorageData;
// }

// const sessionStorageData = getSessionStorageData();
// console.log(sessionStorageData);