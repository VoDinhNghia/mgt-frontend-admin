import React, { Component } from "react";
import { getCurrentUser, getPermission } from "../../services/authService";
import { moduleNames, userRoles } from "../../constants/constant";
import ForbidenPage from "../commons/forbiden";

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
          <div>
            <p>User management page</p>
          </div>
        ) : (
          <ForbidenPage />
        )}
      </div>
    );
  }
}

export default UsersMgtPage;
