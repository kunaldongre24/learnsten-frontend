import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router";
import { getSchoolByUserId } from "./Api";
import CoursesList from "./CoursesList";
import NewCourse from "./NewCourse";

function Courses(props) {
  const { userId, schoolId, headRef } = props;
  const executeScroll = () => headRef.current.scrollIntoView();
  const [schools, setSchools] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(async () => {
    setLoader(true);
    const schools = await getSchoolByUserId(userId);
    setSchools(schools.data);
    setLoader(false);
  }, []);
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
