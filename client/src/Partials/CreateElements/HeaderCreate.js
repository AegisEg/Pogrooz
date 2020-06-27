import React from "react";
import { withRouter } from "react-router-dom";
import { ReactComponent as AngleSvg } from "../../img/angle-right.svg";

class HeaderCreate extends React.Component {
  state = {
    onMobile: false,
  };
  updateDimensions = () => {
    if (window.innerWidth <= 480) this.setState({ onMobile: true });
    else this.setState({ onMobile: false });
  };
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  render() {
    return (
      <div className="header-statusBar row">
        {!this.state.onMobile && (
          <>
            <div
              className={`${this.props.currentTab >= 1 ? "active" : ""}`}
              onClick={() => {
                this.props.changeTub(1);
              }}
            >
              <span>{this.props.tabs[0]}</span>
              <AngleSvg />
            </div>
            <div
              className={` ${this.props.currentTab >= 2 ? "active" : ""}`}
              onClick={() => {
                this.props.changeTub(2);
              }}
            >
              <span>{this.props.tabs[1]}</span>
              <AngleSvg />
            </div>
            <div
              className={`${this.props.currentTab >= 3 ? "active" : ""}`}
              onClick={() => {
                this.props.changeTub(3);
              }}
            >
              <span>{this.props.tabs[2]}</span>
              <AngleSvg />
            </div>
            <div
              className={`${this.props.currentTab >= 4 ? "active" : ""}`}
              onClick={() => {
                this.props.changeTub(4);
              }}
            >
              <span>{this.props.tabs[3]}</span>
            </div>
          </>
        )}
        {this.state.onMobile && (
          <>
            {this.props.currentTab > 1 && (
              <>
                <div
                  className="go-prev"
                  onClick={() => {
                    this.props.changeTub(this.props.currentTab - 1);
                  }}
                >
                  {Array.apply(null, { length: this.props.currentTab - 1 }).map(
                    (item, index) => {
                      return <div className="circle"></div>;
                    }
                  )}
                  <AngleSvg />
                </div>
              </>
            )}
            <div className="active">
              <span>{this.props.tabs[this.props.currentTab - 1]}</span>
            </div>
            {this.props.currentTab < 4 && (
              <>
                <div
                  className="go-next"
                  onClick={() => {
                    this.props.changeTub(this.props.currentTab + 1);
                  }}
                >
                  <AngleSvg />
                  {Array.apply(null, { length: 4 - this.props.currentTab }).map(
                    (item, index) => {
                      return <div className="circle"></div>;
                    }
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    );
  }
}

export default withRouter(HeaderCreate);
