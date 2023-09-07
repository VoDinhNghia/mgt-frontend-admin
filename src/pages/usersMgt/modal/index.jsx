import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { typeModals } from "../../../constants/constant";
import Select from "react-select";
import { optionGender, userRoleOption } from "../../../utils/userHandle";

class ModalUserPage extends Component {
  render() {
    const { isShowModal, type } = this.props;

    return (
      <Modal show={isShowModal}>
        <Modal.Header
          onHide={() => this.props.onCloseModal()}
          closeButton={true}
        >
          {type === typeModals.ADD ? <h4>Add new user</h4> : null}
        </Modal.Header>
        <Modal.Body>
          {type === typeModals.ADD ? (
            <>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" />
              <Form.Label className="mt-2">Password</Form.Label>
              <Form.Control type="password" />
              <Form.Label className="mt-2">Role</Form.Label>
              <Select options={userRoleOption} />
              <Form.Label className="mt-2">FirstName</Form.Label>
              <Form.Control type="text" />
              <Form.Label className="mt-2">LastName</Form.Label>
              <Form.Control type="text" />
              <Form.Label className="mt-2">MiddleName</Form.Label>
              <Form.Control type="text" />
              <Form.Label className="mt-2">Mobile</Form.Label>
              <Form.Control type="text" />
              <Form.Label className="mt-2">Gender</Form.Label>
              <Select options={optionGender} />
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

export default connect()(ModalUserPage);
