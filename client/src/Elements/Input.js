// App
import React from "react";
//PHONE
import InputMask from "react-input-mask";
//DATE
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
//DATE
import EyeOpen from "../img/sid-view.svg";
import EyeClose from "../img/eye-close.png";
import ruLocale from "date-fns/locale/ru";
class Input extends React.Component {
  state = {
    showPassword: false,
    isFocus: false,
  };
  detectType() {
    if (this.props.type === "password")
      if (this.state.showPassword) return "text";
      else return "password";
    else return this.props.type;
  }
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
    if (this.props.type === "time") {
      return (
        <div
          className="input"
          style={{
            display: "contents",
            position: "relative",
            paddingBottom: this.props.error ? "10px" : "0px",
          }}
        >
          <MuiPickersUtilsProvider locale={ruLocale} utils={DateFnsUtils}>
            <TimePicker
              onFocus={() => {
                this.setState({ isFocus: true });
              }}
              ampm={false}
              onBlur={() => {
                this.setState({ isFocus: false });
              }}
              InputProps={{
                className: "input-time fixed-width",
              }}
              format="HH:mm"
              value={this.props.value}
              placeholder={this.props.placeholder}
              minDate={this.props.minDate}
              onChange={this.props.onChange ? this.props.onChange : () => {}}
            />
          </MuiPickersUtilsProvider>
          {this.props.error && (
            <span className="input-error-label">{this.props.error.msg}</span>
          )}
        </div>
      );
    }
    if (this.props.type === "date") {
      return (
        <div
          className="input"
          style={{
            display: "contents",
            position: "relative",
            paddingBottom: this.props.error ? "10px" : "0px",
          }}
        >
          <MuiPickersUtilsProvider locale={ruLocale} utils={DateFnsUtils}>
            <DatePicker
              onFocus={() => {
                this.setState({ isFocus: true });
              }}
              onBlur={() => {
                this.setState({ isFocus: false });
              }}
              InputProps={{
                className: "input-date",
              }}              
              format="dd.MM.yyyy"
              disablePast
              value={this.props.value}
              placeholder={this.props.placeholder}
              minDate={this.props.minDate}
              onChange={this.props.onChange ? this.props.onChange : () => {}}
            />
          </MuiPickersUtilsProvider>
          {this.props.error && (
            <span className="input-error-label">{this.props.error.msg}</span>
          )}
        </div>
      );
    } else
      return (
        <div
          className="input"
          style={{
            display: this.props.type === "number" ? "block" : "contents",
            position: "relative",
            paddingBottom: this.props.error ? "10px" : "0px",
          }}
        >
          <input
            type={this.detectType()}
            onFocus={() => {
              this.setState({ isFocus: true });
            }}
            onBlur={() => {
              this.setState({ isFocus: false });
            }}
            value={this.props.value}
            name={this.props.name}
            min={this.props.min}
            max={this.props.max}
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
