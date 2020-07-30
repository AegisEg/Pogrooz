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
          checked={this.props.value || ""}
          className={`input-${this.props.type}`}
          onChange={this.props.onChange ? this.props.onChange : () => {}}
        />
        <label
          htmlFor={this.props.id}
          className="mr-2"
          style={{ display: "inline-block", verticalAlign: "sub" }}
        ></label>
        {this.props.text && (
          <span
            className={`${
              this.props.wrapperlabelClass ? this.props.wrapperlabelClass : ""
            }`}
          >
            <label
              htmlFor={this.props.id}
              className={`${
                this.props.labelClass ? this.props.labelClass : "f-12"
              }`}
              style={{ display: "inline-block" }}
            >
              {this.props.text}
            </label>
          </span>
        )}
      </>
    );
  }
}

export default CheckBox;
