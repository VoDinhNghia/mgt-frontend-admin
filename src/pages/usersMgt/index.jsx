import React, { Component } from "react";
import {
  moduleNames,
  typeModals,
  typePermissions,
} from "../../constants/constant";
import ForbidenPage from "../commons/forbiden";
import { Container } from "rsuite";
import MenuPage from "../commons/menu";
import FooterPage from "../commons/footer";
import { connect } from "react-redux";
import { userActions } from "../../store/actions";
import TableCommonPage from "../commons/table";
import { handleDataTable, headerTable } from "../../utils/userHandle";
import {
  isPermissionActionUserMgt,
  isPermissionModule,
  isRoleSa,
} from "../../utils/permissionHandle";
import ModalUserPage from "./modal";
import { Button, Card } from "react-bootstrap";
import "./index.css";
import { TbDatabaseImport } from "react-icons/tb";
import { AiOutlineFilter } from "react-icons/ai";
import FilterAndImportModal from "./filterAndImport";

class UsersMgtPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 5,
      page: 1,
      isShowModalAdd: false,
      isShowModalUpdate: false,
      isShowModalDelete: false,
      user: {},
      isShowModalImport: false,
      isShowModalFilter: false,
    };
  }

  componentDidMount() {
    this.fetchUserList();
  }

  fetchUserList() {
    const { dispatch } = this.props;
    const { limit, page } = this.state;
    dispatch({
      type: userActions.GET_LIST_USER,
      payload: {
        limit,
        page,
      },
    });
  }

  onShowModalAdd() {
    this.setState({
      isShowModalAdd: true,
    });
  }

  onShowModalImport() {
    this.setState({
      isShowModalImport: true,
    });
  }

  onShowModalFilter() {
    this.setState({
      isShowModalFilter: true,
    });
  }

  onCloseModal() {
    this.setState({
      isShowModalAdd: false,
      isShowModalDelete: false,
      isShowModalUpdate: false,
      isShowModalImport: false,
      isShowModalFilter: false
    });
  }

  onSearch(e) {
    const { dispatch } = this.props;
    const { limit, page } = this.state;
    dispatch({
      type: userActions.GET_LIST_USER,
      payload: {
        searchKey: e.target.value,
        limit,
        page,
      },
    });
  }

  nextPage(totalPage) {
    const { dispatch } = this.props;
    const { limit, page } = this.state;
    const currentPage = page < totalPage ? page + 1 : totalPage;
    this.setState({
      page: currentPage,
    });
    dispatch({
      type: userActions.GET_LIST_USER,
      payload: {
        limit,
        page: currentPage,
      },
    });
  }

  backPage() {
    const { dispatch } = this.props;
    const { limit, page } = this.state;
    const currentPage = page > 1 ? page - 1 : 1;
    this.setState({
      page: currentPage,
    });
    dispatch({
      type: userActions.GET_LIST_USER,
      payload: {
        limit,
        page: currentPage,
      },
    });
  }

  onShowModalUpdate(user) {
    this.setState({
      isShowModalUpdate: true,
      user,
    });
  }

  onShowModalDelete(user) {
    this.setState({
      isShowModalDelete: true,
      user,
    });
  }

  render() {
    const { listUsers = [], totalUser = 0 } = this.props;
    const { limit, page, isShowModalAdd, user, isShowModalDelete, isShowModalUpdate, isShowModalFilter, isShowModalImport } = this.state;
    const roleSa = isRoleSa();
    const permissionModule = isPermissionModule(moduleNames.USER_MANAGEMENT);
    const isPermissionAdd = isPermissionActionUserMgt(typePermissions.ADD);
    const totalPage = Math.round(Number(totalUser / limit) + 0.45);

    return (
      <div>
        {roleSa || permissionModule ? (
          <div className="show-fake-browser sidebar-page mt-1">
            <Container>
              <MenuPage />
              <Container className="p-3 fs-6">
                <Card className="mb-2 border-0">
                  <Card.Body>
                    <span className="MenuUserMgt">
                      <Button variant="outline-primary" onClick={() => this.onShowModalImport()}><TbDatabaseImport /> Import user</Button>{" "}
                      <Button variant="outline-primary" onClick={() => this.onShowModalFilter()}><AiOutlineFilter /> Filter</Button>
                    </span> 
                  </Card.Body>
                </Card>
                <TableCommonPage
                  headerList={headerTable}
                  isShowAddAndSearch={true}
                  titleAddBtn="Add new user"
                  isDisableAddBtn={!isPermissionAdd}
                  onShowModalAdd={() => this.onShowModalAdd()}
                  onSearch={(e) => this.onSearch(e)}
                  data={handleDataTable(
                    listUsers,
                    (user) => this.onShowModalUpdate(user),
                    (user) => this.onShowModalDelete(user)
                  )}
                  isShowPagination={true}
                  totalPage={totalPage}
                  currentPage={page}
                  nextPage={() => this.nextPage(totalPage)}
                  backPage={() => this.backPage()}
                />
              </Container>
            </Container>
            <FooterPage />
            <ModalUserPage
              type={typeModals.ADD}
              isShowModal={isShowModalAdd}
              onCloseModal={() => this.onCloseModal()}
              fetchUserList={() => this.fetchUserList()}
            />
            <ModalUserPage
              type={typeModals.UPDATE}
              isShowModal={isShowModalUpdate}
              user={user}
              onCloseModal={() => this.onCloseModal()}
              fetchUserList={() => this.fetchUserList()}
            />
            <ModalUserPage
              type={typeModals.DELETE}
              isShowModal={isShowModalDelete}
              user={user}
              onCloseModal={() => this.onCloseModal()}
              fetchUserList={() => this.fetchUserList()}
            />
            <FilterAndImportModal
              type={typeModals.IMPORT}
              isShowModal={isShowModalImport}
              onCloseModal={() => this.onCloseModal()}
            />
            <FilterAndImportModal
              type={typeModals.FILTER}
              isShowModal={isShowModalFilter}
              onCloseModal={() => this.onCloseModal()}
            />
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
    listUsers: state?.UserReducer?.listUsers,
    totalUser: state?.UserReducer?.totalUser,
  };
};

export default connect(mapStateToProps)(UsersMgtPage);
