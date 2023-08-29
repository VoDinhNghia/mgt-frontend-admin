import React, { Component } from "react";
import { routes } from "../../constants/constant";

class NotFoundPage extends Component {
  render() {
    return (
      <div className="mt-2 text-center">
        <a href={routes.home} className="mt-2 fs-5">
          Go to Home
        </a>
        <div>
          <img src="/images/notfound.jpg" width="100%" height="400px" alt="" />
        </div>
      </div>
    );
  }
}

export default NotFoundPage;
