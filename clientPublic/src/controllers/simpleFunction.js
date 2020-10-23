Date.prototype.toDateR = function () {
  return (
    (this.getDate() > 9 ? this.getDate() : "0" + this.getDate()) +
    "." +
    (this.getMonth() > 8 ? this.getMonth() + 1 : "0" + (this.getMonth() + 1)) +
    "." +
    this.getFullYear()
  );
};
Date.prototype.toHM = function () {
  let time = this;
  var hours = time.getHours();
  var minutes = time.getMinutes();

  if (minutes.toString().length === 1) {
    minutes = "0" + minutes;
  }
  if (hours.toString().length === 1) {
    hours = "0" + hours;
  }

  return hours + ":" + minutes;
};
