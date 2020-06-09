// App
import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
import ResetRecord from "../../../img/ResetRecord.svg";
import RecordPause from "../../../img/pauseRecord.svg";
import RecordPlay from "../../../img/play.svg";
import send from "../../../img/send.svg";

class PanelRecord extends React.Component {
  state = {
    isRecordPause: false,
  };
  render() {
    return (
      <>
        <img
          class="mr-3"
          src={ResetRecord}
          onClick={this.props.recordReset}
          alt="ResetRecord"
        />
        <div className="col input-chat">
          <canvas></canvas>
          {!this.state.isRecordPause && (
            <img
              src={RecordPause}
              onClick={() => {
                this.setState({ isRecordPause: true });
              }}
              className="RecordPauseStart"
              alt="RecordPause"
            />
          )}
          {this.state.isRecordPause && (
            <img
              src={RecordPlay}
              onClick={() => {
                this.setState({ isRecordPause: false });
              }}
              className="RecordPauseStart"
              alt="RecordPlay"
            />
          )}
        </div>
        <div
          className="text-center position-relative left-tools"
          style={{
            width: "26px",
          }}
        >
          <img src={send}  onClick={this.props.recordReset} alt="microphone" />
        </div>
      </>
    );
  }
}

export default PanelRecord;
