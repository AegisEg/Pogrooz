const mongoose = require("../database");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  title: { type: String },
  content: { type: String },
  slug: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now, select: false },
  buff: Buffer,
});

const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;
