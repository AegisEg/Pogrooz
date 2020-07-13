String.prototype.toTimer = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
};
String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + minutes + ":" + seconds;
};
export function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export function padZero(v) {
  return v < 10 ? "0" + v : v;
}

export function renderCanvas(ref, id, RecordLine, isAdaptive, color) {
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
    ctxCanvas.fillStyle = color;
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
export function getAudioBufferData(blobUrl) {
  let data = {};
  let actx = new (window.AudioContext || window.webkitAudioContext)();
  return new Promise((resolve, reject) => {
    fetch(blobUrl, { mode: "cors" })
      .then(function (resp) {
        return resp.arrayBuffer();
      })
      .then(actx.decodeAudioData.bind(actx))
      .then(function (buffer) {
        data.duration = buffer.duration;
        var channel = buffer.getChannelData(0);
        var points = [0];
        for (var x = 1, i, v; x < 300; x++) {
          i = ((x / 300) * channel.length) | 0;
          v = Math.abs(dB(channel, i, 8820)) / 40;
          points.push(v * 100);
        }
        data.recordLine = points;
        resolve(data);
      });
  });
}
function dB(buffer, pos, winSize) {
  for (var rms, sum = 0, v, i = pos - winSize; i <= pos; i++) {
    v = i < 0 ? 0 : buffer[i];
    sum += v * v;
  }
  rms = Math.sqrt(sum / winSize); // corrected!
  return 20 * Math.log10(rms);
}
