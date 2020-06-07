// App
import React from "react";

import Notification from "../../Elements/Notification";

// Redux
import { connect } from "react-redux";

var notifications = [
  {
    id: 1,
    idItem: "",
    type: "system",
    code: "system",
    date: "10.05.2020",
    time: "12:36",
    readble: 1,
  },
  {
    id: 2,
    idItem: "",
    type: "system",
    code: "system",
    date: "10.05.2020",
    time: "12:36",
    readble: 1,
  },
  {
    id: 3,
    idItem: "",
    type: "system",
    code: "system",
    date: "10.05.2020",
    time: "12:36",
    readble: 1,
  },
  {
    id: 4,
    idItem: "",
    type: "order",
    code: "offer_new_request",
    date: "10.05.2020",
    time: "12:36",
    readble: 0,
  },
];
class Notifications extends React.Component {
  state = {
    typeNotification: "all",
  };
  renderNotification = () => {
    let contentNotification = [];
    for (let i = 0; i < notifications.length; i++)
      if (this.state.typeNotification === "all")
        contentNotification.push(
          <Notification notification={notifications[i]} />
        );
      else if (notifications[i].type === this.state.typeNotification)
        contentNotification.push(
          <Notification notification={notifications[i]} />
        );
    if (contentNotification.length === 0) {
      contentNotification = <div>Уведомления отсутствуют</div>;
    }
    return contentNotification;
  };
  render() {
    return (
      <div>
        <h2 className="title">Уведомления</h2>
        <div className="tab_groups">
          <span
            className={`tab_group ${
              this.state.typeNotification === "all" ? "active" : ""
            }`}
            onClick={() => {
              this.setState({ typeNotification: "all" });
            }}
          >
            Все
          </span>
          <span
            className={`tab_group ${
              this.state.typeNotification === "order" ? "active" : ""
            }`}
            onClick={() => {
              this.setState({ typeNotification: "order" });
            }}
          >
            По заказам
          </span>
          <span
            className={`tab_group ${
              this.state.typeNotification === "offer" ? "active" : ""
            }`}
            onClick={() => {
              this.setState({ typeNotification: "offer" });
            }}
          >
            По предложениям
          </span>
          <span
            className={`tab_group ${
              this.state.typeNotification === "system" ? "active" : ""
            }`}
            onClick={() => {
              this.setState({ typeNotification: "system" });
            }}
          >
            Системные
          </span>
          <span
            className={`tab_group ${
              this.state.typeNotification === "tarif" ? "active" : ""
            }`}
            onClick={() => {
              this.setState({ typeNotification: "tarif" });
            }}
          >
            По Тарифу
          </span>
        </div>
        {this.renderNotification()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Notifications);
