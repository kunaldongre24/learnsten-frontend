import React from "react";
import { Route, Switch } from "react-router";
import Explore from "./Explore";
import CourseSettingSidebar from "./CourseSettingSidebar";
import "../style/sidebar.css";
import ManageContent from "./ManageContent";

function CourseSetting(props) {
  const courseId = props.match.params.courseId;
  return (
    <div className="sidebar-all home mw-2">
      <CourseSettingSidebar courseId={courseId} />
      <div className="content">
        <div className="home-container">
          <Switch>
            <Route
              path={`/course/${courseId}/manage`}
              exact
              render={() => <ManageContent courseId={courseId} />}
            />
            <Route path="/explore" component={Explore} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default CourseSetting;
