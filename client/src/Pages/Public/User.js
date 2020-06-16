// App
import React from "react";

import Articles from "../../Catalog/Articles";
import articlestest from "../../config/articlestest.js";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withLastLocation } from "react-router-last-location";
import avatar from "../../img/avatar.png";
import ImgActiveStar from "../../img/active-star.png";
import redWarning from "../../img/redWarning.svg";
import Button from "../../Elements/Button";
import { Link } from "react-router-dom";

class User extends React.Component {
  statusArticle = [5, 6, 7];
  state = {
    currentStatus: "all",
  };
  renderTabs() {
    return (
      <div className="tab_groups mt-3">
        <span
          className="tab_group goPrev text-center"
          style={{
            margin: "0 15px 15px 15px",
          }}
        >
          <Link
            className="href left-angle mx-auto angle-go d-block"
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
          </Link>
        </span>
        <span
          className={`tab_group ${
            this.state.currentStatus === "all" ? "active" : ""
          }`}
          onClick={() => {
            this.setState({ currentStatus: "all" });
          }}
        >
          Все
        </span>

        {this.statusArticle.length > 1 &&
          this.statusArticle.map((item, index) => {
            return (
              <span
                key={index}
                className={`tab_group ${
                  this.state.currentStatus === item ? "active" : ""
                }`}
                onClick={() => {
                  this.setState({ currentStatus: item });
                }}
              >
                {item === 1 && "Черновики"}
                {item === 2 && "Открытые"}
                {item === 3 && "Выбран исполнитель"}
                {item === 4 && "В пути"}
                {item === 5 && "Выполненные"}
                {item === 6 && "Отмененные"}
                {item === 7 && "Корзина"}
              </span>
            );
          })}
      </div>
    );
  }
  render() {
    //Ставлю статус(0,1 - открытый, 2,3 - в работе, 3,4 - закрытый) и Тип(Заказ
    //или Предложение) для отображения
    let articlesList = articlestest.filter((item) => {
      if (this.state.currentStatus === "all") {
        return this.statusArticle.find((x) => {
          return x === item.status;
        });
      } else {
        return item.status === this.state.currentStatus;
      }
    });
    return (
      <div className="standart-page user-page">
        <div className="page-block">
          <div className="row">
            <div className="col-12 col-md avatar-img-wrapper text-center">
              <img src={avatar} className="avatar-img" alt="" />
            </div>
            <div
              className="col row px-0 mx-0 "
              style={{
                maxWidth: "700px",
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
                  Максим Максимов Максимович
                </div>
                <div
                  className="col-12 col-sm-6 mt-2 mt-md-0 text-center text-md-left"
                  style={{
                    fontSize: "18px",
                  }}
                >
                  <div>Перевозчик</div>
                  <div>ИП Максимов ММ</div>
                </div>
                <div
                  className="col-12 col-sm-6 text-center mt-2 mt-md-0 text-md-left"
                  style={{
                    fontSize: "18px",
                  }}
                >
                  {this.props.match.params.id === 2 && (
                    <div
                      className="d-flex"
                      style={{
                        color: "#DD2828",
                        fontSize: "14px",
                      }}
                    >
                      <img className="mr-2" src={redWarning} alt="redWarning" />
                      Профиль скрыт
                    </div>
                  )}
                  {this.props.match.params.id === 1 && (
                    <>
                      <div>+7 (927) 000-00-00</div>
                      <div>info@mail.ru</div>
                    </>
                  )}
                </div>
              </div>
              <div className="col-md-4 col-12 mt-2 mt-md-0 row text-center text-md-left">
                <span className="f-14 col-12">
                  Рейтинг: &nbsp;
                  <span className="d-inline-block">
                    4.6
                    <img src={ImgActiveStar} alt="ImgActiveStar" />
                  </span>
                </span>
                {this.props.match.params.id === 1 && (
                  <div className="col-12">
                    <Button
                      type="fill"
                      paddingVertical="11px"
                      paddingHorizontal="30px"
                      className="input-action"
                    >
                      Написать
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {this.renderTabs()}
        </div>
        {this.props.match.params.id === 1 && (
          <div className="lk-order-page">
            <Articles articlesList={articlesList} />
          </div>
        )}
        {this.props.match.params.id === 2 && (
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
                Это значит, что пока Перевозчик не активирует свой профиль, его
                контакты и предложения и история заказов будет недостцпна для
                простомотра.
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(withRouter(withLastLocation(User)));
