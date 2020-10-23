// App
import React from "react";
import notification from "../config/notifications";
import yellowAngle from "../img/yellowAngle.svg";
class Notification extends React.Component {
  render() {
    if (this.props.onlyText) {
      return (
        <>
          {notification
            .find((item) => item.code === this.props.notification.code)
            .text(this.props.notification.info)}
        </>
      );
    } else
      return (
        <div
          className={`notification-item ${
            this.props.notification.isRead ? "" : "unreadble"
          } `}
        >
          <div className="border-top"></div>
          <div className="container-fluid row d-block d-sm-flex mx-0">
            <div className="">
              <div className="date">
                {new Date(this.props.notification.createdAt).toDateR()}
              </div>
              <div className="time">
                {new Date(this.props.notification.createdAt).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </div>
            </div>
            <div className="col px-0 px-sm-3 text-notification">
              {notification
                .find((item) => item.code === this.props.notification.code)
                .text(this.props.notification.info)}
            </div>
            <div className="readble_col">
              {this.props.notification.isRead ? (
                <span className="readble">
                  <img src={yellowAngle} className="mr-3" alt="yellowAngle" />
                  Просмотрено
                </span>
              ) : (
                <span
                  className="action-read"
                  onClick={() => {
                    this.props.reading(
                      this.props.notification._id,
                      this.props.notification.type
                    );
                  }}
                >
                  Отметить как просмотрено
                </span>
              )}
            </div>
          </div>
        </div>
      );
  }
}

export default Notification;
