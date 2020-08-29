// App
import React from "react";

import Notification from "../../../Elements/Notification";

// Redux
import { connect } from "react-redux";
import { CSSTransitionGroup } from "react-transition-group";
import * as notificationActions from "../../../redux/actions/notification";
import { bindActionCreators } from "redux";
import Loading from "../../../Elements/Loading";
class Notifications extends React.Component {
  state = {
    typeNotification: "all",
  };
  componentDidMount() {
    if (!this.props.notifications.getted)
      this.props.notificationActions.notificationsGet(this.props.user.apiToken);
  }
  renderNotification = () => {
    let notifications = this.props.notifications.notifications.filter(
      (item) =>
        item.type === this.state.typeNotification ||
        this.state.typeNotification === "all"
    );
    return (
      <>
        {notifications.map((item, index) => {
          return (
            <Notification
              reading={(id) => {
                this.props.notificationActions.notificationRead(
                  id,
                  this.props.user.apiToken
                );
              }}
              key={index}
              notification={item}
            />
          );
        })}
        {!notifications.length && (
          <div className="text-center">Уведомлений пока нет</div>
        )}
      </>
    );
  };
  render() {
    return (
      <div className="container-fluid">
        <h2 className="title">Уведомления</h2>
        <Loading isLoading={this.props.notifications.isFetching}></Loading>
        <CSSTransitionGroup
          transitionName="height-animation-item"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={1}
          style={{
            display: "contents",
          }}
        >
          {!this.props.notifications.isFetching && (
            <>
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
            </>
          )}
        </CSSTransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    notifications: state.notifications,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    notificationActions: bindActionCreators(notificationActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
