const mongoose = require("../../database");
const Schema = mongoose.Schema;

const CarSchema = new Schema({
  typesCar: [{ type: Number }],
  name: { type: String },
  property: { type: String },
  photo: { type: Object },
  info: { type: Object },
  additionally: [{ type: Object }],
  contractInfo: [{ type: Object }],
  paymentInfo: [{ type: Object }],
  buff: Buffer,
});
module.exports = CarSchema;
