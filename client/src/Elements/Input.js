// App
import React from "react";
import InputPhone from "react-phone-number-input/input";

class Input extends React.Component {
  render() {
    if (this.props.type == "phone")
      return (
        <InputPhone
          type={this.props.type}
          maxlength="16"
          value={this.props.value}
          name={this.props.name}
          style={this.props.style}
          className={`col input-${this.props.type} ${this.props.className}`}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange ? this.props.onChange : () => {}}
        />
      );
    else
      return (
        <input
          type={this.props.type}
          value={this.props.value}
          name={this.props.name}
          style={this.props.style}
          className={`col input-${this.props.type} ${this.props.className}`}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
        />
      );
  }
}

export default Input;
