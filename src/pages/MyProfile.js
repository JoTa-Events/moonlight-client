import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import dayjs from 'dayjs';

export default function MyProfile({eventsList}) {

  const {user} = useContext(AuthContext);

  const myEventsList = eventsList?.filter((eventDetail) => {
    return eventDetail.author._id === user._id;
  });

  const renderMyEvents = () => {
    return(
        <>
            {myEventsList.map(event => (
               <div key={event._id} style={{border: "1px solid"}}>
                    <h1>{event.title}</h1>
                    <p>{dayjs(event.date).format("ddd DD MMM YYYY")}</p>
                    <p>{event.location}</p>
                    <p><i>{event.description}</i></p>
               </div>
            ))}
        </>
    )
  }

  return (

    <div className='profile'>
       <Tabs className="Tabs">
        <TabList>
          <Tab>My events</Tab>
          <Tab>Chats</Tab>
          <Tab>?</Tab>
        </TabList>
        <TabPanel>
          <p>
          {!myEventsList ? "Loading..." : renderMyEvents()}
          </p>
        </TabPanel>
        <TabPanel>
          <p>
            this is the chat
          </p>
        </TabPanel>
        <TabPanel>
          <p>Tab 3 works!</p>
        </TabPanel>
      </Tabs>
      
    </div>
  );
}
