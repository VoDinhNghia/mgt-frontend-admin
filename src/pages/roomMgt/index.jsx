import React, { Component } from "react";
import ForbidenPage from "../commons/forbiden";
import { isRoleSa, isPermissionModule } from "../../utils/permissionHandle";
import { moduleNames, typeModals } from "../../constants/constant";
import { Container } from "rsuite";
import MenuPage from "../commons/menu";
import FooterPage from "../commons/footer";
import { connect } from "react-redux";
import { roomActions } from "../../store/actions";
import TableCommonPage from "../commons/table";
import { handleDataTable, headerTable } from "../../utils/roomHandle";
import ModalRoomMgtPage from "./modal";

class RoomMgtPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      page: 1,
      isShowModalAdd: false,
      isShowModalUpdate: false,
      isShowModalDelete: false,
      isShowModalDivive: false,
      room: {},
    };
  }

  componentDidMount() {
    this.fetchListRooms();
  }

  onShowModalAdd() {
    this.setState({
      isShowModalAdd: true,
    });
  }

  onCloseModal() {
    this.setState({
      isShowModalAdd: false,
      isShowModalDelete: false,
      isShowModalUpdate: false,
      isShowModalDivive: false,
    });
  }

  fetchListRooms() {
    const { dispatch } = this.props;
    const { limit, page } = this.state;
    dispatch({
      type: roomActions.GET_LIST_ROOM,
      payload: {
        limit,
        page,
      },
    });
  }

  onSearch(e) {
    const { dispatch } = this.props;
    dispatch({
      type: roomActions.GET_LIST_ROOM,
      payload: {
        searchKey: e?.target?.value,
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
      type: roomActions.GET_LIST_ROOM,
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
    dispatch({
      type: roomActions.GET_LIST_ROOM,
      payload: {
        limit,
        page: currentPage,
      },
    });
  }

  onShowModalUpdate(room) {
    this.setState({
      isShowModalUpdate: true,
      room,
    });
  }

  onShowModalDivice(room) {
    this.setState({
      isShowModalDivive: true,
      room,
    });
  }

  onShowModalDelete(room) {
    this.setState({
      isShowModalDelete: true,
      room,
    });
  }

  render() {
    const { listRooms = [], totalRoom = 0 } = this.props;
    const {
      limit,
      page,
      isShowModalAdd,
      isShowModalUpdate,
      isShowModalDelete,
      isShowModalDivive,
    } = this.state;
    const roleSa = isRoleSa();
    const permissionModule = isPermissionModule(moduleNames.ROOM_MANAGEMENT);
    const totalPage = Math.round(Number(totalRoom / limit) + 0.45);

    return (
      <div>
        {roleSa || permissionModule ? (
          <div className="show-fake-browser sidebar-page mt-1">
            <Container>
              <MenuPage />
              <Container className="p-3">
                <TableCommonPage
                  headerList={headerTable}
                  isShowAddAndSearch={true}
                  titleAddBtn="Add new room"
                  onSearch={(e) => this.onSearch(e)}
                  onShowModalAdd={() => this.onShowModalAdd()}
                  data={handleDataTable(
                    listRooms,
                    (room) => this.onShowModalUpdate(room),
                    (room) => this.onShowModalDelete(room),
                    (room) => this.onShowModalDivice(room)
                  )}
                  isShowPagination={true}
                  currentPage={page}
                  totalPage={totalPage}
                  nextPage={() => this.nextPage(totalPage)}
                  backPage={() => this.backPage()}
                />
              </Container>
            </Container>
            <FooterPage />
            <ModalRoomMgtPage
              isShowModal={isShowModalAdd}
              type={typeModals.ADD}
              onCloseModal={() => this.onCloseModal()}
              fetchListRooms={() => this.fetchListRooms()}
            />
            <ModalRoomMgtPage
              isShowModal={isShowModalUpdate}
              type={typeModals.UPDATE}
              onCloseModal={() => this.onCloseModal()}
              fetchListRooms={() => this.fetchListRooms()}
            />
            <ModalRoomMgtPage
              isShowModal={isShowModalDelete}
              type={typeModals.DELETE}
              onCloseModal={() => this.onCloseModal()}
              fetchListRooms={() => this.fetchListRooms()}
            />
            <ModalRoomMgtPage
              isShowModal={isShowModalDivive}
              type={typeModals.VIEW}
              onCloseModal={() => this.onCloseModal()}
              fetchListRooms={() => this.fetchListRooms()}
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
    listRooms: state.RoomReducer.listRooms,
    totalRoom: state.RoomReducer.totalRoom,
  };
};

export default connect(mapStateToProps)(RoomMgtPage);
