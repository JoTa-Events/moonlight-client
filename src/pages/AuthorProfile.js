import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FutureEvents from "../components/FutureEvents";
import PastEvents from "../components/PastEvents";
import capitalize from "../utils/capitalize";

import "./pages-css/AuthorProfile.css";

export default function AuthorProfile() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [authorData, setAuthorData] = useState(null);
  const { username } = useParams();
  const today = dayjs().startOf("day");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/profile/${username}`)
      .then((response) => {
        setAuthorData(response.data);
      })
      .catch((error) => {
        console.log(`Error getting the data from "${username}"`, error);
      });
  }, []);

  const renderAuthorEvents = () => {
    return (
      <div className="author-profile-events">
        <FutureEvents eventsList={authorData.events} fromDate={today} />

        <PastEvents eventsList={authorData.events} fromDate={today} />
      </div>
    );
  };

  const renderAuthorProfile = () => {
    return (
      <div className="AuthorProfile">
        <div className="author-profile-container">
          <img src={authorData.author.avatar} alt="avatar" />

          <h1>{capitalize(authorData.author.username)}</h1>
          <p>
            A Moonlight member for{" "}
            <b>{dayjs(today).diff(authorData.author.createdAt, "day")}</b>{" "}
            day(s)
          </p>
        </div>
      </div>
    );
  };
  
  return (
    <div className="author-profile-page">
      {!authorData 
      ? (<div className="loader">Loading...</div>) 
      : (
        <>
          {renderAuthorProfile()}

          {renderAuthorEvents()}
        </>
      )}
    </div>
  );
}
