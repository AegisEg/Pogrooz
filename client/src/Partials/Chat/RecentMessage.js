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
            {this.props.message.user.name.last}{" "}
            {this.props.message.user.name.first}
          </div>
          <div className="message-content">
            {this.props.message.text}
            {this.props.message.voiceSound && <div>Аудиозапись</div>}
            {(!!this.props.message.images.length ||
              !!this.props.message.files.length ||
              !!this.props.message.sounds.length) && <div>Вложения</div>}
          </div>
        </div>
      </div>
    );
  }
}

export default RecentMessage;
