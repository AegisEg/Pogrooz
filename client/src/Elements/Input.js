// App
import React from "react";
//PHONE
import ReactPhoneInput from "react-phone-input-2";
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
          <ReactPhoneInput
            value={this.props.value}
            inputExtraProps={{
              name: "phone",
            }}
            disableDropdown={false}
            style={this.props.style}
            inputClass={`col input-text ${this.props.className} ${
              this.props.error ? "input-error" : ""
            }`}
            placeholder={this.props.placeholder}
            onChange={(val) => {
              this.props.onChange(val);
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
              cancelLabel="Закрыть"
              okLabel="Ок"
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
              cancelLabel="Закрыть"
              okLabel="Ок"
              format="dd.MM.yyyy"
              className={this.props.className}
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
