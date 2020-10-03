import React from "react";

class Preloader extends React.Component {
  render() {
    return (
      <div class="preloader">
        <div class="preloader__row">
          <div class="preloader__item"></div>
          <div class="preloader__item"></div>
        </div>
      </div>
    );
  }
}

export default Preloader;
