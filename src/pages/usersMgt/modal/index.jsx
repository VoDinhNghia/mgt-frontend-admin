import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { typeModals } from "../../../constants/constant";
import Select from "react-select";
import {
  optionGender,
  userRoleOption,
  userStatusOption,
} from "../../../utils/userHandle";
import { NotificationManager } from "react-notifications";
import { userActions } from "../../../store/actions";

class ModalUserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      passWord: null,
      role: null,
      firstName: null,
      lastName: null,
      middleName: null,
      mobile: null,
      gender: null,
      status: null,
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      passWord: e.target.value,
    });
  }

  onChangeRole(e) {
    this.setState({
      role: e.value,
    });
  }

  onChangeGender(e) {
    this.setState({
      gender: e.value,
    });
  }

  onChangeMobile(e) {
    this.setState({
      mobile: e.target.value,
    });
  }

  onChangeFirtName(e) {
    this.setState({
      firstName: e.target.value,
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value,
    });
  }

  onChangeMiddleName(e) {
    this.setState({
      middleName: e.target.value,
    });
  }

  onChangeStatus(e) {
    this.setState({
      status: e.value,
    });
  }

  addNewUser() {
    const { dispatch } = this.props;
    const {
      email,
      mobile,
      gender,
      passWord,
      middleName,
      lastName,
      firstName,
      role,
    } = this.state;
    if (
      !email ||
      !passWord ||
      !lastName ||
      !firstName ||
      !role ||
      !middleName
    ) {
      NotificationManager.error(
        "email, passWord, lastName, firstName and role must is provided",
        "Add user",
        4000
      );
    } else {
      dispatch({
        type: userActions.ADD_USER,
        payload: {
          email,
          passWord,
          lastName,
          firstName,
          middleName,
          role,
          gender,
          mobile,
        },
      });
      setTimeout(() => {
        this.props.fetchUserList();
        this.props.onCloseModal();
      }, 100);
    }
  }

  render() {
    const { isShowModal, type, user } = this.props;

    return (
      <Modal show={isShowModal}>
        <Modal.Header
          onHide={() => this.props.onCloseModal()}
          closeButton={true}
        >
          {type === typeModals.ADD ? <h4>Add new user</h4> : null}
          {type === typeModals.UPDATE ? <h4>Update user</h4> : null}
          {type === typeModals.DELETE ? <h4>Delete user</h4> : null}
        </Modal.Header>
        <Modal.Body>
          {type === typeModals.ADD ? (
            <>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => this.onChangeEmail(e)}
              />
              <Form.Label className="mt-2">Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => this.onChangePassword(e)}
              />
              <Form.Label className="mt-2">Role</Form.Label>
              <Select
                options={userRoleOption}
                onChange={(e) => this.onChangeRole(e)}
              />
              <Form.Label className="mt-2">FirstName</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => this.onChangeFirtName(e)}
              />
              <Form.Label className="mt-2">LastName</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => this.onChangeLastName(e)}
              />
              <Form.Label className="mt-2">MiddleName</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => this.onChangeMiddleName(e)}
              />
              <Form.Label className="mt-2">Mobile</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => this.onChangeMobile(e)}
              />
              <Form.Label className="mt-2">Gender</Form.Label>
              <Select
                options={optionGender}
                onChange={(e) => this.onChangeGender(e)}
              />
            </>
          ) : null}
          {type === typeModals.UPDATE ? (
            <>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => this.onChangeEmail(e)}
                defaultValue={user?.email}
              />
              <Form.Label className="mt-2">Role</Form.Label>
              <Select
                options={userRoleOption}
                onChange={(e) => this.onChangeRole(e)}
                defaultValue={userRoleOption.filter(
                  (role) => role.value === user?.role
                )}
              />
              <Form.Label className="mt-2">Status</Form.Label>
              <Select
                options={userStatusOption}
                onChange={(e) => this.onChangeStatus(e)}
                defaultValue={userStatusOption.filter(
                  (status) => status.value === user?.status
                )}
              />
            </>
          ) : null}
          {type === typeModals.DELETE ? (
            <>
              <span>
                Are you want to delete user{" "}
                <b>{`${user?.profile?.lastName} ${user?.profile?.middleName} ${user?.profile?.firstName}`}</b>
              </span>
            </>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          {type === typeModals.ADD ? (
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => this.addNewUser()}
            >
              Add
            </Button>
          ) : null}
          {type === typeModals.UPDATE ? (
            <Button variant="outline-primary" size="sm">
              Update
            </Button>
          ) : null}
          {type === typeModals.DELETE ? (
            <Button variant="outline-danger" size="sm">
              Yes
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
