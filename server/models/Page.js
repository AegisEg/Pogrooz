const mongoose = require("../database");
const Schema = mongoose.Schema;

const PageSchema = new Schema({
  title: { type: String },
  slug: { type: String },
  content: { type: String },
  createdAt: { type: Date, default: Date.now, select: false },
  buff: Buffer,
});

const Page = mongoose.model("Page", PageSchema);
module.exports = Page;
