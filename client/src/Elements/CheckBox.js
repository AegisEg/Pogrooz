// App
import React from "react";

class CheckBox extends React.Component {
  render() {
    return (
      <>
        <input
          type="checkbox"
          id={this.props.id}
          name={this.props.name}
          value={this.props.value}
          className={`input-${this.props.type}`}
          onChange={this.props.onChange}
        />
        <label
          htmlFor={this.props.id}
          style={{ display: "inline-block", verticalAlign: "sub" }}
        ></label>
        <span className={`${this.props.wrapperlabelClass ? this.props.wrapperlabelClass : "ml-3"}`}>
          <label
            htmlFor={this.props.id}
            className={`${this.props.labelClass ? this.props.labelClass : "f-14"}`}
            style={{ display: "inline-block" }}
          >
            {this.props.text}
          </label>
        </span>
      </>
    );
  }
}

export default CheckBox;
