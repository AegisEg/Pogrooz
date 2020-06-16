// App
import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
import ResetRecord from "../../../img/ResetRecord.svg";
import stopRecord from "../../../img/stopRecord.svg";
import RecordPlay from "../../../img/play.svg";
import send from "../../../img/send.svg";
let m, localStream, source, analyser, processor, ctx;
class Timer extends React.Component {
  state = {
    countdown: 0,
  };
  setTime(startval) {
    this.setState({ countdown: startval });
  }
  startTimer() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.setState({ countdown: ++this.state.countdown });
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.timer);
    this.timer = false;
  }
  render() {
    return String(this.state.countdown).toTimer();
  }
}
class PanelRecord extends React.Component {
  constructor(props) {
    super(props);
    this.timerref = React.createRef();
  }
  state = {
    isRecordPause: false,
    isAudioPlay: false,
    RecordLine: [],
  };
  recordStop() {
    this.timerref.current.stopTimer();
    if (m) m.stop();
    m = false;
    if (localStream) {
      localStream.getAudioTracks()[0].stop();
      localStream = false;
    }
    if (source) {
      source.disconnect(analyser);
      source.disconnect(processor);
    }
    source = false;
    if (processor) processor.disconnect(ctx.destination);
    processor = false;
    ctx = false;
    this.renderCanvas(false, "voice-canvas", this.state.RecordLine, true);
  }
  componentWillUnmount() {
    this.recordStop();
  }
  renderCanvas(ref, id, RecordLine, isAdaptive) {
    let canvas;
    let paddingStick = 2,
      widthStick = 1; //Ширина полосок
    if (!!ref) canvas = ref;
    else canvas = document.getElementById(id);
    if (canvas) {
      let ctxCanvas = canvas.getContext("2d");
      canvas.width = canvas.getBoundingClientRect().width - 88; //Ширина минус паддинги
      canvas.height = canvas.getBoundingClientRect().height;
      ctxCanvas.clearRect(0, 0, canvas.width, canvas.height);
      ctxCanvas.fillStyle = "#9933ff";
      RecordLine.slice().reverse();
      if (isAdaptive) {
        //Удалять каждый n элемент при выводе полного сообщения, если не умещается в канвас
        let countAllSrick = canvas.width / (widthStick + paddingStick); //Всего допустимо полосок
        let difference = Math.abs(RecordLine.length - countAllSrick);
        if (RecordLine.length > countAllSrick) {
          //Вычиследние с какой периодичностью удалять
          let everyIndex = false;
          everyIndex = Math.round(RecordLine.length / difference);
          if (RecordLine.length > countAllSrick)
            RecordLine = RecordLine.filter((item, index, array) => {
              return !(
                everyIndex &&
                index % everyIndex == 0 &&
                array.length > countAllSrick
              );
            });
        }
        if (RecordLine.length < countAllSrick) {
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
      RecordLine.map((item, index) => {
        let height = item / 180;
        if (height > 1) height = canvas.height - 9;
        else if (height === 0) height = 2;
        else height = (canvas.height - 9) * height;
        console.log(height);
        ctxCanvas.fillRect(
          canvas.width -
            (RecordLine.length - index) * (paddingStick + widthStick),
          canvas.height / 2 - height / 2,
          widthStick,
          height
        );
      });
    }
  }
  renderAudioVolume(stream) {
    source = ctx.createMediaStreamSource(stream);
    analyser = ctx.createAnalyser();
    processor = ctx.createScriptProcessor(4096, 2, 2);
    processor.connect(ctx.destination);
    source.connect(analyser);
    source.connect(processor);

    let data = new Uint8Array(analyser.frequencyBinCount);
    let count = 0;

    processor.onaudioprocess = (e) => {
      count++;
      analyser.getByteFrequencyData(data);
      let volumes = [];
      for (let i = 0; i < data.length; i++) {
        volumes.push({ arg: i, val: data[i] });
      }
      if (count % 1 === 0) {
        this.setState({
          RecordLine: [...this.state.RecordLine, volumes[2].val],
        });
        this.renderCanvas(false, "voice-canvas", this.state.RecordLine);
      }
    };
  }

  recordStart() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    navigator.getUserMedia(
      { audio: true, video: false },
      (stream) => {
        localStream = stream;
        this.renderAudioVolume(localStream);
        var mediaRecorder = new MediaRecorder(stream);
        let onRecordingReady = (e) => {
          if (this.audio) this.audio.src = URL.createObjectURL(e.data);
        };
        m = mediaRecorder;
        m.addEventListener("dataavailable", onRecordingReady);
        m.start();
      },
      function (err) {
        console.log(err);
      }
    );
  }

  updateDimensions = () => {};
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
    this.recordStart();
    this.timerref.current.setTime(0);
    this.timerref.current.startTimer();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  render() {
    return (
      <>
        <img
          src={ResetRecord}
          className="mr-3"
          onClick={() => {
            this.recordStop();
            this.props.stopRec();
          }}
          alt="ResetRecord"
        />
        <div className="col px-0 input-chat">
          {!this.state.isRecordPause && (
            <img
              src={stopRecord}
              onClick={() => {
                this.setState({ isRecordPause: true });
                this.recordStop();
              }}
              className="RecordPauseStart"
              alt="stopRecord"
            />
          )}
          {this.state.isRecordPause && (
            <img
              src={RecordPlay}
              className="RecordPauseStart"
              onClick={() => {
                if (this.state.isAudioPlay) {
                  this.audio.pause();
                } else this.audio.play();
                this.audio.onplaying = (e) => {
                  this.timerref.current.setTime(e.target.currentTime);
                  this.timerref.current.startTimer();
                };
                this.audio.onpause = this.audio.onended = () => {
                  this.timerref.current.stopTimer();
                };
                this.setState({ isAudioPlay: !this.state.isAudioPlay });
              }}
              alt="RecordPlay"
            />
          )}
          <canvas id="voice-canvas"></canvas>
          <div className="timer">
            <Timer ref={this.timerref} />
          </div>
        </div>

        <img
          src={send}
          className="ml-3"
          onClick={this.props.recordReset}
          alt="microphone"
        />
        <audio
          ref={(ref) => {
            this.audio = ref;
          }}
          style={{ display: "none" }}
          controls
        ></audio>
      </>
    );
  }
}

export default PanelRecord;
