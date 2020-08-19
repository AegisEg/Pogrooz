// App
import React from "react";
import AudioVoice from "../AudioVoice";
import ResetRecord from "../../../img/ResetRecord.svg";
import stopRecord from "../../../img/stopRecord.svg";
import send from "../../../img/send.svg";
import LoadGif from "../../../img/load.gif";
import { renderCanvas } from "../../../controllers/FunctionsController";
// Internet Explorer 6-11
const isIE = /*@cc_on!@*/ false || !!document.documentMode;
// Edge 20+
const isEdge = !isIE && !!window.StyleMedia;

let m, localStream, source, analyser, processor, ctx, audioChunks;
class PanelRecord extends React.Component {
  state = {
    isRecordPause: false,
    isAudioPlay: false,
    isSending: false,
    RecordLine: [],
    countdown: 0,
    audioSrc: false,
  };
  startTimer() {
    this.timer = setInterval(() => {
      if (this.timer) this.setState({ countdown: ++this.state.countdown });
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.timer);
    this.timer = false;
  }
  //TImer ENd
  recordStart() {
    return new Promise((resolve, reject) => {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      audioChunks = [];
      let getMedia = (
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia
      ).bind(navigator);
      getMedia(
        { audio: true, video: false },
        (stream) => {
          if (stream) {
            localStream = stream;
            this.renderAudioVolume(localStream);
            let mediaRecorder = new MediaRecorder(stream);
            m = mediaRecorder;
            m.addEventListener("start", this.startTimer.bind(this));
            m.addEventListener("pause", this.stopTimer.bind(this));
            m.addEventListener("stop", this.stopTimer.bind(this));
            m.start();
          }
        },
        (err) => {
          this.props.stopRec();
        }
      );
    });
  }
  recordStop() {
    return new Promise(async (resolve, reject) => {
      if (!this.state.isRecordPause && localStream) {
        let onRecordingReady = (e) => {
          this.props
            .addVoiceSound(e.data, this.state.countdown, this.state.RecordLine)
            .then(() => {
              this.setState({
                isRecordPause: true,
                audioSrc: URL.createObjectURL(e.data),
              });
              resolve();
            });
        };
        m.addEventListener("dataavailable", onRecordingReady);
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
      } else resolve();
    });
  }
  componentWillUnmount() {
    this.recordStop();
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

      this.setState({
        RecordLine: [...this.state.RecordLine, volumes[2].val],
      });
      renderCanvas(
        false,
        "voice-canvas",
        this.state.RecordLine,
        false,
        "#9933ff"
      );
    };
  }

  componentDidMount() {
    this.recordStart();
  }
  render() {
    return (
      <>
        <img
          src={ResetRecord}
          className="resetRecord"
          onClick={async () => {
            // if (!this.state.isRecordPause)
            this.recordStop().then(async () => {
              await this.props.stopRec();
              await this.props.addVoiceSound(false);
            });
          }}
          alt="ResetRecord"
        />
        <div className="input-chat">
          {!this.state.isRecordPause && (
            <>
              <img
                src={stopRecord}
                onClick={() => {
                  this.setState({ isRecordPause: true });
                  this.recordStop();
                }}
                className="RecordPauseStart"
                alt="stopRecord"
              />
              <canvas id="voice-canvas"></canvas>
              <div className="timer">
                {String(this.state.countdown).toTimer()}
              </div>
            </>
          )}
          {this.state.isRecordPause && this.state.audioSrc && (
            <AudioVoice
              sound={{
                duration: this.state.countdown,
                path: this.state.audioSrc,
                recordLine: this.state.RecordLine,
              }}
            />
          )}
        </div>
        <img
          src={this.state.isSending ? LoadGif : send}
          className="sendRecord"
          onClick={async () => {
            this.setState({ isSending: true });
            this.recordStop().then(async () => {
              await this.props.sendMessage();
              await this.setState({ isSending: false });
            });
          }}
          alt="microphone"
        />
      </>
    );
  }
}

export default PanelRecord;
