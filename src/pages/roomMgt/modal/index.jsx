import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { typeModals } from "../../../constants/constant";
import Select from "react-select";
import { roomOptions } from "../../../utils/roomHandle";
import { NotificationManager } from "react-notifications";
import { roomActions } from "../../../store/actions";

class ModalRoomMgtPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      type: null,
      capacity: null,
      airConditioner: null,
      projector: null,
      status: null,
      description: null,
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeType(e) {
    this.setState({
      type: e.value,
    });
  }

  onChangeCapacity(e) {
    this.setState({
      capacity: e.target.value,
    });
  }

  onChangeAirConditioner(e) {
    this.setState({
      airConditioner: e.target.value,
    });
  }

  onChangeProjector(e) {
    this.setState({
      projector: e.target.value,
    });
  }

  onChangeStatus(e) {
    this.setState({
      status: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  addRoom() {
    const { dispatch } = this.props;
    const {
      name,
      type,
      description,
      status,
      airConditioner,
      projector,
      capacity,
    } = this.state;
    if (!name || !type || !capacity) {
      NotificationManager.error(
        "name, type and capacity must is provided.",
        "Add room",
        4000
      );
    } else {
      dispatch({
        type: roomActions.ADD_ROOM,
        payload: {
          name,
          description,
          capacity,
          type,
          divice: {
            projector,
            airConditioner,
            status,
          },
        },
      });
      this.setTimeOutFetchAndCloseModal();
    }
  }

  deleteRoom() {
    const { dispatch, room } = this.props;
    dispatch({
      type: roomActions.DELETE_ROOM,
      id: room?._id,
    });
    this.setTimeOutFetchAndCloseModal();
  }

  updateRoom() {
    const { dispatch, room } = this.props;
    const {
      name,
      description,
      airConditioner,
      status,
      projector,
      type,
      capacity,
    } = this.state;
    dispatch({
      type: roomActions.UPDATE_ROOM,
      id: room?._id,
      payload: {
        name: name || room?.name,
        description: description || room?.description,
        divice: {
          airConditioner: airConditioner || room?.divice?.airConditioner,
          status: status || room?.divice?.status,
          projector: projector || room?.divice?.projector,
        },
        type: type || room?.type,
        capacity: capacity || room?.capacity,
      },
    });
    this.setTimeOutFetchAndCloseModal();
  }

  setTimeOutFetchAndCloseModal() {
    setTimeout(() => {
      this.props.fetchListRooms();
      this.props.onCloseModal();
    }, 100);
  }

  render() {
    const { isShowModal, type, room } = this.props;

    return (
      <Modal show={isShowModal}>
        <Modal.Header
          onHide={() => this.props.onCloseModal()}
          closeButton={true}
        >
          {type === typeModals.ADD ? <h4>Add new room</h4> : null}
        </Modal.Header>
        <Modal.Body>
          {type === typeModals.ADD || type === typeModals.UPDATE ? (
            <>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={room?.name}
                onChange={(e) => this.onChangeName(e)}
              />
              <Form.Label className="mt-2">Type</Form.Label>
              <Select
                options={roomOptions}
                defaultValue={roomOptions.filter(
                  (ro) => ro.value === room?.type
                )}
                onChange={(e) => this.onChangeType(e)}
              />
              <Form.Label className="mt-2">Capacity</Form.Label>
              <Form.Control
                type="number"
                defaultValue={Number(room?.capacity)}
                onChange={(e) => this.onChangeCapacity(e)}
              />
              <Form.Label className="mt-2">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                defaultValue={room?.description}
                onChange={(e) => this.onChangeDescription(e)}
              />
              <Form.Label className="mt-2">Air conditioner</Form.Label>
              <Form.Control
                type="text"
                defaultValue={room?.divice?.airConditioner}
                onChange={(e) => this.onChangeAirConditioner(e)}
              />
              <Form.Label className="mt-2">Projector</Form.Label>
              <Form.Control
                type="text"
                defaultValue={room?.divice?.projector}
                onChange={(e) => this.onChangeProjector(e)}
              />
              <Form.Label className="mt-2">Status</Form.Label>
              <Form.Control
                type="text"
                defaultValue={room?.divice?.status}
                onChange={(e) => this.onChangeStatus(e)}
              />
            </>
          ) : null}
          {type === typeModals.DELETE ? (
            <>
              Are you want to delete this <b>{room?.name}</b>?
            </>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          {type === typeModals.ADD ? (
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => this.addRoom()}
            >
              Add
            </Button>
          ) : null}
          {type === typeModals.DELETE ? (
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => this.deleteRoom()}
            >
              Yes
            </Button>
          ) : null}
          {type === typeModals.UPDATE ? (
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => this.updateRoom()}
            >
              Update
            </Button>
          ) : null}
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => this.props.onCloseModal()}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect()(ModalRoomMgtPage);
