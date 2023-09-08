import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { typeModals } from "../../../constants/constant";

class ModalRoomMgtPage extends Component {
  render() {
    const { isShowModal, type } = this.props;

    return (
      <Modal show={isShowModal}>
        <Modal.Header onHide={() => this.props.onCloseModal()} closeButton={true}>
          {type === typeModals.ADD ? <h4>Add new room</h4> : null}
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
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
