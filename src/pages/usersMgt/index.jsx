import React, { Component } from "react";
import { getCurrentUser, getPermission } from "../../services/authService";
import { moduleNames, userRoles } from "../../constants/constant";
import ForbidenPage from "../commons/forbiden";
import { Container } from "rsuite";
import MenuPage from "../commons/menu";
import FooterPage from "../commons/footer";

class UsersMgtPage extends Component {
  render() {
    const currentUser = getCurrentUser();
    const permissons = getPermission();
    const isPermission = permissons.find(
      (per) => per.moduleName === moduleNames.USER_MANAGEMENT
    );

    return (
      <div>
        {isPermission || currentUser?.role === userRoles.SUPPER_ADMIN ? (
          <div className="show-fake-browser sidebar-page mt-1">
            <Container>
              <MenuPage />
              <Container className="p-3 fs-6">
                <p>User page</p>
              </Container>
            </Container>
            <FooterPage />
          </div>
        ) : (
          <ForbidenPage />
        )}
      </div>
    );
  }
}

export default UsersMgtPage;
