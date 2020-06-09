// App
import React from "react";

class TimeTag extends React.Component {
  render() {
    let time = "Сегодня";
    return (
      <div className="time-tag d-flex">
        <div className="col"></div>
        <span>{time}</span>
        <div className="col"></div>
      </div>
    );
  }
}

export default TimeTag;
