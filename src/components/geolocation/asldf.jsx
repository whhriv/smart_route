import { useState, useEffect } from 'react'
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps"
import { getWaypointArray } from '../scripts/waypointFromString';

    
export async function getRouteTime(start, end, directionsService){

  directionsService.route({
     

      origin:start,

      destination:end,
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    })
    .then((res) => {

      let durationSum=0;
      let minuteSum=0;

      for(let i=0;i<res.routes.length;i++){
        for(let j=0; j< res.routes[i].legs.length;j++){
            durationSum= durationSum+res.routes[i].legs[j].duration.value;
            minuteSum= minuteSum+Math.ceil(res.routes[i].legs[j].duration.value/60);
        }
      }

      console.log(minuteSum+" minutes");
      console.log(durationSum);
    
    })
    .catch(error => {
        console.log(error("error fetching directions:", error))
    })
}


export async function getRouteTime(start, end, directionsService) {
    return new Promise((resolve, reject) => {
      directionsService
        .route({
          origin: start,
          destination: end,
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true,
        })
        .then((res) => {
          let durationSum = 0;
          let minuteSum = 0;
  
          for (let i = 0; i < res.routes.length; i++) {
            for (let j = 0; j < res.routes[i].legs.length; j++) {
              durationSum += res.routes[i].legs[j].duration.value;
              minuteSum += Math.ceil(res.routes[i].legs[j].duration.value / 60);
            }
          }
  
          resolve({ minuteSum, durationSum });
        })
        .catch((error) => {
          reject(new Error("Error fetching directions: " + error));
        });
    });
  }

  
  getRouteTime(start, end, directionsService)
  .then((result) => {
    console.log(result.minuteSum + " minutes");
    console.log(result.durationSum);
  })
  .catch((error) => {
    console.error(error);
  });
