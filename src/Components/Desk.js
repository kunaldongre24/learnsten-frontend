import React from "react";
import "../style/desk.css";

const n = 6;

function Desk() {
  return (
    <div>
      <h2 className="heading">Popular Courses</h2>
      <ol className="courses">
        {[...Array(n)].map((e, i) => (
          <li key={i}>
            <span className="showCard"></span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Desk;
