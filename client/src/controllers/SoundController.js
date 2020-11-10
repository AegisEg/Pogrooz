import api from "../config/api";

const CTX = new (window.AudioContext || window.webkitAudioContext)();

let newMessageSound = new Audio(`${api.urlApi}/media/sounds/NewMessage.mp3`);
let beep = new Audio(`${api.urlApi}/media/sounds/Beep.mp3`);

setInterval(() => {
  CTX.resume().then(() => {});
}, 3000);

export const playNewMessage = () => {
  newMessageSound.currentTime = 0;
  newMessageSound.volume = 0.1;
  let promise = newMessageSound.play();

  if (promise !== undefined) {
    promise
      .then((_) => {})
      .catch((error) => {
        console.log(error);
      });
  }
};

export const playBeep = () => {
  beep.currentTime = 0;
  beep.volume = 0.1;
  let promise = beep.play();

  if (promise !== undefined) {
    promise
      .then((_) => {})
      .catch((error) => {
        console.log(error);
      });
  }
};

export const stopBeep = () => {
  beep.currentTime = 0;
  beep.pause();
};
