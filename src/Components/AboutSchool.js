import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import "../style/AboutSchool.css";
import { timeSince } from "./Utils";
import {
  getCoursesBySchoolId,
  getSubjectById,
  getSubjectsByCourseId,
} from "./Api";
import { sortByCount } from "./Utils";

function AboutSchool(props) {
  const { schoolData, owner } = props;
  const [loading, setLoading] = useState(false);
  const [subjectNames, setSubjectNames] = useState([]);
  const { id, description, created_at, last_updated } = schoolData;
  useEffect(() => {
    const fetchSubject = async () => {
      setLoading(true);
      const courses = await getCoursesBySchoolId(id);
      courses.data.map(async (course) => {
        const subjects = await getSubjectsByCourseId(course.id);
        subjects.data.map(async (subject) => {
          const subjectData = await getSubjectById(subject.subjectId);
          subjectData.data.map((subject) => {
            return setSubjectNames((oldArray) => [...oldArray, subject.name]);
          });
        });
      });
      setLoading(false);
    };
    fetchSubject();
    return () => {
      setSubjectNames([]);
    };
  }, [id]);

  return (
    <div>
      <div className="heading">About School</div>
      <p className="about-body">{description}</p>
      <div className="sub-list sideContainer">
        <div className="top-head">Subjects</div>

        {loading ? (
          <Loader />
        ) : (
          <div className="topic-list">
            {subjectNames.length ? (
              sortByCount(subjectNames).map((subject, i) => {
                return (
                  <Link key={i} to={`/subject/{subject}`}>
                    {subject}
                  </Link>
                );
              })
            ) : (
              <div className="small-text">No subjects here</div>
            )}
          </div>
        )}
      </div>
      <div className="contributors sideContainer">
        <div className="top-head">Contributors</div>
        {owner ? (
          <div className="topic-list">
            <a href={`/${owner.username}`}>{owner.username}</a>
            <a href="/nitin">nitin</a>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="create-at small-text">
        <div className="top-head">
          Created {timeSince(new Date(created_at))}
        </div>
      </div>
      <div className="last-updated small-text">
        <div className="top-head">
          Updated {timeSince(new Date(last_updated))}
        </div>
      </div>
    </div>
  );
}

export default AboutSchool;
