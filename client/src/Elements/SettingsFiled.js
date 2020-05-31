// App
import React from "react";
import CheckBox from "./CheckBox";

class SettingsFiled extends React.Component {
  render() {    
    return (
      <div className="row mx-0 align-items-center user-settings">
        <div className="filed-label">{this.props.label}</div>
        <div className="col fields-checkbox">
          <span className="align-middle">
            <CheckBox
              id={`${this.props.keyField}-mail`}
              name={`${this.props.keyField}-mail`}
              text="На почту"
              wrapperlabelClass="ml-2"
              labelClass="f-12 gray"
            />
          </span>
          <span className="align-middle">
            <CheckBox
              id={`${this.props.keyField}-push`}
              name={`${this.props.keyField}-push`}
              text="Push-уведомления"
              wrapperlabelClass="ml-2"
              labelClass="f-12 gray"
            />
          </span>
        </div>
      </div>
    );
  }
}

export default SettingsFiled;
