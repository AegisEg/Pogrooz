/**
 * RoomController.js
 * Author: Roman Shuvalov
 */
"use strict";
const {
  editMyArticle,
  createMyArticle,
  updateStatusMyArticle,
  deleteTaking,
  createTakingArticle,
  createArticleReview,
  updateArticleReview,
  setExecutor,
  deleteExecutorSoket,
  createRequestSoket,
  updateRequestSoket,
  deleteRequestSoket,
  sendNotification,
  setDelivered,
} = require("./SocketController");
const Article = require("../models/Article");
const Request = require("../models/Request");
const Notification = require("../models/Notification");
const User = require("../models/User");
const Review = require("../models/Review");
const { Error } = require("mongoose");
let { randomString } = require("../controllers/FileController");
let count = 6;
let reviewsCount = 10;
module.exports = {
  //Articles Geting
  getArticles: async (req, res, next) => {
    let { filter, page } = req.body;
    let geoNear = false;
    let match = {};
    let addFields = false;
    let sort = { createdAt: -1 };
    // let timeFrom = false;
    // let timeTo = false;
    if (filter.allStatus) {
      filter.status = { $in: filter.allStatus };
      delete filter.allStatus;
    }
    try {
      if (filter.type) match.type = filter.type;
      if (filter.status) match.status = filter.status;
      if (filter.from) {
        if (filter.from.data.house_fias_id)
          match = {
            ...match,
            "from.data.house_fias_id": filter.from.data.house_fias_id,
          };
        else if (filter.from.data.street_fias_id)
          match = {
            ...match,
            "from.data.street_fias_id": filter.from.data.street_fias_id,
          };
        else if (filter.from.data.city_fias_id)
          match = {
            ...match,
            "from.data.city_fias_id": filter.from.data.city_fias_id,
          };
        if (
          filter.type === "cargo" &&
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
              distanceField: "Distance",
              spherical: true,
            },
          };
      }
      if (filter.to) {
        if (filter.to.data.house_fias_id)
          match = {
            ...match,
            "to.data.house_fias_id": filter.to.data.house_fias_id,
          };
        else if (filter.to.data.street_fias_id)
          match = {
            ...match,
            "to.data.street_fias_id": filter.to.data.street_fias_id,
          };
        else if (filter.to.data.city_fias_id)
          match = {
            ...match,
            "to.data.city_fias_id": filter.to.data.city_fias_id,
          };
        if (
          !geoNear &&
          filter.type === "carrier" &&
          filter.to.data.geo_lat &&
          filter.to.data.geo_lon &&
          filter.to.data.fias_level === "8"
        )
          geoNear = {
            $geoNear: {
              near: {
                type: "Point",
                coordinates: [
                  Number(filter.to.data.geo_lat),
                  Number(filter.to.data.geo_lon),
                ],
              },
              key: "toLocation",
              distanceField: "Distance",
              spherical: true,
            },
          };
      }
      //Груз
      if (filter.cargoType) match.cargoTypes = filter.cargoType;
      //Машина
      if (filter.carType) match = { ...match, "car.typesCar": filter.carType };
      if (filter.property)
        match = { ...match, "car.property": filter.property };
      console.log(filter);
      //Дополнительно
      if (filter.additionally && filter.additionally.length) {
        if (!addFields) addFields = {};
        addFields.diferenceAddition = {
          $size: {
            $setIntersection: ["$car.additionally.id", filter.additionally],
          },
        };
        sort.diferenceAddition = -1;
      }
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
      //Дополнительно
      if (filter.budget) {
        filter.budget = Number(filter.budget);
        match = {
          ...match,
          budget: {
            $gte: filter.budget * 0.8,
            $lte: filter.budget * 1.2,
          },
        };

        sort.sortBudget = 1;
        if (!addFields) addFields = {};
        addFields.sortBudget = {
          $cond: {
            if: { $eq: ["$budget", filter.budget] },
            then: 1,
            else: {
              $cond: {
                if: { $gt: ["$budget", filter.budget] },
                then: 3,
                else: 2,
              },
            },
          },
        };
      }
      if (filter.cargoData && filter.cargoData.length) {
        let property = {};
        Object.entries(filter.cargoData[0]).map((itemY, index) => {
          console.log(itemY);
          if (itemY[1]) {
            if (itemY[0] === "type" || itemY[0] === "typeID")
              property[itemY[0]] = itemY[1];
            else property[itemY[0]] = { $gte: itemY[1] };
          }
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
          if (!filter.startDate.timeFrom && !filter.startDate.timeFrom) {
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
                    else: {
                      $cond: {
                        if: { $not: "$startDate.date" },
                        then: 4,
                        else: 2,
                      },
                    },
                  },
                },
              },
            };
          } else {
            match = {
              ...match,
              "startDate.date": filter.startDate.date,
            };
          }
        }
        if (filter.startDate.timeFrom) {
          filter.startDate.timeFrom = new Date(filter.startDate.timeFrom);
          filter.startDate.timeFrom.setSeconds(0);
          match = {
            ...match,
            "startDate.timeFrom": { $gte: filter.startDate.timeFrom },
          };
        }
        if (filter.startDate.timeTo) {
          filter.startDate.timeTo = new Date(filter.startDate.timeTo);
          filter.startDate.timeTo.setSeconds(0);
          match = {
            ...match,
            "startDate.timeTo": { $lte: filter.startDate.timeTo },
          };
        }
      }

      //Дата
      //Filter AND SORT
      let aggregate = [{ $match: match }];
      aggregate = [
        ...aggregate,
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "author",
          },
        },
        { $unwind: "$author" },
      ];
      if (addFields) aggregate.push({ $addFields: addFields });

      if (geoNear) {
        aggregate.unshift(geoNear);
        sort.Distance = 1;
      }
      if (Object.keys(sort).length > 1) delete sort.createdAt;
      aggregate = [
        ...aggregate,
        {
          $sort: sort,
        },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            results: { $push: "$$ROOT" },
          },
        },
        {
          $project: {
            total: 1,
            results: { $slice: ["$results", page * count, count] },
          },
        },
      ];
      let articles = await Article.aggregate(aggregate);

      if (!!articles.length) articles = articles[0];
      else
        articles = {
          results: [],
          total: 0,
        };
      return res.json({
        articles: articles.results,
        pageAll: Math.ceil(articles.total / count),
      });
    } catch (e) {
      return next(new Error(e));
    }
  },
  getArticle: async (req, res, next) => {
    const { id, type } = req.body;
    try {
      if (/\D/.test(id))
        return res.status(422).json({ error: true, errorType: "notFound" });

      let article = await Article.findOne({
        articleId: id,
        type: type,
        status: 2,
      }).populate([
        {
          path: "author",
        },
        {
          path: "executors",
        },
        {
          path: "requests",
          populate: {
            path: "author",
          },
        },
      ]);
      if (article) return res.json({ article });
      else return res.status(422).json({ error: true, errorType: "notFound" });
    } catch (e) {
      return next(new Error(e));
    }
  },
  getUserReviews: async (req, res, next) => {
    const { page, userId } = req.body;
    try {
      let reviews;
      reviews = await Review.find({
        user: userId,
      })
        .populate({
          path: "author",
        })
        .populate({
          path: "order",
          populate: [{ path: "author" }],
        })
        .sort("createdAt")
        .skip(page * reviewsCount)
        .limit(reviewsCount);
      return res.json({ error: false, reviews });
    } catch (e) {
      return next(new Error(e));
    }
  },
  getMyReviews: async (req, res, next) => {
    const { user } = res.locals;
    let { lastReviewId } = req.body;
    const { type } = req.body;
    try {
      let reviews;
      if (lastReviewId) {
        if (type == "my")
          reviews = await Review.find({
            author: user,
            _id: { $gt: lastReviewId },
          })
            .populate("author")
            .populate("order")
            .populate("user")
            .sort("createdAt")
            .limit(reviewsCount);
        if (type == "me")
          reviews = await Review.find({
            user: user,
            _id: { $gt: lastReviewId },
          })
            .populate({
              path: "order",
              populate: [{ path: "author" }],
            })
            .sort("createdAt")
            .limit(reviewsCount);
      } else {
        if (type == "my")
          reviews = await Review.find({ author: user })
            .populate("author")
            .populate({
              path: "order",
              populate: [{ path: "author" }],
            })
            .populate("user")
            .sort("createdAt")
            .limit(reviewsCount);
        if (type == "me")
          reviews = await Review.find({ user: user })
            .populate({
              path: "order",
              populate: [{ path: "author" }],
            })
            .sort("createdAt")
            .limit(reviewsCount);
      }
      return res.json({ error: false, reviews });
    } catch (e) {
      return next(new Error(e));
    }
  },
  getUserArticle: async (req, res, next) => {
    const { id, type } = req.body;
    const { user } = res.locals;
    try {
      if (/\D/.test(id))
        return res.status(422).json({ error: true, errorType: "notFound" });

      let article = await Article.findOne({
        articleId: id,
        type: type,
        $or: [
          {
            author: user._id,
          },
          {
            executors: user._id,
            status: { $gte: 2 },
          },
          {
            status: 2,
          },
        ],
      }).populate([
        {
          path: "author",
        },
        {
          path: "executors",
        },
        {
          path: "reviews",
          populate: [{ path: "user" }, { path: "author" }],
        },
        {
          path: "requests",
          populate: {
            path: "author",
          },
        },
      ]);

      if (article) return res.json({ article });
      else return res.status(422).json({ error: true, errorType: "notFound" });
    } catch (e) {
      return next(new Error(e));
    }
  },
  getMyArticles: async (req, res, next) => {
    const { user } = res.locals;
    let { status, type, offset } = req.body;
    try {
      if (type === "my") {
        let filter = {
          author: user._id,
          type: user.type === "cargo" ? "order" : "offer",
        };
        if (status) filter.status = { $in: status };
        let articles = await Article.find(filter)
          .populate([
            {
              path: "author",
            },
            {
              path: "executors",
            },
            {
              path: "reviews",
              populate: [{ path: "user" }, { path: "author" }],
            },
            {
              path: "requests",
              populate: {
                path: "author",
              },
            },
          ])
          .sort({ createdAt: -1 })
          .skip(offset)
          .limit(count);
        return res.json({
          articles,
        });
      }
      if (type === "taking") {
        let filter = {
          type: user.type === "cargo" ? "offer" : "order",
          status: { $gte: 3 },
          executors: user,
        };
        if (status) filter.status = { $in: status };
        let articles = await Article.find(filter)
          .populate([
            {
              path: "author",
            },
            {
              path: "executors",
            },
            {
              path: "reviews",
              populate: [{ path: "user" }, { path: "author" }],
            },
            {
              path: "requests",
              populate: {
                path: "author",
              },
            },
          ])
          .sort({ createdAt: -1 })
          .skip(offset)
          .limit(count);

        return res.json({
          articles,
        });
      }
    } catch (e) {
      return next(new Error(e));
    }
  },
  //Article Action
  createArticle: async (req, res, next) => {
    const { user } = res.locals;
    let { article, socketId, articleId } = req.body;
    if (articleId) {
      article = await Article.findById(articleId);
      article.status = 2;
    } else article = JSON.parse(article);
    try {
      if (
        (user.type === "carrier" && article.type === "offer") ||
        (user.type === "cargo" && article.type === "order")
      ) {
        let newArticle = new Article();
        newArticle.type = article.type;
        newArticle.author = user;
        if (!article.cargoTypes.length)
          return res.status(422).json({ error: true, errorType: "cargoTypes" });
        newArticle.cargoTypes = article.cargoTypes;
        newArticle.cargoData = article.cargoData;
        newArticle.cargoStandartData = article.cargoStandartData;
        if (!article.status && article.status !== 1 && article.status !== 2)
          return res.status(422).json({ error: true, errorType: "status" });
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
          !article.car.photo
        )
          return res.status(422).json({ error: true, errorType: "carInfo" });

        newArticle.car = {};
        newArticle.car.typesCar = article.car.typesCar;
        newArticle.car.name = article.car.name;
        newArticle.car.property = article.car.property;
        newArticle.car.additionally = article.car.additionally;
        newArticle.car.info = article.car.info;
        newArticle.car.contractInfo = article.car.contractInfo;
        newArticle.car.paymentInfo = article.car.paymentInfo;
        newArticle.car.photo = article.car.photo;

        newArticle.comment = article.comment;
        newArticle.budget = article.budget;
        // let tripPointFrom = false;
        if (!article.from)
          return res.status(422).json({ error: true, errorType: "from" });
        newArticle.from = article.from;
        if (article.from.data.geo_lat && article.from.data.geo_lon)
          newArticle.fromLocation = {
            type: "Point",
            coordinates: [article.from.data.geo_lat, article.from.data.geo_lon],
          };
        if (!article.to)
          return res.status(422).json({ error: true, errorType: "to" });
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
            newArticle.startDate.timeFrom = new Date(
              article.startDate.timeFrom
            );
          }
          if (article.startDate.timeTo) {
            newArticle.startDate.timeTo = new Date(article.startDate.timeTo);
          }
        }
        if (article.type === "offer") {
          if (req.files && req.files["carPhoto"]) {
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
        await newArticle.save();
        createMyArticle({
          userId: user._id,
          socketId,
          status: newArticle.status,
          article: newArticle,
        });
        return res.json({ error: false, article: newArticle });
      } else
        return res.status(422).json({ error: true, errorType: "typeUser" });
    } catch (e) {
      return next(new Error(e));
    }
  },
  updateArticle: async (req, res, next) => {
    const { user } = res.locals;
    let { article, editingId } = req.body;
    const { socketId } = req.body;
    article = JSON.parse(article);
    let editArticle;
    try {
      editArticle = await Article.findOne({
        _id: editingId,
        author: user._id,
      }).populate("author");
      if (
        editArticle &&
        (editArticle.status === 1 || editArticle.status === 2)
      ) {
        if (!article.cargoTypes.length)
          return res.status(422).json({ error: true, errorType: "cargoTypes" });
        editArticle.cargoTypes = article.cargoTypes;
        editArticle.cargoData = article.cargoData;
        editArticle.cargoStandartData = article.cargoStandartData;
        editArticle.cargoPhoto = article.cargoPhoto;
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
          editArticle.cargoPhoto = [...editArticle.cargoPhoto, ...photos];
        }
        if (
          !article.car &&
          !article.car.typesCar &&
          !article.car.name &&
          !article.car.photo
        )
          return res.status(422).json({ error: true, errorType: "carInfo" });

        editArticle.car = {};
        editArticle.car.typesCar = article.car.typesCar;
        editArticle.car.name = article.car.name;
        editArticle.car.property = article.car.property;
        editArticle.car.additionally = article.car.additionally;
        editArticle.car.info = article.car.info;
        editArticle.car.contractInfo = article.car.contractInfo;
        editArticle.car.paymentInfo = article.car.paymentInfo;
        editArticle.car.photo = article.car.photo;
        if (article.type === "offer") {
          if (req.files && req.files["carPhoto"]) {
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
              editArticle.car.photo = {
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

        editArticle.comment = article.comment;
        editArticle.budget = article.budget;
        // let tripPointFrom = false;
        if (!article.from)
          return res.status(422).json({ error: true, errorType: "from" });
        editArticle.from = article.from;
        if (article.from.data.geo_lat && article.from.data.geo_lon)
          editArticle.fromLocation = {
            type: "Point",
            coordinates: [article.from.data.geo_lat, article.from.data.geo_lon],
          };
        if (!article.to)
          return res.status(422).json({ error: true, errorType: "to" });
        editArticle.to = article.to;
        if (article.to.data.geo_lat && article.to.data.geo_lon)
          editArticle.toLocation = {
            type: "Point",
            coordinates: [article.to.data.geo_lat, article.to.data.geo_lon],
          };
        if (article.startDate && article.startDate.date) {
          article.startDate.date = new Date(article.startDate.date);
          article.startDate.date.setHours(0, 0, 0, 0);
          editArticle.startDate.date = article.startDate.date;
        } else {
          editArticle.startDate.date = null;
        }
        if (article.startDate && article.startDate.timeFrom) {
          editArticle.startDate.timeFrom = new Date(article.startDate.timeFrom);
        } else editArticle.startDate.timeFrom = null;
        if (article.startDate && article.startDate.timeTo) {
          editArticle.startDate.timeTo = new Date(article.startDate.timeTo);
        } else editArticle.startDate.timeTo = null;
        await editArticle.save();
        editMyArticle({
          userId: user._id,
          socketId,
          status: editArticle.status,
          article: editArticle,
        });
      } else
        return res
          .status(422)
          .json({ error: true, errorType: "NotFoundArticles" });
      return res.json({ error: false, article: editArticle });
    } catch (e) {
      return next(new Error(e));
    }
  },
  deleteArticle: async (req, res, next) => {
    const { user } = res.locals;
    let { articleId } = req.body;
    const { socketId } = req.body;
    try {
      let article = await Article.findById(articleId).populate([
        {
          path: "author",
        },
        {
          path: "executors",
        },
        {
          path: "reviews",
          populate: [{ path: "user" }, { path: "author" }],
        },
        {
          path: "requests",
          populate: {
            path: "author",
          },
        },
      ]);
      let lastStatus = article.status;
      if (article && compareId(user._id, article.author._id)) {
        if (article.status === 1 || article.status === 2) {
          article.status = 7;
          await article.save();
          updateStatusMyArticle({
            userId: user._id,
            socketId,
            lastStatus,
            article,
          });
          return res.json({ error: false });
        }
      }
      return res.status(422).json({
        error: true,
        errors: [
          {
            param: "notRole",
            msg:
              (user.type === "cargo" ? "Этот заказ" : "Это предложение") +
              " не может быть удалено",
          },
        ],
      });
    } catch (e) {
      return next(new Error(e));
    }
  },
  publicArticle: async (req, res, next) => {
    const { user } = res.locals;
    let { articleId } = req.body;
    const { socketId } = req.body;
    try {
      let article = await Article.findById(articleId).populate([
        {
          path: "author",
        },
        {
          path: "executors",
        },
        {
          path: "reviews",
          populate: [{ path: "user" }, { path: "author" }],
        },
        {
          path: "requests",
          populate: {
            path: "author",
          },
        },
      ]);
      if (article && compareId(user._id, article.author._id)) {
        if (article.status === 1) {
          article.status = 2;
          await article.save();
          updateStatusMyArticle({
            userId: user._id,
            socketId,
            lastStatus: 1,
            article,
          });
          return res.json({ error: false });
        }
      }
      return res.status(422).json({
        error: true,
        errors: [
          {
            param: "notRole",
            msg:
              (user.type === "cargo" ? "Этот заказ" : "Это предложение") +
              " не может быть опубликовано",
          },
        ],
      });
    } catch (e) {
      return next(new Error(e));
    }
  },
  onWayArticle: async (req, res, next) => {
    const { user } = res.locals;
    let { articleId } = req.body;
    const { socketId } = req.body;
    try {
      let article = await Article.findById(articleId).populate([
        {
          path: "author",
        },
        {
          path: "executors",
        },
        {
          path: "reviews",
          populate: [{ path: "user" }, { path: "author" }],
        },
        {
          path: "requests",
          populate: {
            path: "author",
          },
        },
      ]);
      if (
        article &&
        user.type === "carrier" &&
        (compareId(user._id, article.author._id) ||
          article.executors.find((item) => compareId(item._id, user._id)))
      ) {
        if (article.status === 3) {
          article.status = 4;
          await article.save();
          article.executors.map((item) => {
            updateStatusMyArticle({
              userId: item._id,
              socketId,
              lastStatus: 3,
              article,
              isTaking: true,
            });
            createNotify(
              item,
              {
                articleType: article.type,
                articleId: article.articleId,
                articleStatus: article.status,
              },
              "ARTICLE_CHANGE_STATUS",
              article.type
            );
          });
          updateStatusMyArticle({
            userId: article.author._id,
            socketId,
            lastStatus: 3,
            article,
          });
          return res.json({ error: false });
        }
      }
      return res.status(422).json({
        error: true,
        errors: [
          {
            param: "notRole",
            msg:
              (user.type === "cargo" ? "Этот заказ" : "Это предложение") +
              " не может быть переведен в стутус В пути",
          },
        ],
      });
    } catch (e) {
      return next(new Error(e));
    }
  },
  completeArticle: async (req, res, next) => {
    const { user } = res.locals;
    let { articleId } = req.body;
    const { socketId } = req.body;
    try {
      let article = await Article.findById(articleId).populate([
        {
          path: "author",
        },
        {
          path: "executors",
        },
        {
          path: "reviews",
          populate: [{ path: "user" }, { path: "author" }],
        },
        {
          path: "requests",
          populate: {
            path: "author",
          },
        },
      ]);
      if (article && compareId(user._id, article.author._id)) {
        if (article.status === 4) {
          article.status = 5;
          await article.save();
          article.executors.map((item) => {
            updateStatusMyArticle({
              userId: item._id,
              socketId,
              lastStatus: 4,
              article,
              isTaking: true,
            });
            createNotify(
              item,
              {
                articleType: article.type,
                articleId: article.articleId,
                articleStatus: article.status,
              },
              "ARTICLE_CHANGE_STATUS",
              article.type
            );
          });
          updateStatusMyArticle({
            userId: article.author._id,
            socketId,
            lastStatus: 4,
            article,
          });
          return res.json({ error: false });
        }
      }
      return res.status(422).json({
        error: true,
        errors: [
          {
            param: "notRole",
            msg:
              (user.type === "cargo" ? "Этот заказ" : "Это предложение") +
              " не может быть переведен в стутус В пути",
          },
        ],
      });
    } catch (e) {
      return next(new Error(e));
    }
  },
  cancelArticle: async (req, res, next) => {
    const { user } = res.locals;
    let { articleId } = req.body;
    const { socketId } = req.body;
    try {
      let article = await Article.findById(articleId).populate([
        {
          path: "author",
        },
        {
          path: "executors",
        },
        {
          path: "reviews",
          populate: [{ path: "user" }, { path: "author" }],
        },
        {
          path: "requests",
          populate: {
            path: "author",
          },
        },
      ]);
      if (article && compareId(user._id, article.author._id)) {
        if (article.status === 4) {
          article.status = 6;
          await article.save();
          article.executors.map((item) => {
            updateStatusMyArticle({
              userId: item._id,
              socketId,
              lastStatus: 4,
              status: 6,
              article,
              isTaking: true,
            });
            createNotify(
              item,
              {
                articleType: article.type,
                articleId: article.articleId,
                articleStatus: article.status,
              },
              "ARTICLE_CHANGE_STATUS",
              article.type
            );
          });
          updateStatusMyArticle({
            userId: article.author._id,
            socketId,
            lastStatus: 4,
            article,
          });

          return res.json({ error: false });
        }
      }
      return res.status(422).json({
        error: true,
        errors: [
          {
            param: "notRole",
            msg:
              (user.type === "cargo" ? "Этот заказ" : "Это предложение") +
              " не может быть переведен в стутус В пути",
          },
        ],
      });
    } catch (e) {
      return next(new Error(e));
    }
  },
  draftArticle: async (req, res, next) => {
    const { user } = res.locals;
    let { articleId } = req.body;
    const { socketId } = req.body;
    try {
      let article = await Article.findById(articleId).populate([
        {
          path: "author",
        },
        {
          path: "executors",
        },
        {
          path: "reviews",
          populate: [{ path: "user" }, { path: "author" }],
        },
        {
          path: "requests",
          populate: {
            path: "author",
          },
        },
      ]);
      if (article && compareId(user._id, article.author._id)) {
        let lastStatus = article.status;
        if (lastStatus === 2 || lastStatus === 7) {
          article.status = 1;
          await article.save();
          updateStatusMyArticle({
            userId: user._id,
            socketId,
            lastStatus,
            article,
          });
          return res.json({ error: false });
        }
      }
      return res.status(422).json({
        error: true,
        errors: [
          {
            param: "notRole",
            msg:
              (user.type === "cargo" ? "Этот заказ" : "Это предложение") +
              " не может быть перенесено в черновик",
          },
        ],
      });
    } catch (e) {
      return next(new Error(e));
    }
  },
  restoreArticle: async (req, res, next) => {
    const { user } = res.locals;
    let { articleId } = req.body;
    const { socketId } = req.body;
    try {
      let article = await Article.findById(articleId).populate([
        {
          path: "author",
        },
        {
          path: "executors",
        },
        {
          path: "reviews",
          populate: [{ path: "user" }, { path: "author" }],
        },
        {
          path: "requests",
          populate: {
            path: "author",
          },
        },
      ]);
      if (article && compareId(user._id, article.author._id)) {
        if (article.status === 7) {
          article.status = 1;
          await article.save();
          updateStatusMyArticle({
            userId: user._id,
            socketId,
            lastStatus: 7,
            article,
          });
          return res.json({ error: false });
        }
      }
      return res.status(422).json({
        error: true,
        errors: [
          {
            param: "notRole",
            msg:
              (user.type === "cargo" ? "Этот заказ" : "Это предложение") +
              " не может быть восстановлено",
          },
        ],
      });
    } catch (e) {
      return next(new Error(e));
    }
  },
  //Укомплектовано
  equipArticle: async (req, res, next) => {
    const { user } = res.locals;
    const { socketId } = req.body;
    let { articleId } = req.body;
    try {
      let article = await Article.findById(articleId).populate([
        {
          path: "author",
        },
        {
          path: "executors",
        },
        {
          path: "reviews",
          populate: [{ path: "user" }, { path: "author" }],
        },
        {
          path: "requests",
          populate: {
            path: "author",
          },
        },
      ]);
      if (article && compareId(user._id, article.author._id)) {
        if (article && article.type === "offer" && !!article.executors.length) {
          article.status = 3;
          await article.save();
          //SOKETS
          article.executors.map((item) => {
            createTakingArticle({
              userId: item._id,
              article: article,
            });
          });
          updateStatusMyArticle({
            userId: article.author._id,
            socketId,
            lastStatus: 2,
            article,
          });
          article.executors.map((item) => {
            createNotify(
              item,
              {
                articleType: article.type,
                articleId: article.articleId,
                articleStatus: article.status,
              },
              "ARTICLE_CHANGE_STATUS",
              article.type
            );
          });
          return res.json({ error: false });
        }
      }
      return res.status(422).json({
        error: true,
        errors: [
          {
            param: "notRole",
            msg: "Нельзя перевести это предложение в статус укомплектовано",
          },
        ],
      });
    } catch (e) {
      return next(new Error(e));
    }
  },
  //REQUESTS FUNCTION
  createRequest: async (req, res, next) => {
    const { user } = res.locals;
    let { articleId, request, socketId } = req.body;
    try {
      let article = await Article.findById(articleId).populate("requests");
      if (article && article.status === 2) {
        let canType;
        if (user.type === "cargo") canType = "offer";
        if (user.type === "carrier") canType = "order";
        let canRequest =
          !compareId(user._id, article.author._id) &&
          article.type === canType &&
          !article.requests.find((item) => item.author === user._id);
        if (canRequest) {
          let newRequest = new Request();
          newRequest.author = user;
          newRequest.comment = request.comment;
          newRequest.date = new Date(request.date);
          if (request.timeFrom)
            newRequest.timeFrom = new Date(request.timeFrom);
          if (request.timeTo) newRequest.timeTo = new Date(request.timeTo);
          if (request.budget) newRequest.budget = Number(request.budget);
          await newRequest.save();
          article.requests.push(newRequest._id);
          await article.save();
          //Сокет создания заявки
          createRequestSoket({
            article,
            request: newRequest,
            userId: article.author._id,
            socketId,
          });
          createNotify(
            article.author,
            { articleType: article.type, articleId: article.articleId },
            "ARTICLE_NEW_REQUEST",
            article.type
          );
          return res.json({ error: false, request: newRequest });
        } else
          return res.status(422).json({
            error: true,
            errors: [{ param: "typeUser", msg: "Неверный тип пользователя" }],
          });
      } else
        return res.status(422).json({
          error: true,
          errors: [{ param: "notFound", msg: "Нет такого заказа/предложения" }],
        });
    } catch (e) {
      return next(new Error(e));
    }
  },
  updateRequest: async (req, res, next) => {
    const { user } = res.locals;
    let { requestId, request, socketId } = req.body;
    try {
      let article = await Article.findOne({ requests: requestId });
      if (article && article.status === 2) {
        let editRequest = await Request.findById(requestId).populate("author");
        if (editRequest && compareId(user._id, editRequest.author._id)) {
          editRequest.comment = request.comment;
          editRequest.date = new Date(request.date);
          if (request.timeFrom)
            editRequest.timeFrom = new Date(request.timeFrom);
          if (request.timeTo) editRequest.timeTo = new Date(request.timeTo);
          if (request.budget) editRequest.budget = Number(request.budget);
          await editRequest.save();
          updateRequestSoket({
            article,
            request: editRequest,
            userId: article.author._id,
            socketId,
          });
          return res.json({ error: false, request: editRequest });
        } else
          return res.status(422).json({
            error: true,
            errors: [
              {
                param: "notRole",
                msg: "Вы не можете редактировать этот отклик",
              },
            ],
          });
      } else
        return res.status(422).json({
          error: true,
          errors: [
            {
              param: "notRole",
              msg: "Вы не можете редактировать этот отклик",
            },
          ],
        });
    } catch (e) {
      return next(new Error(e));
    }
  },
  deleteRequest: async (req, res, next) => {
    const { user } = res.locals;
    let { requestId, socketId } = req.body;
    try {
      let article = await Article.findOne({ requests: requestId });
      if (article && article.status === 2) {
        let removingRequest = await Request.findById(requestId);
        let author = removingRequest.author;
        let reqId;
        if (
          removingRequest &&
          !article.executors.find((item) =>
            compareId(item, removingRequest.author)
          ) &&
          compareId(user._id, removingRequest.author)
        ) {
          reqId = removingRequest._id;
          await removingRequest.remove();
          deleteRequestSoket({
            article,
            requestId: reqId,
            userId: article.author,
            otherId: author,
            socketId,
          });
          return res.json({ error: false });
        }
      }
      return res.status(422).json({
        error: true,
        errors: [
          {
            param: "notRole",
            msg: "Вы не можете отозвать этот отклик",
          },
        ],
      });
    } catch (e) {
      return next(new Error(e));
    }
  },
  setExecutor: async (req, res, next) => {
    const { user } = res.locals;
    let { executorId, articleId } = req.body;
    const { socketId } = req.body;
    try {
      let article = await Article.findById(articleId).populate([
        {
          path: "author",
        },
        {
          path: "executors",
        },
        {
          path: "reviews",
          populate: [{ path: "user" }, { path: "author" }],
        },
        {
          path: "requests",
          populate: {
            path: "author",
          },
        },
      ]);
      let executor = await User.findById(executorId);
      if (
        article &&
        article.status === 2 &&
        compareId(article.author._id, user._id) &&
        executor
      ) {
        let lastStatus = article.status;
        if (article.type === "offer" && executor.type === "cargo") {
          article.executors.push(executor);
          await article.save();
          createNotify(
            executor._id,
            {
              articleType: article.type,
              articleId: article.articleId,
            },
            "ARTICLE_SET_EXECUTOR",
            article.type
          );
        }
        if (article.type === "order" && executor.type === "carrier") {
          article.executors.push(executor);
          article.status = 3;
          await article.save();
          createNotify(
            executor._id,
            {
              articleType: article.type,
              articleId: article.articleId,
              articleStatus: article.status,
            },
            "ARTICLE_CHANGE_STATUS",
            article.type
          );
          //SOKET
          createTakingArticle({
            userId: executor._id,
            article: article,
          });
          updateStatusMyArticle({
            userId: user._id,
            socketId,
            lastStatus: 2,
            article,
          });
          //SOKET
        }
        setExecutor({
          article,
          executor,
          lastStatus: lastStatus,
          userId: article.author._id,
          socketId,
        });
        return res.json({ error: false, article, executor });
      }
      return res.status(422).json({
        error: true,
        errors: [
          {
            param: "notRole",
            msg: "Вы не можете выбрать этого исполнителя",
          },
        ],
      });
    } catch (e) {
      return next(new Error(e));
    }
  },
  deleteExecutor: async (req, res, next) => {
    const { user } = res.locals;
    let { executorId, articleId } = req.body;
    const { socketId } = req.body;
    try {
      let article = await Article.findById(articleId).populate([
        {
          path: "author",
        },
        {
          path: "executors",
        },
        {
          path: "reviews",
          populate: [{ path: "user" }, { path: "author" }],
        },
        {
          path: "requests",
          populate: {
            path: "author",
          },
        },
      ]);
      let executor = await User.findById(executorId);
      if (
        article &&
        (article.status === 2 || article.status === 3) &&
        compareId(article.author._id, user._id) &&
        executor
      ) {
        let lastStatus = article.status;
        article.executors = article.executors.filter(
          (item) => !compareId(item._id, executor._id)
        );
        if (article.status === 3)
          deleteTaking({
            userId: executor._id,
            socketId,
            lastStatus: article.status,
            articleID: article._id,
          });
        if (!article.executors.length) {
          article.status = 2;
          // updateStatusMyArticle({
          //   userId: user._id,
          //   socketId,
          //   lastStatus: lastStatus,
          //   article,
          // });
        }
        await article.save();
        //УДаление Из  исполнителей SOKET
        deleteExecutorSoket({
          article,
          executor,
          lastStatus: lastStatus,
          userId: article.author._id,
          socketId,
        });
        createNotify(
          executor,
          {
            articleType: article.type,
            articleId: article.articleId,
          },
          "ARTICLE_DELETE_EXECUTOR",
          article.type
        );
        return res.json({ error: false, article, executor });
      }
      return res.status(422).json({
        error: true,
        errors: [
          {
            param: "notRole",
            msg: "Вы не можете отказаться от этого исполнителя",
          },
        ],
      });
    } catch (e) {
      return next(new Error(e));
    }
  },
  saveReview: async (req, res, next) => {
    const { user } = res.locals;
    let { review, orderId, userId } = req.body;
    const { socketId } = req.body;
    try {
      let article = await Article.findById(orderId).populate([
        {
          path: "author",
        },
        {
          path: "executors",
        },
        {
          path: "reviews",
          populate: [{ path: "user" }, { path: "author" }],
        },
        {
          path: "requests",
          populate: {
            path: "author",
          },
        },
      ]);
      let canDoReview = !article.reviews.find((item) => {
        return item.author === user._id && item.user === userId;
      });
      if (
        canDoReview &&
        ((article && article.status === 5) || article.status === 6)
      ) {
        let isAuhor = compareId(article.author._id, userId);
        let isExecutor = !!article.executors.find((item) =>
          compareId(item._id, userId)
        );
        let isDoAuhor = compareId(article.author._id, user._id);
        let isDoExecutor = !!article.executors.find((item) =>
          compareId(item._id, user._id)
        );
        if ((isExecutor && isDoAuhor) || (isAuhor && isDoExecutor)) {
          let newReview;
          let existReview = false;
          if (review._id) {
            newReview = await Review.findById(review._id).populate([
              { path: "user" },
              { path: "author" },
              { path: "order" },
            ]);
            existReview = true;
          } else newReview = new Review();
          let userTo = await User.findById(userId);
          if (!!newReview) {
            newReview.comment = review.comment;
            newReview.user = userTo;
            newReview.order = article;
            newReview.author = user;
            newReview.rating = review.rating;
            await newReview.save();
            //Перерасчет рейтинга
            let allReviews = await Review.find({
              user: userTo._id,
            });
            let sum = allReviews
              .map((item) => item.rating)
              .reduce(function(accumulator, current) {
                return accumulator + current;
              });
            let rating = sum / allReviews.length;
            userTo.rating = rating;
            await userTo.save();
            //Перерасчет рейтинга
            if (existReview) {
              let reviewsNew = [];
              for (let index = 0; index < article.reviews.length; index++) {
                if (compareId(article.reviews[index], newReview._id))
                  reviewsNew.push(newReview._id);
                else reviewsNew.push(article.reviews[index]);
              }
              article.reviews = reviewsNew;

              updateArticleReview({
                article,
                newReview,
                myUser: compareId(article.author._id, newReview.author._id)
                  ? newReview.user._id
                  : newReview.author._id,
                takingUser: compareId(article.author._id, newReview.author._id)
                  ? newReview.author._id
                  : newReview.user._id,
                socketId,
              });
            } else {
              article.reviews = [...article.reviews, newReview._id];
              createArticleReview({
                article,
                newReview,
                userId: newReview.author._id,
                otherId: newReview.user._id,
                socketId,
              });
              createNotify(
                newReview.user._id,
                {
                  articleType: article.type,
                  articleId: article.articleId,
                },
                "ARTICLE_SET_REVIEW",
                article.type
              );
            }
            await article.save();
            return res.json({ error: false, newReview, existReview });
          }
        }
      }
      return res.status(422).json({
        error: true,
        errors: [
          {
            param: "notRole",
            msg: "Невозможно оставить отзыв",
          },
        ],
      });
    } catch (e) {
      return next(new Error(e));
    }
  },
  setDeliveredCargo: async (req, res, next) => {
    const { user } = res.locals;
    let { articleId, deliveredUser } = req.body;
    const { socketId } = req.body;
    try {
      if (user.type === "carrier") {
        let article = await Article.findOne({
          _id: articleId,
          $or: [{ author: deliveredUser }, { executors: deliveredUser }],
        });
        if (article) {
          article.delivered.push(deliveredUser);
          // article.save();
          setDelivered({
            article,
            user: deliveredUser,
            userId: user._id,
            otherId: deliveredUser,
            socketId,
          });
          return res.json({ error: false });
        }
      }
      return res.status(422).json({
        error: true,
        errors: [
          {
            param: "notRole",
            msg: "Невозможно оставить отзыв",
          },
        ],
      });
    } catch (e) {
      return next(new Error(e));
    }
  },
  setRequestCancel: async (req, res, next) => {
    const { user } = res.locals;
    let { articleId, deliveredUser } = req.body;
    try {
      let article = await Article.findOne({
        _id: articleId,
        executors: deliveredUser,
      });
      let user = await User.findById(deliveredUser);
      if (article && user) {
        createNotify(
          article.author,
          {
            articleType: article.type,
            articleId: article.articleId,
            userFio: user.name.last + " " + user.name.first,
            userType: user.type,
          },
          "ARTICLE_REQUEST_CANCEL",
          article.type
        );
        return res.json({ error: false });
      }
      return res.status(422).json({
        error: true,
        errors: [
          {
            param: "notRole",
            msg: "Невозможно запросить отмену",
          },
        ],
      });
    } catch (e) {
      return next(new Error(e));
    }
  },
};

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
function compareId(id1, id2) {
  return String(id1) === String(id2);
}

async function createNotify(user, info, code, type) {
  return new Promise(async (resolve, reject) => {
    let notification = new Notification();
    notification.user = user;
    notification.info = info;
    notification.code = code;
    notification.type = type;
    await notification.save();
    sendNotification({ userId: user._id, notification });
    resolve();
  });
}
