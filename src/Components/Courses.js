import React from "react";
import { Switch, Route } from "react-router";
import CoursesList from "./CoursesList";
import NewCourse from "./NewCourse";

function Courses(props) {
  const { schoolId, headRef } = props;
  const executeScroll = () => headRef.current.scrollIntoView();

  return (
    <div>
      <Switch>
        <Route
          path={`/school/${schoolId}/courses/new`}
          render={() => <NewCourse executeScroll={executeScroll} {...props} />}
        />
        <Route
          path={`/school/${schoolId}/courses`}
          render={() => <CoursesList {...props} />}
        />
      </Switch>
    </div>
  );
}

export default Courses;
