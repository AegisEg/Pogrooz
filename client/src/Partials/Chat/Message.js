// App
import React from "react";
import Reply from "../../img/reply.svg";
import ReplyHover from "../../img/reply-hover.svg";
import reviews from "../../config/reviewstest.js";
class Message extends React.Component {
  state = {
    replyImg: Reply,
  };
  render() {
    return (
      <div className="messages-block">
        <div className="col avatar-message">
          {this.props.isAva && <img src={reviews[0].user.avatar} alt="" />}
        </div>
        <div className="col row  pl-0">
          {this.props.isHead && (
            <div className="col-12 head-message">
              <span className="name">{this.props.message.user.name}</span>
              <span className="time">{this.props.message.time}</span>
            </div>
          )}
          <div className="col-12 message-content">
            {this.props.message.text}
          </div>
        </div>
        <span
          className="reply"
          onMouseEnter={() => {
            this.setState({ replyImg: ReplyHover });
          }}
          onMouseLeave={() => {
            this.setState({ replyImg: Reply });
          }}
        >
          <img src={this.state.replyImg} alt="" />
        </span>
      </div>
    );
  }
}
export default Message;
