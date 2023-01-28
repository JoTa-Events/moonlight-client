import "./components-css/Form.css"; // css
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authForAPI from "../utils/authForAPI";
import service from "../service";

// importing arrays for countries and capital cities
import cityArr from "../data/capitalCity";
import countryArr from "../data/countries";

export default function CreateEvent(props) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [isUploadingImage, setIsUploadingImage] = useState(false);

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

  // posting the creating of a new event
  const handleSubmit = (e) => {
    e.preventDefault();

    const author = user._id;
    const requestBody = {
      title,
      date,
      country,
      city,
      description,
      author,
      image,
    };

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/events`,
        requestBody,
        authForAPI()
      )
      .then((response) => {
        navigate("/events");
        // resetting form fields
        setTitle("");
        setDate("");
        setCountry("");
        setCity("");
        setDescription("");
        setImage("");

        props.createCallback(requestBody);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="FormEvent">
      <form className="form-box" onSubmit={handleSubmit}>
        <h1>Submit an event</h1>
        <label>
          Title <b style={{ color: "#f56457" }}>*</b>
        </label>
        <input
          required={true}
          type="text"
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
          required={true}
          type="date"
          name="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />

        <label>Country</label>
        <select
          name="country"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        >
          <option value="">Select one</option>
          {countryArr.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>

        <label>City</label>
        <select
          name="city"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        >
          <option value="">Select one</option>
          {cityArr.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>

        <label>
          Description <b style={{ color: "#f56457" }}>*</b>
        </label>
        <input
          required={true}
          as="textarea"
          rows={5}
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
      </form>
    </div>
  );
}