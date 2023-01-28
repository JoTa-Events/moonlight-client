import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import dayjs from 'dayjs';
import ChatBox from '../components/ChatBox';
import { Link, NavLink } from 'react-router-dom';

export default function MyProfile({eventsList}) {

const { user } = useContext(AuthContext);

// my chats list
const myChatsList = eventsList?.filter((event) => {
    if(event.participants?.includes(user?._id)){
        return event
    }
})

const renderMyChats = () => {
  return (
    <Tabs className="Tabs">
      <TabList>
        {myChatsList.map((event) => (
          <Tab key={event._id}>
            {event.title}
          </Tab>
        ))}
      </TabList>
      {myChatsList.map((event) => (
        <TabPanel key={event._id}>
          <ChatBox eventId={event._id} />
        </TabPanel>
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
    <div style={{display: "flex", margin: "30px" }}>
      {myEventsList.map((event) => (
        <div key={event._id} style={{ border: "1px solid", width: "20%", wordWrap: "break-word", margin: "0 10px"}}>

          <Link to={`/events/${event._id}`}>
          <h2>{event.title}</h2>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="icon icon-tabler icon-tabler-arrow-narrow-right" 
            width={25} 
            height={25}
            viewBox="0 0 24 24" 
            strokeWidth="1" 
            stroke="currentColor" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M5 12l14 0"></path>
            <path d="M15 16l4 -4"></path>
            <path d="M15 8l4 4"></path>
          </svg>

          </Link>
          <img src={event.image} alt='' style={{width: "300px"}} />
          <p>{dayjs(event.date).format("ddd DD MMM YYYY")}</p>
          <p>{event.location}</p>
          <p>
            <i>{event.description}</i>
          </p>
        </div>
      ))}
    </div>
  );
};

  return (
    <div className="profile">
      <Tabs className="Tabs">
        <TabList>
          <Tab>My events</Tab>
          <Tab>Chats</Tab>
          <Tab>?</Tab>
        </TabList>

        <TabPanel>
          {!myEventsList ? "Loading..." : renderMyEvents()}
        </TabPanel>

        <TabPanel>
          {!myChatsList ? "Loading..." : renderMyChats()}
        </TabPanel>

        <TabPanel>
          <p>Tab 3 works!</p>
        </TabPanel>
      </Tabs>
    </div>
  );
}
