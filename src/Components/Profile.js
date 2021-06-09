import React, { useEffect, useRef, useState } from "react";
import "../style/NoSidebar.css";
import "../style/profile.css";
import Desk from "./Desk";
import Activities from "./Activities";
import School from "./School";
import Notes from "./Notes";
import ImportContactsOutlinedIcon from "@material-ui/icons/ImportContactsOutlined";
import HistoryIcon from "@material-ui/icons/History";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
import BookOutlinedIcon from "@material-ui/icons/BookOutlined";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import NavItems from "./NavItems";
import { getSchoolByUserId } from "./Api";
import { Route } from "react-router-dom";
import ProfileImage from "../images/wl.jpeg";
import GetUser from "./UserContext";
import { getUserByUsername } from "./Api";
import axios from "axios";

export default function Profile(props) {
  var c_user, c_id;
  const user_data = GetUser();
  if (user_data.data) {
    c_user = user_data.data[0].username;
    c_id = user_data.data[0].id;
  }
  const [user, setUser] = useState({});
  const [schoolCount, setSchoolCount] = useState("");
  // @TODO add the value of username inside the cookie.....
  const Username = props.match.params.username;
  async function fetchData() {
    const user = await getUserByUsername(Username);
    if (user.data.length > 0) {
      setUser(user.data[0]);
    }
  }
  const {
    id,
    name,
    username,
    email,
    bio,
    location,
    profile_image_url,
    twitter,
    url,
    institute,
  } = user;
  useEffect(async () => {
    const schoolCount = await (await getSchoolByUserId(id)).data.length;
    setSchoolCount(schoolCount);
  }, [id]); //getting user details by username
  useEffect(async () => {
    fetchData();
  }, [username]); //getting user details by username

  const my_profile = username === c_user;
  const [isSticky, setSticky] = useState(false);
  const [isfollowing, setFollow] = useState(false);
  const [isEditing, setEdit] = useState(false);
  const ref = useRef(null);
  const handleScroll = () => {
    if (ref.current) {
      setSticky(ref.current.getBoundingClientRect().top <= 0);
    }
  };
  const handleFollow = () => {
    setFollow(!isfollowing);
  };
  const handleEdit = () => {
    setEdit(!isEditing);
  };
  const cancelEdit = () => {
    setEdit(false);
  };

  const handleSubmit = async (e) => {
    for (var i = 0; i < 6; i++) {
      if (!e.target[i].value) {
        e.target[i].value = "";
      }
    }
    const submitData = {
      bio: e.target[0].value,
      institute: e.target[1].value,
      location: e.target[2].value,
      email: e.target[3].value,
      url: e.target[4].value,
      twitter: e.target[5].value,
    };
    e.preventDefault();
    const response = await axios.put(
      `http://localhost:8000/api/v1/user/${c_id}`,
      submitData,
      {
        withCredentials: true,
      }
    );
    fetchData();
    cancelEdit();
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, []);
  return (
    <div className="profile-all no-sidebar">
      <div className="content">
        <div className="space"></div>
        <div className="profile-head full-width border-bottom" ref={ref}>
          <div className="cn">
            <div className="expand">
              <div className="left"></div>
              <div className="right">
                <ul className={isSticky ? "head profile-nav" : "profile-nav"}>
                  <NavItems
                    Path={`/${username}`}
                    Title="Desk"
                    exact
                    Icon={ImportContactsOutlinedIcon}
                  />
                  <NavItems
                    Path={`/${username}/activities`}
                    Title="Activites"
                    Icon={HistoryIcon}
                  />
                  <NavItems
                    Path={`/${username}/school`}
                    Title="School"
                    Icon={SchoolOutlinedIcon}
                    Count={schoolCount}
                  />
                  <NavItems
                    Path={`/${username}/notes`}
                    Title="Notes"
                    Icon={BookOutlinedIcon}
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-body cn">
          <div className="expand">
            <div className="left">
              <div className="profile-cover">
                <div className="display-profile">
                  <img
                    className="avatar-user"
                    width="260"
                    height="260"
                    src={ProfileImage}
                  />
                </div>
              </div>
              {c_user ? (
                <div className="info">
                  <div className="nc">
                    <div className="name">{name ? name : ""}</div>
                    <div className="username">{username}</div>
                  </div>
                  {my_profile ? (
                    <div
                      className="editInfo"
                      hidden={!isEditing ? `hidden` : ``}
                    >
                      <form
                        method="post"
                        onSubmit={(e) => {
                          handleSubmit(e);
                        }}
                      >
                        <textarea
                          className="edit-bio"
                          max-length="160"
                          placeholder="Add a bio"
                          id="bio"
                          defaultValue={bio}
                        ></textarea>
                        <div className="input-container">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19,2H9C7.897,2,7,2.897,7,4v6H5c-1.103,0-2,0.897-2,2v9c0,0.552,0.447,1,1,1h8h8c0.553,0,1-0.448,1-1V4 C21,2.897,20.103,2,19,2z M5,12h3h3v2v2v4H5V12z M19,20h-6v-4v-2v-2c0-1.103-0.897-2-2-2H9V4h10V20z" />
                            <path d="M11 6H13V8H11zM15 6H17V8H15zM15 10.031H17V12H15zM15 14H17V16H15zM7 14.001H9V16.000999999999998H7z" />
                          </svg>
                          <input
                            className="edit-info"
                            placeholder="Institute or company"
                            defaultValue={institute}
                            id="institute"
                          />
                        </div>
                        <div className="input-container">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#000000"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z" />
                          </svg>
                          <input
                            className="edit-info"
                            placeholder="Location"
                            defaultValue={location}
                            id="location"
                          />
                        </div>
                        <div className="input-container">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#000000"
                          >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
                          </svg>
                          <input
                            className="edit-info"
                            placeholder="Email"
                            defaultValue={email}
                            id="email"
                          />
                        </div>
                        <div className="input-container">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24 "
                          >
                            <path d="M8.465,11.293c1.133-1.133,3.109-1.133,4.242,0L13.414,12l1.414-1.414l-0.707-0.707c-0.943-0.944-2.199-1.465-3.535-1.465 S7.994,8.935,7.051,9.879L4.929,12c-1.948,1.949-1.948,5.122,0,7.071c0.975,0.975,2.255,1.462,3.535,1.462 c1.281,0,2.562-0.487,3.536-1.462l0.707-0.707l-1.414-1.414l-0.707,0.707c-1.17,1.167-3.073,1.169-4.243,0 c-1.169-1.17-1.169-3.073,0-4.243L8.465,11.293z" />
                            <path d="M12,4.929l-0.707,0.707l1.414,1.414l0.707-0.707c1.169-1.167,3.072-1.169,4.243,0c1.169,1.17,1.169,3.073,0,4.243 l-2.122,2.121c-1.133,1.133-3.109,1.133-4.242,0L10.586,12l-1.414,1.414l0.707,0.707c0.943,0.944,2.199,1.465,3.535,1.465 s2.592-0.521,3.535-1.465L19.071,12c1.948-1.949,1.948-5.122,0-7.071C17.121,2.979,13.948,2.98,12,4.929z" />
                          </svg>
                          <input
                            className="edit-info"
                            placeholder="Website"
                            defaultValue={url}
                            id="url"
                          />
                        </div>
                        <div className="input-container">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24 "
                          >
                            <path d="M19.633,7.997c0.013,0.175,0.013,0.349,0.013,0.523c0,5.325-4.053,11.461-11.46,11.461c-2.282,0-4.402-0.661-6.186-1.809        c0.324,0.037,0.636,0.05,0.973,0.05c1.883,0,3.616-0.636,5.001-1.721c-1.771-0.037-3.255-1.197-3.767-2.793 c0.249,0.037,0.499,0.062,0.761,0.062c0.361,0,0.724-0.05,1.061-0.137c-1.847-0.374-3.23-1.995-3.23-3.953v-0.05    c0.537,0.299,1.16,0.486,1.82,0.511C3.534,9.419,2.823,8.184,2.823,6.787c0-0.748,0.199-1.434,0.548-2.032  c1.983,2.443,4.964,4.04,8.306,4.215c-0.062-0.3-0.1-0.611-0.1-0.923c0-2.22,1.796-4.028,4.028-4.028       c1.16,0,2.207,0.486,2.943,1.272c0.91-0.175,1.782-0.512,2.556-0.973c-0.299,0.935-0.936,1.721-1.771,2.22  c0.811-0.088,1.597-0.312,2.319-0.624C21.104,6.712,20.419,7.423,19.633,7.997z" />
                          </svg>
                          <input
                            className="edit-info"
                            placeholder="Twitter username"
                            defaultValue={twitter}
                            id="twitter"
                          />
                        </div>
                        <div className="edit-button">
                          <input type="submit" defaultValue="Save" />
                          <input
                            type="button"
                            className="cancelEdit"
                            onClick={cancelEdit}
                            defaultValue="Cancel"
                          />
                        </div>
                      </form>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="userInfo" hidden={isEditing ? `hidden` : ``}>
                    <input
                      type="button"
                      className="follow-button"
                      onClick={my_profile ? handleEdit : handleFollow}
                      defaultValue={my_profile ? "Edit profile" : "Follow"}
                    />
                    {bio ? <div className="bio">{bio}</div> : ""}

                    <div className="box">
                      <span className="icon">
                        <PeopleOutlineIcon style={{ fontSize: "20px" }} />
                      </span>
                      <span className="followers">
                        <span className="num"> 2168 </span>
                        <span className="text"> followers </span>
                      </span>
                      •
                      <span className="following">
                        <span className="num"> 16 </span>
                        <span className="text"> following </span>
                      </span>
                    </div>
                    <div className="extra-info">
                      {institute ? (
                        <div className="company line">
                          <span className="icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M19,2H9C7.897,2,7,2.897,7,4v6H5c-1.103,0-2,0.897-2,2v9c0,0.552,0.447,1,1,1h8h8c0.553,0,1-0.448,1-1V4 C21,2.897,20.103,2,19,2z M5,12h3h3v2v2v4H5V12z M19,20h-6v-4v-2v-2c0-1.103-0.897-2-2-2H9V4h10V20z" />
                              <path d="M11 6H13V8H11zM15 6H17V8H15zM15 10.031H17V12H15zM15 14H17V16H15zM7 14.001H9V16.000999999999998H7z" />
                            </svg>
                          </span>
                          <span className="text">{institute}</span>
                        </div>
                      ) : (
                        ""
                      )}
                      {location ? (
                        <div className="place line">
                          <span className="icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="#000000"
                            >
                              <path d="M0 0h24v24H0z" fill="none" />
                              <path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z" />
                            </svg>
                          </span>
                          <span className="text">{location}</span>
                        </div>
                      ) : (
                        ""
                      )}
                      {email ? (
                        <div className="mail line">
                          <span className="icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="#000000"
                            >
                              <path d="M0 0h24v24H0V0z" fill="none" />
                              <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
                            </svg>
                          </span>
                          <span className="text">{email}</span>
                        </div>
                      ) : (
                        ""
                      )}
                      {url ? (
                        <div className="website line">
                          <span className="icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24 "
                            >
                              <path d="M8.465,11.293c1.133-1.133,3.109-1.133,4.242,0L13.414,12l1.414-1.414l-0.707-0.707c-0.943-0.944-2.199-1.465-3.535-1.465 S7.994,8.935,7.051,9.879L4.929,12c-1.948,1.949-1.948,5.122,0,7.071c0.975,0.975,2.255,1.462,3.535,1.462 c1.281,0,2.562-0.487,3.536-1.462l0.707-0.707l-1.414-1.414l-0.707,0.707c-1.17,1.167-3.073,1.169-4.243,0 c-1.169-1.17-1.169-3.073,0-4.243L8.465,11.293z" />
                              <path d="M12,4.929l-0.707,0.707l1.414,1.414l0.707-0.707c1.169-1.167,3.072-1.169,4.243,0c1.169,1.17,1.169,3.073,0,4.243 l-2.122,2.121c-1.133,1.133-3.109,1.133-4.242,0L10.586,12l-1.414,1.414l0.707,0.707c0.943,0.944,2.199,1.465,3.535,1.465 s2.592-0.521,3.535-1.465L19.071,12c1.948-1.949,1.948-5.122,0-7.071C17.121,2.979,13.948,2.98,12,4.929z" />
                            </svg>
                          </span>
                          <span className="text">{url} </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {twitter ? (
                        <div className="twitter line">
                          <span className="icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24 "
                            >
                              <path d="M19.633,7.997c0.013,0.175,0.013,0.349,0.013,0.523c0,5.325-4.053,11.461-11.46,11.461c-2.282,0-4.402-0.661-6.186-1.809        c0.324,0.037,0.636,0.05,0.973,0.05c1.883,0,3.616-0.636,5.001-1.721c-1.771-0.037-3.255-1.197-3.767-2.793 c0.249,0.037,0.499,0.062,0.761,0.062c0.361,0,0.724-0.05,1.061-0.137c-1.847-0.374-3.23-1.995-3.23-3.953v-0.05    c0.537,0.299,1.16,0.486,1.82,0.511C3.534,9.419,2.823,8.184,2.823,6.787c0-0.748,0.199-1.434,0.548-2.032  c1.983,2.443,4.964,4.04,8.306,4.215c-0.062-0.3-0.1-0.611-0.1-0.923c0-2.22,1.796-4.028,4.028-4.028       c1.16,0,2.207,0.486,2.943,1.272c0.91-0.175,1.782-0.512,2.556-0.973c-0.299,0.935-0.936,1.721-1.771,2.22  c0.811-0.088,1.597-0.312,2.319-0.624C21.104,6.712,20.419,7.423,19.633,7.997z" />
                            </svg>
                          </span>
                          <span className="text">@{twitter} </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="right">
              <div className="right-container">
                <Route path={`/${username}`} exact component={Desk} />
                <Route
                  path={`/${username}/activities`}
                  component={Activities}
                />
                <Route
                  path={`/${username}/school`}
                  render={() => (
                    <School
                      username={username}
                      userId={id}
                      c_id={c_id}
                      isMyProfile={my_profile}
                      {...props}
                    />
                  )}
                />
                <Route path={`/${username}/notes`} component={Notes} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
