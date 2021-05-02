import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";
import SubjectIcon from "@material-ui/icons/Subject";
import GroupIcon from "@material-ui/icons/Group";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import SidebarRow from "./SidebarRow";
import "../style/sidebar.css";
export default function Navigation() {
  return (
    <div
      className="navigation-bar fixed white border-right
     border-color-primary full-height"
    >
      <div className="nav-body">
        <div className="search-bar"></div>
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
          <div className="list">
            <SidebarRow
              Title="My Desk"
              Icon={LibraryBooksOutlinedIcon}
              Path="/"
            />
            <SidebarRow
              Title="Explore"
              Path="/explore"
              Icon={ExploreOutlinedIcon}
            />
            <SidebarRow
              Title="Subjects"
              Path="/subjects"
              id="Subjects"
              Icon={SubjectIcon}
            />
            <SidebarRow
              Title="Groups"
              Path="/groups"
              id="Groups"
              Icon={GroupIcon}
            />
            <SidebarRow
              Title="Trending"
              Path="/trending"
              id="Trending"
              Icon={TrendingUpIcon}
            />
          </div>
          <div className="border-bottom border-color-primary hr"></div>
          <div className="search-bar">
            <input
              type="text"
              class="full-width searchbar border-all border-color-third curve"
              placeholder="Find Something here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
