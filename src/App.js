import Homepage from './pages/Homepage';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Navbar';
import EventsList from './pages/EventsList';
import CreateEvent from './components/CreateEvent';
import EventDetails from './pages/EventDetails';
import EditEvent from './components/EditEvent';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {

  return (
    <div className="App">

    <Nav />

    <Routes>      
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/events" element={<EventsList />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route exact path="/events" element={<CreateEvent/>} />
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
