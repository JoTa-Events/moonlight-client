import axios from "axios";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";

import service from "../service";
import authForAPI from "../utils/authForAPI";
import capitalize from "../utils/capitalize";

import { IconUpload, IconLoader, IconCircleCheck } from "@tabler/icons-react";

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
    handleDisplayForm();

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
  // update avatar in our DataBase
  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!e.target.form.checkValidity()) {
    //   return;
    // }
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
        setAvatar("");
      });
  };

  const handleDisplayForm = () => {
    setIsFormHidden((prevState) => {
      return !prevState;
    });
  };

  //render the page
  const renderUserData = () => {
    return (
      <div className="profile-details-container">
        <div className="profile-container">
          <img className="profile-avatar" src={userData?.avatar} alt="avatar" />

          <form onSubmit={handleSubmit}>
            <label htmlFor="fileField">
              <IconUpload width={25} />
            </label>

            <input
              required
              id="fileField"
              type="file"
              hidden={true}
              onChange={handleFileUpload}
            />

            {isFormHidden ? (
              ""
            ) : (
              <>
                {isUploadingImage ? (
                  <button type="submit" disabled>
                    <IconLoader width={25} style={{ color: "#f56457" }} />
                  </button>
                ) : (
                  <button type="submit">
                    <IconCircleCheck width={25} style={{ color: "green" }} />
                  </button>
                )}
              </>
            )}
          </form>
        </div>

        <h1>{capitalize(userData.username)}</h1>
        <h4>Email: {userData.email}</h4>
        <span>
          A Moonlight member for{" "}
          <b>{dayjs(today).diff(userData.createdAt, "day")}</b> days
        </span>
      </div>
    );
  };

  return (
    <>
      {!userData ? <div className="loader">Loading...</div> : renderUserData()}
    </>
  );
}
