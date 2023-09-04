import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { typeModals } from "../../../constants/constant";
import { NotificationManager } from "react-notifications";
import { userActions } from "../../../store/actions";
import Select from "react-select";
import { optionGender } from "../../../utils/userHandle";

class ModalHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passWord: null,
      newPassword: null,
      enterPassword: null,
    };
  }

  onChangePassword(e) {
    this.setState({
      passWord: e.target.value,
    });
  }

  onChangeNewPassword(e) {
    this.setState({
      newPassword: e.target.value,
    });
  }

  onChangeEnterPassword(e) {
    this.setState({
      enterPassword: e.target.value,
    });
  }

  updatePassword() {
    const { dispatch, profile } = this.props;
    const { passWord, newPassword, enterPassword } = this.state;
    if (!passWord || !newPassword || !enterPassword) {
      NotificationManager.error(
        "passWord, newPassword and enterPassword must is provided",
        "Update password",
        4000
      );
    } else if (newPassword !== enterPassword) {
      NotificationManager.error(
        "enterPassword is not match with newPassword",
        "Update password",
        4000
      );
    } else {
      dispatch({
        type: userActions.UPDATE_USER_INFO,
        id: profile?._id,
        payload: {
          passWord,
          newPassword,
        },
      });
      this.props.onCloseModal();
    }
  }

  render() {
    const { isShowModal, type, profile = {} } = this.props;

    return (
      <Modal show={isShowModal} className="fs-6">
        <Modal.Header
          onHide={() => this.props.onCloseModal()}
          closeButton={true}
        >
          {type === typeModals.UPDATE_GENERAL ? (
            <h4>Update general info</h4>
          ) : null}
          {type === typeModals.UPDATE_PROFILE ? (
            <h4>Update profile info</h4>
          ) : null}
          {type === typeModals.UPDATE_PASSWORD ? (
            <h4>Update password</h4>
          ) : null}
        </Modal.Header>
        <Modal.Body>
          {type === typeModals.UPDATE_GENERAL ? (
            <>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" defaultValue={profile?.email} />
            </>
          ) : null}
          {type === typeModals.UPDATE_PASSWORD ? (
            <>
              <Form.Label>Current password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => this.onChangePassword(e)}
              />
              <Form.Label className="mt-2">New password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => this.onChangeNewPassword(e)}
              />
              <Form.Label className="mt-2">Enter new password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => this.onChangeEnterPassword(e)}
              />
            </>
          ) : null}
          {type === typeModals.UPDATE_PROFILE ? (
            <>
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={profile?.profile?.firstName}
              />
              <Form.Label className="mt-2">Last name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={profile?.profile?.lastName}
              />
              <Form.Label className="mt-2">Middle name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={profile?.profile?.middleName}
              />
              <Form.Label className="mt-2">Mobile</Form.Label>
              <Form.Control
                type="text"
                defaultValue={profile?.profile?.mobile}
              />
              <Form.Label className="mt-2">Gender</Form.Label>
              <Select
                options={optionGender}
                defaultValue={optionGender.find(
                  (op) => op.value === profile?.profile?.gender
                )}
              />
            </>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          {type === typeModals.UPDATE_GENERAL ? (
            <Button variant="outline-primary" size="sm">
              Update info
            </Button>
          ) : null}
          {type === typeModals.UPDATE_PASSWORD ? (
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => this.updatePassword()}
            >
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
