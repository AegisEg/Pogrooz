import React from "react";

class RecordLineSvg extends React.Component {
  state = {
    width: false,
    height: false,
  };
  updateDimensions = () => {
    this.setState({
      width: document.getElementById(this.props.id).clientWidth,
      height: document.getElementById(this.props.id).clientHeight,
    });
  };
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  render() {
    let paddingStick = 1,
      widthStick = 2;
    let svg = {
      width: this.state.width,
      height: this.state.height,
    };
    let RecordLine = this.props.RecordLine.filter((item) => item != "Infinity");
    if (this.props.isAdaptive) {
      //Удалять каждый n элемент при выводе полного сообщения, если не умещается в канвас
      let countAllSrick = svg.width / (widthStick + paddingStick); //Всего допустимо полосок

      let difference = Math.abs(RecordLine.length - countAllSrick);
      if (RecordLine.length > countAllSrick) {
        //Вычиследние с какой периодичностью удалять
        let everyIndex = false;
        everyIndex = Math.floor(RecordLine.length / difference);

        let counter = RecordLine.length;
        if (RecordLine.length > countAllSrick)
          RecordLine = RecordLine.filter((item, index, array) => {
            if (
              !(everyIndex && index % everyIndex == 0) ||
              counter <= countAllSrick
            ) {
              return true;
            } else {
              counter--;
              return false;
            }
          });
      } else if (RecordLine.length < countAllSrick) {
        let countduple = Math.ceil(1 / (RecordLine.length / difference));
        for (
          let i = 0;
          i < RecordLine.length && RecordLine.length < countAllSrick;
          i++
        ) {
          let duplearray = [];
          for (
            let y = 0;
            y < countduple &&
            RecordLine.length + duplearray.length < countAllSrick;
            y++
          )
            duplearray[y] = RecordLine[i];
          RecordLine = [
            ...RecordLine.slice(0, i),
            ...duplearray,
            ...RecordLine.slice(i),
          ];
          i += duplearray.length;
        }
      }
    }
    let countColors = this.props.percentTime * RecordLine.length;
    let maxValue = Math.max.apply(null, RecordLine);
    return (
      <svg
        id={this.props.id}
        onClick={(e) => {
          this.props.onClick(e, this.state.width);
        }}
      >
        {RecordLine.map((item, index, items) => {
          let height = (item / maxValue) * this.state.height;
          if (!height) height = 1;
          return (
            <rect
              key={index}
              x={
                svg.width -
                (RecordLine.length - index) * (paddingStick + widthStick)
              }
              y={svg.height / 2 - height / 2}
              height={height}
              width={widthStick}
              rx="2"
              fill={`${index < countColors ? "#9509EF" : "#909090"}`}
            />
          );
        })}
      </svg>
    );
  }
}
export default RecordLineSvg;
