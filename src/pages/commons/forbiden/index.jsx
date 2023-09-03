import React, { Component } from "react";
import { routes } from "../../../constants/constant";

class ForbidenPage extends Component {
  render() {
    return (
      <div className="text-center mt-3">
        <p className="mb-3">
          <a href={routes.home} className="fs-5">
            Go to home page
          </a>
        </p>
        <img src="/images/forbiden.jpg" alt="" width="100%" />
      </div>
    );
  }
}

export default ForbidenPage;
