import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MapSpace from './components/Mapping/MapSpace';
import CreateRoute from './components/Input/AddRemoveStop'
// import NavBar from './components/navbar'
import ImageDisplay  from './components/ImageDisplay';
import Directions from './components/Mapping/Directions'
import TabInputButton from './components/Input/TabInput';
// import UserLocation from './components/UserLocation'
import LocationSearch from './components/geolocation/LocationSearch';
// import ParentComponent from './components/ParentComponent';
import APIComponent from './components/geolocation/APIComponent'
import GetDirectionMapOver from './components/geolocation/GetDirectionsMapOver';
import AddRemoveStop from './AddRemoveStopOutside'

export default function App() {
  const [responses, setResponses] = useState(null)

  const handleResponsesChange = (newResponses) => {
    setResponses(newResponses)
  }



  // const handleFormSubmit = (start, stops) => {
  //   setStartLocation(start);
  //   setStops(stops);
  // };

  return (
   
    <BrowserRouter>
      <Container >
        {/* <NavBar  /> */}
          <Routes>
          <Route path="/" element={<ImageDisplay />} />
          {/* <Route path='/imagedisplay' element={<ImageDisplay />}/> */}
          <Route path='/mapspace' element={<MapSpace />}/>
          <Route path='/createroute' element={<CreateRoute onResponseChange={handleResponsesChange} />}/>
          <Route path='/directions' element={<Directions />}/>
          <Route path='/tabinputbutton' element={<TabInputButton />}/>
          <Route path='/locationsearch' element={<LocationSearch />}/>
          <Route path='/apicomponent' element={<APIComponent/>}/>
          <Route path='/getdirectionsmapover' element={<GetDirectionMapOver/>}/>
          <Route path='/addremovestopoutside' element={<AddRemoveStop onResponseChange={handleResponsesChange}/>}/>
          
        </Routes>
      </Container>
    </BrowserRouter>
   
  )
}