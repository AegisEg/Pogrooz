// App
import React from "react";

// Material
import { ReactComponent as PlayArrowIcon } from "../../img/play.svg";
import { ReactComponent as PauseIcon } from "../../img/pauseRecord.svg";
import { randomInteger, padZero } from "../../controllers/FunctionsController";
import loading from "../../img/loadAudio.gif";
import { renderCanvas } from "../../controllers/FunctionsController";

let audioDurationInterval = false;

class AudioX extends React.Component {
  state = {
    duration: "00:00",
    audio: false,
    randomId: randomInteger(0, 10000000),
  };
  componentDidMount() {
    let thisAudio = document.getElementsByName(this.props.sound.path);
    for (let audio of thisAudio) {
      audio.volume = 0.5;
      this.setState({
        audio,
        duration:
          padZero(parseInt(this.props.sound.duration / 60)) +
          ":" +
          padZero(parseInt(this.props.sound.duration % 60)),
      });
      break;
    }

    let audio = document.getElementById(this.state.randomId);
    audio.onpause = (e) => {
      audio.parentElement.className = "message-sound";
      console.log(Number(e.target.currentTime).toFixed(0));
      console.log(this.props.sound.duration);
      if (
        Math.ceil(e.target.currentTime) === Math.ceil(this.props.sound.duration)
      )
        soundLine.style.maxWidth = "100%";
    };
    let soundLine = document.getElementById(
      "soundLine-" + this.props.sound.path
    );
    audio.onplay = () => {
      audio.parentElement.className = "message-sound active";
    };
    audio.ontimeupdate = (e) => {
      this.setState({
        duration:
          padZero(parseInt(e.target.currentTime / 60)) +
          ":" +
          padZero(parseInt(e.target.currentTime % 60)),
      });

      soundLine.style.maxWidth =
        (e.target.currentTime / this.props.sound.duration) * 100 + "%";
    };
    renderCanvas(
      false,
      "canvas-" + this.props.sound.path,
      this.props.sound.recordLine,
      true,
      "#6C6C6C"
    );
  }
  componentWillUnmount() {
    if (audioDurationInterval) this.stopTimer();

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

      this.stopTimer();

      for (let audio of otherAudio) {
        audio.pause();
      }

      let thisAudio = document.getElementsByName(this.props.sound.path);

      for (let audio of thisAudio) {
        audio.play();
      }

      this.startTimer();
    }
  }

  changeDurationAudio(e) {
    e.stopPropagation();

    let position = (e.nativeEvent.layerX * 100) / this.rangeBlock.clientWidth;
    let time = (this.state.audio.duration / 100) * position;

    let thisAudio = document.getElementsByName(this.props.sound.path);

    for (let audio of thisAudio) {
      audio.currentTime = time;
    }

    let thisRange = document.getElementsByName(
      this.props.sound.path + "-range"
    );

    for (let range of thisRange) {
      range.style.width =
        (100 * this.state.audio.currentTime) / this.state.audio.duration + "%";
    }
  }

  startTimer() {
    audioDurationInterval = setInterval(() => {
      let thisRange = document.getElementsByName(
        this.props.sound.path + "-range"
      );

      for (let range of thisRange) {
        range.style.width =
          (100 * this.state.audio.currentTime) / this.state.audio.duration +
          "%";
      }
    }, 100);
  }

  stopTimer() {
    clearInterval(audioDurationInterval);
  }

  viewDurationAudio(e) {
    let position = (e.nativeEvent.layerX * 100) / this.rangeBlock.clientWidth;
    let time = (this.state.audio.duration / 100) * position;

    let thisRange = document.getElementsByName(
      this.props.sound.path + "-range"
    );

    for (let range of thisRange) {
      range.style.width = (100 * time) / this.state.audio.duration + "%";
    }
  }

  stopAudio(e) {
    if (audioDurationInterval) this.stopTimer();

    e.stopPropagation();

    let thisAudio = document.getElementsByName(this.props.sound.path);

    for (let audio of thisAudio) {
      audio.pause();
    }
  }
  changeDurationAudio(e) {
    e.stopPropagation();
    let position = (e.nativeEvent.layerX * 100) / this.rangeBlock.clientWidth;
    let time = (this.props.sound.duration / 100) * position;
    let thisAudio = document.getElementsByName(this.props.sound.path);
    for (let audio of thisAudio) {
      audio.currentTime = time;
    }
  }
  render() {
    return (
      <>
        <div
          className={`message-sound ${this.props.isLoading ? "d-none" : ""}`}
        >
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
          {!this.props.isLoading && (
            <>
              <div className="message-sound-info">
                <div className="canvas-wrapper">
                  <div
                    className="soundLine"
                    id={`soundLine-${this.props.sound.path}`}
                  ></div>
                  <canvas
                    className="sound-canvas"
                    ref={(ref) => {
                      this.rangeBlock = ref;
                    }}
                    width="auto"
                    onClick={(e) => {
                      this.changeDurationAudio(e);
                    }}
                    id={`canvas-${this.props.sound.path}`}
                  ></canvas>
                </div>
                {!this.props.isVoiceSound && (
                  <p className="message-sounds-name">{this.props.sound.name}</p>
                )}
                <p className="message-sounds-duration">{this.state.duration}</p>
              </div>
            </>
          )}
        </div>
        {this.props.isLoading && <img src={loading} alt="" />}
      </>
    );
  }
}

export default AudioX;
