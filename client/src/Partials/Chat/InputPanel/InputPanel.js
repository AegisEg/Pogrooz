// App
import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
import PanelRecord from "./PanelRecord";
import PanelStandart from "./PanelStandart";
let m, localStream, source, analyser, processor;
const ctx = new (window.AudioContext || window.webkitAudioContext)();

class InputPanel extends React.Component {
  state = {
    text: "",
    isRecord: false,
    RecordLine: [],
  };
  recordStop() {
    m.stop();
    if (localStream) {
      localStream.getAudioTracks()[0].stop();
      localStream = false;
    }
    source.disconnect(analyser);
    source.disconnect(processor);
    processor.disconnect(ctx.destination);
    this.renderCanvas(false, "voice-canvas", this.state.RecordLine, true);
  }
  renderCanvas(ref, id, RecordLine, isAdaptive) {
    let canvas;
    let paddingStick = 2,
      widthStick = 1;
    if (!!ref) canvas = ref;
    else canvas = document.getElementById(id);
    let ctxCanvas = canvas.getContext("2d");
    console.log(canvas.getBoundingClientRect());
    canvas.width = canvas.getBoundingClientRect().width;
    canvas.height = canvas.getBoundingClientRect().height;
    ctxCanvas.clearRect(0, 0, canvas.width, canvas.height);
    //Удалять каждый n элемент при выводе полного сообщения
    let countAllSrick = canvas.width / (widthStick + paddingStick);
    let everyIndex = false;
    if (RecordLine.length > countAllSrick)
      everyIndex = (RecordLine.length - countAllSrick) / RecordLine.length;
    // console.log(countAllSrick);
    ctxCanvas.fillStyle = "#9933ff";
    RecordLine.slice().reverse();
    RecordLine.map((item, index) => {
      let isDIsavleAdaptive =
        !everyIndex || !((RecordLine.length - index) % everyIndex == 0);
      if ((isAdaptive && isDIsavleAdaptive) || !isAdaptive) {
        let height = item / 180;
        if (height > 1) height = canvas.height - 9;
        else if (height === 0) height = 2;
        else height = (canvas.height - 9) * height;
        ctxCanvas.fillRect(
          canvas.width -
            (RecordLine.length - index) * (paddingStick + widthStick),
          canvas.height / 2 - height / 2,
          widthStick,
          height
        );
      }
    });
  }
  renderAudioVolume(stream) {
    source = ctx.createMediaStreamSource(stream);
    analyser = ctx.createAnalyser();
    processor = ctx.createScriptProcessor(2048, 1, 1);

    source.connect(analyser);
    source.connect(processor);
    processor.connect(ctx.destination);

    let data = new Uint8Array(analyser.frequencyBinCount);
    let count = 0;
    processor.onaudioprocess = () => {
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
    navigator.getUserMedia(
      { audio: true, video: false },
      (stream) => {
        localStream = stream;
        this.renderAudioVolume(localStream);
        var mediaRecorder = new MediaRecorder(stream);
        let onRecordingReady = (e) => {
          this.audio.src = URL.createObjectURL(e.data);
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
  render() {
    return (
      <div className="message-panel">
        {!this.state.isRecord && (
          <PanelStandart
            recordStart={() => {
              this.recordStart();
              this.setState({ isRecord: true });
            }}
          />
        )}
        {this.state.isRecord && (
          <>
            <PanelRecord
              stopRec={() => {
                this.recordStop();
              }}
            />
          </>
        )}
        <audio
          ref={(ref) => {
            this.audio = ref;
          }}
          style={{ display: "none" }}
          autoPlay
          controls
        ></audio>
      </div>
    );
  }
}

export default InputPanel;
