import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { typeModals } from "../../../constants/constant";

class ModalHomePage extends Component {
  render() {
    const { isShowModal, type } = this.props;

    return (
      <Modal show={isShowModal} className="fs-6">
        <Modal.Header
          onHide={() => this.props.onCloseModal()}
          closeButton={true}
        >
          {type === typeModals.UPDATE_GENERAL ? "Update general info" : null}
          {type === typeModals.UPDATE_PROFILE ? "Update profile info" : null}
          {type === typeModals.UPDATE_PASSWORD ? "Update password" : null}
        </Modal.Header>
        <Modal.Body>
          {type === typeModals.UPDATE_GENERAL
            ? "Update general form add here"
            : null}
        </Modal.Body>
        <Modal.Footer>
          {type === typeModals.UPDATE_GENERAL ? (
            <Button variant="outline-primary" size="sm">
              Update info
            </Button>
          ) : null}
          {type === typeModals.UPDATE_PASSWORD ? (
            <Button variant="outline-primary" size="sm">
              Update password
            </Button>
          ) : null}
          {type === typeModals.UPDATE_PROFILE ? (
            <Button variant="outline-primary" size="sm">
              Update profile
            </Button>
          ) : null}
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => this.props.onCloseModal()}
          >
            close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect()(ModalHomePage);
