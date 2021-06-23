import React, { useState, useEffect } from "react";
import "../style/desk.css";
import { getSchoolByUserId } from "./Api";
import DeskView from "./DeskView";

function Desk(props) {
  const { userId } = props;
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
    </div>
  );
}

export default Desk;
