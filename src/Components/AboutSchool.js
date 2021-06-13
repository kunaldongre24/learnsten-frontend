import React, { useEffect, useState } from "react";
import "../style/AboutSchool.css";
import {
  getCoursesBySchoolId,
  getSubjectById,
  getSubjectsByCourseId,
} from "./Api";
import { sortByCount } from "./Utils";

function AboutSchool(props) {
  const { description, schoolId } = props;
  const [subjects, setSubjects] = useState([]);
  const [subjectNames, setSubjectNames] = useState([]);
  useEffect(async () => {
    const courses = await getCoursesBySchoolId(schoolId);
    courses.data.map(async (course) => {
      const subjects = await getSubjectsByCourseId(course.id);
      subjects.data.map(async (subject) => {
        const subjectData = await getSubjectById(subject.subjectId);
        subjectData.data.map((subject) => {
          setSubjects((oldArray) => [...oldArray, subject]);
          setSubjectNames((oldArray) => [...oldArray, subject.name]);
        });
      });
    });
  }, [schoolId]);
  return (
    <div>
      <div className="heading">About School</div>
      <p className="about-body">{description}</p>
      <div className="topic-list">
        {sortByCount(subjectNames).map((subject, i) => {
          return <a key={i}>{subject}</a>;
        })}
      </div>
    </div>
  );
}

export default AboutSchool;
