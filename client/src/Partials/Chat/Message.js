// App
import React from "react";
import Avatar from "../../Elements/Avatar";
import TimeTag from "./TimeTag";
import { getHM, timeAt } from "../../controllers/TimeController";
import Audio from "./Audio";
import { Link } from "react-router-dom";
import { ReactComponent as ErrorSvg } from "../../img/error-red.svg";
import { ReactComponent as Reply } from "../../img/reply.svg";
import RecentMessage from "./RecentMessage";
import documentSvg from "../../img/document.svg";
class Message extends React.Component {
  state = {
    isSelected: false,
  };

  componentDidUpdate() {
    if (this.props.scrollingMessage === this.props.message._id) {
      this.setState({ isSelected: true });
    } else this.setState({ isSelected: false });
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      JSON.stringify(nextProps.message) === JSON.stringify(this.props.message)
    ) {
      return false;
    }

    return true;
  }
  render() {
    console.log("Message render");
    let isHistoryDate = true;
    let moreHour = false;
    if (!!this.props.prevMessage) {
      let date1 = new Date(this.props.message.createdAt);
      let date2 = new Date(this.props.prevMessage.createdAt);
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
      (this.props.prevMessage &&
        this.props.prevMessage.user._id !== this.props.message.user._id) ||
      !this.props.prevMessage ||
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
          <div className="avatar-message d-flex">
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
            <div className="head-message">
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
            <div className="message-content">
              {this.props.message.text}
              {this.props.message.voiceSound && (
                <Audio
                  duration={this.props.message.voiceSound.duration}
                  sound={this.props.message.voiceSound}
                  isVoiceSound={true}
                  isLoading={this.props.message.isLoading}
                />
              )}
              {this.props.message.sounds.map((item, index) => {
                return <Audio key={index} sound={item} />;
              })}
              {!!this.props.message.images.length && (
                <div
                  className={`message-images ${
                    this.props.message.images.length >= 3 ? "more" : ""
                  }
                  ${this.props.message.images.length === 1 ? "one" : ""}
                  ${this.props.message.images.length === 2 ? "two" : ""}`}
                >
                  {this.props.message.images.map((image, index, images) => {
                    let width;
                    let isBlur = false;

                    if (images.length > 4 && index === 3) isBlur = true;

                    if (index > 3) return null;

                    if (isBlur)
                      return (
                        <div
                          key={index}
                          className="image"
                          onClick={() => {
                            this.props.addImageToFancyBox(images, index);
                          }}
                        >
                          <div className="image-blur">
                            <span>{`+${images.length - 3}`}</span>
                            <img
                              key={index}
                              src={image.path}
                              alt={image.name}
                            />
                          </div>
                        </div>
                      );

                    return (
                      <div
                        key={index}
                        className="image"
                        onClick={() => {
                          this.props.addImageToFancyBox(images, index);
                        }}
                      >
                        <img src={image.path} alt={image.name} />
                      </div>
                    );
                  })}
                </div>
              )}
              {!!this.props.message.files.length && (
                <div className="message-files">
                  {this.props.message.files.map((item, index) => {
                    return (
                      <div key={index} className="message-file">
                        <img src={documentSvg} alt="" />
                        <div className="file-info">
                          <div className="name">{item.name}</div>
                          <div className="size">
                            {item.size > 1048576
                              ? Math.floor(item.size / 1048576) + "Мб."
                              : Math.floor(item.size / 1024) + "Кб."}
                          </div>
                        </div>
                        <a className="sharected-link" href={item.path}></a>
                      </div>
                    );
                  })}
                </div>
              )}
              {this.props.message.recentMessage && (
                <RecentMessage
                  scrollTo={(top) => {
                    this.props.scrollTo(top);
                  }}
                  message={this.props.message.recentMessage}
                />
              )}
              {!this.props.message.isError &&
                !myMessage &&
                !this.props.isRecent && (
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
        </div>
      </>
    );
  }
}
export default Message;
