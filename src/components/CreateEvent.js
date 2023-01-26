import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";
import authForAPI from "../utils/authForAPI";

import service from "../service"

// import arrays for countries and capital cities
import cityArr from "../data/capitalCity"
import countryArr from "../data/countries"

export default function CreateEvent(props) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  
  const {user}  = useContext(AuthContext)

  // uploading image
  const handleFileUpload = (e) => {
    const uploadData = new FormData();

    uploadData.append("image", e.target.files[0]);

    setIsUploadingImage(true);

    service
      .uploadImage(uploadData)
      .then((response) => {
        setImage(response.fileUrl);
        console.log(image)
      })
      .catch((err) => console.log("Error while uploading the file: ", err))
      .finally ( () => {
        setIsUploadingImage(false)
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const author = user._id
    const newEventDetails = { title, date, country, city, description, author, image};

    axios
        .post(`${process.env.REACT_APP_API_URL}/api/events`, newEventDetails, authForAPI())
        .then((response) => {
            navigate("/events");

            setTitle("");
            setDate("");
            setCountry("");
            setCity("")
            setDescription("");
            setImage("")
            props.createCallback(newEventDetails);
        })
        .catch((error) => console.log(error));
  };


  return (
    <div className="CreateEvent">
      <h1>Submit an event</h1>

        <Form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", width: "40%", margin: "auto" }} >
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            required={true}
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />

          <Form.Label>Country</Form.Label>
          <Form.Select  name="country" value={country} onChange={(e) => {setCountry(e.target.value); }}>
            <option value="">Select one</option>
            {countryArr.map(country => 
              <option value={country}>{country}</option>
            )}
          </Form.Select>

          <Form.Label>City</Form.Label>
          <Form.Select  name="city" value={city} onChange={(e) => {setCity(e.target.value); }}>
            <option value="">Select one</option>
            {cityArr.map(city =>
              <option value={city}>{city}</option>
            )}
          </Form.Select>

          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

          <input type="file" onChange={(e) => handleFileUpload(e)} />

            { isUploadingImage 
            ? <Button type="submit" disabled variant="dark">Uploading</Button>
            : <Button type="submit" variant="dark">Create</Button>
            }
        </Form>

    </div>
  );
}

