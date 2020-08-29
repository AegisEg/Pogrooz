const Car = require("./models/Car/Car");
var fs = require("fs");

function readLines(input, func) {
  var remaining = "";

  input.on("data", function(data) {
    remaining += data;
    var index = remaining.indexOf("\n");
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      func(line);
      index = remaining.indexOf("\n");
    }
  });

  input.on("end", function() {
    if (remaining.length > 0) {
      func(remaining);
    }
  });
}

async function func(data) {
  let exist = await Car.find({ name: data });
  if (!exist.length) {
    let car = new Car();
    car.name = data;
    car.save();
  }
}
var input = fs.createReadStream("car.txt");
readLines(input, func);
