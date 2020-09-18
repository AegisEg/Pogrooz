// App
import React from "react";

import Notification from "../../../Elements/Notification";

// Redux
import { connect } from "react-redux";
import { CSSTransitionGroup } from "react-transition-group";
import * as notificationActions from "../../../redux/actions/notification";
import { bindActionCreators } from "redux";
import Loading from "../../../Elements/Loading";
import LoadingFixed from "../../../Elements/LoadingFixed";
import { Scrollbars } from "react-custom-scrollbars";

class Notifications extends React.Component {
  state = {
    typeNotification: "all",
  };
  componentDidMount() {
    if (!this.props.notifications.all.isGetted)
      this.props.notificationActions
        .notificationsGet("all", this.props.user.apiToken)
        .then(() => {
          this.onScroll();
        });
  }
  onScroll() {
    if (
      this.props.notifications[this.state.typeNotification].canLoad &&
      !this.props.notifications[this.state.typeNotification].isFetching &&
      this.notifyBlock.getScrollHeight() - this.notifyBlock.getScrollTop() <=
        200 + this.notifyBlock.getClientHeight()
    ) {
      this.props.notificationActions.notifyLoad(
        this.state.typeNotification,
        this.props.user.apiToken
      );
    }
  }
  renderNotification = () => {
    let notifications = this.props.notifications[this.state.typeNotification]
      .notifications;
    return (
      <>
        {notifications.map((item, index) => {
          return (
            <Notification
              reading={(id, type) => {
                this.props.notificationActions.notificationRead(
                  id,
                  type,
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
    let notifications = this.props.notifications[this.state.typeNotification];
    return (
      <>
        <div className="container-fluid">
          <h2 className="title">Уведомления</h2>
          <LoadingFixed isLoading={notifications.isFetching}></LoadingFixed>
        </div>
        <CSSTransitionGroup
          transitionName="height-animation-item"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={1}
          style={{
            display: "contents",
          }}
        >
          {!notifications.isFetching && (
            <>
              <div className="container-fluid">
                <div className="tab_groups">
                  <span
                    className={`tab_group ${
                      this.state.typeNotification === "all" ? "active" : ""
                    }`}
                    onClick={() => {
                      this.setState({ typeNotification: "all" });
                      if (!this.props.notifications.all.isGetted)
                        this.props.notificationActions.notificationsGet(
                          "all",
                          this.props.user.apiToken
                        );
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
                      if (!this.props.notifications.order.isGetted)
                        this.props.notificationActions.notificationsGet(
                          "order",
                          this.props.user.apiToken
                        );
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
                      if (!this.props.notifications.offer.isGetted)
                        this.props.notificationActions.notificationsGet(
                          "offer",
                          this.props.user.apiToken
                        );
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
                      if (!this.props.notifications.system.isGetted)
                        this.props.notificationActions.notificationsGet(
                          "system",
                          this.props.user.apiToken
                        );
                    }}
                  >
                    Системные
                  </span>
                  <span
                    className={`tab_group ${
                      this.state.typeNotification === "tariff" ? "active" : ""
                    }`}
                    onClick={() => {
                      this.setState({ typeNotification: "tariff" });
                      if (!this.props.notifications.tariff.isGetted)
                        this.props.notificationActions.notificationsGet(
                          "tariff",
                          this.props.user.apiToken
                        );
                    }}
                  >
                    По Тарифу
                  </span>
                </div>
              </div>
              <Scrollbars
                onScroll={() => {
                  this.onScroll();
                }}
                ref={(ref) => {
                  this.notifyBlock = ref;
                }}
                renderTrackVertical={(props) => (
                  <div className="track-vertical" />
                )}
                renderThumbVertical={(props) => (
                  <div className="thumb-vertical" />
                )}
                className="load-content scroll"
                autoHide
              >
                {this.renderNotification()}
              </Scrollbars>
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
    notifications: state.notifications,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    notificationActions: bindActionCreators(notificationActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
