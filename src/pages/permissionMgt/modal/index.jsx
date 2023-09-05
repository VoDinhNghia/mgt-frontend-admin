import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { typeModals } from "../../../constants/constant";

class ModalPermissionPage extends Component {
  render() {
    const { isShowModal, type, user } = this.props;
    console.log("user", user);

    return (
      <Modal show={isShowModal}>
        <Modal.Header
          onHide={() => this.props.onCloseModal()}
          closeButton={true}
        >
          {type === typeModals.ADD ? <h4>Add more permission</h4> : null}
          {type === typeModals.DELETE ? <h4>Delete permission</h4> : null}
        </Modal.Header>
        <Modal.Footer>
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

export default connect()(ModalPermissionPage);
