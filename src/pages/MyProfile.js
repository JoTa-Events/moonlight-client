import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import MyProfileDetails from "../components/MyProfileDetails";
import MyEventsList from "../components/MyEventsList";
import MyChatsList from "../components/MyChatsList";
import "./pages-css/Profile.css";
import "../components/components-css/Card.css"

export default function MyProfile(props) {
  const { deleteCallback, eventsList } = props;

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
          <MyChatsList eventsList={eventsList} />
        </TabPanel>

        <TabPanel>
          <MyProfileDetails />
        </TabPanel>
      </Tabs>
    </div>
  );
}
