// App
import React from "react";
import Avatar from "../../Elements/Avatar";
import TimeTag from "./TimeTag";
import { getHM, timeAt } from "../../controllers/TimeController";
import { randomInteger } from "../../controllers/FunctionsController";
import { ReactComponent as ErrorSvg } from "../../img/error-red.svg";
import { ReactComponent as Reply } from "../../img/reply.svg";
import RecentMessage from "./RecentMessage";

class Message extends React.PureComponent {
  state = {
    isSelected: false,
  };

  componentDidUpdate() {
    if (this.props.scrollingMessage === this.props.message._id) {
      this.setState({ isSelected: true });
    } else this.setState({ isSelected: false });
  }
  render() {
    let isHistoryDate = true;
    let moreHour = false;
    if (this.props.messages[this.props.index - 1]) {
      let date1 = new Date(this.props.message.createdAt);
      let date2 = new Date(this.props.messages[this.props.index - 1].createdAt);
      if (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      ) {
        isHistoryDate = false;
      }

      let diffHours = Math.abs(date1 - date2) / 36e5;

      if (diffHours > 1) {
        moreHour = true;
      }
    }
    let myMessage = this.props.user._id == this.props.message.user._id;
    let isFirst =
      (this.props.messages[this.props.index - 1] &&
        this.props.messages[this.props.index - 1].user._id !==
          this.props.message.user._id) ||
      !this.props.messages[this.props.index - 1] ||
      moreHour;
    let isShowMoreElement = (isFirst || isHistoryDate) && !this.props.isRecent;
    return (
      <>
        {isHistoryDate && (
          <TimeTag date={timeAt(new Date(this.props.message.createdAt))} />
        )}
        <div
          id={`message${this.props.message._id}`}
          className={`messages-block ${isShowMoreElement ? "padding" : ""} ${
            myMessage ? "my" : "not-my"
          } ${!this.props.message.isRead ? "unread" : ""} ${
            this.state.isSelected ? "selected" : ""
          }`}
        >
          <div className="col avatar-message pl-3 pr-1 f-14 d-flex">
            {(isFirst || isHistoryDate) && !this.props.isRecent && (
              <Avatar
                name={
                  this.props.message.user.name.first.charAt(0) +
                  this.props.message.user.name.last.charAt(0)
                }
              />
            )}
          </div>
          <div className="col dialog-content">
            <div className="col-12 head-message">
              {isShowMoreElement && (
                <span className="name">
                  {this.props.message.user.name.first}
                </span>
              )}
              {isShowMoreElement && (
                <span className="time">
                  {getHM(this.props.message.createdAt)}
                </span>
              )}
            </div>
            <div className="col-12 message-content">
              {this.props.message.text}
              {this.props.message.recentMessage && (
                <RecentMessage
                  scrollTo={(top) => {
                    this.props.scrollTo(top);
                  }}
                  message={this.props.message.recentMessage}
                />
              )}
            </div>
          </div>
          {this.props.message.isError && (
            <span className="error-retry">
              <ErrorSvg />
              <div className="action-menu">
                <div
                  onClick={() => {
                    this.props.retrySendMessage(this.props.message);
                  }}
                >
                  Повторить попытку
                </div>
                <div
                  onClick={() => {
                    this.props.deleteLocalMessage(this.props.message._id);
                  }}
                >
                  Удалить
                </div>
              </div>
            </span>
          )}
          {!this.props.message.isError && !myMessage && !this.props.isRecent && (
            <span
              className="reply-message"
              onClick={() => {
                this.props.setRecentMessage(this.props.message);
              }}
            >
              <Reply />
            </span>
          )}
        </div>
      </>
    );
  }
}
export default Message;
