// App
import React from "react";

class TimeTag extends React.Component {
  render() {
    return (
      <div className="time-tag d-flex">
        <div className="col"></div>
        <span>{this.props.date}</span>
        <div className="col"></div>
      </div>
    );
  }
}

export default TimeTag;
