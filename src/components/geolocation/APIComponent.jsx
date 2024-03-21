import React, { useEffect } from 'react';

const YourComponent = () => {
  useEffect(() => {
    const fetchData = async () => {
      const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
      try {
        const response = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline',
          },
          body: JSON.stringify({
            origin: {
              location: {
                latLng: {
                  latitude: 37.419734,
                  longitude: -122.0827784,
                },
              },
            },
            destination: {
              location: {
                latLng: {
                  latitude: 37.417670,
                  longitude: -122.079595,
                },
              },
            },
            travelMode: 'DRIVE',
            routingPreference: 'TRAFFIC_AWARE',
            departureTime: '2023-10-15T15:01:23.045123456Z',
            computeAlternativeRoutes: false,
            routeModifiers: {
              avoidTolls: false,
              avoidHighways: false,
              avoidFerries: false,
            },
            languageCode: 'en-US',
            units: 'IMPERIAL',
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return <div>Your JSX content here</div>;
};

export default YourComponent;
