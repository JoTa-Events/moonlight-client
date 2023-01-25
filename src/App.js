import Homepage from './pages/Homepage';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import EventsList from './pages/EventsList';
import CreateEvent from './components/CreateEvent';

function App() {

  const [eventsList, setEventsList] = useState([]);
  console.log(process.env.REACT_APP_API_URL);
  const getAllEvents = () => {

    
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/events`)
      .then((response) => setEventsList(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllEvents();
  }, [] );

  return (
    <div className="App">

    <Nav />

    <Routes>      
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/events" element={<EventsList  eventsList={eventsList} />} />
        <Route exact path="/events" element={<CreateEvent />} />
      </Routes>
      
    </div>
  );
}

export default App;
