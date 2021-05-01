import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";
export default function Navigation() {
  return (
    <div
      className="navigation-bar fixed white border-right
     border-color-primary full-height"
    >
      <div className="nav-body">
        <div className="search-bar">
          <SearchIcon
            className="searchicon absolute"
            style={{ fontSize: "22px" }}
          />
          <div className="search">
            <input
              type="text"
              className="searchbar full-width white border-all 
            border-color-third curve"
              placeholder="Search anything here..."
            />
          </div>
        </div>
        <div>
          <details className="menu noselect">
            <summary
              className="no-underline btn-link color-text-primary text-bold width-full"
              title="Switch account context"
              data-ga-click="Dashboard, click, Opened account context switcher - context:user"
              aria-haspopup="menu"
              role="button"
            >
              <img
                src="https://avatars.githubusercontent.com/u/65659848?s=60&amp;v=4"
                alt="@kunaldongre24"
                size="20"
                height="20"
                width="20"
                className="avatar-user avatar avatar-small "
              />
              <span className="css-truncate css-truncate-target ml-1">
                kunaldongre24
              </span>
              <span className="dropdown-caret"></span>
              <a className="profile absolute" href="#">
                View My Profile
              </a>
            </summary>
            <div className="select-menu-modal border-all border-color-third white">
              <div className="menu-header full-width border-bottom border-color-primary">
                Select Context
              </div>
            </div>
          </details>
          <div className="border-bottom border-color-primary hr"></div>
          <div className="menu-list filter-item border-all border-color-primary curve">
            <div className="menu-items">
              <span className="menu-list-icon">
                <LibraryBooksOutlinedIcon
                  className="icon"
                  style={{
                    color: "#aaa",
                    width: "30px",
                    textAlign: "left",
                    position: "absolute",
                  }}
                />
              </span>
              <span className="menu-list-text">My Desk</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
