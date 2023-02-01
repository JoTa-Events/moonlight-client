import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import MyProfileDetails from "../components/MyProfileDetails";
import MyEventsList from "../components/MyEventsList";
import MyChatsList from "../components/MyChatsList";
import "./pages-css/Profile.css";
import "../components/components-css/Card.css"
import { useState } from "react";

export default function MyProfile(props) {
  const { deleteCallback, eventsList, getAllEvents } = props;
  const [reRender,setReRender] = useState(false)

  return (
    <div className="profile">
      <Tabs>
        <TabList>
          <Tab>Events</Tab>
          <Tab>Chats</Tab>
          <Tab>Profile</Tab>
        </TabList>

        <TabPanel>
          <MyEventsList
            deleteCallback={deleteCallback}
            eventsList={eventsList}
          />
        </TabPanel>

        <TabPanel>
          <MyChatsList reRender={reRender} getAllEvents={getAllEvents} setReRender={setReRender} eventsList={eventsList} />
        </TabPanel>

        <TabPanel>
          <MyProfileDetails />
        </TabPanel>
      </Tabs>
    </div>
  );
}
