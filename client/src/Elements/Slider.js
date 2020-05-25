// App
import React from "react";
import prevQuest from "../img/prevQuest.png";
import prevQuestEnable from "../img/prevQuestEnable.png";
import nextQuest from "../img/nextQuest.png";
import nextQuestEnable from "../img/nextQuestEnable.png";
class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevDisable: true,
      nextDisable:
        this.refs && this.refs.offsetWidth >= this.refs.scrollWidth
          ? true
          : false,
    };
  }

  updateDimensions = () => {
    this.refs.scrollLeft = 0;
    this.checkButtons(0, 0);
  };
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.checkButtons(this.refs.offsetWidth, this.refs.scrollLeft);
  }

  checkButtons = (offsetWidthValue, scrollLeftValue) => {
    this.setState({
      prevDisable: scrollLeftValue <= 0 ? true : false,
      nextDisable:
        scrollLeftValue + offsetWidthValue >= this.refs.scrollWidth
          ? true
          : false,
    });
  };

  render() {
    let offsetWidthValue = this.refs.offsetWidth,
      scrollLeftValue = this.refs.scrollLeft;

    return (
      <>
        {(!this.state.nextDisable || !this.state.prevDisable) && (
          <div className="btn-block">
            <div
              className={`btn-prev`}
              disabled={this.state.prevDisable}
              onClick={() => {
                scrollLeftValue = this.refs.scrollLeft - this.refs.offsetWidth;
                this.refs.scrollLeft -= this.refs.offsetWidth;
                this.checkButtons(offsetWidthValue, scrollLeftValue);
              }}
            >
              {this.state.prevDisable ? (
                <img src={prevQuest} alt="prevQuest" />
              ) : (
                <img src={prevQuestEnable} alt="prevQuestEnable" />
              )}
            </div>

            <div
              className={`btn-next`}
              disabled={this.state.nextDisable}
              onClick={() => {
                scrollLeftValue = this.refs.scrollLeft + this.refs.offsetWidth;
                this.refs.scrollLeft += this.refs.offsetWidth;
                this.checkButtons(offsetWidthValue, scrollLeftValue);
              }}
            >
              {this.state.nextDisable ? (
                <img src={nextQuest} alt="nextQuest" />
              ) : (
                <img src={nextQuestEnable} alt="nextQuestEnable" />
              )}
            </div>
          </div>
        )}

        <div
          className="slider-container"
          ref={(el) => {
            this.refs = el;
          }}
        >
          <div className="slider-wrapper">{this.props.children}</div>
        </div>
      </>
    );
  }
}
export default Slider;
