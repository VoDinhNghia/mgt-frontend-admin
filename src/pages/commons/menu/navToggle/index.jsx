import React, { Component } from "react";
import { Navbar, Nav } from "rsuite";
import AngleLeftIcon from "@rsuite/icons/legacy/AngleLeft";
import AngleRightIcon from "@rsuite/icons/legacy/AngleRight";

class NavToggleMenuPage extends Component {
  render() {
    const { expand } = this.props;

    return (
      <Navbar appearance="subtle" className="nav-toggle">
        <Nav pullRight>
          <Nav.Item
            onClick={() => this.props.onChange()}
            style={{ width: 56, textAlign: "center", fontSize: "30px", color: "white" }}
          >
            {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
          </Nav.Item>
        </Nav>
      </Navbar>
    );
  }
}

export default NavToggleMenuPage;
