import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { typeModals } from "../../../constants/constant";

class FilterAndImportModal extends Component {
  render() {
    const { isShowModal, type } = this.props;

    return (
      <Modal show={isShowModal}>
        <Modal.Header
          onHide={() => this.props.onCloseModal()}
          closeButton={true}
        >
          {type === typeModals.IMPORT ? <h4>Import users</h4> : null}
          {type === typeModals.FILTER ? <h4>Filter user</h4> : null}
        </Modal.Header>
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

export default connect()(FilterAndImportModal);
