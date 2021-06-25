import React, { useState, useEffect } from "react";
import "../style/desk.css";
import { getSchoolByUserId } from "./Api";
import DeskView from "./DeskView";
import ActivityMap from "./ActivityMap";

function Desk(props) {
  const { userId, isMyProfile, username } = props;
  const [schools, setSchools] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const getSchoolByUser = async () => {
      setLoader(true);
      const schools = await getSchoolByUserId(userId);
      setSchools(schools.data);
      setLoader(false);
    };
    getSchoolByUser();
  }, [userId]);
  return (
    <div>
      <h2 className="heading">
        {schools.length < 4 ? "Schools" : "Popular Schools"}
      </h2>
      <DeskView
        loader={loader}
        schools={schools}
        setLoader={setLoader}
        {...props}
      />
      <h2 className="heading">
        {isMyProfile ? "Your" : `${username}'s`} activities
      </h2>
      <div className="activity-map">
        <ActivityMap userId={userId} />
      </div>
    </div>
  );
}

export default Desk;
