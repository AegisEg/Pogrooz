// App
import React from "react";

// Router
import { Link } from "react-router-dom";
import Button from "../../Elements/Button";
import Input from "../../Elements/Input";
import Loading from "../../Elements/Loading";
import LoadingFixed from "../../Elements/LoadingFixed";
import CheckBoxSwitcher from "../../Elements/CheckBoxSwitcher";
import api from "../../config/api";
import { connect } from "react-redux";
class InputCartName extends React.Component {
  render() {
    return (
      <div className="position-relative input-name-cart">
        <input
          type="text"
          value={this.props.value}
          onChange={(e) => {
            let value = e.target.value.toUpperCase();
            if (/[a-zA-Z]+/gi.test(value) || value.length === 0)
              this.props.onChange(value);
          }}
        />
      </div>
    );
  }
}
class InputCart extends React.Component {
  render() {
    return (
      <>
        <div className="position-relative input-cart-wrapper">
          <input
            type="tel"
            value={this.props.value}
            className="input-cart"
            onChange={(e) => {
              let value = e.target.value;
              if (value.length === 0) this.props.onChange("");
              else if (value.length <= 22) {
                if (/^[0-9]+$/.test(value.replace(/\s+/g, "")))
                  this.props.onChange(
                    value
                      .replace(/\s+/g, "")
                      .match(/.{1,4}/g)
                      .join("  ")
                  );
              }
            }}
          />
          {/* <span className="underline one"></span>
          <span className="underline two"></span>
          <span className="underline three"></span>
          <span className="underline four"></span> */}
        </div>
      </>
    );
  }
}
class Card extends React.Component {
  render() {
    return (
      <div className="card active">
        <div className="row mx-0">
          <div className="col-7 f-20">4276 **** **** ****</div>
          <div className="col-5 text-right">
            <span className="left-angle white f-12 mr-0">Активна</span>
          </div>
          <div
            className="col-7 f-18"
            style={{
              marginTop: "33px",
            }}
          >
            CARDHOLDER NAME
          </div>
          <div
            className="col-5 text-right f-18"
            style={{
              marginTop: "33px",
            }}
          >
            22/19
          </div>
          <div
            className="col"
            style={{
              marginTop: "17px",
            }}
          >
            <div className="card-hidden"></div>
          </div>
          <div
            className="col-12 text-right"
            style={{
              marginTop: "17px",
            }}
          >
            <Button type="empty" paddingVertical="7px" className="border-none">
              <span className="f-12">Редактировать</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
class FormNewCart extends React.Component {
  state = {
    cartNumber: "",
    nameCart: "",
  };

  render() {
    return (
      <div className="card form">
        <div className="row mx-0  align-items-start">
          <div className="col-8 row mx-0">
            <div
              className="f-12"
              style={{
                color: "#B9B9B9",
              }}
            >
              Номер карты
            </div>
            <InputCart
              onChange={(val) => {
                this.setState({ cartNumber: val });
              }}
              value={this.state.cartNumber}
            />
            <InputCartName
              onChange={(val) => {
                this.setState({ nameCart: val });
              }}
              value={this.state.nameCart}
            />
          </div>

          <div
            className="col-4 text-right f-18"
            style={{
              alignSelf: "flex-end",
            }}
          >
            <div
              className="f-12 text-left"
              style={{
                color: "#B9B9B9",
                marginBottom: "5px",
              }}
            >
              Срок
              <br /> действия
            </div>
            <div className="row expires">
              <div className="col-6">
                <Input
                  type="number"
                  className="not-border px-0"
                  value={this.state.month}
                />
              </div>
              <div className="col-6">
                <Input
                  type="number"
                  className="not-border px-0"
                  value={this.state.month}
                />
              </div>
            </div>
          </div>
          <div
            className="col"
            style={{
              marginTop: "12px",
            }}
          >
            <div className="card-hidden"></div>
          </div>
          <div
            className="col-12 text-right"
            style={{
              marginTop: "17px",
            }}
          >
            <Button
              type="empty"
              paddingVertical="7px"
              className="border-none bg-gray mr-2"
            >
              <span className="f-12">Редактировать</span>
            </Button>
            <Button type="fill " paddingVertical="7px" className="border-none">
              <span className="f-12">Активировать</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
class AutoPay extends React.Component {
  state = {
    enableAutoPay: false,
    isFetching: true,
    cards: false,
  };

  componentDidMount() {
    this.setState({ isFetching: true }, () => {
      fetch(`${api.urlApi}/api/tariffs/getMyAutoPayments`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.user.apiToken}`,
        },
      })
        .then((response) => response.json())
        .then(({ cards, error }) => {
          if (cards) {
            this.setState({ cards, isFetching: false });
          }
        });
    });
  }
  addNew = (e) => {
    e.preventDefault();
    this.setState({ isFetching: true }, () => {
      fetch(`${api.urlApi}/api/tariffs/addNewCard`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.user.apiToken}`,
        },
      })
        .then((response) => response.json())
        .then(({ response, error }) => {
          if (!error) {
            if (response.formUrl) {
              window.location.href = response.formUrl;
            } else {
              this.setState({ isFetching: false });
            }
          }
        });
    });
  };
  render() {
    return (
      <div className="standart-page">
        <div className="container-fluid">
          <h2 className="title mb-0">Настройки автоплатежа</h2>
          <Link to="/mytarif" className="href-hover f-12">
            Вернуться на страницу Мой тариф
          </Link>
          <div
            className="row mt-4"
            style={{
              marginBottom: "39px",
            }}
          >
            <div className="col d-flex align-items-center">
              <div
                className="mr-4 f-14"
                style={{
                  color: this.state.enableAutoPay ? "#B9B9B9" : "",
                }}
              >
                Включить
              </div>
              <CheckBoxSwitcher
                val={this.state.enableAutoPay}
                onChange={() => {
                  this.setState({ enableAutoPay: !this.state.enableAutoPay });
                }}
              />
              <div
                className="ml-4 f-14"
                style={{
                  color: !this.state.enableAutoPay ? "#B9B9B9" : "",
                }}
              >
                Включить
              </div>
            </div>
          </div>
          <h3 className="f-16 font-weight-normal">Привязанные карты</h3>
          <div className="row card-list">
            <Loading
              isLoading={this.state.isFetching && !this.state.cards}
            ></Loading>
            <LoadingFixed
              isLoading={this.state.isFetching && this.state.cards}
            ></LoadingFixed>
            {this.state.cards && (
              <>
                {this.state.cards.map((item, index) => (
                  <Card kay={index} card={item} />
                ))}
                <Link to="/" onClick={this.addNew} className="href sadd-new">
                  + добавить карту
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(AutoPay);
