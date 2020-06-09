// App
import React from "react";
import reviews from "../../../config/reviewstest.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Dialog extends React.Component {
  render() {
    if (this.props.dialog.type === 1)
      return (
        <div className="dialog">
          <div className="row">
            <div className="col-12 col-sm with-article">
              <div className="f-14">заказ №{this.props.dialog.article}</div>
              <div className="f-12">{this.props.dialog.city}</div>
            </div>
            <div
              className="px-3 f-14 d-flex"
              style={{
                whiteSpace: "pre-line",
                maxWidth: "90px",
              }}
            >
              <img src={reviews[0].user.avatar} alt="avatar" />
            </div>
            <div className="col f-14 pl-0 row dialog-content">
              <div className="head">
                <div className="px-3 dialog-user-name">
                  {this.props.dialog.name}
                </div>
                <div
                  className="px-3 text-right f-14"
                  style={{
                    color: "#6C6C6C",
                  }}
                >
                  {this.props.dialog.time}
                </div>
              </div>
              <div
                className={`col-12 mt-2 last-message ${
                  this.props.dialog.last_message.isread ? "" : "unread"
                }`}
              >
                <div className="text">
                  <span className="col f-14">
                    <Link to="/dialog/1">
                      {!this.props.dialog.last_message.user && <> Вы:&nbsp;</>}
                      {this.props.dialog.last_message.text}
                    </Link>
                    {this.props.dialog.last_message.user &&
                      !this.props.dialog.last_message.isread && (
                        <span className="counter">123</span>
                      )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
      );
    if (this.props.dialog.type === 2)
      return (
        <div className="dialog">
          <div className="row">
            <div
              className="px-3 f-14 d-flex"
              style={{
                whiteSpace: "pre-line",
                maxWidth: "90px",
              }}
            >
              <img src={reviews[0].user.avatar} alt="avatar" />
            </div>
            <div className="col f-14 pl-0 row dialog-content">
              <div className="head">
                <div className="px-3 f-14 dialog-user-name">
                  {this.props.dialog.name}
                </div>
                <div
                  className="px-3 ml-auto text-right f-14"
                  style={{
                    color: "#6C6C6C",
                  }}
                >
                  {this.props.dialog.time}
                </div>
              </div>
              <div
                className={`col-12 mt-2 last-message ${
                  this.props.dialog.last_message.isread ? "" : "unread"
                }`}
              >
                <div className="text">
                  <span className="col f-14">
                    <Link to="/dialog/1">
                      {!this.props.dialog.last_message.user && <> Вы:&nbsp;</>}
                      {this.props.dialog.last_message.text}
                    </Link>
                    {this.props.dialog.last_message.user &&
                      !this.props.dialog.last_message.isread && (
                        <span className="counter">123</span>
                      )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
      );
    return <></>;
  }
}
let messages = [
  {
    id: 1,
    name: "Максимов Максим",
    time: "12:02",
    city: "Г.Пушкин",
    type: 1,
    article: 1231,
    last_message: {
      isread: true,
      text:
        "Текст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. ",
    },
  },
  {
    id: 2,
    name: "Максимов Максим",
    time: "12:02",
    city: "Г.Пушкин",
    article: 1231,
    type: 1,
    last_message: {
      isread: true,
      text:
        "Текст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. ",
    },
  },
  {
    id: 3,
    name: "Максимов Максим",
    time: "12:02",
    city: "Г.Пушкин",
    article: 1231,
    type: 2,
    last_message: {
      isread: true,
      text:
        "Текст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. ",
    },
  },
  {
    id: 3,
    name: "Максимов Максим",
    time: "12:02",
    city: "Г.Пушкин",
    article: 1231,
    type: 2,
    last_message: {
      isread: true,
      text:
        "Текст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. ",
    },
  },
  {
    id: 4,
    name: "Максимов Максим",
    time: "12:02",
    city: "Г.Пушкин",
    article: 1231,
    type: 1,
    last_message: {
      isread: false,
      user: true,
      text:
        "Текст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. ",
    },
  },
];
class Messages extends React.Component {
  state = {
    currentStatus: "",
  };
  componentDidMount() {
    this.setState({ currentStatus: this.props.tab ? this.props.tab : "all" });
  }
  render() {
    return (
      <div className="article-page">
        <h2 className="title">
          {this.state.currentStatus == 2 || this.state.currentStatus == "all"
            ? "Сообщения"
            : "Сообщения по заказам/предложениям"}
        </h2>
        <div className="tab_groups">
          <span
            className={`tab_group ${
              this.state.currentStatus === "all" ? "active" : ""
            }`}
            onClick={() => {
              this.setState({ currentStatus: "all" });
            }}
          >
            Все
            <div className="action-counter">
              <span>3</span>
            </div>
          </span>
          <span
            className={`tab_group ${
              this.state.currentStatus === 1 ? "active" : ""
            }`}
            onClick={() => {
              this.setState({ currentStatus: 1 });
            }}
          >
            По заказам /предложениям
          </span>
          <span
            className={`tab_group ${
              this.state.currentStatus === 2 ? "active" : ""
            }`}
            onClick={() => {
              this.setState({ currentStatus: 2 });
            }}
          >
            От пользователей
          </span>
        </div>
        <div className="articles-block full">
          <div className="dialogs-block">
            {messages.map((item, index) => {
              if (
                item.type === this.state.currentStatus ||
                this.state.currentStatus === "all"
              )
                return <Dialog key={index} dialog={item} />;
            })}
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

export default connect(mapStateToProps)(Messages);
