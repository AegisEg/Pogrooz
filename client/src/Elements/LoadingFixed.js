import React from "react";
import { ReactComponent as LoadGif } from "../img/Loading.svg";
import { CSSTransitionGroup } from "react-transition-group";
class LoadingFixed extends React.Component {
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
          <div className="LoadGif fixed">
            <LoadGif
              style={{
                display: this.props.isLoading ? "block" : "none",
              }}
            />
          </div>
        </CSSTransitionGroup>
      </>
    );
  }
}

export default LoadingFixed;
