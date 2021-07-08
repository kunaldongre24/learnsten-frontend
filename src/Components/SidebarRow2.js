import "../style/sidebarrow.css";
import { NavLink } from "react-router-dom";
function SidebarRow(props) {
  const { Title, Path } = props;
  const noMargin = { margin: 0 };
  return (
    <>
      <NavLink to={{ pathname: Path }} exact activeClassName="selected">
        <div className="list-element">
          <div className="contain-element" style={noMargin}>
            <div className="list-desc" style={noMargin}>
              {Title}
            </div>
          </div>
        </div>
      </NavLink>
    </>
  );
}
export default SidebarRow;
