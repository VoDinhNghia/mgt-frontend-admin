import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";
import { Container } from "rsuite";
import { BsPencilSquare } from "react-icons/bs";
import { connect } from "react-redux";
import ModalHomePage from "../modal";
import { typeModals } from "../../../constants/constant";

class RightContentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModalUpdateInfo: false,
      isShowModalUpdatePassword: false,
      isShowModalUpdateProfile: false,
    };
  }

  onShowUpdateInfo() {
    this.setState({
      isShowModalUpdateInfo: true,
    });
  }

  onShowUpdatePassword() {
    this.setState({
      isShowModalUpdatePassword: true,
    });
  }

  onShowUpdateProfile() {
    this.setState({
      isShowModalUpdateProfile: true,
    });
  }

  onCloseModal() {
    this.setState({
      isShowModalUpdateInfo: false,
      isShowModalUpdatePassword: false,
      isShowModalUpdateProfile: false,
    });
  }

  render() {
    const { profile = {} } = this.props;
    const {
      isShowModalUpdateInfo,
      isShowModalUpdatePassword,
      isShowModalUpdateProfile,
    } = this.state;

    return (
      <Container className="p-3 fs-6">
        <Card>
          <Card.Header>General Info</Card.Header>
          <Card.Body>
            <Card.Text>Email: {profile?.email}</Card.Text>
            <Card.Text>Role: {profile?.role?.toLowerCase()}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => this.onShowUpdateInfo()}
            >
              <BsPencilSquare /> Update Info
            </Button>{" "}
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => this.onShowUpdatePassword()}
            >
              <BsPencilSquare /> Update password
            </Button>
          </Card.Footer>
        </Card>
        <Card className="mt-3">
          <Card.Header>Profile</Card.Header>
          <Card.Body>
            <Card.Text>Code: {profile?.profile?.code}</Card.Text>
            <Card.Text>FirstName: {profile?.profile?.firstName}</Card.Text>
            <Card.Text>LastName: {profile?.profile?.lastName}</Card.Text>
            <Card.Text>MiddleName: {profile?.profile?.middleName}</Card.Text>
            <Card.Text>Gender: {profile?.profile?.gender}</Card.Text>
            <Card.Text>Mobile: {profile?.profile?.mobile}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => this.onShowUpdateProfile()}
            >
              <BsPencilSquare /> Update Info
            </Button>
          </Card.Footer>
        </Card>
        <ModalHomePage
          type={typeModals.UPDATE_GENERAL}
          isShowModal={isShowModalUpdateInfo}
          onCloseModal={() => this.onCloseModal()}
        />
        <ModalHomePage
          type={typeModals.UPDATE_PASSWORD}
          isShowModal={isShowModalUpdatePassword}
          onCloseModal={() => this.onCloseModal()}
        />
        <ModalHomePage
          type={typeModals.UPDATE_PROFILE}
          isShowModal={isShowModalUpdateProfile}
          onCloseModal={() => this.onCloseModal()}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.UserReducer.profile,
  };
};

export default connect(mapStateToProps)(RightContentPage);
