import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import authForAPI from "../utils/authForAPI";
import "./pages-css/Form.css";

import dayjs from "dayjs";

export default function EditEvent() {

  const navigate = useNavigate();
  const { eventId } = useParams();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState([]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/events/${eventId}`)
      .then((response) => {

        const event = response.data;
        setTitle(event.title);
        setDate(dayjs(event.date).format("YYYY-MM-DD"));
        setLocation(event.location);
        setLatitude(event.latitude);
        setLongitude(event.longitude);
        setDescription(event.description);

      })
      .catch((error) => console.log(error));
  }, [eventId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {title, date, location: {"type": "point", "coordinates": [latitude, longitude]}, description};

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/events/${eventId}`, requestBody, authForAPI()
      )
      .then((response) => {
        navigate(`/events/${eventId}`);
      });
  };

  return (
    <div className="FormEvent">
      <form className="form-box" onSubmit={handleSubmit}>
        <h1>Edit: {title}</h1>
        <label>
          Title <b style={{ color: "#f56457" }}>*</b>
        </label>
        <input
          type="text"
          required={true}
          name="title"
          value={title}
          onChange={(e) => {setTitle(e.target.value);}}
        />

        <label>
          Date <b style={{ color: "#f56457" }}>*</b>
        </label>
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => {setDate(e.target.value);}}
        />

        <label>Location</label>
        <input placeholder="latitude"
          type="number" step="0.01" 
          name="latitude"
          value={latitude}
          onChange={(e) => {setLatitude(e.target.value);}}
        />

        <input placeholder="longitude"
          type="number" step="0.01"
          name="longitude"
          value={longitude}
          onChange={(e) => {setLongitude(e.target.value);}}
        />

        <label>
          Description <b style={{ color: "#f56457" }}>*</b>
        </label>
        <input required={true}
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
