import React, { Component } from "react";
import { getCurrentUser, getPermission } from "../../services/authService";
import { moduleNames, typeModals, userRoles } from "../../constants/constant";
import ForbidenPage from "../commons/forbiden";
import MenuPage from "../commons/menu";
import FooterPage from "../commons/footer";
import { Container } from "rsuite";
import { connect } from "react-redux";
import { userActions } from "../../store/actions";
import TableCommonPage from "../commons/table";
import {
  handleDataPermission,
  headerListPermission,
} from "../../utils/permissionHandle";
import ModalPermissionPage from "./modal";

class PermissionPageMgt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModalAdd: false,
      isShowModalDelete: false,
      user: {},
    };
  }

  componentDidMount() {
    this.fetchAdminList();
  }

  fetchAdminList() {
    const { dispatch } = this.props;
    dispatch({ type: userActions.GET_LIST_USER_ADMIN });
  }

  onShowModalAdd(user) {
    this.setState({
      isShowModalAdd: true,
      user,
    });
  }

  onShowModalDelete(user) {
    this.setState({
      isShowModalDelete: true,
      user,
    });
  }

  onCloseModal() {
    this.setState({
      isShowModalAdd: false,
      isShowModalDelete: false,
    });
  }

  render() {
    const { adminList = [] } = this.props;
    const { isShowModalAdd, isShowModalDelete, user } = this.state;
    const currentUser = getCurrentUser();
    const permission = getPermission();
    const checkPermission = permission.find(
      (per) => per.moduleName === moduleNames.PERMISSION_MANAGEMENT
    );

    return (
      <div>
        {currentUser?.role === userRoles.SUPPER_ADMIN || checkPermission ? (
          <div className="show-fake-browser sidebar-page mt-1">
            <Container>
              <MenuPage />
              <Container className="p-3 fs-6">
                <TableCommonPage
                  headerList={headerListPermission}
                  data={handleDataPermission(
                    adminList,
                    (user) => this.onShowModalAdd(user),
                    (user) => this.onShowModalDelete(user)
                  )}
                />
              </Container>
            </Container>
            <FooterPage />
          </div>
        ) : (
          <ForbidenPage />
        )}
        <ModalPermissionPage
          type={typeModals.ADD}
          isShowModal={isShowModalAdd}
          user={user}
          onCloseModal={() => this.onCloseModal()}
        />
        <ModalPermissionPage
          type={typeModals.DELETE}
          isShowModal={isShowModalDelete}
          user={user}
          onCloseModal={() => this.onCloseModal()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    adminList: state.UserReducer.adminList,
    totalAdmin: state.UserReducer.totalAdmin,
  };
};

export default connect(mapStateToProps)(PermissionPageMgt);
