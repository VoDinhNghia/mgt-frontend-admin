import React, { Component } from "react";
import { Container } from "rsuite";
import MenuPage from "../commons/menu";
import RightContentPage from "./rightContent";
import FooterPage from "../commons/footer";

class HomePage extends Component {
  render() {
    return (
      <div className="show-fake-browser side-bar-page mt-1">
        <Container>
          <MenuPage />
          <RightContentPage />
        </Container>
        <FooterPage />
      </div>
    );
  }
}

export default HomePage;
