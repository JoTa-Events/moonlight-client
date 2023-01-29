import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import dayjs from "dayjs";
import ChatBox from "../components/ChatBox";
import { Link } from "react-router-dom";
import "./pages-css/Profile.css";
import service from "../service";
import axios from "axios";
import authForAPI from "../utils/authForAPI";
import capitalize from "../utils/capitalize";

export default function MyProfile({ eventsList, deleteCallback }) {
  const API_URL = process.env.REACT_APP_API_URL;
  const today = dayjs().startOf("day");
  const [isFormHidden, setIsFormHidden] = useState(true);
  const { user } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    console.log(`cuantas veces se actica esto`);
    axios
      .get(`${API_URL}/api/my-profile`, authForAPI())
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(`error getting the data from ${user.username}`);
      });
  }, [avatar]);

  // my chats list
  const myChatsList = eventsList?.filter((event) => {
    if (event.participants?.includes(user?._id)) {
      return event;
    }
  });

  const renderMyChats = () => {
    return (
      <Tabs className="chat-container">
        <>
          <TabList className="chat-list">
            {myChatsList.map((event) => (
              <Tab style={{ border: "1px solid #282c34" }} key={event._id}>
                {event.title}
              </Tab>
            ))}
          </TabList>
        </>
        {myChatsList.map((event) => (
          <div className="ChatBox">
            <TabPanel key={event._id}>
              <ChatBox eventId={event._id} />
            </TabPanel>
          </div>
        ))}
      </Tabs>
    );
  };

  // my events list
  const myEventsList = eventsList?.filter((eventDetail) => {
    return eventDetail.author._id === user?._id;
  });

  const renderMyEvents = () => {
    return (
      <div className="container">
        {myEventsList.map((event) => (
          <div key={event._id}>
            <Link to={`/events/${event._id}`}>
              <div className="card">
                <div className="card-header">
                  <img src={event.image} alt="" />
                </div>
                <div className="card-body">
                  <h3>{event.title}</h3>
                  <br />
                  <p>{event.description}</p>
                  <p>{event.location}</p>

                  <div className="date">
                    <h5>{dayjs(event.date).format("ddd DD MMM YYYY")}</h5>
                  </div>

                  {event.author?.username === user?.username && (
                    <div className="edit-delete">
                      <Link to={`/events/edit/${event._id}`}>Edit</Link>
                      <Link
                        to="/profile"
                        onClick={() => deleteCallback(event._id)}
                      >
                        Delete
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  // ---------myprofile----------

  const renderUserData = () => {
    return (
      <div className="profile-details-container">
        <div className="profile-img-container">
          <img className="profile-avatar" src={userData.avatar} alt="avatar" />
        </div>
        <h1>{capitalize(userData.username)}</h1>
        <h3>email: {userData.email}</h3>
        <h4>
          A Moonlight member for {dayjs(today).diff(userData.createdAt, "day")}{" "}
          days
        </h4>
        <button hidden={!isFormHidden} onClick={hideDisplayForm}>
          Update avatar
        </button>
        <div hidden={isFormHidden}>
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileUpload} />
            <button type="submit">Upload</button>
          </form>
          {avatar && (
            <img
              className="profile-avatar"
              style={{ width: "100px" }}
              src={avatar}
              alt="Uploaded-avatar"
            />
          )}
        </div>
      </div>
    );
  };
  const hideDisplayForm = () => {
    setIsFormHidden((prevState) => {
      return !prevState;
    });
  };

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    // setIsUploadingImage(true);

    service
      .uploadImage(uploadData)
      .then((response) => {
        setAvatar(response.fileUrl);
      })
      .catch((error) => console.log("Error while uploading the file: ", error))
      .finally(() => {
        // setIsUploadingImage(false)
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { avatar };

    axios
      .put(`${API_URL}/api/my-profile`, requestBody, authForAPI())
      .then((response) => {
        // props.createCallback(requestBody);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        hideDisplayForm();
        setAvatar("");
      });
  };

  return (
    <div className="profile">
      <Tabs className="Tabs">
        <TabList>
          <Tab>My events</Tab>
          <Tab>Chats</Tab>
          <Tab>My Profile</Tab>
        </TabList>

        <TabPanel>{!myEventsList ? "Loading..." : renderMyEvents()}</TabPanel>

        <TabPanel>{!myChatsList ? "Loading..." : renderMyChats()}</TabPanel>

        <TabPanel>{!userData ? "Loading..." : renderUserData()}</TabPanel>
      </Tabs>
    </div>
  );
}
