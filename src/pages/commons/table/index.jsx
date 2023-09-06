import React, { Component } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { FcPrevious, FcNext } from "react-icons/fc";

class TableCommonPage extends Component {
  render() {
    const {
      headerList = [],
      data = [],
      isShowAddAndSearch = false,
      titleAddBtn,
      isShowPagination = false,
      currentPage = 0,
      totalPage = 0,
    } = this.props;

    return (
      <div>
        {isShowAddAndSearch ? (
          <Row className="mb-3">
            <Col xl={3}>
              <Card className="text-center">
                <Card.Body>
                  <Button
                    variant="outline-primary"
                    onClick={() => this.props.onShowModalAdd()}
                  >
                    {titleAddBtn}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={9}>
              <Card>
                <Card.Body>
                  <Form.Control
                    type="text"
                    placeholder="Search by name"
                    onChange={(e) => this.props.onSearch(e)}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : null}
        <Table bordered striped hover>
          <thead>
            <tr>
              {headerList.map((item, index) => {
                return (
                  <th key={index} className="bg-primary">
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  {item?.map((value, index) => {
                    return <td key={`${value}-${index}`}>{value}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
        {isShowPagination ? (
          <Row>
            <Col xl={3} className="text-center">
              <Card className="bg-light">
                <Card.Body>
                  <span>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => this.props.backPage()}
                    >
                      <FcPrevious />
                    </Button>{" "}
                    current: {currentPage}, total: {totalPage}{" "}
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => this.props.nextPage(totalPage)}
                    >
                      <FcNext />
                    </Button>
                  </span>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : null}
      </div>
    );
  }
}

export default TableCommonPage;
