import React, { Component } from "react";
import { Table } from "react-bootstrap";

class TableCommonPage extends Component {
  render() {
    const { headerList = [], data = [] } = this.props;

    return (
      <div>
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
      </div>
    );
  }
}

export default TableCommonPage;
