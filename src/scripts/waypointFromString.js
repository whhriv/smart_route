
export function getWaypointArray(){


    let waypointsPlaces=sessionStorage.getItem("waypoints");

    console.log(waypointsPlaces);

    let waypointArray=[]

    let placeName ="";
    let foundSwiggle=false;

    for (let i =0;i<waypointsPlaces.length;i++){

      if(foundSwiggle&&waypointsPlaces[i]==','){
        foundSwiggle=false;
        continue;
      }

      if(waypointsPlaces[i]!='~'&&!foundSwiggle){
        placeName+=waypointsPlaces[i]
      }else if(waypointsPlaces[i]=='~'){
        waypointArray.push({location:placeName})
        placeName=""
        foundSwiggle=true
      }

      
    }

    return waypointArray;
}

