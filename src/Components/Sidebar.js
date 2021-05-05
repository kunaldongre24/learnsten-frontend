import React from "react";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";
import SubjectIcon from "@material-ui/icons/Subject";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import SidebarRow from "./SidebarRow";
import Profile from "../images/profile.jpeg";
import { Link } from "react-router-dom";
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
                src={Profile}
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
              <Link className="profile absolute" to={"/profile"}>
                View My Profile
              </Link>
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
              Title="Activity Feed"
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
              Icon={GroupOutlinedIcon}
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
              className="full-width searchbar border-all border-color-third curve"
              placeholder="Find Something here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
