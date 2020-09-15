// App
import React from "react";
import { withCookies } from "react-cookie";

// Elements
import Loading from "../../Elements/Loading";
import { withRouter } from "react-router-dom";

class LoginByToken extends React.Component {
  componentDidMount() {
    this.props.cookies.set("apiToken", this.props.match.params.token, {
      path: "/",
    });
    window.location.href = "/";
  }
  render() {
    return (
      <div style={{ minHeight: "calc(100vh - 453px)" }}>
        <Loading isLoading={true}></Loading>
      </div>
    );
  }
}

export default withCookies(withRouter(LoginByToken));
