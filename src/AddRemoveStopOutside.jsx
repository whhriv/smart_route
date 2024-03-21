import React, { useState } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
// import { DirectionsService } from '@googlemaps/google-maps-services-js'; 
// import { google } from 'google-maps'; 

// const DirectionsService = new google.maps.DirecseionsService()

const AddRemoveStop = () => {
  const [fields, setFields] = useState([{ label: "Stop", type: "text" }]);
  const [start, setStart] = useState("");
  const navigate = useNavigate();

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
    setFields(updatedFields);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let startingLocation = start;
    const stops = fields.map((field) => field.value);

    const directionsRequests = stops.map((stop) => ({
      origin: startingLocation,
      destination: stop,
      travelMode: 'DRIVING',
    }));

    const directionsService = new DirectionsService();
    Promise.all(directionsRequests.map(directionsService.route))
      .then((responses) => {
        console.log('DIRECTION RESPONSES:', responses);
        
        for (let i = 0; i < responses.length; i++) {
            sessionStorage.setItem(`stretches${i + 1}`, JSON.stringify(responses[i].request));
            console.log('STRETCHES-LOOP', sessionStorage.getItem(`stretches${i + 1}`));
          }

          for (let i = 0; i < responses.length; i++) {
            sessionStorage.setItem(`origin${i + 1}`, JSON.stringify(responses[i].request.origin));
            console.log('ORIGIN-LOOP', sessionStorage.getItem(`origin${i + 1}`));
          }
          for (let i = 0; i < responses.length; i++) {
            sessionStorage.setItem(`destination${i + 1}`, JSON.stringify(responses[i].request.destination));
            console.log('DESTINATION-LOOP', sessionStorage.getItem(`destination${i + 1}`));
          }


        navigate('/GetDirectionsMapOver');
      })
      .catch((error) => {
        console.error("Error fetching directions:", error);
        // Handle error
      });
  };

  return (
    <div>
      <FloatingLabel controlId="start" label="Start">
        <Form.Control
          className="w-90"
          type="text"
          placeholder="Start"
          value={start}
          onChange={(e) => setStart(e.target.value)}
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
            />
            <Button variant="outline-danger" onClick={() => removeField(index)}>
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
