import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { typeModals } from "../../../constants/constant";
import Select from "react-select";
import { listModuleName } from "../../../constants/constant";
import { permissionActions } from "../../../store/actions";

class ModalPermissionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleName: null,
    };
  }

  onChangeModuleName(e) {
    this.setState({
      moduleName: e.value,
    });
  }

  addPermission() {
    const { user, dispatch } = this.props;
    const { moduleName } = this.state;
    dispatch({
      type: permissionActions.ADD_PERMISSION,
      payload: {
        moduleName,
        user: String(user?.profile?._id),
      },
    });
    setTimeout(() => {
      this.props.fetchData();
      this.props.onCloseModal();
    }, 100);
  }

  render() {
    const { isShowModal, type } = this.props;

    return (
      <Modal show={isShowModal}>
        <Modal.Header
          onHide={() => this.props.onCloseModal()}
          closeButton={true}
        >
          {type === typeModals.ADD ? <h4>Add more permission</h4> : null}
          {type === typeModals.DELETE ? <h4>Delete permission</h4> : null}
        </Modal.Header>
        <Modal.Body>
          {type === typeModals.ADD ? (
            <>
              <Form.Label>Select module name</Form.Label>
              <Select
                options={listModuleName}
                onChange={(e) => this.onChangeModuleName(e)}
              />
            </>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          {type === typeModals.ADD ? (
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => this.addPermission()}
            >
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

export default connect()(ModalPermissionPage);
