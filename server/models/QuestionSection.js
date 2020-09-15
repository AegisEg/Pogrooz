const mongoose = require("../database");
const Schema = mongoose.Schema;

const QuestionSectionSchema = new Schema({
  title: { type: String },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  slug: { type: String, unique: true, required: true },
  type: { type: "String", default: "all" },
  createdAt: { type: Date, default: Date.now, select: false },
  buff: Buffer,
});

const QuestionSection = mongoose.model(
  "QuestionSection",
  QuestionSectionSchema
);
module.exports = QuestionSection;
