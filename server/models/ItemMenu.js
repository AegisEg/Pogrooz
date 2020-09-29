const mongoose = require("../database");
const Schema = mongoose.Schema;

const ItemMenuSchema = new Schema({
  name: { type: String },
  partition: { type: mongoose.Schema.Types.ObjectId, ref: "PartitionMenu" },
  link: { type: String, required: true },
  onlyNoAuth: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, select: false },
});

const ItemMenu = mongoose.model("ItemMenu", ItemMenuSchema);
module.exports = ItemMenu;
