import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import authForAPI from "../utils/authForAPI";
import service from "../service";
import "./pages-css/Form.css";

import dayjs from "dayjs";
import getStringUntilComa from "../utils/getStringUntilComa";

export default function EditEvent(props) {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [errorMessage, setErrorMessage] = useState(undefined);

  // uploading image
  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    setIsUploadingImage(true);

    service
      .uploadImage(uploadData)
      .then((response) => {
        setImage(response.fileUrl);
      })
      .catch((error) => console.log("Error while uploading the file: ", error))
      .finally(() => {
        setIsUploadingImage(false);
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/events/${eventId}`)
      .then((response) => {
        const event = response.data;
        setTitle(event.title);
        setDate(dayjs(event.date).format("YYYY-MM-DD"));
        setLocation(event.location.city);
        setDescription(event.description);
        setImage(event.image);
      })
      .catch((error) => console.log(error));
  }, [eventId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, date, description, image };

    let cityToSend = getStringUntilComa(location);

    // get request: cities
    axios
      .get(
        `https://nominatim.openstreetmap.org/search?city=${cityToSend}&format=json`
      )
      .then((response) => {
        const latitude = response.data[0].lat;
        const longitude = response.data[0].lon;
        const city = response.data[0].display_name;

        requestBody.location = {
          type: "point",
          coordinates: [latitude, longitude],
          city,
        };

        return axios.put(
          `${process.env.REACT_APP_API_URL}/api/events/${eventId}`,
          requestBody,
          authForAPI()
        );
      })
      .then((response) => {
        navigate(`/events/${eventId}`);

        props.updateEvent(requestBody);
      })
      .catch((error) => {
        const errorDescription = error.response
          ? error.response.data.message
          : "Error when updating the event";

        setErrorMessage(errorDescription);
        console.log("Error when updating the new event", error);
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
          autoComplete="off"
          required={true}
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <label>
          Date <b style={{ color: "#f56457" }}>*</b>
        </label>
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />

        <label>
          City <b style={{ color: "#f56457" }}>*</b>
        </label>
        <input
          required={true}
          autoComplete="off"
          placeholder="city"
          type="text"
          name="location"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />

        <label>
          Description <b style={{ color: "#f56457" }}>*</b>
        </label>
        <textarea
          autoComplete="off"
          required={true}
          name="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <label>Upload Image</label>
        <input
          style={{ backgroundColor: "white" }}
          type="file"
          onChange={(e) => handleFileUpload(e)}
        />

        {isUploadingImage ? (
          <button type="submit" disabled>
            Uploading
          </button>
        ) : (
          <button type="submit">Submit</button>
        )}

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}
