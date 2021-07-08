import { Link } from "react-router-dom";
import React from "react";

function NoContent(props) {
  const { msg, myProfile, buttonText, btnLink, Icon, logoClass } = props;
  return (
    <div className="no-courses">
      {logoClass ? <div className={`${logoClass} no-logo`}></div> : ""}
      <h2>{msg}</h2>
      <div className="newBtn">
        {myProfile ? (
          <Link className="new-school" to={btnLink}>
            {Icon ? <Icon /> : ""}
            {buttonText}
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default NoContent;
