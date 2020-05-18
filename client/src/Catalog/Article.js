// App
import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
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
    onMobile: false,
  };
  updateDimensions = () => {
    if (window.innerWidth < 768) this.setState({ onMobile: true });
    else this.setState({ onMobile: false });
  };
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  componentDidUpdate() {}
  render() {
    return (
      <div className="article-block">
        {!this.state.onMobile ? (
          <>
            <div className="row">
              <div className="col-md-6 row">
                <div className="col-md-1">
                  <span>{this.props.article.id}</span>
                </div>
                <div className="col-md-3">
                  <span>{this.props.article.carName}</span>
                  <CSSTransitionGroup
                    transitionName="height-animation-item"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                    style={{
                      display: "contents",
                    }}
                  >
                    {this.state.showMore && (
                      <img
                        className="w-100  moreinfo"
                        src={this.props.article.carImg}
                        alt=""
                      />
                    )}
                  </CSSTransitionGroup>
                </div>
                <div className="col-md-4">
                  <span>{this.props.article.fromLocation}</span>

                  <CSSTransitionGroup
                    transitionName="height-animation-item"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                    style={{
                      display: "contents",
                    }}
                  >
                    {this.state.showMore && (
                      <div className="moreinfo" style={{ height: "100px" }}>
                        <Map
                          defaultState={{ center: [55.75, 37.57], zoom: 15 }}
                          width="100%"
                          height="100px"
                          instanceRef={(ref) => {
                            console.log(ref);
                          }}
                        />
                      </div>
                    )}
                  </CSSTransitionGroup>
                </div>
                <div className="col-md-4">
                  <span>{this.props.article.toLocation}</span>
                  <CSSTransitionGroup
                    transitionName="height-animation-item"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                    style={{
                      display: "contents",
                    }}
                  >
                    {this.state.showMore && (
                      <div className="moreinfo" style={{ height: "100px" }}>
                        <Map
                          defaultState={{ center: [55.75, 37.57], zoom: 15 }}
                          width="100%"
                          height="100px"
                        />
                      </div>
                    )}
                  </CSSTransitionGroup>
                </div>
              </div>
              <div className="col-md-6 row">
                <div className="col-md-4">
                  <span>
                    <span className="d-block">
                      {this.props.article.parametrs}
                      <br />
                      {this.props.article.count}
                    </span>
                    <br />
                    {this.props.article.cargo.map((item) => {
                      return <span className="d-block">{item}</span>;
                    })}
                  </span>
                </div>
                <div className="col-md-3">
                  <span>
                    {this.props.article.date.date}
                    <br />
                    <br />
                    {this.props.article.date.time}
                  </span>
                </div>
                <div className="col-md-2">
                  <span>{this.props.article.price}</span>
                </div>
                <div className="col-md-3">
                  <span>
                    Рейтинг:
                    <span className="d-inline-block">
                      {this.props.article.rating}
                      <img src={ImgActiveStar} alt="ImgActiveStar" />
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <CSSTransitionGroup
              transitionName="height-animation"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
            >
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
            </CSSTransitionGroup>
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
                    className="get-article"
                    paddingVertical={"15px"}
                    paddingHorizontal={"35px"}
                    fontSize={"14px"}
                  >
                    ВЗЯТЬ
                  </Button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="row">
            <div className="col-12 px-0">
              <span>#{this.props.article.id}</span>
              <span className="ml-3">{this.props.article.carName}</span>
            </div>
            <div className="col-6 col-sm-4 pl-0">
              <h3 className="title-column">Откуда</h3>
              <span>{this.props.article.fromLocation}</span>
            </div>
            <div className="col-6 col-sm-4 pr-0 pr-sm-2">
              <h3 className="title-column">Куда</h3>
              <span>{this.props.article.toLocation}</span>
            </div>
            <div className="col-6 col-sm-4 px-0 pl-sm-2">
              <h3 className="title-column">Груз</h3>
              {this.props.article.cargo.map((item) => {
                return <span className="d-block">{item}</span>;
              })}
            </div>
            <div className="col-6 col-sm pl-3 pl-sm-0">
              <h3 className="title-column">Параметры</h3>
              <span>{this.props.article.parametrs}</span>
            </div>
            <div className="col pl-0 pl-sm-3">
              <h3 className="title-column">Дата</h3>
              <span>{this.props.article.date.date}</span>
            </div>
            <div className="col d-none d-sm-block">
              <h3 className="title-column">Время</h3>
              <span>{this.props.article.date.time}</span>
            </div>
            <div className="col">
              <h3 className="title-column">Цена</h3>
              <span>{this.props.article.price}</span>
            </div>
            <div className="col pr-0">
              <h3 className="title-column">Рейтинг</h3>
              <span>
                <span className="d-inline-block">
                  {this.props.article.rating}
                  <img src={ImgActiveStar} alt="ImgActiveStar" />
                </span>
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Article;
