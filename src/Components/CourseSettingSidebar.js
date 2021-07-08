import React from "react";
import SidebarRow2 from "./SidebarRow2";
import "../style/sidebar.css";

export default function CourseSettingSidebar(props) {
  const { courseId } = props;
  const noMargin = { margin: 0 };

  return (
    <>
      <div
        className={`navigation-bar nb-2 border-none white border-right
     border-color-primary `}
      >
        <div className="side-container" style={{ padding: "0" }}>
          <div className="nav-body">
            <div className="search-bar"></div>
            <div>
              <div className="list box-list">
                <div className="list-element">
                  <div className="contain-element" style={noMargin}>
                    <div className="list-desc" style={noMargin}>
                      Course Setting
                    </div>
                  </div>
                </div>
                <SidebarRow2
                  Title="Manage Content"
                  Path={`/course/${courseId}/manage`}
                />
                <SidebarRow2 Title="Explore" Path="/explore" />
                <SidebarRow2 Title="Subjects" Path="/subjects" id="Subjects" />
                <SidebarRow2 Title="Groups" Path="/groups" id="Groups" />
                <SidebarRow2 Title="Trending" Path="/trending" id="Trending" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
