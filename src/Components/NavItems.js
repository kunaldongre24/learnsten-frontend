import { NavLink } from "react-router-dom";
function ProfileNavItem(props) {
  const { Title, Icon, Path, exact, Count } = props;
  const icon = {
    height: "18px",
    width: "18px",
    marginRight: "6px",
    float: "left",
    marginTop: "1px",
  };
  const countStyle = {
    padding: "2px 8px",
    borderRadius: "20px",
    background: "#E1E4E8",
    fontSize: "12px",
    color: "#222",
    marginLeft: "6px",
  };
  return (
    <>
      <NavLink to={{ pathname: Path }} exact={exact} activeClassName="selected">
        <li>
          {Icon ? <Icon style={icon} /> : ""}
          {Title}
          {Count ? <span style={countStyle}>{Count}</span> : ""}
        </li>
      </NavLink>
    </>
  );
}
export default ProfileNavItem;
