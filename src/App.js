import AllEventsList from './pages/AllEventsList';
import CreateEvent from './components/CreateEvent';
import EventDetails from './pages/EventDetails';
import EditEvent from './components/EditEvent';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Homepage from './pages/Homepage';
import Nav from './components/Nav';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';


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

  return (
    <div className="App">

    <Nav />

    <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/events" element={<AllEventsList eventsList={eventsList} />} />
        <Route path="/events/:eventId" element={<EventDetails editCallback={getAllEvents}/>} />
        <Route exact path="/events/create" element={<CreateEvent createCallback={getAllEvents} />} />
        <Route exact path="/events/edit/:eventId" element={<EditEvent />} />

        {/* register */}
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        
        <Route path="*" element={<h1>404: Sorry, this route does not exist.</h1>} />
      </Routes>
      
    </div>
  );
}

export default App;
