import "./pages-css/Form.css"; // css
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authForAPI from "../utils/authForAPI";
import service from "../service";

// default events image
const DefaultImage =
  "https://res.cloudinary.com/douen1dwv/image/upload/v1675155618/moonlight-default-img/photo-1551370764-98cd16e274f9_btrxyn.jpg";

export default function CreateEvent(props) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(DefaultImage);

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
    const requestBody = { title, date, description, author, image };

    // get request: cities
    axios
      .get(
        `https://nominatim.openstreetmap.org/search?city=${location}&format=json`
      )
      .then((response) => {
        const latitude = response.data[0].lat;
        const longitude = response.data[0].lon;
        const city = response.data[0].display_name;

        requestBody.location = {
          type: "point",
          coordinates: [latitude, longitude],
          city
        };

        return axios.post(
          `${process.env.REACT_APP_API_URL}/api/events`,
          requestBody,
          authForAPI()
        );
      })
      .then((response) => {
        navigate("/events");

        // resetting form fields
        setTitle("");
        setDate("");
        setLocation("");
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

        <label>
          City <b style={{ color: "#f56457" }}>*</b>
        </label>
        <input
          required={true}
          autoComplete="off"
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
        <input
          required={true}
          autoComplete="off"
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