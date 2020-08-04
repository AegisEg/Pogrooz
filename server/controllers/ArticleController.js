/**
 * RoomController.js
 * Author: Roman Shuvalov
 */
"use strict";

const Article = require("../models/Article");
const carTemplate = require("../models/Car/carTemplate");
const { Error } = require("mongoose");

module.exports = {
  createArticle: async (req, res, next) => {
    const { user } = res.locals;
    let { article } = req.body;
    article = JSON.parse(article);
    try {
      // (user.type === "carrier" && article.type === "offer") ||
      // (user.type === "cargo" && article.type === "order") Потом ключить

      if (true) {
        let newArticle = new Article();
        newArticle.type = article.type;
        newArticle.autor = user;
        if (!article.cargoTypes.length)
          return res.json({ error: true, errorType: "cargoTypes" });
        newArticle.cargoTypes = article.cargoTypes;
        newArticle.cargoData = article.cargoData;
        newArticle.cargoStandartData = article.cargoStandartData;
        if (!article.status)
          return res.json({ error: true, errorType: "status" });
        newArticle.status = article.status;
        if (article.type === "order") {
          let photos = [];

          for (let i = 0; i < 9; i++) {
            if (
              req.files &&
              (req.files["cargoPhoto" + i] &&
                req.files["cargoPhoto" + i].size / 1000 <= 10000)
            ) {
              let fileName = randomString(24);
              let filePath =
                "./uploads/" +
                user._id +
                "/" +
                fileName +
                "." +
                req.files["cargoPhoto" + i].name.split(".").pop();
              req.files["cargoPhoto" + i].mv(filePath, function(err) {
                if (err) return res.status(500).send(err);
              });
              photos.push({
                path:
                  process.env.API_URL +
                  "/media/" +
                  user._id +
                  "/" +
                  fileName +
                  "." +
                  req.files["cargoPhoto" + i].name.split(".").pop(),
                name: req.files["cargoPhoto" + i].name,
                size: req.files["cargoPhoto" + i].size,
              });
            }
          }
          newArticle.cargoPhoto = [
            ...article.cargoPhoto.filter((item) => !item.isNew),
            ...photos,
          ];
        }
        if (
          !article.car &&
          !article.car.typesCar &&
          !article.car.name &&
          !article.car.photo &&
          !article.carTemplate
        )
          return res.json({ error: true, errorType: "carInfo" });
        if (!article.car)
          newArticle.carTemplate = await carTemplate.findById(
            article.carTemplate.id
          );
        else {
          newArticle.car = {
            typesCar: article.car.typesCar,
            name: article.car.name,
            additionally: article.car.additionally,
            info: article.car.info,
            contractInfo: article.car.contractParam,
            paymentInfo: article.car.paymentInfo,
          };
          if (article.type === "offer") {
            if (req.files["carPhoto"]) {
              if (req.files["carPhoto"].size / 1000 <= 10000) {
                let fileName = randomString(24);
                let filePath =
                  "./uploads/" +
                  user._id +
                  "/" +
                  fileName +
                  "." +
                  req.files["carPhoto"].name.split(".").pop();
                req.files["carPhoto"].mv(filePath, function(err) {
                  if (err) return res.status(500).send(err);
                });
                newArticle.car.photo = {
                  path:
                    process.env.API_URL +
                    "/media/" +
                    user._id +
                    "/" +
                    fileName +
                    "." +
                    req.files["carPhoto"].name.split(".").pop(),
                  name: req.files["carPhoto"].name,
                  size: req.files["carPhoto"].size,
                };
              }
            }
          }
        }

        newArticle.comment = article.comment;
        newArticle.budget = article.budget;
        if (!article.from) return res.json({ error: true, errorType: "from" });
        newArticle.from = article.from;
        if (!article.to) return res.json({ error: true, errorType: "to" });
        newArticle.to = article.to;
        if (article.startDate.date)
          newArticle.startDate.date = article.startDate.date;
        if (article.startDate.timeFrom)
          newArticle.startDate.timeFrom = article.startDate.timeFrom;
        if (article.startDate.timeTo)
          newArticle.startDate.timeTo = article.startDate.timeTo;
        await newArticle.save();
      } else return res.json({ error: true, errorType: "typeUser" });
      return res.json({ error: false });
    } catch (e) {
      return next(new Error(e));
    }
  },
  getArticles: async (req, res, next) => {
    let count = 6;
    let { filter, page } = req.body;
    if (filter.allStatus) {
      filter.status = { $in: filter.allStatus };
      delete filter.allStatus;
    }
    let countAll = await Article.find(filter).count();
    let articles = await Article.find(filter)
      .populate("autor")
      .skip(page * count)
      .limit(6);
    return res.json({ articles, pageAll: Math.floor(countAll / count) });
  },
  getArticle: async (req, res, next) => {
    const { id, type } = req.body;
    let article = await Article.findOne({
      articleId: id,
      type: type,
    }).populate("autor");
    return res.json({ article });
  },
};

function randomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
