/**
 * PageController.js
 * Author: Vasilev Egor
 */
"use strict";

const Page = require("../models/Page");
var fs = require("fs");
const QuestionSection = require("../models/QuestionSection");
const ItemMenu = require("../models/ItemMenu");
const Setting = require("../models/Setting");
const User = require("../models/User");
const Article = require("../models/Article");
const staticUrl = [
  "",
  "about",
  "cargo",
  "carrier",
  "download-app",
  "faq",
  "search-offer",
  "search-order",
  "tariffs",
];
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

  sitemap: async () => {
    let xml_content = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ];
    //StaticUrls
    //Main
    staticUrl.map((item) => {
      xml_content = [
        ...xml_content,
        "  <url>",
        `    <loc>${process.env.CLIENT_URL}/${item}</loc>`,
        "  </url>",
      ];
    });
    //Разделы Faq
    let questionSection = await QuestionSection.find();
    questionSection.map((item) => {
      xml_content = [
        ...xml_content,
        "  <url>",
        `    <loc>${process.env.CLIENT_URL}/questions/${item.slug}</loc>`,
        "  </url>",
      ];
    });
    //Пользователи
    let users = await User.find();
    users.map((item) => {
      xml_content = [
        ...xml_content,
        "  <url>",
        `    <loc>${process.env.CLIENT_URL}/user/${item._id}</loc>`,
        "  </url>",
      ];
    });
    let pages = await Page.find();
    pages.map((item) => {
      xml_content = [
        ...xml_content,
        "  <url>",
        `    <loc>${process.env.CLIENT_URL}/page/${item.slug}</loc>`,
        "  </url>",
      ];
    });
    //Пользователи
    let articles = await Article.find({ status: 2 });
    articles.map((item) => {
      xml_content = [
        ...xml_content,
        "  <url>",
        `    <loc>${process.env.CLIENT_URL}/${item.type}/${
          item.articleId
        }</loc>`,
        "  </url>",
      ];
    });
    xml_content = [...xml_content, "</urlset>"];
    fs.writeFile(
      "../client/build/sitemap.xml",
      xml_content.join("\n"),
      function(error) {}
    );
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
          $group: {
            _id: {
              name: "$partition.name",
              priority: "$partition.priority",
            },
            partition: { $first: "$partition" },
            items: { $push: "$$ROOT" },
          },
        },
        {
          $sort: {
            "_id.priority": 1,
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
      return next(new Error(e));
    }
  },
};
