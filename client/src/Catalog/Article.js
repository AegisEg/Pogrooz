// App
import React from "react";
import ImgActiveStar from "../img/active-star.png";
import ArrowDown from "../img/arrowDown.png";
import payIco from "../img/pay-ico.png";
import dogovor from "../img/dogovor.png";
import passport from "../img/passport.png";

// Router
import { Link } from "react-router-dom";

// Elements
import Button from "../Elements/Button";
import { Map } from "react-yandex-maps";

class Article extends React.Component {
  state = {
    showMore: false,
  };
  render() {
    return (
      <div className="article-block">
        <div className="row">
          <div className="col-md-6 row">
            <div className="col-md-1">
              <span>{this.props.article.id}</span>
            </div>
            <div className="col-md-3">
              <span>{this.props.article.carName}</span>
              {this.state.showMore && (
                <img
                  className="w-100 moreinfo"
                  src={this.props.article.carImg}
                  alt=""
                />
              )}
            </div>
            <div className="col-md-4">
              <span>{this.props.article.fromLocation}</span>
              <div
                className={`moreinfo ${this.state.showMore ? "" : "d-none"}`}
              >
                <Map
                  defaultState={{ center: [55.75, 37.57], zoom: 15 }}
                  width="100%"
                  height="100px"
                />
              </div>
            </div>
            <div className="col-md-4">
              <span>{this.props.article.toLocation}</span>
              <div
                className={`moreinfo ${this.state.showMore ? "" : "d-none"}`}
              >
                <Map
                  defaultState={{ center: [55.75, 37.57], zoom: 15 }}
                  width="100%"
                  height="100px"
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 row">
            <div className="col-md-4">
              <span>{this.props.article.cargo}</span>
            </div>
            <div className="col-md-3">
              <span>
                {this.props.article.date.date}
                <br />
                {this.props.article.date.time}
              </span>
            </div>
            <div className="col-md-2">
              <span>{this.props.article.price}</span>
            </div>
            <div className="col-md-3">
              <span>
                Рейтинг: {this.props.article.rating}{" "}
                <img src={ImgActiveStar} alt="ImgActiveStar" />
              </span>
            </div>
          </div>
        </div>
        {this.state.showMore && (
          <div className="row moreinfo_block">
            <div className="col-12 mb-3">
              {this.props.article.tags.map((item, i) => {
                return (
                  <span key={i} className="position-relative left-angle">
                    {item}
                  </span>
                );
              })}
            </div>
            <div className="col-5 row">
              <img
                src={this.props.article.user.avatar}
                width="50px"
                height="50px"
                alt="avatar"
              />
              <div className="col">
                <div className="fio">{this.props.article.user.fio}</div>
                <div className="mt-2">
                  {this.props.article.user.passport && (
                    <span className="property-user d-block">
                      <img src={passport} alt="passport" />
                      Пасспорт загружен
                    </span>
                  )}
                  {this.props.article.user.dogovor && (
                    <span className="property-user">
                      <img src={dogovor} alt="dogovor" />
                      Договор с ИП, ООО
                    </span>
                  )}
                  {this.props.article.user.paynal && (
                    <span className="property-user">
                      <img src={payIco} alt="payIco" />
                      Оплата наличными, на р/c
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="col-7">
              <b>Комментарий:</b> {this.props.article.comments}
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-md-12 article-actions">
            <Link
              to={false}
              className="mr-3 d-640-none f-12 href"
              onClick={() => {
                this.setState({ showMore: !this.state.showMore });
              }}
            >
              {!this.state.showMore ? (
                <>Подробнее о предложении</>
              ) : (
                <>Скрыть подробности</>
              )}
              <img
                className="ml-2"
                src={ArrowDown}
                width="10"
                height="7"
                alt="ArrowDown"
              />
            </Link>

            <Link to="/register">
              <Button
                type="fill"
                paddingVertical={"5px"}
                paddingHorizontal={"25px"}
                fontSize={"14px"}
              >
                ВЗЯТЬ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Article;
