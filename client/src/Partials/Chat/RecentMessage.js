// App
import React from "react";

class RecentMessage extends React.Component {
  render() {
    return (
      <div
        className="recentMessage"
        onClick={() => {
          this.props.scrollTo(this.props.message._id);
        }}
      >
        <div className="recentContent">
          <div className="name">
            {this.props.message.user.name.middle}{" "}
            {this.props.message.user.name.first}
          </div>
          <div className="message-content">
            {this.props.message.text}
            {this.props.message.voiceSound && <div>Аудиозапись</div>}
          </div>
        </div>
      </div>
    );
  }
}

export default RecentMessage;
