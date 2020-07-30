export default Date.prototype.toDateR = function () {
  return (
    (this.getMonth() > 8 ? this.getMonth() + 1 : "0" + (this.getMonth() + 1)) +
    "." +
    (this.getDate() > 9 ? this.getDate() : "0" + this.getDate()) +
    "." +
    this.getFullYear()
  );
};
