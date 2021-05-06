import "../style/sidebarrow.css";
import { NavLink } from "react-router-dom";
function SidebarRow(props) {
  const { Title, Icon, Path } = props;
  const iconStyle = { fontSize: "22px" };
  return (
    <>
      <NavLink to={{ pathname: Path }} exact activeClassName="selected">
        <div className="list-element">
          <div className="contain-element">
            <div className="list-icon">
              <Icon style={iconStyle} />
            </div>
            <div className="list-desc">{Title}</div>
          </div>
        </div>
      </NavLink>
    </>
  );
}
export default SidebarRow;
