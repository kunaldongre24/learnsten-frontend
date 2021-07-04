import React, { useState, useEffect } from "react";
import "../style/desk.css";
import { getCoursesByUserId } from "./Api";
import DeskView from "./DeskView";
import ActivityMap from "./ActivityMap";

function Desk(props) {
  const { userId, isMyProfile, username } = props;
  const [courses, setCourses] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const fetchCourses = async () => {
      setLoader(true);
      const courses = await getCoursesByUserId(userId);
      if (courses.data.length > 6) {
        setCourses(courses.data.filter((course) => course.lectureCount > 1));
      } else {
        setCourses(courses.data);
      }
      setLoader(false);
    };
    fetchCourses();
  }, [userId]);
  return (
    <div>
      <h2 className="heading">
        {courses.length < 4 ? "Courses" : "Popular Courses"}
      </h2>
      <DeskView
        loader={loader}
        courses={courses}
        setLoader={setLoader}
        {...props}
      />
      <h2 className="heading">
        {isMyProfile ? "Your" : `${username}'s`} activities
      </h2>
      <div className="activity-map">
        <ActivityMap userId={userId} />
        <div className="activity-footer">
          <div className="color-info">
            <span>Less</span>
            <div className="box-color">
              {[...Array(5)].map((e, i) => (
                <div className={`color-box color-scale-${i}`} key={i}></div>
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Desk;
