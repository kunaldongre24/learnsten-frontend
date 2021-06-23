import React, { useEffect, useRef, useState } from "react";
import "../style/SchoolView.css";
import "../style/NoSidebar.css";
import "../style/profile.css";
import Videos from "./Videos";
import Courses from "./Courses";
import Notes from "./Notes";
import AboutSchool from "./AboutSchool";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import VideoLibraryOutlinedIcon from "@material-ui/icons/VideoLibraryOutlined";
import BookOutlinedIcon from "@material-ui/icons/BookOutlined";
import NavItems from "./NavItems";
import { Route, Switch } from "react-router-dom";
import GetUser from "./UserContext";
import { getSchoolBySchoolId, getUserById } from "./Api";
import Loader from "./Loader";
import Bullet from "./Bullet";
import SchoolHome from "./SchoolHome";

export default function SchoolView(props) {
  const [schoolData, setSchoolData] = useState({});
  const [loading, setLoading] = useState(false);
  const schoolId = props.match.params.schoolId;
  useEffect(() => {
    const getSchoolById = async () => {
      setLoading(true);
      const schoolData = await getSchoolBySchoolId(schoolId);
      setSchoolData(schoolData.data[0]);
      setLoading(false);
    };
    getSchoolById();
  }, [schoolId]);
  var c_id;
  const user_data = GetUser();
  if (user_data.data) {
    c_id = user_data.data[0].id;
  }
  const [owner, setOwner] = useState({});
  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      const owner = await getUserById(schoolData.ownerId);
      setOwner(owner.data[0]);
      setLoading(false);
    };
    getUserData();
  }, [schoolData.ownerId]);
  //getting user details by username
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
                margin: "auto",
              }}
            >
              <div style={{ padding: "24px", display: "flex" }}>
                <div className="schoolProfile">
                  <div className="profileReplace">
                    <div className="letter">{schoolData.name.charAt(0)}</div>
                    <div className="shine"></div>
                  </div>
                </div>
                <div className="school-left">
                  <h1 className="school-name">{schoolData.name}</h1>
                  <div className="school-desc">{schoolData.description}</div>
                  <div className="last-row">
                    <span className="courseCount">
                      <Bullet color="#4ba55d" />
                      {schoolData.courseCount}
                      <span className="alt-text">
                        {schoolData.courseCount === 1 ? "Course" : "Courses"}
                      </span>
                      <Bullet color="#747F8D" />0
                      <span className="alt-text"> Members </span>
                    </span>
                  </div>
                </div>
                <div className="school-right">
                  <button
                    className="join-school blue-btn"
                    style={{
                      border: "none",
                    }}
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
            {loading ? (
              <Loader />
            ) : (
              <div className="expand">
                <div className="left-container as">
                  <Switch>
                    <Route
                      path={`/school/${schoolId}`}
                      exact
                      render={() => (
                        <SchoolHome schoolId={schoolId} {...props} />
                      )}
                    />
                    <Route
                      path={`/school/${schoolId}/videos`}
                      render={() => (
                        <Videos
                          schoolId={schoolId}
                          c_school={schoolData.name}
                          c_id={c_id}
                          headRef={ref}
                          isMySchool={isMySchool}
                          owner={owner}
                          {...props}
                        />
                      )}
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
                          owner={owner}
                          {...props}
                        />
                      )}
                    />
                    <Route
                      path={`/school/${schoolId}`}
                      render={() => (
                        <Notes
                          schoolId={schoolId}
                          c_school={schoolData.name}
                          c_id={c_id}
                          headRef={ref}
                          isMySchool={isMySchool}
                          owner={owner}
                          {...props}
                        />
                      )}
                    />
                  </Switch>
                </div>
                <div className="right-container as">
                  <AboutSchool schoolData={schoolData} owner={owner} />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
