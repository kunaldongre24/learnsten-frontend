import React from "react";

function Bullet(props) {
  const { color, marginRight } = props;
  const right = marginRight ? marginRight : "4px";
  return (
    <span
      className="bullet"
      style={{ background: color, marginRight: right }}
    ></span>
  );
}

export default Bullet;
