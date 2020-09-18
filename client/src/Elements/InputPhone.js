// App
import React from "react";
//PHONE
import ReactPhoneInput from "react-phone-input-2";
import Button from "../Elements/Button";
import Input from "../Elements/Input";
import api from "../config/api";
class InputPhone extends React.Component {
  state = {
    isSend: false,
    timer: false,
    disabled: false,
    code: "",
    isUnique: false,
    isUniqueFetching: false,
    isUniqueCanDo: true,
    verifiCode: btoa(unescape(encodeURIComponent("1234"))),
  };
  refresh = () => {
    this.setState({
      isSend: false,
      timer: false,
      disabled: false,
      code: "",
      isUnique: false,
      isUniqueFetching: false,
      isUniqueCanDo: true,
    });
  };
  sendSMS = () => {
    if (
      this.props.value.length === 11 &&
      this.state.isUnique &&
      !this.state.isUniqueFetching
    ) {
      this.setState(
        {
          isSend: true,
          disabled: true,
        },
        () => {
          //   fetch(`${api.urlApi}/auth/smsSend`, {
          //     method: "post",
          //     headers: {
          //       Accept: "application/json",
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify({
          //       phones: this.props.value,
          //     }),
          //   })
          //     .then((response) => response.json())
          //     .then((data) => {});
          // this.setState();
        }
      );
    }
  };
  render() {
    return (
      <div className="row">
        <div
          className="col "
          style={{
            paddingBottom:
              !this.state.isUnique &&
              this.props.value.length === 11 &&
              !this.state.isUniqueFetching &&
              !this.state.isUniqueCanDo
                ? "15px"
                : "0px",
          }}
        >
          <div
            style={{
              display: "contents",
              position: "relative",
            }}
          >
            <ReactPhoneInput
              inputExtraProps={{
                name: "phone",
              }}
              disabled={this.state.disabled}
              country={"ru"}
              disableDropdown={false}
              style={this.props.style}
              inputClass={`col input-text ${this.props.className} ${
                this.props.error ? "input-error" : ""
              }`}
              placeholder={this.props.placeholder}
              value={this.props.value}
              onChange={(val) => {
                if (!this.state.isSend) {
                  if (val.length < this.props.value.length)
                    this.setState({ isUnique: false, isUniqueCanDo: true });
                  if (
                    val != this.props.value &&
                    val.length === 11 &&
                    !this.state.isUnique &&
                    this.state.isUniqueCanDo
                  ) {
                    this.setState({ isUniqueFetching: true }, () => {
                      fetch(`${api.urlApi}/auth/uniquePhone`, {
                        method: "post",
                        headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          phone: val,
                        }),
                      })
                        .then((response) => response.json())
                        .then(({ error, unique }) => {
                          this.setState({
                            isUnique: unique,
                            isUniqueFetching: false,
                            isUniqueCanDo: false,
                          });
                        });
                    });
                  }
                  this.props.onChange(val);
                }
              }}
            />
            {!this.state.isUnique &&
              this.props.value.length === 11 &&
              !this.state.isUniqueFetching &&
              !this.state.isUniqueCanDo && (
                <span className="input-error-label">
                  Этот номер уже используется
                </span>
              )}
          </div>
        </div>

        <div
          className="col-12 col-sm-4 text-right mt-3 mt-sm-0"
          style={{
            alignSelf: "flex-start",
          }}
        >
          {this.props.isVerified === false && !this.state.isSend && (
            <Button
              paddingVertical={"8px"}
              disable={
                this.props.value.length !== 11 &&
                this.state.isUnique &&
                !this.state.isUniqueFetching
              }
              type="empty"
              onClick={this.sendSMS}
            >
              Получить код
            </Button>
          )}
          {!(
            this.props.isVerified === "success" ||
            this.props.isVerified === "error"
          ) &&
            this.state.isSend && (
              <Input
                type="text"
                style={{
                  width: "134px",
                }}
                value={this.state.code}
                placeholder="Код"
                onChange={(e) => {
                  if (e.target.value.length <= 4)
                    this.setState(
                      {
                        code: e.target.value,
                      },
                      () => {
                        if (this.state.code.length === 4) {
                          if (
                            btoa(
                              unescape(encodeURIComponent(this.state.code))
                            ) === this.state.verifiCode
                          )
                            this.props.setVerified("success");
                          else {
                            this.props.setVerified("error");
                            this.setState({
                              timer: 5,
                              code: "",
                              isSend: false,
                              disabled: false,
                              verifiCode: "1234",
                            });
                            let Interval = setInterval(async () => {
                              if (!!this.state.timer)
                                this.setState({ timer: this.state.timer - 1 });
                              else {
                                clearInterval(Interval);
                                this.props.setVerified(false);
                              }
                            }, 1000);
                          }
                        }
                      }
                    );
                }}
              ></Input>
            )}
          {this.props.isVerified === "success" && "Подтвержден"}
          {this.props.isVerified === "error" &&
            `Повторно отправить смс можно через ${this.state.timer}`}
        </div>
      </div>
    );
  }
}

export default InputPhone;
