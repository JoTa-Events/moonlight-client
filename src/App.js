import AllEventsList from './pages/AllEventsList';
import CreateEvent from './pages/CreateEvent';
import EventDetails from './pages/EventDetails';
import EditEvent from './pages/EditEvent';
import MyProfile from './pages/MyProfile';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Homepage from './pages/Homepage';
import Nav from './components/Nav';
import AuthorProfile from './pages/AuthorProfile';
import authForAPI from './utils/authForAPI';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import axios from 'axios';
import './App.css';
import IsPrivate from './components/IsPrivate';

function App() {

  const [eventsList, setEventsList] = useState([]);

  const getAllEvents = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/events`)
      .then((response) => setEventsList(response.data))
      .catch((error) => console.log("Error getting events from API", error));
  };

  useEffect(() => {
    getAllEvents();
  }, []);

    // deleting the event
    const deleteEvent = (eventId) => {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/api/events/${eventId}`, authForAPI())
        .then(() => {
          getAllEvents();
        })
        .catch((error) => console.log('Error deleting these details', error));
    };


  return (
    <div className="App">

    <Nav />

    <Routes>
        <Route exact path="/my-profile" 
          element={<IsPrivate> <MyProfile eventsList={eventsList} deleteCallback={deleteEvent} /> </IsPrivate>} 
        />

        <Route exact path="/profile/:username" 
          element={<AuthorProfile />}
        />

        <Route exact path="/" 
          element={<Homepage eventsList={eventsList} />} 
        />

        <Route exact path="/events" 
          element={<AllEventsList eventsList={eventsList} />} 
        />

        <Route path="/events/:eventId" 
          element={<EventDetails deleteCallback={deleteEvent} getAllEvents={getAllEvents} eventsList={eventsList}/>}
        />

        <Route exact path="/events/create" 
          element={<IsPrivate> <CreateEvent createCallback={getAllEvents} /> </IsPrivate>} 
        />

        <Route exact path="/events/edit/:eventId" 
          element={<IsPrivate> <EditEvent /> </IsPrivate> } 
        />

        {/* register */}
        <Route exact path="/login" 
          element={<LoginPage />}
        />

        <Route exact path="/signup" 
          element={<SignupPage />} 
        />
        
        <Route path="*" element={<h1>404: Sorry, this route does not exist.</h1>} />
      </Routes>
      
    </div>
  );
}

export default App;
