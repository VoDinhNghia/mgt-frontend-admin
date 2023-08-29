import React, { Component } from "react";
import { Nav, Sidebar, Sidenav } from "rsuite";
import NavToggleMenuPage from "./navToggle";
import { headerStyle } from "../../../constants/modifyCss";
import { routes } from "../../../constants/constant";
import UserGroupIcon from "@rsuite/icons/legacy/Group";
import "./index.css";
import { connect } from "react-redux";
import { userActions } from "../../../store/actions";

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

  render() {
    const { profile = {} } = this.props;
    const { expand } = this.state;
    console.log("profile", profile);

    return (
      <Sidebar
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "black",
        }}
        width={expand ? 260 : 80}
        collapsible
      >
        <Sidenav.Header>
          <div style={headerStyle}>
            <span>Home</span>
          </div>
        </Sidenav.Header>
        <Sidenav expanded={expand} appearance="subtle">
          <Sidenav.Body>
            <Nav>
              <Nav.Item
                eventKey="1"
                href={routes.userMgt}
                icon={<UserGroupIcon />}
                className="ItemMenuPage"
              >
                User Managements
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
