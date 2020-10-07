/**
 * PageController.js
 * Author: Vasilev Egor
 */
"use strict";

const Page = require("../models/Page");

const QuestionSection = require("../models/QuestionSection");
const ItemMenu = require("../models/ItemMenu");
const Setting = require("../models/Setting");

module.exports = {
  page: async (req, res, next) => {
    let { slug } = req.body;
    try {
      let page = await Page.findOne({ slug });
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
  getSettings: async (req, res, next) => {
    try {
      let items = await ItemMenu.aggregate([
        {
          $lookup: {
            from: "partitionmenus",
            localField: "partition",
            foreignField: "_id",
            as: "partition",
          },
        },
        { $unwind: "$partition" },
        {
          $sort: {
            priority: 1,
          },
        },
        {
          $group: {
            _id: {
              name: "$partition.name",
            },
            partition: { $first: "$partition" },
            items: { $push: "$$ROOT" },
          },
        },
      ]);
      let settings = await Setting.aggregate([
        {
          $replaceRoot: {
            newRoot: {
              $arrayToObject: {
                $let: {
                  vars: { data: [{ k: "$key", v: "$value" }] },
                  in: "$$data",
                },
              },
            },
          },
        },
      ]);
      let settingsNew = {};
      settings.map((item) => {
        settingsNew = { ...settingsNew, ...item };
      });
      return res.json({ items, settings: settingsNew });
    } catch (e) {
      console.log(e);
    }
  },
};
