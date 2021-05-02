import "../style/sidebarrow.css";
import { NavLink } from "react-router-dom";
function SidebarRow(props) {
  const { Title, Icon, Path, load } = props;
  return (
    <>
      <NavLink to={{ pathname: Path }} exact activeClassName="selected">
        <div className="list-element">
          <div className="contain-element">
            <div className="list-icon">
              <Icon />
            </div>
            <div className="list-desc">{Title}</div>
          </div>
        </div>
      </NavLink>
    </>
  );
}
export default SidebarRow;
