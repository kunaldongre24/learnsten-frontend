import React, { useEffect, useState } from "react";
import { getActivityByUserId } from "./Api";
import CalenderHeatMap from "./CalenderHeatMap";
import "./CalenderHeatMap/styles.css";
import Loader from "./Loader";
import { dateFormat } from "./Utils";

function ActivityMap(props) {
  const { userId } = props;
  var yearAgo = new Date();
  const [activities, setActivities] = useState([]);
  const [activityDetails, setActivityDetails] = useState();
  const [showDetails, setShowDetails] = useState(false);

  const setDetails = (event, value) => {
    console.log(event);
    if (value) {
      const { count, date } = value;
      return setActivityDetails(
        `${count} ${count === 1 ? "activity" : "activities?"} on ${dateFormat(
          new Date(date)
        )}`
      );
    } else {
      return setActivityDetails("No activities");
    }
  };

  yearAgo.setFullYear(yearAgo.getFullYear() - 1);
  useEffect(() => {
    const fetchActivities = async () => {
      const activities = await getActivityByUserId(userId);
      setActivities(activities.data);
    };
    fetchActivities();
  }, [userId]);
  return (
    <div className="map-container">
      {showDetails && activityDetails ? (
        <div className="activity-pointer">
          <div className="text">{activityDetails}</div>
        </div>
      ) : (
        ""
      )}
      {activities.length ? (
        <div className="d-flex">
          <CalenderHeatMap
            startDate={new Date(yearAgo)}
            endDate={new Date()}
            gutterSize={3}
            showWeekdayLabels
            onMouseOver={(event, value) => {
              setDetails(event, value);
              setShowDetails(true);
            }}
            onMouseLeave={(event, value) => {
              setShowDetails(false);
            }}
            onMouse
            values={[...activities]}
            classForValue={(value) => {
              if (value) {
                const scale = value.count;
                if (scale >= 12) {
                  return "color-scale-4";
                } else if (scale >= 8) return "color-scale-3";
                else if (scale >= 4) return "color-scale-2";
                else if (scale > 0) return "color-scale-1";
              }
              return "color-scale-0";
            }}
          />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default ActivityMap;
