/**
 * RoomController.js
 * Author: Roman Shuvalov
 */
"use strict";

const Article = require("../models/Article");
const carTemplate = require("../models/Car/carTemplate");
const TripPoint = require("../models/TripPoint");
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
            property: article.car.property,
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
        // let tripPointFrom = false;
        if (!article.from) return res.json({ error: true, errorType: "from" });
        newArticle.from = article.from;
        if (article.from.data.geo_lat && article.from.data.geo_lon)
          newArticle.fromLocation = {
            type: "Point",
            coordinates: [article.from.data.geo_lat, article.from.data.geo_lon],
          };
        if (!article.to) return res.json({ error: true, errorType: "to" });
        newArticle.to = article.to;
        if (article.to.data.geo_lat && article.to.data.geo_lon)
          newArticle.toLocation = {
            type: "Point",
            coordinates: [article.to.data.geo_lat, article.to.data.geo_lon],
          };
        if (article.startDate.date) {
          article.startDate.date = new Date(article.startDate.date);
          article.startDate.date.setHours(0, 0, 0, 0);
          newArticle.startDate.date = article.startDate.date;
          if (article.startDate.timeFrom) {
            article.startDate.timeFrom = new Date(article.startDate.timeFrom);
            newArticle.startDate.timeFrom = new Date(
              article.startDate.date.getFullYear(),
              article.startDate.date.getMonth(),
              article.startDate.date.getDate(),
              article.startDate.timeFrom.getHours(),
              article.startDate.timeFrom.getMinutes(),
              article.startDate.timeFrom.getSeconds()
            );
          }
          if (article.startDate.timeTo) {
            article.startDate.timeTo = new Date(article.startDate.timeTo);
            newArticle.startDate.timeTo = new Date(
              article.startDate.date.getFullYear(),
              article.startDate.date.getMonth(),
              article.startDate.date.getDate(),
              article.startDate.timeTo.getHours(),
              article.startDate.timeTo.getMinutes(),
              article.startDate.timeTo.getSeconds()
            );
          }
        }
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
    let geoNear = false;
    let match = {};
    let addFields = false;
    let sort = false;
    let timeFrom = false;
    let timeTo = false;
    if (filter.allStatus) {
      filter.status = { $in: filter.allStatus };
      delete filter.allStatus;
    }

    if (filter.status) match.status = filter.status;
    if (filter.from) {
      match = {
        ...match,
        "from.data.city_fias_id": filter.from.data.city_fias_id,
      };
      if (
        filter.from.data.geo_lat &&
        filter.from.data.geo_lon &&
        filter.from.data.fias_level === "8"
      )
        geoNear = {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [
                Number(filter.from.data.geo_lat),
                Number(filter.from.data.geo_lon),
              ],
            },
            key: "fromLocation",
            distanceField: "fromDistance",
            spherical: true,
          },
        };
    }
    if (filter.to) {
      match = {
        ...match,
        "to.data.city_fias_id": filter.to.data.city_fias_id,
      };
    }
    //Груз
    if (filter.cargoType) match.cargoTypes = filter.cargoType;
    //Машина
    if (filter.carType) match = { ...match, "car.typesCar": filter.carType };
    //Не проверял
    if (filter.additionally && filter.additionally.length)
      match = {
        ...match,
        "car.additionally.id": { $all: filter.additionally },
      };
    if (filter.contractInfo && filter.contractInfo.length)
      match = {
        ...match,
        "car.contractInfo.id": { $all: filter.contractInfo },
      };
    if (filter.paymentInfo && filter.paymentInfo.length)
      match = {
        ...match,
        "car.paymentInfo.id": { $all: filter.paymentInfo },
      };
    //Не проверял
    if (filter.budget) {
      match = {
        ...match,
        budget: { $gte: Number(filter.budget) },
      };
    }
    if (filter.cargoData && filter.cargoData.length) {
      let property = {};
      Object.entries(filter.cargoData[0]).map((itemY, index) => {
        if (itemY[0] === "type" || itemY[0] === "typeID")
          property[itemY[0]] = itemY[1];
        else property[itemY[0]] = { $gte: itemY[1] };
      });
      match = { ...match, cargoData: { $elemMatch: property } };
    }
    if (filter.cargoStandartData) {
      if (!!filter.cargoStandartData.unit) {
        match = {
          ...match,
          "cargoStandartData.unit": filter.cargoStandartData.unit,
        };
      }
      if (!!filter.cargoStandartData.height) {
        match = {
          ...match,
          "cargoStandartData.height": {
            $gte: Number(filter.cargoStandartData.height),
          },
        };
      }
      if (!!filter.cargoStandartData.weight) {
        match = {
          ...match,
          "cargoStandartData.weight": {
            $gte: Number(filter.cargoStandartData.weight),
          },
        };
      }
      if (!!filter.cargoStandartData.width) {
        match = {
          ...match,
          "cargoStandartData.width": {
            $gte: Number(filter.cargoStandartData.width),
          },
        };
      }
      if (!!filter.cargoStandartData.length) {
        match = {
          ...match,
          "cargoStandartData.length": {
            $gte: Number(filter.cargoStandartData.length),
          },
        };
      }
      if (!!filter.cargoStandartData.count) {
        match = {
          ...match,
          "cargoStandartData.count": {
            $gte: Number(filter.cargoStandartData.count),
          },
        };
      }
    }
    //Дата
    if (filter.startDate) {
      if (filter.startDate.date) {
        filter.startDate.date = new Date(filter.startDate.date);
        filter.startDate.date.setHours(0, 0, 0, 0);
        if (!sort) sort = {};
        sort.sortDate = 1;
        if (!addFields) addFields = {};
        addFields.sortDate = {
          $cond: {
            if: { $eq: ["$startDate.date", filter.startDate.date] },
            then: 1,
            else: {
              $cond: {
                if: { $gt: ["$startDate.date", filter.startDate.date] },
                then: 3,
                else: 2,
              },
            },
          },
        };
        match = {
          ...match,
          "startDate.date": {
            $gte: filter.startDate.date.addDays(-2),
            $lt: filter.startDate.date.addDays(2),
          },
        };
      }
      if (filter.startDate.timeFrom) {
        filter.startDate.timeFrom = new Date(filter.startDate.timeFrom);
        let time = new Date(
          filter.startDate.date.getFullYear(),
          filter.startDate.date.getMonth(),
          filter.startDate.date.getDate(),
          filter.startDate.timeFrom.getHours(),
          filter.startDate.timeFrom.getMinutes(),
          filter.startDate.timeFrom.getSeconds()
        );
        match = {
          ...match,
          "startDate.timeFrom": { $gte: time },
        };
      }
      if (filter.startDate.timeFrom) {
        filter.startDate.timeTo = new Date(filter.startDate.timeTo);
        let time = new Date(
          filter.startDate.date.getFullYear(),
          filter.startDate.date.getMonth(),
          filter.startDate.date.getDate(),
          filter.startDate.timeTo.getHours(),
          filter.startDate.timeTo.getMinutes(),
          filter.startDate.timeTo.getSeconds()
        );
        match = {
          ...match,
          "startDate.timeTo": { $gte: time },
        };
      }
    }

    console.log(match);
    if (!sort)
      sort = {
        createdAt: 1,
      };
    //Дата
    //Filter AND SORT
    let aggregate = [{ $match: match }];
    aggregate = [
      ...aggregate,
      {
        $lookup: {
          from: "users",
          localField: "autor",
          foreignField: "_id",
          as: "autor",
        },
      },
      { $unwind: "$autor" },
    ];
    if (addFields) aggregate.push({ $addFields: addFields });
    aggregate = [
      ...aggregate,
      {
        $sort: sort,
      },
      {
        $group: { _id: null, total: { $sum: 1 }, results: { $push: "$$ROOT" } },
      },
      {
        $project: {
          total: 1,
          results: { $slice: ["$results", page * count, count] },
        },
      },
    ];
    if (geoNear) aggregate.unshift(geoNear);
    let articles = await Article.aggregate(aggregate);
    if (!!articles.length) articles = articles[0];
    else
      articles = {
        results: [],
        total: 0,
      };
    return res.json({
      articles: articles.results,
      pageAll: Math.floor(articles.total / count),
    });
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
Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
