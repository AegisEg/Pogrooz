// App
import React from "react";

// Router
import { Link } from "react-router-dom";
import Button from "../../Elements/Button";
import Loading from "../../Elements/Loading";
import LoadingFixed from "../../Elements/LoadingFixed";
import CheckBoxSwitcher from "../../Elements/CheckBoxSwitcher";
import api from "../../config/api";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import { CSSTransitionGroup } from "react-transition-group";
import * as userActions from "../../redux/actions/user";
class Card extends React.Component {
  render() {
    return (
      <div className={`card ${this.props.active ? "active" : ""}`}>
        <div className="row mx-0">
          <div className="col-7 f-20">{this.props.card.maskedPan}</div>
          {this.props.active && (
            <div className="col-5 text-right">
              <span className="left-angle white f-12 mr-0">Активна</span>
            </div>
          )}
          {!this.props.active && (
            <div className="col-5 f-12 text-right">
              <span style={{ color: "#B9B9B9" }}>Не активна</span>
            </div>
          )}
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
            {this.props.card.expiryDate.slice(4, 6)}/
            {this.props.card.expiryDate.slice(2, 4)}
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
              height: "38px",
            }}
          >
            <Button
              type="empty"
              paddingVertical="7px"
              className="border-none"
              onClick={() => {
                this.props.removeCard(this.props.card.bindingId);
              }}
            >
              <span className="f-12">Удалить</span>
            </Button>
            {!this.props.active && (
              <Button
                type="fill"
                paddingVertical="7px"
                className="border-none"
                onClick={() => {
                  this.props.activateCard(this.props.card.bindingId);
                }}
              >
                <span className="f-12">Активировать</span>
              </Button>
            )}
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
    bindingIdCard: false,
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
        .then(({ cards, bindingIdCard, error }) => {
          this.setState({ cards, bindingIdCard, isFetching: false });
        });
    });
  }
  activateCard = (bindingId) => {
    this.setState({ isFetching: true }, () => {
      fetch(`${api.urlApi}/api/tariffs/bindCard`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.user.apiToken}`,
        },
        body: JSON.stringify({
          bindingId: bindingId,
        }),
      })
        .then((response) => response.json())
        .then(({ errorCode }) => {
          if (!errorCode) {
            toast.success("Карта успешно активированна");
            this.setState({ bindingIdCard: bindingId });
          } else toast.error("Карта не активирована");
          this.setState({ isFetching: false });
        });
    });
  };
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
              window.open(response.formUrl);
            } else {
              this.setState({ isFetching: false });
            }
          }
        });
    });
  };
  removeCard = (bindingId) => {
    this.setState({ isFetching: true }, () => {
      fetch(`${api.urlApi}/api/tariffs/removeCard`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.user.apiToken}`,
        },
        body: JSON.stringify({
          bindingId: bindingId,
        }),
      })
        .then((response) => response.json())
        .then(({ error }) => {
          let state = {};
          if (!error) {
            toast.success("Карта успешно удалена");
            if (this.state.bindingIdCard === bindingId)
              state.bindingIdCard = false;
            state.cards = this.state.cards.filter(
              (item) => item.bindingId !== bindingId
            );
          } else toast.error("Карта не удалена");
          this.setState({ isFetching: false, ...state });
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
                  color: this.props.user.isEnableAutoPay ? "#B9B9B9" : "",
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (this.props.user.isEnableAutoPay)
                    this.props.userActions.toogleAutoPay(
                      this.props.user.apiToken
                    );
                }}
              >
                Выключить
              </div>
              <CheckBoxSwitcher
                val={this.props.user.isEnableAutoPay}
                onChange={() => {
                  this.props.userActions.toogleAutoPay(
                    this.props.user.apiToken
                  );
                }}
              />
              <div
                className="ml-4 f-14"
                style={{
                  color: !this.props.user.isEnableAutoPay ? "#B9B9B9" : "",
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (!this.props.user.isEnableAutoPay)
                    this.props.userActions.toogleAutoPay(
                      this.props.user.apiToken
                    );
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
            <CSSTransitionGroup
              transitionName="height-animation-item"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={1}
              style={{
                display: "contents",
              }}
            >
              {this.state.cards && this.props.user.isEnableAutoPay && (
                <>
                  {this.state.cards.map((item, index) => (
                    <Card
                      key={index}
                      active={item.bindingId === this.state.bindingIdCard}
                      card={item}
                      removeCard={this.removeCard}
                      activateCard={this.activateCard}
                    />
                  ))}
                  <div className="col-12  mt-3 text-center">
                    <Link to="/" onClick={this.addNew} className="href">
                      + добавить карту
                    </Link>
                  </div>
                  <div className="col-12  mt-3  f-12 text-left">
                    Если у Вас привязано более 1 карты: чтобы сменить карту для
                    автоплатежа нажмите на кнопку Активировать на неактивной
                    карте.
                  </div>
                </>
              )}
            </CSSTransitionGroup>
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
function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AutoPay);
