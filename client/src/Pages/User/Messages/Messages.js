// App
import React from "react";
import { LastMessageDate } from "../../../controllers/TimeController";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as dialogsActions from "../../../redux/actions/dialogs";
import { bindActionCreators } from "redux";
import Avatar from "../../../Elements/Avatar";
import Loading from "../../../Elements/Loading";
import LoadingFixed from "../../../Elements/LoadingFixed";
import { Scrollbars } from "react-custom-scrollbars";
import { CSSTransitionGroup } from "react-transition-group";
class Dialog extends React.Component {
  render() {
    if (!!this.props.dialog.orderId)
      return (
        <div
          className={`dialog  ${
            this.props.dialog.lastMessage.user._id === this.props.user._id
              ? "your"
              : "other"
          } ${!this.props.dialog.lastMessage.isRead ? "unread" : ""}`}
        >
          <div className="row">
            <div className="col-12 col-sm with-article">
              <div className="f-14">
                заказ №{this.props.dialog.orderId.articleId}
              </div>
              <div className="f-12">
                {this.props.dialog.orderId.from.data.city_with_type}
              </div>
            </div>
            <div
              className="pl-3 pr-1 f-14 d-flex"
              style={{
                whiteSpace: "pre-line",
                maxWidth: "90px",
              }}
            >
              <Avatar avatar={this.props.dialog.user.avatar} />
            </div>
            <div className="col f-14 dialog-content">
              <div className="head">
                <Link to={`/user/${this.props.dialog.user._id}`}>
                  <div className="f-14 dialog-user-name">
                    {this.props.dialog.user.name.last}{" "}
                    {this.props.dialog.user.name.first}
                  </div>
                </Link>
                <div
                  className="f-14"
                  style={{
                    color: "#6C6C6C",
                  }}
                >
                  {LastMessageDate(this.props.dialog.lastMessage.createdAt)}
                </div>
              </div>
              <div className="last-message">
                {!this.props.dialog.typing &&
                  this.props.dialog.lastMessage.user._id ===
                    this.props.user._id && <> Вы:&nbsp;</>}
                {!this.props.dialog.typing && (
                  <>{this.props.dialog.lastMessage.text}</>
                )}
                {!this.props.dialog.typing &&
                  !!!this.props.dialog.lastMessage.text &&
                  (this.props.dialog.lastMessage.voiseSound ||
                    this.props.dialog.lastMessage.sound ||
                    this.props.dialog.lastMessage.images ||
                    this.props.dialog.lastMessage.files) && <>Вложения</>}
                {this.props.dialog.typing && (
                  <div className="reading-status">печатает</div>
                )}
                {this.props.dialog.lastMessage.user._id !==
                  this.props.user._id &&
                  !!this.props.dialog.noRead && (
                    <span className="counter">{this.props.dialog.noRead}</span>
                  )}
                <Link
                  className="sharected-link"
                  to={`/dialog-order/${this.props.dialog.orderId._id}/${this.props.dialog.user._id}`}
                ></Link>
              </div>
            </div>
            <hr />
          </div>
        </div>
      );
    if (!this.props.dialog.orderId)
      return (
        <div
          className={`dialog  ${
            this.props.dialog.lastMessage.user._id === this.props.user._id
              ? "your"
              : "other"
          } ${!this.props.dialog.lastMessage.isRead ? "unread" : ""}`}
        >
          <div className="row">
            <div
              className="pl-3 pr-1 f-14 d-flex"
              style={{
                whiteSpace: "pre-line",
                maxWidth: "90px",
              }}
            >
              <Avatar avatar={this.props.dialog.user.avatar} />
            </div>
            <div className="col f-14 dialog-content">
              <div className="head">
                <div className="f-14 dialog-user-name">
                  {this.props.dialog.user.name.last}{" "}
                  {this.props.dialog.user.name.first}
                </div>
                <div
                  className="f-14"
                  style={{
                    color: "#6C6C6C",
                  }}
                >
                  {LastMessageDate(this.props.dialog.lastMessage.createdAt)}
                </div>
              </div>
              <div className="last-message">
                {!this.props.dialog.typing &&
                  this.props.dialog.lastMessage.user._id ===
                    this.props.user._id && <> Вы:&nbsp;</>}
                {!this.props.dialog.typing && (
                  <>{this.props.dialog.lastMessage.text}</>
                )}
                {!this.props.dialog.typing &&
                  !!!this.props.dialog.lastMessage.text &&
                  (this.props.dialog.lastMessage.voiseSound ||
                    this.props.dialog.lastMessage.sound ||
                    this.props.dialog.lastMessage.images ||
                    this.props.dialog.lastMessage.files) && <>Вложения</>}
                {this.props.dialog.typing && (
                  <div className="reading-status">печатает</div>
                )}
                {this.props.dialog.lastMessage.user._id !==
                  this.props.user._id &&
                  !!this.props.dialog.noRead && (
                    <span className="counter">{this.props.dialog.noRead}</span>
                  )}
                <Link
                  className="sharected-link"
                  to={`/dialog/${this.props.dialog.user._id}`}
                ></Link>
              </div>
            </div>
          </div>
          <hr />
        </div>
      );
  }
}

