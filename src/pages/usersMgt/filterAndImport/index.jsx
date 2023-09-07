import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Modal } from "react-bootstrap";
import { typeModals } from "../../../constants/constant";
import Select from "react-select";
import { userRoleOption, userStatusOption } from "../../../utils/userHandle";
import { userActions } from "../../../store/actions";

class FilterAndImportModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      role: null,
      status: null,
    };
  }

  onChangeStatus(e) {
    this.setState({
      status: e.value,
    });
  }

  onChangeRole(e) {
    this.setState({
      role: e.value,
    });
  }

  onChangeFile(e) {
    this.setState({
      file: e.target.files[0],
    });
  }

  filterUser() {
    const { dispatch } = this.props;
    const { status, role } = this.state;
    dispatch({
      type: userActions.GET_LIST_USER,
      payload: {
        status,
        role,
      },
    });
    setTimeout(() => {
      this.props.onCloseModal();
    }, 40);
  }

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
        <Modal.Body>
          {type === typeModals.IMPORT ? (
            <>
              <Form.Label>Select file csv</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => this.onChangeFile(e)}
              />
            </>
          ) : null}
          {type === typeModals.FILTER ? (
            <>
              <Form.Label>Role</Form.Label>
              <Select
                options={userRoleOption}
                onChange={(e) => this.onChangeRole(e)}
              />
              <Form.Label className="mt-2">Status</Form.Label>
              <Select
                options={userStatusOption}
                onChange={(e) => this.onChangeStatus(e)}
              />
            </>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          {type === typeModals.IMPORT ? (
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => this.importUser()}
            >
              Import
            </Button>
          ) : null}
          {type === typeModals.FILTER ? (
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => this.filterUser()}
            >
              Filter
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

export default connect()(FilterAndImportModal);
