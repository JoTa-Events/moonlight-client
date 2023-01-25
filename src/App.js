import Homepage from './pages/Homepage';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import EventsList from './pages/EventsList';
import CreateEvent from './components/CreateEvent';
import EventDetails from './pages/EventDetails';
import EditEvent from './components/EditEvent';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {

  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    getAllEvents();
  }, [] );

  const getAllEvents = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/events`)
      .then((response) => setEventsList(response.data))
      .catch((error) => console.log('Error getting events from API', error));
  };

  // creating a new event
  const createEvent = (newEventObject) => {
    setEventsList((prevEvents) => {
      const newEventList = [newEventObject, ...prevEvents];
      return newEventList;
    })
  }

  return (
    <div className="App">

    <Nav />

    <Routes>      
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/events" element={<EventsList eventsList={eventsList} />} />
        <Route path="/events/:eventId" element={<EventDetails eventsList={eventsList} />} />
        <Route exact path="/events" element={<CreateEvent createCallback={createEvent} />} />
        <Route exact path="/events/edit/:eventId" element={<EditEvent />} />  
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        
        <Route path="*" element={<h1>404: Sorry, this route does not exist.</h1>} />
      </Routes>
      
    </div>
  );
}

export default App;
