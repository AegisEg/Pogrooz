// App
import React from "react";

class CheckBoxSwitcher extends React.Component {
  render() {
    return (
      <>
        <div
          className={`CheckBoxSwitcher ${this.props.className} ${
            this.props.val ? "checked" : ""
          }`}
          onClick={this.props.onChange ? this.props.onChange : () => {}}
        ></div>
        {this.props.lable && (
          <label
            className={this.props.lableClassname}
            onClick={this.props.onChange ? this.props.onChange : () => {}}
          >
            {this.props.lable}
          </label>
        )}
      </>
    );
  }
}

export default CheckBoxSwitcher;
