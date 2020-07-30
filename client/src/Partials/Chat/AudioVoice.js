// App
import React from "react";

// Material
import { ReactComponent as PlayArrowIcon } from "../../img/play.svg";
import { ReactComponent as PauseIcon } from "../../img/pauseRecord.svg";
import { randomInteger, padZero } from "../../controllers/FunctionsController";
import loading from "../../img/loadAudio.gif";
import RecordLineSvg from "./RecordLineSvg";

class AudioVoice extends React.Component {
  state = {
    currentTime: 0,
    audio: false,
    randomId: randomInteger(0, 10000000),
  };
  componentDidMount() {
    let thisAudio = document.getElementsByName(this.props.sound.path);
    for (let audio of thisAudio) {
      audio.volume = 0.5;
      this.setState({
        audio,
      });
      break;
    }

    let audio = document.getElementById(this.state.randomId);
    audio.onpause = (e) => {
      audio.parentElement.className = "voice-sound";
    };

    audio.onplay = () => {
      audio.parentElement.className = "voice-sound active";
    };
    audio.ontimeupdate = (e) => {
      this.setState({ currentTime: e.target.currentTime });
    };
  }
  componentWillUnmount() {
    if (document.getElementsByName(this.props.sound.path)) {
      document.getElementsByName(this.props.sound.path).className =
        "message-sound";
      if (this.state.audio) this.state.audio.pause();
    }
  }

  playAudio(e) {
    e.stopPropagation();
    if (!this.props.isLoading) {
      let otherAudio = document.getElementsByClassName(
        "message-sounds-element"
      );

      for (let audio of otherAudio) {
        audio.pause();
      }

      let thisAudio = document.getElementsByName(this.props.sound.path);

      for (let audio of thisAudio) {
        audio.play();
      }
    }
  }

  changeDurationAudio(e, width) {
    e.stopPropagation();
    let position = (e.nativeEvent.layerX - 40) / width;
    let time = this.state.audio.duration * position;

    let thisAudio = document.getElementsByName(this.props.sound.path);

    for (let audio of thisAudio) {
      audio.currentTime = time;
    }
  }

  stopAudio(e) {
    e.stopPropagation();

    let thisAudio = document.getElementsByName(this.props.sound.path);

    for (let audio of thisAudio) {
      audio.pause();
    }
  }
  render() {
    return (
      <>
        <div className="voice-sound">
          <audio
            preload="metadata"
            className={`message-sounds-element`}
            id={this.state.randomId}
            name={this.props.sound.path}
            src={this.props.sound.path}
          />
          <span
            className="play"
            onClick={(e) => {
              this.playAudio(e);
            }}
          >
            <PlayArrowIcon style={{ color: "#008FF7" }} />
          </span>
          <span
            className="pause"
            onClick={(e) => {
              this.stopAudio(e);
            }}
          >
            <PauseIcon style={{ color: "#008FF7" }} />
          </span>
          <div className="svg-wrapper">
            <RecordLineSvg
              className="sound-canvas"
              onClick={this.changeDurationAudio.bind(this)}
              percentTime={this.state.currentTime / this.props.sound.duration}
              isAdaptive={true}
              RecordLine={this.props.sound.recordLine}
              id={`svg-${this.props.sound.path}`}
            />
          </div>
          <p className="voice-sounds-duration">
            {this.state.currentTime
              ? padZero(this.state.currentTime)
              : padZero(this.props.sound.duration)}
          </p>
        </div>
      </>
    );
  }
}

export default AudioVoice;
