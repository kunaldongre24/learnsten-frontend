import React from "react";
import "../style/loader.css";

function Load(props) {
  return (
    <div className="loader-body">
      <div className="Loader" style={props.style}></div>
    </div>
  );
}

export default Load;
