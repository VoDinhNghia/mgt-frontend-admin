import React, { Component } from "react";
import { Nav, Sidebar, Sidenav } from "rsuite";
import NavToggleMenuPage from "./navToggle";
import { headerStyle } from "../../../constants/modifyCss";
import { moduleNames, routes } from "../../../constants/constant";
import UserGroupIcon from "@rsuite/icons/legacy/Group";
import "./index.css";
import { connect } from "react-redux";
import { userActions } from "../../../store/actions";
import RoomIcon from "@rsuite/icons/legacy/Home";
import FacultyIcon from "@rsuite/icons/legacy/List";
import { logOut } from "../../../services/authService";
import LogOutIcon from "@rsuite/icons/legacy/SignOut";
import PermissonIcon from "@rsuite/icons/legacy/Gear";
import { isPermissionModule, isRoleSa } from "../../../utils/permissionHandle";

class MenuPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: true,
    };
  }

  componentDidMount() {
    this.fetchInfoMe();
  }

  onChange() {
    const { expand } = this.state;
    this.setState({
      expand: !expand,
    });
  }

  fetchInfoMe() {
    const { dispatch } = this.props;
    dispatch({
      type: userActions.GET_ME,
    });
  }

  logOutHandle() {
    logOut();
    setTimeout(() => {
      window.location.href = routes.login;
    }, 100);
  }

  render() {
    const { profile = {} } = this.props;
    const { expand } = this.state;
    const userName = `${profile?.profile?.lastName} ${profile?.profile?.firstName}`;
    const roleSa = isRoleSa();
    const isAccessFaculty = isPermissionModule(
      moduleNames.FACULTIES_MANAGEMENT
    );
    const isAccessRoom = isPermissionModule(moduleNames.ROOM_MANAGEMENT);
    const isAccessUser = isPermissionModule(moduleNames.USER_MANAGEMENT);

    return (
      <Sidebar
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "black",
        }}
        width={expand ? 280 : 70}
        collapsible
      >
        <Sidenav.Header>
          <div style={headerStyle}>
            <a href={routes.home} className="text-white">
              <img
                src={profile?.profile?.avatar || "/images/userIcon.png"}
                alt=""
                className="UserAvatar"
              />
              <span>
                {expand ? `${userName} - ${profile?.profile?.code}` : null}
              </span>
            </a>
          </div>
        </Sidenav.Header>
        <Sidenav expanded={expand} appearance="subtle">
          <Sidenav.Body>
            <Nav>
              {isAccessUser ? (
                <Nav.Item
                  eventKey="1"
                  href={routes.userMgt}
                  icon={<UserGroupIcon />}
                  className="ItemMenuPage"
                >
                  {moduleNames.USER_MANAGEMENT}
                </Nav.Item>
              ) : null}
              {isAccessRoom ? (
                <Nav.Item
                  eventKey="2"
                  icon={<RoomIcon />}
                  className="ItemMenuPage"
                  href={routes.roomMgt}
                >
                  {moduleNames.ROOM_MANAGEMENT}
                </Nav.Item>
              ) : null}
              {isAccessFaculty ? (
                <Nav.Item
                  eventKey="3"
                  icon={<FacultyIcon />}
                  className="ItemMenuPage"
                >
                  {moduleNames.FACULTIES_MANAGEMENT}
                </Nav.Item>
              ) : null}
              {roleSa ? (
                <Nav.Item
                  eventKey="4"
                  icon={<PermissonIcon />}
                  className="ItemMenuPage"
                  href={routes.permissionMgt}
                >
                  {moduleNames.PERMISSION_MANAGEMENT}
                </Nav.Item>
              ) : null}
              <Nav.Item
                eventKey="5"
                icon={<LogOutIcon />}
                className="ItemMenuPage"
                onClick={() => this.logOutHandle()}
              >
                LogOut
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
        <NavToggleMenuPage expand={expand} onChange={() => this.onChange()} />
      </Sidebar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.UserReducer.profile,
  };
};

export default connect(mapStateToProps)(MenuPage);
