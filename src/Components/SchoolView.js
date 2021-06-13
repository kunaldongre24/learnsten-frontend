import React, { useEffect, useRef, useState } from "react";
import "../style/SchoolView.css";
import "../style/NoSidebar.css";
import "../style/profile.css";
import Desk from "./Desk";
import Activities from "./Activities";
import Courses from "./Courses";
import Notes from "./Notes";
import AboutSchool from "./AboutSchool";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import VideoLibraryOutlinedIcon from "@material-ui/icons/VideoLibraryOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import BookOutlinedIcon from "@material-ui/icons/BookOutlined";
import NavItems from "./NavItems";
import { Route, Switch } from "react-router-dom";
import GetUser from "./UserContext";
import { getSchoolBySchoolId, getUserById, getUserByUsername } from "./Api";

export default function SchoolView(props) {
  const [schoolData, setSchoolData] = useState({});
  const schoolId = props.match.params.schoolId;
  useEffect(async () => {
    const schoolData = await getSchoolBySchoolId(schoolId);
    setSchoolData(schoolData.data[0]);
  }, []);
  var c_user, c_id;
  const user_data = GetUser();
  if (user_data.data) {
    c_user = user_data.data[0].username;
    c_id = user_data.data[0].id;
  }
  const [owner, setOwner] = useState({});
  const [user, setUser] = useState({});
  useEffect(async () => {
    const owner = await getUserById(schoolData.ownerId);
    setOwner(owner.data[0]);
  }, [schoolData.ownerId]);
  //getting user details by username
  const { id, username } = user;
  const my_profile = username === c_user;
  const [isSticky, setSticky] = useState(false);
  const ref = useRef(null);
  const handleScroll = () => {
    if (ref.current) {
      setSticky(ref.current.getBoundingClientRect().top <= 0);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, []);
  const isMySchool = c_id === schoolData.ownerId;

  return (
    <div className="profile-all no-sidebar">
      {schoolData.name ? (
        <div className="content">
          <div
            className="space"
            style={{
              height: "auto",
            }}
          >
            <div
              style={{
                maxWidth: "1228px",
                padding: "24px 32px",
                margin: "auto",
              }}
            >
              <div style={{ height: "100px", display: "flex" }}>
                <div className="schoolProfile">
                  <div className="profileReplace">
                    <div className="letter">{schoolData.name.charAt(0)}</div>
                    <div className="shine"></div>
                  </div>
                </div>
                <div className="schoolInfo">
                  <div className="school-left">
                    <div className="school-name">{schoolData.name}</div>
                  </div>
                </div>
                <div className="school-right">
                  <button
                    className="join-school blue-btn"
                    style={{ paddingLeft: "30px", paddingRight: "30px" }}
                  >
                    {isMySchool ? "Edit" : "Join"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-head full-width border-bottom" ref={ref}>
            <div className="cn" style={{ padding: "0" }}>
              <div className="expand">
                <div
                  className="right"
                  style={{
                    maxWidth: "1228px",
                    width: "100%",
                    paddingLeft: "30px",
                    paddingRight: "30px",
                    margin: "auto",
                  }}
                >
                  <ul className={isSticky ? "head profile-nav" : "profile-nav"}>
                    <NavItems
                      Path={`/school/${schoolId}`}
                      Title="Home"
                      exact
                      Icon={HomeOutlinedIcon}
                    />
                    <NavItems
                      Path={`/school/${schoolId}/videos`}
                      Title="Videos"
                      Icon={PlayCircleOutlineIcon}
                    />
                    <NavItems
                      Path={`/school/${schoolId}/courses`}
                      Title="Courses"
                      Icon={VideoLibraryOutlinedIcon}
                    />
                    <NavItems
                      Path={`/school/${schoolId}/notes`}
                      Title="Notes"
                      Icon={BookOutlinedIcon}
                    />
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-body cn" style={{ maxWidth: "1228px" }}>
            <div className="expand">
              <div className="left-container as">
                <Switch>
                  <Route path={`/school/${schoolId}`} exact component={Desk} />
                  <Route
                    path={`/school/${schoolId}/videos`}
                    component={Activities}
                  />
                  <Route
                    path={`/school/${schoolId}/courses`}
                    render={() => (
                      <Courses
                        schoolId={schoolId}
                        c_school={schoolData.name}
                        c_id={c_id}
                        headRef={ref}
                        isMySchool={isMySchool}
                        {...props}
                      />
                    )}
                  />
                  <Route path={`/school/${schoolId}`} component={Notes} />
                </Switch>
              </div>
              <div className="right-container as">
                <AboutSchool
                  description={schoolData.description}
                  schoolId={schoolId}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
