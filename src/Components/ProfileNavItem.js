import { NavLink } from "react-router-dom";
function ProfileNavItem(props) {
  const { Title, Icon, Path } = props;
  const icon = {
    height: "18px",
    width: "18px",
    marginRight: "6px",
    float: "left",
    marginTop: "1px",
  };
  return (
    <>
      <NavLink to={{ pathname: Path }} exact activeClassName="selected">
        <li>
          <Icon style={icon} />
          {Title}
        </li>
      </NavLink>
    </>
  );
}
export default ProfileNavItem;
