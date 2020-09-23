// App
import React from "react";
import Slider from "../Elements/Slider";
// Elements
import Button from "../Elements/Button";
import { prettyDate } from "../controllers/TimeController";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../Elements/Loading";
import LoadingFixed from "../Elements/LoadingFixed";
import { CSSTransitionGroup } from "react-transition-group";
import { toast } from "react-toastify";
import api from "../config/api";

class Tariffs extends React.Component {
  state = {
    tariffs: false,
    isFetching: true,
  };
  bayTariff = (tariff) => {
    this.setState({ isFetching: true }, () => {
      fetch(`${api.urlApi}/api/tariffs/buy`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.user.apiToken}`,
        },
        body: JSON.stringify({
          tariffId: tariff._id,
        }),
      })
        .then((response) => response.json())
        .then(({ error, errors }) => {
          if (error)
            errors.map((item) => {
              toast.error(item.msg);
            });
          this.setState({ isFetching: false });
        });
    });
  };
  componentDidMount() {
    fetch(`${api.urlApi}/api/tariffs/`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(({ tariffs }) => {
        this.setState({ isFetching: false, tariffs: tariffs });
      });
  }
  render() {
    return (
      <>
        <Loading isLoading={this.state.isFetching && !this.state.tariffs} />
        <LoadingFixed isLoading={this.state.isFetching && this.state.tariffs} />
        <CSSTransitionGroup
          transitionName="height-animation-item"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={1}
          style={{
            display: "contents",
          }}
        >
          {this.state.tariffs && (
            <>
              <div
                className={`tariffs-list position-relative ${this.props.className}`}
              >
                <Slider>
                  {this.state.tariffs &&
                    this.state.tariffs.map((item, index) => {
                      let priceWithSale = item.discount
                        ? item.price - item.price * (item.discount / 100)
                        : item.price;
                      let duration;
                      if (item.duration <= 28) {
                        duration = item.duration / 7;
                        if (duration > 1) duration += " недели";
                        else duration += " неделя";
                      }
                      if (item.duration > 28) {
                        duration = prettyDate(item.duration / 30);
                      }
                      return (
                        <div key={index} className="tariff-wrapper">
                          <div
                            className={`tariff ${
                              !!item.discount ? `yellow` : ``
                            }`}
                          >
                            <div className="info">
                              <div className="d-flex justify-content-between">
                                <span className="name">{item.name}</span>
                                {!!item.discount && (
                                  <span className="withoutSale">
                                    {" "}
                                    {item.price} руб{" "}
                                  </span>
                                )}
                              </div>
                              <span className="price">
                                {!!priceWithSale
                                  ? priceWithSale + " руб"
                                  : "Бесплатно"}
                              </span>

                              <span className="sale">
                                {!!item.discount && (
                                  <>Скидка {item.discount}% </>
                                )}
                              </span>

                              <div className="tags">
                                <span className="left-angle mt-1">
                                  {duration}
                                </span>
                                {item.isDemo && (
                                  <span className="left-angle mt-1">
                                    Может быть использован 1 раз
                                  </span>
                                )}
                                {!item.isDemo && (
                                  <span className="left-angle mt-1">
                                    {priceWithSale / item.duration} руб в день
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-center">
                              <Button
                                type={`${item.discount ? `empty` : `fill`}  `}
                                className={`${
                                  item.discount ? `yellow-after` : ``
                                } ${
                                  this.props.user.isAuth && item.isDemo
                                    ? "disable"
                                    : ""
                                }`}
                                onClick={() => {
                                  if (!this.props.user.isAuth)
                                    this.props.history.push("/register");
                                  else if (!item.isDemo) {
                                    this.bayTariff(item);
                                  }
                                }}
                                paddingVertical="3px"
                              >
                                {!this.props.user.isAuth &&
                                  item.isDemo &&
                                  "Активировать"}
                                {this.props.user.isAuth &&
                                  item.isDemo &&
                                  "Использован"}
                                {!item.isDemo && "Оплатить"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </Slider>
              </div>
            </>
          )}
        </CSSTransitionGroup>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(withRouter(Tariffs));
