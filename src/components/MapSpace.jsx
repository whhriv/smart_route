import { useState, useEffect } from 'react';
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";
import { getWaypointArray } from '../scripts/waypointFromString';
import { getRouteTime } from '../scripts/compareRoutes';

function Directions({ start, stops }) {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    const testArray = getWaypointArray();
    console.log(testArray);

    getRouteTime("82 Eucalyptus Rd, Berkeley, CA 94705", "Fisherman's Wharf, San Francisco, CA", directionsService)
      .then((result) => { 
        console.log('durationtimefromNEWCODE', result.durationTime) 
      })
      .catch((error) => {
        console.error(error);
      });

    directionsService.route({
      origin: start,
      waypoints: testArray,
      destination: start,
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    })
    .then((res) => {
      directionsRenderer.setDirections(res);
      setRoutes(res.routes);
      console.log(routes);
    })
    .catch(error => {
        console.log("error fetching directions:", error);
    });
  }, [directionsService, directionsRenderer, start]);

  return null; // Since this component handles rendering the directions on the map, it doesn't render any UI itself
}

export default function DirectionMapSpace() {


  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <APIProvider apiKey='AIzaSyAR-r8GJmwcm-9s2gqKkKHa3K4Km145a7Q'>
        <Map />
        <Directions start={sessionStorage.getItem("startPoint")} stops={sessionStorage.getItem("waypoints")} />
      </APIProvider>
    </div>
  );
}
