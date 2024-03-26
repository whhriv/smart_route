import { useState, useEffect } from 'react';
import { APIProvider, Map, useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import { getRouteTime } from '../../scripts/compareRoutes';

export default function GetDirectionMapOver() {
    const [stretches, setStretches] = useState([]);
    // const [responses, setResponses] = useState(null)

    
// METHOD LACKS TIME - FOR SENDING DATA IN MAP
    useEffect(() => {
        // Retrieve stretches from sessionStorage and convert to array
        const storedStretches = [];
        for (let i = 1; i <= sessionStorage.length; i++) {
            const storedItem = sessionStorage.getItem(`stretches${i}`);
            
            if (storedItem) {
                storedStretches.push(JSON.parse(storedItem));
            }
        }
        console.log(':::STORED STRETCHES::: for MAP', storedStretches)
        setStretches(storedStretches); //  LACKING TIME 
        getSessionStorageData()
        
    }, []);

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <APIProvider apiKey='AIzaSyAR-r8GJmwcm-9s2gqKkKHa3K4Km145a7Q'>
                <Map>
                    {stretches.map((stretch, index) => (
                        <DirectionsX key={index} stretch={stretch} />
                    ))}
                </Map>
            </APIProvider>
        </div>
    );
}

function DirectionsX({ stretch, stretches }) {
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const [directionsService, setDirectionsService] = useState();
    const [directionsRenderer, setDirectionsRenderer] = useState();
    const [routes, setRoutes] = useState([]);

    // console.log(getRouteTime(stretches))

    useEffect(() => {
        if (!routesLibrary || !map) return;
        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
    }, [routesLibrary, map]);

    useEffect(() => {
        if (!directionsService || !directionsRenderer || !stretch) return;
        
        
        getRouteTime(stretch.origin, stretch.destination, directionsService)
        .then((result) => { 
          console.log('durationtimefromNEWCODE', result)
          return result 
        })
        .catch((error) => {
          console.error(error);
        });


        directionsService.route({
            origin: stretch.origin,
            destination: stretch.destination,
            travelMode: google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true,
        })
        
        // RESPONSE OF ROUTES
        .then((res) => {
            directionsRenderer.setDirections(res);

            // SETS useSTATE OF ROUTES
            // console.log('ROUTES RESPONSE ', res)
            setRoutes(res.routes);
            // console.log('sessionStorageData.stretch2.time', sessionStorageData.stretch2.time)
        })
        .catch(error => {
            console.log("error fetching directions:", error)
        })

                // getRouteTime(stretch.origin, stretch.destination, directionsService)
                //     .then(totalTime => {
                //         console.log('total Route Time:', totalTime)
                //     })
                //     .catch(error => {
                //         console.error('error calc route times', error)
                //     })


    }, [directionsService, directionsRenderer, stretch]);

    return null;
    
}
// console.log(getRouteTime(stretches))

// CREATE OBJECT FROM STORED DATA


function getSessionStorageData() {
    const sessionStorageData = {};

    for (let i = 1; i <= sessionStorage.length; i++) {
        const stretch = JSON.parse(sessionStorage.getItem(`stretches${i}`));
        const origin = JSON.parse(sessionStorage.getItem(`origin${i}`));
        const destination = JSON.parse(sessionStorage.getItem(`destination${i}`));
        const time = JSON.parse(sessionStorage.getItem(`seconds${i}`));

        sessionStorageData[`stretch${i}`] = {
            origin,
            destination,
            time
        };
    }
    console.log('SESSION STORAGE DATA', sessionStorageData)
    return sessionStorageData;
}

const sessionStorageData = getSessionStorageData();
console.log(sessionStorageData);



// const origins = Object.values(sessionStorageData).map(data => data.origin);
// const destinations = Object.values(sessionStorageData).map(data => data.destination);


// function findAllPermutations(origins, destinations) {
//     const permutations = [];

//     function generatePermutations(prefix, remainingOrigins, remainingDestinations) {
//         if (remainingOrigins.length === 0 && remainingDestinations.length === 0) {
//             permutations.push(prefix);
//             return;
//         }

//         for (let i = 0; i < remainingOrigins.length; i++) {
//             for (let j = 0; j < remainingDestinations.length; j++) {
//                 const newPrefix = [...prefix, { origin: remainingOrigins[i], destination: remainingDestinations[j] }];
//                 const newRemainingOrigins = remainingOrigins.slice(0, i).concat(remainingOrigins.slice(i + 1));
//                 const newRemainingDestinations = remainingDestinations.slice(0, j).concat(remainingDestinations.slice(j + 1));
//                 generatePermutations(newPrefix, newRemainingOrigins, newRemainingDestinations);
//             }
//         }
//     }

//     generatePermutations([], origins, destinations);

//     return permutations;
// }

// const permutations = findAllPermutations(origins, destinations);
// console.log(permutations);









// getSessionStorageData()
// const sessionStorageData = getSessionStorageData();
// console.log(sessionStorageData); // console.log of OBJECT - first to print.
// console.log(':::OUTPUT::: COMPILED ARRAY', sessionStorageData);
// // for (let i=0; i<sessionStorageData.length; i++) {
// //     console.log(`time ${i} :`, sessionStorageData.time[i])
// // }
// // console.log(sessionStorageData.stretch4.time)

// function findAllPermutations(origins, destinations) {
//     const permutations = [];

//     // RECURSIVE PERMUTATION GENERATION
//     function generatePermutations(prefix, remainingOrigins, remainingDestinations) {

//         if (remainingOrigins.length === 0 && remainingDestinations.length === 0) {
//             permutations.push(prefix);
//             return;
//         }

//         for (let i = 0; i < remainingOrigins.length; i++) {
//             for (let j = 0; j < remainingDestinations.length; j++) {
//                 const newPrefix = [...prefix, { origin: remainingOrigins[i], destination: remainingDestinations[j] }];
//                 const newRemainingOrigins = remainingOrigins.slice(0, i).concat(remainingOrigins.slice(i + 1));
//                 const newRemainingDestinations = remainingDestinations.slice(0, j).concat(remainingDestinations.slice(j + 1));
//                 generatePermutations(newPrefix, newRemainingOrigins, newRemainingDestinations);
//             }
//         }
//     }

//     /
//     generatePermutations([], origins, destinations);

//     return permutations;
// }

// // Example usage:
// const origins = sessionStorageData.stretches.origin // ['A', 'B', 'C'];
// const destinations = sessionStorageData.stretches.destination       // ['X', 'Y', 'Z'];
// const result = findAllPermutations(origins, destinations);
// console.log(result);

// const sessionStorageData = getSessionStorageData();
// const origins = Object.values(sessionStorageData).map(data => data.origin);
// const destinations = Object.values(sessionStorageData).map(data => data.destination);
// const permutations = findAllPermutations(origins, destinations);


// console.log(permutations);





