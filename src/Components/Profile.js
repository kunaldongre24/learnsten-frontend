import React from "react";
import "../style/NoSidebar.css";
import "../style/profile.css";
import Header from "./Header";
import Desk from "./Desk";
import Activities from "./Activities";
import School from "./School";
import Notes from "./Notes";
import ImportContactsOutlinedIcon from "@material-ui/icons/ImportContactsOutlined";
import HistoryIcon from "@material-ui/icons/History";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
import BookOutlinedIcon from "@material-ui/icons/BookOutlined";
import ProfileNavItem from "./ProfileNavItem";
import { Route } from "react-router-dom";

const whiteBackground = { background: "#fff" };
const icon = {
  height: "20px",
  width: "20px",
  marginRight: "6px",
  float: "left",
};
export default class Profile extends React.Component {
  state = {
    background: "#f6f8fa",
    position: "relative",
  };

  listenScrollEvent = (e) => {
    if (window.scrollY > 104) {
      this.setState({ background: "#fff", position: "fixed" });
    } else {
      this.setState({ background: "#f6f8fa", position: "relative" });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.listenScrollEvent);
  }

  render() {
    return (
      <div className="profile-all no-sidebar">
        <div className="content">
          <Header />
          <div className="space"></div>
          <div
            className="profile-head full-width border-bottom "
            style={{
              background: this.state.background,
              position: this.state.position,
            }}
          >
            <div className="ph-con">
              <div className="left"></div>
              <div className="right">
                <ul className="profile-nav">
                  <ProfileNavItem
                    Path="/profile/desk"
                    Title="Desk"
                    Icon={ImportContactsOutlinedIcon}
                  />
                  <ProfileNavItem
                    Path="/profile/activities"
                    Title="Activites"
                    Icon={HistoryIcon}
                  />
                  <ProfileNavItem
                    Path="/profile/school"
                    Title="School"
                    Icon={SchoolOutlinedIcon}
                  />
                  <ProfileNavItem
                    Path="/profile/notes"
                    Title="Notes"
                    Icon={BookOutlinedIcon}
                  />
                </ul>
              </div>
            </div>
          </div>
          <div className="profile-body" style={whiteBackground}>
            <Route path={"/profile/desk"} component={Desk} />
            <Route path={"/profile/activities"} component={Activities} />
            <Route path={"/profile/school"} component={School} />
            <Route path={"/profile/notes"} component={Notes} />
          </div>
        </div>
      </div>
    );
  }
}
