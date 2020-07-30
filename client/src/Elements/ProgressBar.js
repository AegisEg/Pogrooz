import React from "react";
import PngProgress from "../img/progress-bar.png";
class Avatar extends React.Component {
  render() {
    return (
      <div className="progress-bar">
        <div
          className="barLine"
          style={{
            backgroundImage: `url(${PngProgress})`,
            width: this.props.percent + "%",
          }}
        ></div>
      </div>
    );
  }
}

export default Avatar;
