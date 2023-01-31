import axios from "axios";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";

import service from "../service";
import authForAPI from "../utils/authForAPI";
import capitalize from "../utils/capitalize";

export default function MyProfileDetails(props) {
  const API_URL = process.env.REACT_APP_API_URL;

  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [isFormHidden, setIsFormHidden] = useState(true);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const today = dayjs().startOf("day");

  // get userdata from API & updates when the avatar is updated
  useEffect(() => {
    axios
      .get(`${API_URL}/api/my-profile`, authForAPI())
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(`error getting the data from ${user.username}`);
      });
  }, [avatar]);

  // Upload image to cloudinary
  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    setIsUploadingImage(true);

    service
      .uploadImage(uploadData)
      .then((response) => {
        setAvatar(response.fileUrl);
      })
      .catch((error) => console.log("Error while uploading the file: ", error))
      .finally(() => {
        setIsUploadingImage(false);
      });
  };

    // handle buttons //
  //update avatar in our DataBase
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!e.target.form.checkValidity()) {
      return;
    }
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
        handleDisplayForm();
        setAvatar("");
        e.target.form.reset();
      });
  };

  const handleDisplayForm = () => {
    setIsFormHidden((prevState) => {
      return !prevState;
    });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    e.target.form.reset();
    setIsFormHidden((prevState) => {
      return !prevState;
    });
    setAvatar(null);
  };

  //render the page
  const renderUserData = () => {
    return (
      <div className="profile-details-container">
        <div className="profile-img-container">
          <img className="profile-avatar" src={userData.avatar} alt="avatar" />
        </div>

        <h1>{capitalize(userData.username)}</h1>
        <h4>Email: {userData.email}</h4>
        <span>
          A Moonlight member for <b>{dayjs(today).diff(userData.createdAt, "day")}</b> days
        </span>

        <br /><br />
        
        <button hidden={!isFormHidden} onClick={handleDisplayForm}>
          Update avatar
        </button>

        <div hidden={isFormHidden}>
          <form>
            <input required type="file" onChange={handleFileUpload} />

            {isUploadingImage ? (
              <button type="submit" disabled>
                Uploading
              </button>
            ) : (
              <button onClick={handleSubmit} type="submit">
                Submit
              </button>
            )}

            <button onClick={(e) => {handleCancel(e);}}> x </button>
          </form>

          {avatar && (
            <img
              className="profile-avatar"
              src={avatar}
              alt="Uploaded-avatar"
            />
          )}
        </div>
      </div>
    );
  };

  return <>{!userData ? "Loading..." : renderUserData()}</>;
}
