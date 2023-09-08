import React, { Component } from "react";
import ForbidenPage from "../commons/forbiden";
import { isRoleSa, isPermissionModule } from "../../utils/permissionHandle";
import { moduleNames } from "../../constants/constant";
import { Container } from "rsuite";
import MenuPage from "../commons/menu";
import FooterPage from "../commons/footer";
import { connect } from "react-redux";
import { roomActions } from "../../store/actions";

class RoomMgtPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      page: 1,
    };
  }

  componentDidMount() {
    this.fetchListRooms();
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

  render() {
    const { listRooms = [], totalRoom = 0 } = this.props;
    const roleSa = isRoleSa();
    const permissionModule = isPermissionModule(moduleNames.ROOM_MANAGEMENT);
    console.log(listRooms, totalRoom);

    return (
      <div>
        {roleSa || permissionModule ? (
          <div className="show-fake-browser sidebar-page mt-1">
            <Container>
              <MenuPage />
              <Container className="p-3">
                <p>Hello</p>
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
    listRooms: state.RoomReducer.listRooms,
    totalRoom: state.RoomReducer.totalRoom,
  };
};

export default connect(mapStateToProps)(RoomMgtPage);
