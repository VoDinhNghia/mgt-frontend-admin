import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { typeModals } from "../../../constants/constant";
import Select from "react-select";
import { roomOptions } from "../../../utils/roomHandle";

class ModalRoomMgtPage extends Component {
  render() {
    const { isShowModal, type } = this.props;

    return (
      <Modal show={isShowModal}>
        <Modal.Header
          onHide={() => this.props.onCloseModal()}
          closeButton={true}
        >
          {type === typeModals.ADD ? <h4>Add new room</h4> : null}
        </Modal.Header>
        <Modal.Body>
          {type === typeModals.ADD ? (
            <>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" />
              <Form.Label className="mt-2">Type</Form.Label>
              <Select options={roomOptions} />
              <Form.Label className="mt-2">Capacity</Form.Label>
              <Form.Control type="number" />
              <Form.Label className="mt-2">Description</Form.Label>
              <Form.Control as="textarea" rows={4} />
              <Form.Label className="mt-2">Air conditioner</Form.Label>
              <Form.Control type="text" />
              <Form.Label className="mt-2">Projector</Form.Label>
              <Form.Control type="text" />
              <Form.Label className="mt-2">Status</Form.Label>
              <Form.Control type="text" />
            </>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          {type === typeModals.ADD ? (
            <Button variant="outline-primary" size="sm">
              Add
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
