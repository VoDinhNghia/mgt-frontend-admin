import React, { Component } from "react";
import { getCurrentUser, getPermission } from "../../services/authService";
import { moduleNames, userRoles } from "../../constants/constant";
import ForbidenPage from "../commons/forbiden";
import { Container } from "rsuite";
import MenuPage from "../commons/menu";
import FooterPage from "../commons/footer";
import { connect } from "react-redux";
import { userActions } from "../../store/actions";
import TableCommonPage from "../commons/table";
import { handleDataTable, headerTable } from "../../utils/userHandle";

class UsersMgtPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 5,
      page: 1,
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
    alert("add and search");
  }

  onSearch(e) {
    alert(e?.target?.value)
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
      }
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
      }
    });
  }

  render() {
    const { listUsers = [], totalUser = 0 } = this.props;
    const { limit, page } = this.state;
    const currentUser = getCurrentUser();
    const permissons = getPermission();
    const isPermission = permissons.find(
      (per) => per.moduleName === moduleNames.USER_MANAGEMENT
    );
    const totalPage = Math.round(Number(totalUser / limit) + 0.5);

    return (
      <div>
        {isPermission || currentUser?.role === userRoles.SUPPER_ADMIN ? (
          <div className="show-fake-browser sidebar-page mt-1">
            <Container>
              <MenuPage />
              <Container className="p-3 fs-6">
                <TableCommonPage
                  headerList={headerTable}
                  isShowAddAndSearch={true}
                  titleAddBtn="Add new user"
                  onShowModalAdd={() => this.onShowModalAdd()}
                  onSearch={(e) => this.onSearch(e)}
                  data={handleDataTable(listUsers)}
                  isShowPagination={true}
                  totalPage={totalPage}
                  currentPage={page}
                  nextPage={() => this.nextPage(totalPage)}
                  backPage={() => this.backPage()}
                />
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
    listUsers: state?.UserReducer?.listUsers,
    totalUser: state?.UserReducer?.totalUser,
  };
};

export default connect(mapStateToProps)(UsersMgtPage);
