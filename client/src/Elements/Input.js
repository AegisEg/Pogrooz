// App
import React from "react";
import InputMask from "react-input-mask";
import EyeOpen from "../img/eye-open.png";
import EyeClose from "../img/eye-close.png";

class Input extends React.Component {
  state = {
    showPassword: false,
  };

  render() {
    if (this.props.type === "phone")
      return (
        <div
          style={{
            display: "contents",
            position: "relative",
            paddingBottom: this.props.error ? "10px" : "0px",
          }}
        >
          <InputMask
            type={this.props.type}
            mask="+9 (999) 999-99-99"
            value={this.props.value}
            name={this.props.name}
            style={this.props.style}
            className={`col input-text ${this.props.className} ${
              this.props.error ? "input-error" : ""
            }`}
            placeholder={this.props.placeholder}
            onChange={(e) => {
              this.props.onChange(e.target.value);
            }}
          />
          {this.props.error && (
            <span className="input-error-label">{this.props.error.msg}</span>
          )}
        </div>
      );
    else
      return (
        <div
          className="input"
          style={{
            display: this.props.type === "password" ? "block" : "contents",
            position: "relative",
            paddingBottom: this.props.error ? "10px" : "0px",
          }}
        >
          <input
            type={
              this.props.type === "password"
                ? this.state.showPassword
                  ? "text"
                  : "password"
                : this.props.type
            }
            value={this.props.value}
            name={this.props.name}
            style={this.props.style}
            className={`col input-${this.props.type} ${this.props.className} ${
              this.props.error ? "input-error" : ""
            }`}
            placeholder={this.props.placeholder}
            onChange={this.props.onChange}
          />
          {this.props.type === "password" && (
            <div
              className="toggle-show-password"
              onClick={() => {
                this.setState({ showPassword: !this.state.showPassword });
              }}
            >
              <img
                src={this.state.showPassword ? EyeOpen : EyeClose}
                alt="Показать/скрыть пароль"
              />
            </div>
          )}
          {this.props.error && (
            <span className="input-error-label">{this.props.error.msg}</span>
          )}
        </div>
      );
  }
}

export default Input;
