import React from "react";
import LoadGif from "../img/load.gif";
import { CSSTransitionGroup } from "react-transition-group";
class Loading extends React.Component {
  render() {
    return (
      <>
        <CSSTransitionGroup
          transitionName="loading-animation-item"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          style={{
            display: "contents",
          }}
        >
          <div className="LoadGif text-center w-100">
            <img
              src={LoadGif}
              style={{
                display: this.props.isLoading ? "block" : "none",
              }}
              alt="LoadGif"
            />
          </div>
        </CSSTransitionGroup>
      </>
    );
  }
}

export default Loading;