import React from "react";
import Main from "../Pages/Public/Main";
import FAQ from "../Pages/Public/FAQ";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Forgot from "../Pages/Auth/Forgot";
import Reset from "../Pages/Auth/Reset";
import Cargo from "../Pages/Public/Cargo";
import SearchPage from "../Pages/Public/SearchPage";
import TarifPage from "../Pages/Public/TarifPage";
import Application from "../Pages/Public/Application";
import Carrier from "../Pages/Public/Carrier";
class PublicComponents extends React.Component {
  render() {
    if (this.props.name === "Main") return <Main {...this.props} />;
    if (this.props.name === "FAQ") return <FAQ {...this.props} />;
    if (this.props.name === "Login") return <Login {...this.props} />;
    if (this.props.name === "Register") return <Register {...this.props} />;
    if (this.props.name === "Forgot") return <Forgot {...this.props} />;
    if (this.props.name === "Reset") return <Reset {...this.props} />;
    if (this.props.name === "Cargo") return <Cargo {...this.props} />;
    if (this.props.name === "SearchPage") return <SearchPage {...this.props} />;
    if (this.props.name === "TarifPage") return <TarifPage {...this.props} />;
    if (this.props.name === "SearchPage") return <SearchPage {...this.props} />;
    if (this.props.name === "Application")
      return <Application {...this.props} />;
    if (this.props.name === "Carrier") return <Carrier {...this.props} />;
  }
}
export default PublicComponents;
