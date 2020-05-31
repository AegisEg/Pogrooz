// App
import React from "react";
import notActiveStar from "../img/not-active-star.png";
import ImgActiveStar from "../img/active-star.png";

class RatingInput extends React.Component {
  state = {
    hoveredVal: false,
  };
  render() {
    return (
      <div
        className={`d-flex ${this.props.className}`}
        style={this.props.style}
        onMouseLeave={(e) => {
          this.setState({ hoveredVal: false });
        }}
      >
        <img
          className="star-icon"
          src={
            this.state.hoveredVal >= 1 || this.props.value >= 1
              ? ImgActiveStar
              : notActiveStar
          }
          onClick={() => {
            if (this.props.onClick) this.props.onClick(1);
          }}
          onMouseEnter={() => {
            this.setState({ hoveredVal: 1 });
          }}
          alt="notActiveStar"
        />
        <img
          className="star-icon"
          src={
            this.state.hoveredVal >= 2 || this.props.value >= 2
              ? ImgActiveStar
              : notActiveStar
          }
          onClick={() => {
            if (this.props.onClick) this.props.onClick(2);
          }}
          onMouseEnter={() => {
            this.setState({ hoveredVal: 2 });
          }}
          alt="notActiveStar"
        />
        <img
          className="star-icon"
          src={
            this.state.hoveredVal >= 3 || this.props.value >= 3
              ? ImgActiveStar
              : notActiveStar
          }
          onClick={() => {
            if (this.props.onClick) this.props.onClick(3);
          }}
          onMouseEnter={() => {
            this.setState({ hoveredVal: 3 });
          }}
          alt="notActiveStar"
        />
        <img
          className="star-icon"
          src={
            this.state.hoveredVal >= 4 || this.props.value >= 4
              ? ImgActiveStar
              : notActiveStar
          }
          onClick={() => {
            if (this.props.onClick) this.props.onClick(4);
          }}
          onMouseEnter={() => {
            this.setState({ hoveredVal: 4 });
          }}
          alt="notActiveStar"
        />
        <img
          className="star-icon"
          src={
            this.state.hoveredVal >= 5 || this.props.value >= 5
              ? ImgActiveStar
              : notActiveStar
          }
          onClick={() => {
            if (this.props.onClick) this.props.onClick(5);
          }}
          onMouseEnter={() => {
            this.setState({ hoveredVal: 5 });
          }}
          alt="notActiveStar"
        />
      </div>
    );
  }
}

export default RatingInput;
