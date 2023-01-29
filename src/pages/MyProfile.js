import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import dayjs from "dayjs";
import ChatBox from "../components/ChatBox";
import { Link } from "react-router-dom";
import "./pages-css/Profile.css";
import service from "../service"
import axios from 'axios';

const DefaultImage = 'https://res.cloudinary.com/douen1dwv/image/upload/v1674988751/moonlight-default-img/photo-1674094170431-000e0edbc342_qb8ru0.jpg'


export default function MyProfile({ eventsList }) {
  const { user } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(DefaultImage);

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
              <Tab key={event._id}>{event.title}</Tab>
            ))}
          </TabList>
        </>
        {myChatsList.map((event) => (
          <div className='ChatBox'>
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
                <div class="card-header">
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
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  // myprofile
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
      .finally ( () => {
        // setIsUploadingImage(false)
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { avatar};

    axios
      .put(`${process.env.REACT_APP_API_URL}/api/profile/${user.username}`, requestBody)
      .then((response) => {
          setAvatar("")

          // props.createCallback(requestBody);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="profile">
      <Tabs className="Tabs">
        <TabList>
          <Tab>My events</Tab>
          <Tab>Chats</Tab>
          <Tab>?</Tab>
        </TabList>

        <TabPanel>{!myEventsList ? "Loading..." : renderMyEvents()}</TabPanel>

        <TabPanel>{!myChatsList ? "Loading..." : renderMyChats()}</TabPanel>

        <TabPanel>
          <p>Tab 3 works!</p>

          <img src={user?.avatar} alt="" />
          <h1>{user?.username}</h1>

          <div>
            <form onSubmit={handleSubmit}>
              <input type="file" onChange={handleFileUpload} />
              <button type="submit">Upload</button>
            </form>
            {avatar && <img src={user?.avatar} alt="Uploaded Image" />}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
