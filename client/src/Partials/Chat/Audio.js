// App
import React from "react";

// Material
import { ReactComponent as PlayArrowIcon } from "../../img/play.svg";
import { ReactComponent as PauseIcon } from "../../img/pauseRecord.svg";
import { randomInteger, padZero } from "../../controllers/FunctionsController";
import loading from "../../img/loadAudio.gif";

let audioDurationInterval = false;

class AudioX extends React.Component {
  state = {
    duration: "00:00",
    audio: false,
    randomId: randomInteger(0, 10000000),
  };
  componentDidMount() {
    let thisAudio = document.getElementsByName(this.props.src);
    for (let audio of thisAudio) {
      audio.volume = 0.5;
      this.setState({ audio });
      break;
    }

    let audio = document.getElementById(this.state.randomId);
    audio.onpause = () => {
      audio.parentElement.className = "message-sound";
    };

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
    };
    audio.onloadedmetadata = () => {
      this.getDuration();
    };
  }
  getDuration() {
    function padZero(v) {
      return v < 10 ? "0" + v : v;
    }
    let t = 0;
    if (this.props.duration) {
      t = this.props.duration;
    } else {
      let thisAudio = document.getElementsByName(this.props.src);

      for (let audio of thisAudio) {
        t = audio.duration;
        break;
      }
    }
    this.setState({
      duration: padZero(parseInt(t / 60)) + ":" + padZero(parseInt(t % 60)),
    });
  }
  componentWillUnmount() {
    if (audioDurationInterval) this.stopTimer();

    if (document.getElementsByName(this.props.src)) {
      document.getElementsByName(this.props.src).className = "message-sound";
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

      let thisAudio = document.getElementsByName(this.props.src);

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

    let thisAudio = document.getElementsByName(this.props.src);

    for (let audio of thisAudio) {
      audio.currentTime = time;
    }

    let thisRange = document.getElementsByName(this.props.src + "-range");

    for (let range of thisRange) {
      range.style.width =
        (100 * this.state.audio.currentTime) / this.state.audio.duration + "%";
    }
  }

  startTimer() {
    audioDurationInterval = setInterval(() => {
      let thisRange = document.getElementsByName(this.props.src + "-range");

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
  getfrequencydata(audio) {
    audio.load();
    audio.play();

    const ctx = new AudioContext();
    const audioSrc = ctx.createMediaElementSource(audio);
    const analyser = ctx.createAnalyser();

    audioSrc.connect(analyser);
    analyser.connect(ctx.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const frequencyData = new Uint8Array(bufferLength);

    setInterval(() => {
      analyser.getByteFrequencyData(frequencyData);
      console.log(frequencyData);
    }, 1000);
  }
  viewDurationAudio(e) {
    let position = (e.nativeEvent.layerX * 100) / this.rangeBlock.clientWidth;
    let time = (this.state.audio.duration / 100) * position;

    let thisRange = document.getElementsByName(this.props.src + "-range");

    for (let range of thisRange) {
      range.style.width = (100 * time) / this.state.audio.duration + "%";
    }
  }

  stopAudio(e) {
    if (audioDurationInterval) this.stopTimer();

    e.stopPropagation();

    let thisAudio = document.getElementsByName(this.props.src);

    for (let audio of thisAudio) {
      audio.pause();
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
            name={this.props.src}
            src={this.props.src}
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
                <p className="message-sounds-name">{this.props.fileName}</p>
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
