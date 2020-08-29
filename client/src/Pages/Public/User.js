// App
import React from "react";

import Articles from "../../ArticlesElements/Articles";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withLastLocation } from "react-router-last-location";
import { CSSTransitionGroup } from "react-transition-group";
import Button from "../../Elements/Button";
import { Link } from "react-router-dom";
import api from "../../config/api";
import avatar from "../../img/avatar.svg";
import ImgActiveStar from "../../img/active-star.png";
import redWarning from "../../img/redWarning.svg";
import NoMatch from "../NoMatch";
import Loading from "../../Elements/Loading";
import { setForceTitle } from "../../functions/functions";
class User extends React.Component {
  constructor(props) {
    super(props);
    this.articles = React.createRef();
  }
  state = {
    filter: {},
    currentTab: 1,
    user: false,
    isFething: true,
    notFound: false,
    countData: {},
  };
  componentDidMount() {
    fetch(`${api.urlApi}/api/user/get`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: this.props.match.params.id,
      }),
    })
      .then((response) => response.json())
      .then((responce) => {
        if (responce.error || !responce.user)
          this.setState({ notFound: true, isFething: false });
        else
          this.setState(
            {
              user: responce.user,
              filter: {
                type: responce.user.type === "cargo" ? "order" : "offer",
                status: {
                  $in: [2, 5, 6],
                },
                author: this.state.user._id,
              },
              countData: responce.countData,
              isFething: false,
            },
            () => {
              setForceTitle(
                this.state.user.name.last + " " + this.state.user.name.first
              );
            }
          );
      });
  }
  renderTabs() {
    let type = this.state.user.type === "cargo" ? "order" : "offer";
    return (
      <div className="tab_groups mt-3">
        <span
          className="tab_group goPrev text-center"
          style={{
            margin: "0 15px 15px 15px",
          }}
        >
          <a
            className="href hover left-angle mx-auto angle-go d-block"
            style={{
              maxWidth: "50px",
            }}
            onClick={() => {
              if (this.props.lastLocation) {
                this.props.history.push(this.props.lastLocation.pathname);
              } else {
                this.props.history.push("/search");
              }
            }}
          >
            Назад
          </a>
        </span>

        <span
          className={`tab_group ${this.state.currentTab === 1 ? "active" : ""}`}
          onClick={() => {
            if (this.state.currentTab !== 1)
              this.onChengeArticles({
                currentTab: 1,
                filter: {
                  type: type,
                  status: 2,
                  author: this.state.user._id,
                },
              });
          }}
        >
          Все {type === "offer" ? "предложения" : "заказы"}
          <span className="counter">
            {this.state.countData.public +
              this.state.countData.success +
              this.state.countData.canceled}
          </span>
        </span>

        <span
          className={`tab_group ${this.state.currentTab === 2 ? "active" : ""}`}
          onClick={() => {
            if (this.state.currentTab !== 2)
              this.onChengeArticles({
                currentTab: 2,
                filter: {
                  type: type === "offer" ? "order" : type,
                  status: {
                    $in: [5, 6],
                  },
                  executors: this.state.user._id,
                },
              });
          }}
        >
          Взятые {type === "offer" ? "заказы" : "предложения"}
          <span className="counter">{this.state.countData.getted} </span>
        </span>

        <span
          className={`tab_group ${this.state.currentTab === 3 ? "active" : ""}`}
          onClick={() => {
            if (this.state.currentTab !== 3)
              this.onChengeArticles({
                currentTab: 3,
                filter: {
                  type: type,
                  status: 2,
                  author: this.state.user._id,
                },
              });
          }}
        >
          Активные
          <span className="counter">{this.state.countData.public} </span>
        </span>
        <span
          className={`tab_group ${this.state.currentTab === 4 ? "active" : ""}`}
          onClick={() => {
            if (this.state.currentTab !== 4)
              this.onChengeArticles({
                currentTab: 4,
                filter: {
                  type: type,
                  status: 5,
                  author: this.state.user._id,
                },
              });
          }}
        >
          Выполненные
          <span className="counter">{this.state.countData.success} </span>
        </span>
        <span
          className={`tab_group ${this.state.currentTab === 5 ? "active" : ""}`}
          onClick={() => {
            if (this.state.currentTab !== 5)
              this.onChengeArticles({
                currentTab: 5,
                filter: {
                  type: type,
                  author: this.state.user._id,
                  status: 6,
                },
              });
          }}
        >
          Отмененные
          <span className="counter">{this.state.countData.canceled} </span>
        </span>
      </div>
    );
  }
  formatPhoneNumber(phoneNumberString) {
    var re = /(?:([\d]{1,}?))??(?:([\d]{1,3}?))??(?:([\d]{1,3}?))??(?:([\d]{2}))??([\d]{2})$/;

    var formatted =
      "+" +
      phoneNumberString.replace(re, function (all, a, b, c, d, e) {
        return (
          (a ? a + " (" : "") +
          (b ? b + ") " : "") +
          (c ? c + "-" : "") +
          (d ? d + "-" : "") +
          e
        );
      });

    return formatted;
  }
  onChengeArticles(state) {
    this.setState(state);
    this.articles.current.getAricles();
  }
  render() {
    //Ставлю статус(0,1 - открытый, 2,3 - в работе, 3,4 - закрытый) и Тип(Заказ
    //или Предложение) для отображения
    let user = this.state.user;
    if (!this.state.notFound) {
      return (
        <div className="standart-page user-page">
          <Loading isLoading={this.state.isFething}></Loading>
          <CSSTransitionGroup
            transitionName="loading-height-animation-item"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
            style={{
              display: "contents",
            }}
          >
            {!this.state.isFething && (
              <>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12 col-md avatar-img-wrapper text-center">
                      <img
                        src={(user.avatar && user.avatar.path) || avatar}
                        className="avatar-img"
                        alt=""
                      />
                    </div>
                    <div
                      className="col row px-0 mx-0"
                      style={{
                        maxWidth: "800px",
                      }}
                    >
                      <div
                        className="mx-0 col-12 col-md-8 row"
                        style={{
                          fontSize: "24px",
                        }}
                      >
                        <div
                          className="col-12 text-center text-md-left"
                          style={{
                            lineHeight: 1,
                          }}
                        >
                          {user.name.last} {user.name.first} {user.name.middle}
                        </div>
                        <div
                          className="col-12 col-sm-6 mt-2 mt-md-0 text-center text-md-left"
                          style={{
                            fontSize: "18px",
                          }}
                        >
                          <div>
                            {user.type === "carrier" && <>Перевозчик</>}
                            {user.type === "cargo" && <>Грузовладелец</>}
                          </div>
                          <div>
                            {user.contract &&
                              (user.contract.id == 2 ||
                                user.contract.id == 3) &&
                              user.contract.data.value}
                            {user.contract &&
                              user.contract.id == 1 &&
                              "Физ. лицо"}
                            {user.contract &&
                              user.contract.id == 4 &&
                              "Самозанятый"}
                          </div>
                        </div>
                        <div
                          className="col-12 col-sm-6 text-center mt-2 mt-md-0 text-md-left"
                          style={{
                            fontSize: "18px",
                          }}
                        >
                          {/* {this.props.match.params.id == 2 && (
                        <div
                          className="d-flex"
                          style={{
                            color: "#DD2828",
                            fontSize: "14px",
                          }}
                        >
                          <img
                            className="mr-2"
                            src={redWarning}
                            alt="redWarning"
                          />
                          Профиль скрыт
                        </div>
                      )} */}
                          {this.state.user.type !== "cargo" && (
                            <>
                              <div>{this.formatPhoneNumber(user.phone)}</div>
                              <div>{user.email}</div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="col-md-4 col-12 user-column-2">
                        <span className="f-14 col-12">
                          Рейтинг: &nbsp;
                          <span className="d-inline-block">
                            4.6
                            <img src={ImgActiveStar} alt="ImgActiveStar" />
                          </span>
                        </span>
                        {this.props.user.isAuth && (
                          <>
                            <Link to={`/dialog/${this.state.user._id}`}>
                              <Button
                                type="fill"
                                paddingVertical="11px"
                                paddingHorizontal="30px"
                                className="input-action"
                              >
                                Написать
                              </Button>
                            </Link>

                            <Button
                              type="empty"
                              paddingVertical="11px"
                              paddingHorizontal="30px"
                              className="input-action"
                            >
                              Предложить заказ
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {this.renderTabs()}
                </div>
                <div className="lk-order-page">
                  <Articles ref={this.articles} filter={this.state.filter} />
                </div>
                {this.props.match.params.id == 2 && (
                  <div className="row">
                    <div className="col-12 text-center">
                      <img src={redWarning} width="70px" alt="" />
                      <div
                        className="mt-3"
                        style={{
                          fontSize: "24px",
                          color: "#DD2828",
                        }}
                      >
                        Профиль скрыт
                      </div>
                      <div
                        className="mt-3 mx-auto"
                        style={{
                          fontSize: "12px",
                          maxWidth: "567px",
                        }}
                      >
                        Это значит, что пока Перевозчик не активирует свой
                        профиль, его контакты и предложения и история заказов
                        будет недостцпна для простомотра.
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </CSSTransitionGroup>
        </div>
      );
    } else return <NoMatch></NoMatch>;
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(withRouter(withLastLocation(User)));
