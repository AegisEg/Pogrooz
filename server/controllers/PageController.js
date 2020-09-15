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
      let filter = {};
      if (type !== "all") filter.$or = [{ type }, { type: "all" }];
      let sections = await QuestionSection.find(filter).populate("questions");
      if (sections) return res.json({ sections });
      else res.status(422).json({ error: true, errorType: "notFound" });
    } catch (e) {
      return next(new Error(e));
    }
  },
  question: async (req, res, next) => {
    let { slug, type } = req.body;
    try {
      let partial = await QuestionSection.findOne({ slug }).populate(
        "questions"
      );
      if (partial) return res.json({ partial });
      else res.status(422).json({ error: true, errorType: "notFound" });
    } catch (e) {
      return next(new Error(e));
    }
  },
};
