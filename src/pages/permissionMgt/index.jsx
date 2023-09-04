import React, { Component } from "react";
import { getCurrentUser, getPermission } from "../../services/authService";
import { moduleNames, userRoles } from "../../constants/constant";
import ForbidenPage from "../commons/forbiden";
import MenuPage from "../commons/menu";
import FooterPage from "../commons/footer";
import { Container } from "rsuite";
import { connect } from "react-redux";
import { userActions } from "../../store/actions";

class PermissionPageMgt extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.fetchAdminList();
  }

  fetchAdminList() {
    const { dispatch } = this.props;
    dispatch({ type: userActions.GET_LIST_USER_ADMIN });
  }

  render() {
    const { totalAdmin = 0, adminList = [] } = this.props;
    const currentUser = getCurrentUser();
    const permission = getPermission();
    const checkPermission = permission.find(
      (per) => per.moduleName === moduleNames.PERMISSION_MANAGEMENT
    );
    console.log("totalAdmin", totalAdmin);
    console.log("admin", adminList);

    return (
      <div>
        {currentUser?.role === userRoles.SUPPER_ADMIN || checkPermission ? (
          <div className="show-fake-browser sidebar-page mt-1">
            <Container>
              <MenuPage />
              <Container className="p-3 fs-6">
                <p>Permission page</p>
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

const mapStateToProps = (state) => {
  return {
    adminList: state.UserReducer.adminList,
    totalAdmin: state.UserReducer.totalAdmin,
  }
}

export default connect(mapStateToProps)(PermissionPageMgt);