class Messages extends React.Component {
  componentDidMount() {
    if (this.props.tab == "user" && !this.props.dialogs.dialogsUser.isGetted)
      this.props.dialogsActions.dialogsGet(this.props.user.apiToken);
    if (this.props.tab == "order" && !this.props.dialogs.dialogsOrder.isGetted)
      this.props.dialogsActions.dialogsOrderGet(this.props.user.apiToken);
    if (this.props.tab == "all" && !this.props.dialogs.dialogsALL.isGetted)
      this.props.dialogsActions
        .dialogsAllGet(this.props.user.apiToken)
        .then(() => {
          this.onScroll();
        });
  }
  onScroll() {
    let dialogs = [];
    if (this.props.tab == "user") dialogs = this.props.dialogs.dialogsUser;
    if (this.props.tab == "order") dialogs = this.props.dialogs.dialogsOrder;
    if (this.props.tab == "all") dialogs = this.props.dialogs.dialogsALL;

    if (
      !dialogs.isFetching &&
      dialogs.canLoad &&
      this.dialogsBlock.getScrollHeight() - this.dialogsBlock.getScrollTop() <=
        200 + this.dialogsBlock.getClientHeight()
    ) {
      this.props.dialogsActions.dialogsLoad(
        this.props.tab,
        this.props.user.apiToken
      );
    }
  }
  render() {
    let dialogs = [];
    if (this.props.tab == "user") dialogs = this.props.dialogs.dialogsUser;
    if (this.props.tab == "order") dialogs = this.props.dialogs.dialogsOrder;
    if (this.props.tab == "all") dialogs = this.props.dialogs.dialogsALL;

    return (
      <div className="article-page">
        <div className="container-fluid">
          <h2 className="title">
            {this.props.tab === "user" && "Сообщения пользователей"}
            {this.props.tab === "order" && "Сообщения по заказам/предложениям"}
            {this.props.tab === "all" && "Сообщения"}
          </h2>
          <div className="tab_groups">
            <Link to="messages">
              <span
                className={`tab_group ${
                  this.props.tab === "all" ? "active" : ""
                }`}
              >
                Все
                {!!this.props.dialogs.dialogsALL.noReadCount && (
                  <div className="action-counter">
                    <span>{this.props.dialogs.dialogsALL.noReadCount}</span>
                  </div>
                )}
              </span>
            </Link>
            <Link to="/messages-by-order">
              <span
                className={`tab_group ${
                  this.props.tab === "order" ? "active" : ""
                }`}
              >
                По заказам /предложениям
              </span>
            </Link>
            <Link to="messages-users">
              <span
                className={`tab_group ${
                  this.props.tab === "user" ? "active" : ""
                }`}
              >
                От пользователей
              </span>
            </Link>
          </div>
        </div>
        <Loading isLoading={!dialogs.isGetted && dialogs.isFetching}></Loading>
        <LoadingFixed
          isLoading={dialogs.isGetted && dialogs.isFetching}
        ></LoadingFixed>
        <CSSTransitionGroup
          transitionName="height-animation-item"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={1}
          style={{
            display: "contents",
          }}
        >
          {!!dialogs.isGetted && (
            <Scrollbars
              onScroll={() => {
                this.onScroll();
              }}
              ref={(ref) => {
                this.dialogsBlock = ref;
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
              <div className="articles-block full">
                <div className="dialogs-block">
                  <div className="container-fluid">
                    {dialogs.dialogs.map((dialog, index) => {
                      return !!dialog.lastMessage ? (
                        <Dialog
                          key={index}
                          user={this.props.user}
                          dialog={dialog}
                        />
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            </Scrollbars>
          )}
        </CSSTransitionGroup>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    dialogs: state.dialogs,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    dialogsActions: bindActionCreators(dialogsActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Messages);
