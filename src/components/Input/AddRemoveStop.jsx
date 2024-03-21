
import React, { useState, createContext, useContext } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
// import GetDirectionMapOver from "../geolocation/GetDirectionsMapOver";

// const ResponsesContext = createContext(null)

const AddRemoveStop = () => {
  const [fields, setFields] = useState([{ label: "Stop", type: "text" }]);
  const [start, setStart] = useState("");
  const [loading, setLoading] = useState(false)
  
  const ResponsesContext = createContext(null)
  const [responses, setResponses] = useState(null)

  const navigate = useNavigate()
  const addField = () => {
    setFields([...fields, { label: "Stop", type: "text" }]);
  };

  const removeField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleChange = (index, event) => {
    const updatedFields = [...fields];
    updatedFields[index].value = event.target.value;
    console.log('UPDATING STOPS', updatedFields)
    setFields(updatedFields);
  };
// Saves Start and Stop  Variables

const handleFormSubmit = (e) => {
  e.preventDefault();
  setLoading(true)

  let startingLocation = start;
  const stops = fields.map((field) => field.value);
  
  // Need to permute times
  // feed permute routes into google maps instead of stretches?
  
  const permutations = permute(stops)
  let fastestTime = Infinity
  let fastestRoute = []
      permutations.forEach(async (perm) => {
        const totalTime = await calculateRouteTime(startingLocation, perm, startingLocation)
          if (totalTime < fastestTime) {
            fastestTime = totalTime
            fastestRoute = perm
          }
      })
      console.log('fastest route', fastestRoute) //empty array



  const directionsRequests = [];

  for (let i = 0; i < stops.length; i++) {

    for (let j=0; j<stops.length; j++) {

    if ( j!= i ) {
    const request = {
      origin: startingLocation, // Ensure origin is a string
      destination: stops[j],   // Ensure destination is a string
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    };
    directionsRequests.push(request);

    startingLocation = stops[i];
  }
  }
  }

  // Fetch directions for each request
  const directionsService = new google.maps.DirectionsService();
  const directionsPromises = directionsRequests.map((request) => {
    return new Promise((resolve, reject) => {
      directionsService.route(request, (response, status) => {
        if (status === 'OK') {
          resolve(response);
          // console.log('ARS:: fetch response', response) // CHECK THIS
        } else {
          reject(new Error(`Error fetching directions: ${status}`));
        }
      });
    });
  });

  // Handle all direction requests asynchronously
  Promise.all(directionsPromises)
    .then((responses) => {
      // DATA RETREIVAL AND HANDLING
      console.log('DIRECTION RESPONSES:', responses)
      // createContext(responses)

      console.log('DIRECTION RESPONSES[0].request:', responses[0].request)

      setResponses(responses)
      navigate('/GetDirectionsMapOver')

// ORIGIN - DESTINATION
// let dataResponse = responses
            for (let i = 0; i < responses.length; i++) {
              sessionStorage.setItem(`stretches${i + 1}`, JSON.stringify(responses[i].request));
              sessionStorage.setItem(`origin${i + 1}`, JSON.stringify(responses[i].request.origin));
              sessionStorage.setItem(`destination${i + 1}`, JSON.stringify(responses[i].request.destination));
              // sessionStorage.setItem(`seconds${i + 1}`, JSON.stringify(responses[i].routes[0].legs.duration.value));

              // console.log('STRETCHES-LOOP', sessionStorage.getItem(`stretches${i + 1}`));
            }


        setLoading(false)
    })
    .catch((error) => {
      console.error("Error fetching directions:", error);
      setLoading(false)
    });
  // console.log(dataResponse)
  navigate('/GetDirectionsMapOver');
};


  return (
    <div>
      <FloatingLabel controlId="start" label="Start">
        <Form.Control
          className="w-90"
          type="text"
          placeholder="Start"
          value={start}
          id="startInput"
          size="sm"
          onChange={(e) => {setStart(e.target.value); sessionStorage.setItem("startPoint", e.target.value);}}
        />
      </FloatingLabel>
      {fields.map((field, index) => (
        <div key={index}>
          <FloatingLabel controlId={`stop${index}`} label="Stop">
            <Form.Control
              className="w-100"
              type="text"
              placeholder="Stop"
              value={field.value || ""}
              onChange={(e) => handleChange(index, e)}
              size="sm"
            />
            <Button variant="outline-danger" className="btn btn-float-right" onClick={() => removeField(index)}>
              X
            </Button>
          </FloatingLabel>
        </div>
      ))}
      <Button variant="primary" onClick={addField}>
        Add Stop
      </Button>
      <Button variant="success" onClick={handleFormSubmit}>Create your Route</Button>
    </div>
  );
};

export default AddRemoveStop;


//MOVE TO OWN JSX ELEMENT
//needs to record time - but should if input aligns. 
                function permute(arr) {
                  const result = [];

                  function permuteHelper(arr, start) {
                      if (start === arr.length - 1) {
                          result.push([...arr]);
                          return;
                      }

                      for (let i = start; i < arr.length; i++) {
                          [arr[start], arr[i]] = [arr[i], arr[start]]; // Swap elements
                          permuteHelper(arr, start + 1);
                          [arr[start], arr[i]] = [arr[i], arr[start]]; // Restore original array
                      }
                  }

                  permuteHelper(arr, 0);
                  console.log('permutations', result)
                  return result;
                }

                // Function to calculate the total time for a route
                async function calculateRouteTime(origin, stops, destination) {
                  let totalTime = 0;

                  
                  for (let i = 0; i < stops.length; i++) {
                      totalTime += await getRouteTime(origin, stops[i]);
                      origin = stops[i]; 
                  }

                  totalTime += await getRouteTime(origin, destination);
                  return totalTime;
                }