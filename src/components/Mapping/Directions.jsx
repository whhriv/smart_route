import { useState, useEffect } from 'react'
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps"
import { getWaypointArray } from '../../scripts/waypointFromString';
import { getRouteTime } from '../../scripts/compareRoutes';

export default function DirectionMapSpace() {
    //   const position = {
    //     lat: 32.748994,
    //     lng: -117.231647
    // }

    return (
      <div style={{height: "100vh", width: "100%"}}>
        <APIProvider apiKey='AIzaSyAR-r8GJmwcm-9s2gqKkKHa3K4Km145a7Q'
        >

          <Map><Directions/><DirectionsTwo /></Map>
           
        </APIProvider>  
      </div>
    )

}
const startLoc = 'redding, ca'
const destination = 'chico, ca'
function Directions( ){
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes')
  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();
  const [routes, setRoutes] = useState([])
  // const [routeIndex, setRouteIndex] = useState(0);
  // const selected = routes[routeIndex]

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }))
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService.route({
     
      origin: startLoc,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    })
    .then((res) => {
      directionsRenderer.setDirections(res);
      console.log('routes', res)
      setRoutes(res.routes);
      

    })
    .catch(error => {
        console.log(error("error fetching directions:", error))
    })
  }, [directionsService, directionsRenderer]);

}
function DirectionsTwo( ){
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes')
  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();
  const [routes, setRoutes] = useState([])
  // const [routeIndex, setRouteIndex] = useState(0);
  // const selected = routes[routeIndex]


  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }))
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService.route({
     
      origin: 'Orland, CA',
      destination: 'Igo, CA',
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    })
    .then((res) => {
      directionsRenderer.setDirections(res);
      console.log('routes', res)
      setRoutes(res.routes);
      

    })
    .catch(error => {
        console.log(error("error fetching directions:", error))
    })
  }, [directionsService, directionsRenderer]);

}

