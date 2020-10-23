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
  let one = parseInt(v / 60),
    two = parseInt(v % 60);
  return (one < 10 ? "0" + one : one) + ":" + (two % 60 < 10 ? "0" + two : two);
}
CanvasRenderingContext2D.prototype.roundedRect = function (
  x,
  y,
  width,
  height,
  radius
) {
  // Because the function is added to the context prototype
  // the 'this' variable is actually the context

  // Save the existing state of the canvas so that it can be restored later
  this.save();

  // Translate to the given X/Y coordinates
  this.translate(x, y);

  // Move to the center of the top horizontal line
  this.moveTo(width / 2, 0);

  // Draw the rounded corners. The connecting lines in between them are drawn automatically
  this.arcTo(width, 0, width, height, Math.min(height / 2, radius));
  this.arcTo(width, height, 0, height, Math.min(width / 2, radius));
  this.arcTo(0, height, 0, 0, Math.min(height / 2, radius));
  this.arcTo(0, 0, radius, 0, Math.min(width / 2, radius));

  // Draw a line back to the start coordinates
  this.lineTo(width / 2, 0);

  // Restore the state of the canvas to as it was before the save
  this.restore();
};
export function renderCanvas(ref, id, RecordLine, isAdaptive, color) {
  let canvas;
  let paddingStick = 3,
    widthStick = 1; //Ширина полосок
  if (!!ref) canvas = ref;
  else canvas = document.getElementById(id);
  if (canvas) {
    let ctxCanvas = canvas.getContext("2d");
    canvas.width = canvas.getBoundingClientRect().width - 88; //Ширина минус паддинги
    canvas.height = canvas.getBoundingClientRect().height;
    ctxCanvas.clearRect(0, 0, canvas.width, canvas.height);
    ctxCanvas.fillStyle = color;
    ctxCanvas.strokeStyle = color;
    RecordLine.slice().reverse();
    RecordLine.map((item, index) => {
      let height = item / 180;
      if (height > 1) height = canvas.height - 9;
      else if (height === 0) height = 2;
      else height = (canvas.height - 9) * height;
      ctxCanvas.beginPath();
      ctxCanvas.roundedRect(
        canvas.width -
          (RecordLine.length - index) * (paddingStick + widthStick),
        canvas.height / 2 - height / 2,
        widthStick,
        height,
        1
      );
      ctxCanvas.stroke();
    });
  }
}
export function jivoSite() {
  (function () {
    document.jivositeloaded = 0;
    var widget_id = "DO77oIGITe";
    var d = document;
    var w = window;
    function l() {
      var s = d.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "//code.jivosite.com/script/widget/" + widget_id;
      var ss = document.getElementsByTagName("script")[0];
      ss.parentNode.insertBefore(s, ss);
    } //эта строка обычная для кода JivoSite
    function zy() {
      //удаляем EventListeners
      if (w.detachEvent) {
        //поддержка IE8
        w.detachEvent("onscroll", zy);
        w.detachEvent("onmousemove", zy);
        w.detachEvent("ontouchmove", zy);
        w.detachEvent("onresize", zy);
      } else {
        w.removeEventListener("scroll", zy, false);
        w.removeEventListener("mousemove", zy, false);
        w.removeEventListener("touchmove", zy, false);
        w.removeEventListener("resize", zy, false);
      }
      //запускаем функцию загрузки JivoSite
      if (d.readyState == "complete") {
        l();
      } else {
        if (w.attachEvent) {
          w.attachEvent("onload", l);
        } else {
          w.addEventListener("load", l, false);
        }
      }
      //Устанавливаем куку по которой отличаем первый и второй хит
      var cookie_date = new Date();
      cookie_date.setTime(cookie_date.getTime() + 60 * 60 * 28 * 1000); //24 часа для Москвы
      d.cookie = "JivoSiteLoaded=1;path=/;expires=" + cookie_date.toGMTString();
    }
    if (d.cookie.search("JivoSiteLoaded") < 0) {
      //проверяем, первый ли это визит на наш сайт, если да, то назначаем EventListeners на события прокрутки, изменения размера окна браузера и скроллинга на ПК и мобильных устройствах, для отложенной загрузке JivoSite.
      if (w.attachEvent) {
        // поддержка IE8
        w.attachEvent("onscroll", zy);
        w.attachEvent("onmousemove", zy);
        w.attachEvent("ontouchmove", zy);
        w.attachEvent("onresize", zy);
      } else {
        w.addEventListener("scroll", zy, { capture: false, passive: true });
        w.addEventListener("mousemove", zy, {
          capture: false,
          passive: true,
        });
        w.addEventListener("touchmove", zy, {
          capture: false,
          passive: true,
        });
        w.addEventListener("resize", zy, { capture: false, passive: true });
      }
    } else {
      zy();
    }
  })();
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
