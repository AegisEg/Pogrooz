const mongoose = require("../database");
const Schema = mongoose.Schema;

const PartitionMenuSchema = new Schema({
  name: { type: String },
  priority: { type: Number },
  link: { type: String },
  createdAt: { type: Date, default: Date.now, select: false },
});

const PartitionMenu = mongoose.model("PartitionMenu", PartitionMenuSchema);
module.exports = PartitionMenu;
