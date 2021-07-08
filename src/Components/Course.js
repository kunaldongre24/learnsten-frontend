import React from "react";
import { Route, Switch } from "react-router-dom";
import CourseSetting from "./CourseSetting";
import CourseView from "./CourseView";

function Course() {
  return (
    <div>
      <Switch>
        <Route path="/course/:courseId" exact component={CourseView} />
        <Route path="/course/:courseId/manage" component={CourseSetting} />
      </Switch>
    </div>
  );
}

export default Course;
