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
  setLocationSoket,
  updateStatusArticle,
} = require("./SocketController");
const Article = require("../models/Article");
const Request = require("../models/Request");
const Notification = require("../models/Notification");
const User = require("../models/User");
const Review = require("../models/Review");
const { isNeedLocation } = require("../controllers/AuthController");
const { Error, Mongoose } = require("mongoose");
let { randomString } = require("../controllers/FileController");
const mail = require("../config/mail");
let { sendMail } = require("../controllers/MailController");
let count = 6;
let reviewsCount = 10;
var ObjectId = require("mongoose").Types.ObjectId;
module.exports = {
  //Articles Geting
  getUserArticles: async (req, res, next) => {
    let { filter, page } = req.body;
    if (filter.author) filter.author = new ObjectId(filter.author);
    try {
      let articles = await Article.aggregate([
        {
          $match: { ...filter },
        },
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "author",
          },
        },
        { $unwind: "$author" },
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
      ]);
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
  getArticles: async (req, res, next) => {
    let { filter, page, sortBy } = req.body;
    let geoNear = false;
    let match = {};
    let addFields = false;
    let sort = { createdAt: -1 };
    // let timeFrom = false;
    // let timeTo = false;

    try {
      if (filter.type) match.type = filter.type;
      if (filter.status) match.status = filter.status;
      if (filter.from) {
        if (filter.from.data.city_fias_id)
          match = {
            ...match,
            "from.data.city_fias_id": filter.from.data.city_fias_id,
          };
        if (
          filter.type === "order" &&
          !!filter.from.data.geo_lat &&
          !!filter.from.data.geo_lon
        )
          geoNear = {
            $geoNear: {
              near: {
                type: "Point",
                coordinates: [
                  Number(filter.from.data.geo_lon),
                  Number(filter.from.data.geo_lat),
                ],
              },
              key: "fromLocation",
              distanceField: "Distance",
              spherical: true,
            },
          };
        else {
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
        }
      }
      if (filter.to) {
        if (filter.to.data.city_fias_id)
          match = {
            ...match,
            "to.data.city_fias_id": filter.to.data.city_fias_id,
          };
        if (
          !geoNear &&
          filter.type === "offer" &&
          !!filter.to.data.geo_lat &&
          !!filter.to.data.geo_lon
        ) {
          geoNear = {
            $geoNear: {
              near: {
                type: "Point",
                coordinates: [
                  Number(filter.to.data.geo_lon),
                  Number(filter.to.data.geo_lat),
                ],
              },
              key: "toLocation",
              distanceField: "Distance",
              spherical: true,
            },
          };
        } else {
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
        }
      }
      //Груз
      if (filter.cargoType) match.cargoTypes = filter.cargoType;
      //Машина
      if (filter.carType) match = { ...match, "car.typesCar": filter.carType };
      if (filter.property)
        match = { ...match, "car.property": filter.property };
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
        {
          $lookup: {
            from: "payments",
            localField: "author._id",
            foreignField: "userId",
            as: "payments",
          },
        },
        {
          $addFields: {
            isTariff: {
              $size: {
                $filter: {
                  input: "$payments",
                  as: "payment",
                  cond: {
                    $and: [
                      { $eq: ["$$payment.status", "success"] },
                      { $gte: ["$$payment.expiriesAt", new Date()] },
                    ],
                  },
                },
              },
            },
          },
        },
        { $unset: "payments" },
        {
          $match: {
            $or: [{ isTariff: { $gt: 0 } }, { "author.type": "cargo" }],
            "author.isBan": { $ne: true },
          },
        },
      ];
      if (addFields) aggregate.push({ $addFields: addFields });
      if (filter.rating) {
        aggregate.push({
          $match: { "author.rating": { $gte: parseInt(filter.rating) } },
        });
        sort.rating = 1;
      }
      if (geoNear) {
        aggregate.unshift(geoNear);
        sort.Distance = 1;
      }
      if (Object.keys(sort).length > 1) delete sort.createdAt;
      if (sortBy && !!Object.keys(sortBy).length) sort = sortBy;
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
            .populate("author")
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
            .populate("author")
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
          newArticle.cargoPhoto = photos;
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
            coordinates: [article.from.data.geo_lon, article.from.data.geo_lat],
          };
        else
          newArticle.fromLocation = {
            type: "Point",
            coordinates: [0, 0],
          };
        if (!article.to)
          return res.status(422).json({ error: true, errorType: "to" });
        newArticle.to = article.to;
        if (article.to.data.geo_lat && article.to.data.geo_lon)
          newArticle.toLocation = {
            type: "Point",
            coordinates: [article.to.data.geo_lon, article.to.data.geo_lat],
          };
        else
          newArticle.toLocation = {
            type: "Point",
            coordinates: [0, 0],
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
        let job;
        if (newArticle.status === 2) {
          const agenda = require("../agenta/agenta");
          let dateExecute;
          if (newArticle.startDate.date)
            dateExecute = new Date(newArticle.startDate.date).addDays(1);
          if (!newArticle.startDate.date)
            dateExecute = new Date(newArticle.updatedAt).addDays(7);
          job = await agenda.schedule(dateExecute, "articleUnpublish", {
            articleId: newArticle._id,
          });
        }
        if (job) newArticle.jobId = job.attrs._id;
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
      })
        .populate("author")
        .populate("executors");
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
            coordinates: [article.from.data.geo_lon, article.from.data.geo_lat],
          };
        if (!article.to)
          return res.status(422).json({ error: true, errorType: "to" });
        editArticle.to = article.to;
        if (article.to.data.geo_lat && article.to.data.geo_lon)
          editArticle.toLocation = {
            type: "Point",
            coordinates: [article.to.data.geo_lon, article.to.data.geo_lat],
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
        editArticle.updatedAt = new Date();
        let job;
        if (editArticle.status === 2) {
          const agenda = require("../agenta/agenta");
          if (editArticle.jobId)
            await agenda.cancel({ _id: editArticle.jobId });
          let dateExecute;
          if (editArticle.startDate.date)
            dateExecute = new Date(editArticle.startDate.date).addDays(1);
          if (!editArticle.startDate.date)
            dateExecute = new Date(editArticle.updatedAt).addDays(7);
          job = await agenda.schedule(dateExecute, "articleUnpublish", {
            articleId: editArticle._id,
          });
        }
        if (job) editArticle.jobId = job.attrs._id;
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
          let job;
          //Задача на перенос в черновик
          const agenda = require("../agenta/agenta");
          if (article.jobId) await agenda.cancel({ _id: article.jobId });
          let dateExecute;
          if (article.startDate.date)
            dateExecute = new Date(article.startDate.date).addDays(1);
          if (!article.startDate.date) dateExecute = new Date().addDays(7);
          job = await agenda.schedule(dateExecute, "articleUnpublish", {
            articleId: article._id,
          });

          article.jobId = job.attrs._id;
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
              article.type,
              (article.type === "offer" &&
                item.notificationSettings.offer_status.push) ||
                (article.type === "order" &&
                  item.notificationSettings.order_status.push),
              (article.type === "offer" &&
                item.notificationSettings.offer_status.mail) ||
                (article.type === "order" &&
                  item.notificationSettings.order_status.mail)
            );
          });
          updateStatusMyArticle({
            userId: article.author._id,
            socketId,
            lastStatus: 3,
            article,
          });
          createNotify(
            article.author,
            {
              articleType: article.type,
              articleId: article.articleId,
              articleStatus: article.status,
            },
            "ARTICLE_CHANGE_STATUS",
            article.type,
            (article.type === "offer" &&
              article.author.notificationSettings.offer_status.push) ||
              (article.type === "order" &&
                article.author.notificationSettings.order_status.push),
            (article.type === "offer" &&
              article.author.notificationSettings.offer_status.mail) ||
              (article.type === "order" &&
                article.author.notificationSettings.order_status.mail)
          );
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
              article.type,
              (article.type === "offer" &&
                item.notificationSettings.offer_status.push) ||
                (article.type === "order" &&
                  item.notificationSettings.order_status.push),
              (article.type === "offer" &&
                item.notificationSettings.offer_status.mail) ||
                (article.type === "order" &&
                  item.notificationSettings.order_status.mail)
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
              article.type,
              (article.type === "offer" &&
                item.notificationSettings.offer_status.push) ||
                (article.type === "order" &&
                  item.notificationSettings.order_status.push),
              (article.type === "offer" &&
                item.notificationSettings.offer_status.mail) ||
                (article.type === "order" &&
                  item.notificationSettings.order_status.mail)
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
          const agenda = require("../agenta/agenta");
          if (article.jobId) await agenda.cancel({ _id: article.jobId });
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
              article.type,
              (article.type === "offer" &&
                item.notificationSettings.offer_status.push) ||
                (article.type === "order" &&
                  item.notificationSettings.order_status.push),
              (article.type === "offer" &&
                item.notificationSettings.offer_status.mail) ||
                (article.type === "order" &&
                  item.notificationSettings.order_status.mail)
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
          !article.requests.find((item) => compareId(item.author, user._id));

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
          let author = await User.findById(article.author);
          createNotify(
            article.author,
            { articleType: article.type, articleId: article.articleId },
            "ARTICLE_NEW_REQUEST",
            article.type,
            (author.type === "cargo" &&
              author.notificationSettings.order_new_request.push) ||
              (author.type === "carrier" &&
                author.notificationSettings.offer_new_request.push),
            (author.type === "cargo" &&
              author.notificationSettings.order_new_request.mail) ||
              (author.type === "carrier" &&
                author.notificationSettings.offer_new_request.mail)
          );
          return res.json({ error: false, request: newRequest });
        }
      }
      return res.status(422).json({
        error: true,
        errors: [{ param: "notFound", msg: "Невозможно оставить заявку" }],
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
            article.type,
            (executor.type === "cargo" &&
              executor.notificationSettings.offer_you_executor.push) ||
              (executor.type === "carrier" &&
                executor.notificationSettings.order_you_executor.push),
            (executor.type === "cargo" &&
              executor.notificationSettings.offer_you_executor.mail) ||
              (executor.type === "carrier" &&
                executor.notificationSettings.order_you_executor.mail)
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
            article.type,
            (article.type === "offer" &&
              executor.notificationSettings.offer_status.push) ||
              (article.type === "order" &&
                executor.notificationSettings.order_status.push),
            (article.type === "offer" &&
              executor.notificationSettings.offer_status.mail) ||
              (article.type === "order" &&
                executor.notificationSettings.order_status.mail)
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
        let executorX = await User.findById(executor);
        createNotify(
          executor,
          {
            articleType: article.type,
            articleId: article.articleId,
          },
          "ARTICLE_DELETE_EXECUTOR",
          article.type,
          (executorX.type === "cargo" &&
            executorX.notificationSettings.offer_you_executor.push) ||
            (executorX.type === "carrier" &&
              executorX.notificationSettings.order_you_executor.push),
          (executorX.type === "cargo" &&
            executorX.notificationSettings.offer_you_executor.mail) ||
            (executorX.type === "carrier" &&
              executorX.notificationSettings.order_you_executor.mail)
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
            let rating = parseFloat(sum / allReviews.length).toFixed(1);
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
                article.type,
                (article.type === "offer" &&
                  newReview.user.notificationSettings.offer_new_review.push) ||
                  (article.type === "order" &&
                    newReview.user.notificationSettings.order_new_review.push),
                (article.type === "offer" &&
                  newReview.user.notificationSettings.offer_new_review.mail) ||
                  (article.type === "order" &&
                    newReview.user.notificationSettings.order_new_review.mail)
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
          delivered: { $ne: deliveredUser },
        });
        if (article) {
          article.delivered.push(deliveredUser);
          await article.save();
          createNotify(
            deliveredUser,
            {
              articleType: article.type,
              articleId: article.articleId,
              articleStatus: 10,
            },
            "ARTICLE_CHANGE_STATUS",
            article.type,
            true,
            true
          );
          setDelivered({
            article,
            user: deliveredUser,
            userId: user._id,
            otherId: deliveredUser,
            socketId,
          });
          let needSendLocation = await isNeedLocation(user._id);
          return res.json({ error: false, isDisableGeo: !needSendLocation });
        }
      }
      return res.status(422).json({
        error: true,
        errors: [
          {
            param: "notDelivery",
            msg: "Невозможно сделать пометку доставлено",
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
  setLocation: async (req, res, next) => {
    const { user } = res.locals;
    let { position } = req.body;
    try {
      let article = await Article.find({
        $or: [{ executors: user._id }, { author: user._id }],
        status: 4,
      });
      article.map((item) => {
        item.lastCarrierLocation = {
          coordinates: position,
          date: new Date(),
        };
        item.save();
        if (item.author === user._id)
          item.executors.map((itemX) => {
            setLocationSoket({
              userId: itemX,
              articleId: item._id,
              location: item.lastCarrierLocation,
            });
          });
        else
          setLocationSoket({
            userId: item.author,
            articleId: item._id,
            location: item.lastCarrierLocation,
          });
      });
      return res.json({ error: false });
    } catch (e) {
      return next(new Error(e));
    }
  },
  getGeoArticles: async (req, res, next) => {
    const { user } = res.locals;
    try {
      let articles = await Article.find({
        $or: [{ executors: user._id }, { author: user._id }],
        status: 4,
        delivered: { $ne: user._id },
      });
      return res.json({ error: false, articles });
    } catch (e) {
      return next(new Error(e));
    }
  },
  offerCargoOrder: async (req, res, next) => {
    const { user } = res.locals;
    let { userId, orderId } = req.body;
    try {
      if (user.type === "cargo") {
        let userTo = await User.findById(userId);
        let article = await Article.findById(orderId);
        let notificationAlready = false;
        if (article)
          notificationAlready = await Notification.findOne({
            code: "ARTICLE_OFFERED_ORDER",
            "info.articleId": article.articleId,
          });
        if (
          !notificationAlready &&
          userTo.type === "carrier" &&
          userTo.isTariff &&
          !userTo.isBan &&
          article &&
          article.type === "order" &&
          article.status === 2
        ) {
          createNotify(
            userTo,
            {
              articleId: article.articleId,
              author: user._id,
              authorFIO: user.name.last + " " + user.name.first,
            },
            "ARTICLE_OFFERED_ORDER",
            "order"
          );
          return res.json({ error: false });
        }
      }
      return res.status(422).json({
        error: true,
        errors: [
          {
            param: "notRole",
            msg: "Невозможно предложить заказ",
          },
        ],
      });
    } catch (e) {
      return next(new Error(e));
    }
  },
  articleUnpulish: async (articleId) => {
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
    if (article.status === 2) {
      let compareDate;
      if (article.startDate.date)
        compareDate = new Date(article.startDate.date).addDays(1);
      if (!article.startDate.date)
        compareDate = new Date(article.updatedAt).addDays(7);
      if (compareDate < new Date()) {
        article.status = 1;
        updateStatusArticle({
          userId: article.author._id,
          lastStatus: 2,
          article,
        });
        await article.save();
        createNotify(
          article.author._id,
          {
            articleId: article.articleId,
            articleType: article.type,
          },
          "ARTICLE_UNPUBLISH",
          article.type
        );
      }
    }
  },
  requestGeolocation: async (req, res, next) => {
    let { articleId } = req.body;
    let { user } = res.locals;
    try {
      if (user.type === "cargo") {
        let article = await Article.findOne({
          _id: articleId,
          $or: [{ author: user._id }, { executors: user._id }],
        });
        if (article && article.status === 4) {
          let userTo = false;
          if (compareId(article.author, user._id))
            userTo = article.executors[0];
          else userTo = article.author;
          if (userTo)
            createNotify(
              userTo,
              {
                articleType: article.type,
                articleId: article.articleId,
                userFio: user.name.last + " " + user.name.first,
                userType: user.type,
              },
              "ARTICLE_REQUEST_GEOLOCATION",
              article.type
            );
          return res.json({ error: false });
        }
      }
      return res.status(422).json({
        error: true,
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

async function createNotify(
  user,
  info,
  code,
  type,
  isPushSong = true,
  isMail = true
) {
  return new Promise(async (resolve, reject) => {
    let notification = new Notification();
    notification.user = user;
    notification.info = info;
    notification.code = code;
    notification.type = type;

    if (isMail) {
      let mailTemplate = mail.find((item) => item.code === notification.code);
      if (mailTemplate) {
        user = await User.findById(user);
        sendMail(user.email, notification, mailTemplate);
      }
    }
    await notification.save();
    sendNotification({ userId: user._id, notification, isPushSong });
    resolve();
  });
}
