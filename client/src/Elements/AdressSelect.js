// App
import React from "react";
import ReactDadataBox from "react-dadata-box";
import configApi from "../config/api";

class AdressSelect extends React.Component {
  render() {
    return (
      <ReactDadataBox
        token={configApi.daDataToken}
        className="input-text"
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}
      />
    );
  }
}

export default AdressSelect;
