// App
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ArrowDown from "../../../img/arrowDownperple.svg";
import Chat from "../../../Partials/Chat/Dialog";
import { withRouter } from "react-router-dom";
import { withLastLocation } from "react-router-last-location";

class Messages extends React.Component {
  render() {
    return (
      <div className="article-page">
        <div className="container-fluid">
          <h2 className="title">Сообщения</h2>
          <div className="chat-header mt-3">
            <a
              className="href left-angle f-14 angle-go "
              style={{
                maxWidth: "50px",
                marginLeft: "20px",
              }}
              onClick={() => {
                if (this.props.lastLocation) {
                  this.props.history.push(this.props.lastLocation.pathname);
                } else {
                  this.props.history.push("/messages");
                }
              }}
            >
              Назад
            </a>
            <span className="f-18 text-left mr-3">
              Максимов Максим Максиомвич
            </span>
            <span className="online">online</span>
            <div className="row description-chat">
              <div
                className="col f-14"
                style={{
                  maxWidth: "135px",
                }}
              >
                заказ №12134
              </div>
              <div className="col-12 col-sm f-14">
                Россия, Ленинградская область, г Пушкин, улица Бойко, 123
              </div>
              <div
                className="col"
                style={{
                  maxWidth: "128px",
                }}
              >
                <Link className="f-12 href" to="/">
                  Подробнее
                  <img
                    className="ml-2"
                    src={ArrowDown}
                    width="10"
                    height="7"
                    alt="ArrowDown"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Chat />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(withRouter(withLastLocation(Messages)));
