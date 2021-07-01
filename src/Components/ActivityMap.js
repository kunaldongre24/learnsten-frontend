import React, { useEffect, useRef, useState } from "react";
import { getActivityByUserId } from "./Api";
import CalenderHeatMap from "./CalenderHeatMap";
import "./CalenderHeatMap/styles.css";
import Loader from "./Loader";
import { dateFormat } from "./Utils";

function ActivityMap(props) {
  const activityRef = useRef(null);
  const { userId } = props;
  var yearAgo = new Date();
  yearAgo.setFullYear(yearAgo.getFullYear() - 1);

  const [activities, setActivities] = useState([]);
  const [activityDetails, setActivityDetails] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState({});

  const setDetails = (event, value) => {
    const dX = event.target.getBoundingClientRect().left;
    const pageX = value && dX >= 804 ? dX - 120 : dX - 40;
    const pageY =
      window.pageYOffset + event.target.getBoundingClientRect().top - 100;
    setDistance({ x: pageX, y: pageY });
    if (value) {
      const { count, date } = value;
      setActivityDetails(
        <div className="activity-text">
          <strong>
            {count} {count === 1 ? "activity" : "activities"}
          </strong>
          {" on "}
          {dateFormat(new Date(date))}
        </div>
      );
    } else {
      return setActivityDetails("No activities");
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchActivities = async () => {
      const activities = await getActivityByUserId(userId);
      setActivities(activities.data);
    };
    fetchActivities();
    setLoading(false);
  }, [userId]);
  return (
    <div className="map-container">
      <div
        ref={activityRef}
        style={{ left: distance.x, top: distance.y }}
        className="activity-pointer"
        hidden={showDetails && activityDetails ? "" : "hidden"}
      >
        {activityDetails}
      </div>

      {!loading ? (
        <div className="d-flex">
          <CalenderHeatMap
            startDate={new Date(yearAgo)}
            endDate={new Date()}
            gutterSize={3}
            showWeekdayLabels
            onMouseOver={(event, value, dataX) => {
              setDetails(event, value, dataX);
              setShowDetails(true);
            }}
            onMouseLeave={(event, value) => {
              setShowDetails(false);
            }}
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
