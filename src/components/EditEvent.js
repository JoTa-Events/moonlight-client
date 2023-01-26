import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import authForAPI from "../utils/authForAPI";

// import arrays for countries and capital cities
import cityArr from "../data/capitalCity"
import countryArr from "../data/countries"

export default function EditEvent() {

    const navigate = useNavigate();
    const { eventId } = useParams();

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [description, setDescription] = useState("");
  
  
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/events/${eventId}`)
      .then((response) => {
        const event = response.data;

        setTitle(event.title);
        setDate(event.date);
        setCountry(event.country);
        setCity(event.city);
        setDescription(event.description);
      })
      .catch((error) => console.log(error));
    
  }, [eventId]);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {title, date, country, city, description};

    axios
      .put(`${process.env.REACT_APP_API_URL}/api/events/${eventId}`, requestBody, authForAPI() )
      .then((response) => {
        navigate(`/events/${eventId}`)
      });
  };
  
  return (
    <div className="EditEvent">
      <h3>Edit this Event</h3>

      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", width: "35%", margin: "auto"}} >
          <input>Title</input>
          <input
            type="text"
            required={true}
            name="title"
            value={title}
            onChange={(e) => {setTitle(e.target.value);}}
          />

          <label>Date</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => {setDate(e.target.value);}}
          />

          <label>Country</label>
          <select name="country" value={country} onChange={(e) => {setCountry(e.target.value); }}>
            <option value="">Select one</option>
            {countryArr.map((country,index) => 
              <option key={index} value={country}>{country}</option>
            )}
          </select>

          <label>City</label>
          <select name="city" value={city} onChange={(e) => {setCity(e.target.value); }}>
            <option value="">Select one</option>
            {cityArr.map((city,index )=>
              <option key={index}value={city}>{city}</option>
            )}
          </select>

          <label>Description</label>
          <input
            as="textarea"
            rows={5}
            name="description"
            value={description}
            onChange={(e) => {setDescription(e.target.value);}}
          />

          <button type="submit">Update</button>

        </form>

    </div>
  );
}