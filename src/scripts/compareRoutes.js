export async function getRouteTime(start, end, directionsService) {
    return new Promise((resolve, reject) => {
        directionsService.route({
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

            sessionStorage.setItem(`${start}-${end}-duration`, JSON.stringify(durationSum));
            // sessionStorage.setItem(`${start}-${end}-minutes`, JSON.stringify(minuteSum));

            console.log(`${start} to ${end} - Duration: ${durationSum} seconds`);
            console.log(`${start} to ${end} - Minutes: ${minuteSum} minutes`);

            resolve(durationSum); // Resolve with the total duration
        })
        .catch(error => {
            console.error("Error fetching directions:", error);
            reject(error);
        });
    });
}








    
// export async function getRouteTime(start, end, directionsService){

//   directionsService.route({

//             origin:start,
//             destination:end,
//             travelMode: google.maps.TravelMode.DRIVING,
//             provideRouteAlternatives: true,

//     })
//     .then((res) => {

//         let durationSum=0;
//         let minuteSum=0;
// //ONLY GETTING TIMES TO STRETCH3, NULL AFTER
//         for(let i=0;i<res.routes.length;i++){
//         for(let j=0; j< res.routes[i].legs.length;j++){
//             durationSum= durationSum+res.routes[i].legs[j].duration.value;
//             minuteSum= minuteSum+Math.ceil(res.routes[i].legs[j].duration.value/60);
//             // sessionStorage.setItem(`TIME${i + 1}`, JSON.stringify(res.routes[i].legs.duration.value));
//             // console.log(`TIME-loop ${[i]} :`, sessionStorage.getItem(`TIME${i + 1}`));
//             // for (let k = 0; k < res.routes.length; k++) {
//             //     sessionStorage.setItem(`TIME${k + 1}`, JSON.stringify(responses[k].request.origin));
//             //     console.log('TIME-loop', sessionStorage.getItem(`TIME${k + 1}`));
//             //   }
//         }
// }

// sessionStorage.setItem(`${start}-${end}-duration`, JSON.stringify(durationSum));
// sessionStorage.setItem(`${start}-${end}-minutes`, JSON.stringify(minuteSum));

// console.log(`${start} to ${end} - Duration: ${durationSum} seconds`);
// console.log(`${start} to ${end} - Minutes: ${minuteSum} minutes`);

// resolve(durationSum); // Resolve with the total duration

//     //   console.log("About "+Math.round(durationSum/60)+" minutes");
//         console.log(minuteSum+" minutes");
//         console.log('ROUTE TIME:', durationSum);
//         // console.log(TIME1)
    
//     })
//     .catch(error => {
//         console.error("error fetching directions:", error)
//     })
// }


