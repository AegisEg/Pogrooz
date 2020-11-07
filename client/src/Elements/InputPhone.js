// App
import React from "react";
//PHONE
import ReactPhoneInput from "react-phone-input-2";
import Button from "../Elements/Button";
import Input from "../Elements/Input";
import api from "../config/api";
import LoadingFixed from "../Elements/LoadingFixed";
import { toast } from "react-toastify";
class InputPhone extends React.Component {
  state = {
    isSend: false,
    timer: false,
    disabled: false,
    code: false,
    codeHash: false,
    isUnique: false,
    isFetching: false,
    isUniqueCanDo: true,
  };
  refresh = () => {
    this.setState({
      isSend: false,
      timer: false,
      disabled: false,
      code: false,
      codeHash: false,
      isFetching: false,
      isUniqueCanDo: true,
    });
  };
  sendSMS = () => {
    if (
      this.props.value.length === 11 &&
      this.state.isUnique &&
      !this.state.isFetching
    ) {
      this.setState(
        {
          isSend: true,
          disabled: true,
          timer: 60,
          isFetching: true,
        },
        () => {
          fetch(`${api.urlApi}/auth/smsSend`, {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone: this.props.value,
            }),
          })
            .then((response) => response.json())
            .then(({ error, code, codeReal }) => {
              if (error) {
                toast.error(
                  "Сообщение не доставлено. Свяжитесь с админстратором!"
                );
                this.props.setVerified(false);
                this.refresh();
              } else {
                alert(codeReal);
                this.setState({ isFetching: false, codeHash: code });
                let Interval = setInterval(async () => {
                  if (!!this.state.timer)
                    this.setState({
                      timer: this.state.timer - 1,
                    });
                  else {
                    clearInterval(Interval);
                    if (this.props.isVerified !== "success") {
                      this.props.setVerified(false);
                      this.refresh();
                    }
                  }
                }, 1000);
              }
            });
        }
      );
    }
  };
  render() {
    return (
      <div className="row">
        <LoadingFixed isLoading={this.state.isFetching} />
        <div
          className="col "
          style={{
            paddingBottom:
              !this.state.isUnique &&
              this.props.value.length === 11 &&
              !this.state.isFetching &&
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
              specialLabel={false}
              placeholder={this.props.placeholder}
              value={this.props.value}
              on
              onChange={(val) => {
                if (!this.state.isSend) {
                  if (val.length < this.props.value.length)
                    this.setState({ isUnique: false, isUniqueCanDo: true });
                  if (val != this.props.value && val.length === 11) {
                    this.setState({ isFetching: true }, () => {
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
                            isFetching: false,
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
              !this.state.isFetching &&
              !this.state.isUniqueCanDo && (
                <span className="input-error-label">
                  Этот номер уже используется
                </span>
              )}
          </div>
        </div>

        <div
          className="col-12 col-sm-4 text-right mt-3 mt-sm-0 verified-field"
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
                !this.state.isFetching
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
              <div
                style={{
                  display: "contents",
                  position: "relative",
                }}
              >
                <Input
                  type="text"
                  className="input-error"
                  value={this.state.code || ""}
                  placeholder="Код"
                  onChange={(e) => {
                    if (e.target.value.length <= 4 && !this.state.isFetching)
                      this.setState(
                        {
                          code: e.target.value,
                        },
                        () => {
                          if (this.state.code.length === 4) {
                            fetch(`${api.urlApi}/auth/compareCode`, {
                              method: "post",
                              headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                codeHash: this.state.codeHash,
                                code: this.state.code,
                              }),
                            })
                              .then((response) => response.json())
                              .then((compare) => {
                                if (compare) this.props.setVerified("success");
                                else this.props.setVerified("error");
                              });
                          }
                        }
                      );
                  }}
                ></Input>
                <span className="input-error-label">
                  Осталось {this.state.timer} сек
                </span>
              </div>
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
