/**
 * PageController.js
 * Author: Vasilev Egor
 */
"use strict";

const Page = require("../models/Page");

const QuestionSection = require("../models/QuestionSection");
const Question = require("../models/Question");

module.exports = {
  page: async (req, res, next) => {
    let { slug, isPrivate } = req.body;
    try {
      let page = await Page.findOne({ slug, isPrivate });

      if (page) return res.json({ page });
      else res.status(422).json({ error: true, errorType: "notFound" });
    } catch (e) {
      return next(new Error(e));
    }
  },
  questions: async (req, res, next) => {
    let { type } = req.body;
    try {
      let sections = await QuestionSection.find({ type: type }).populate(
        "questions"
      );
      if (sections) return res.json({ sections });
      else res.status(422).json({ error: true, errorType: "notFound" });
    } catch (e) {
      return next(new Error(e));
    }
  },
  question: async (req, res, next) => {
    let { slug } = req.body;
    try {
      let question = await Question.findOne({ slug }).populate("questions");
      if (question) return res.json({ question });
      else res.status(422).json({ error: true, errorType: "notFound" });
    } catch (e) {
      return next(new Error(e));
    }
  },
};
