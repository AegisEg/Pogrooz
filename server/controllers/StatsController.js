const User = require("../models/User");
const Article = require("../models/Article");
const Payment = require("../models/Payment");
const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
const statuses = [
  "Черновик",
  "Опубликован",
  "В работе",
  "В пути",
  "Завершен",
  "Отменен",
  "Корзина",
];
module.exports = {
  getUsers: async (req, res, next) => {
    let userCargo = await User.find({ type: "cargo" }).count();
    let userCarrier = await User.find({ type: "carrier" }).count();
    let userBanCargo = await User.find({ type: "cargo", isBan: true }).count();
    let userBanCarrier = await User.find({
      type: "carrier",
      isBan: true,
    }).count();
    let userCarrierTarrifEmpty = await User.find({
      type: "carrier",
      isTarriffEmpty: true,
    }).count();
    let userAllCount = await User.find().count();
    return res.json({
      userAllCount,
      usersDate: [
        {
          name: "По типу",
          Грузовладельцы: userCargo,
          Перевозчики: userCarrier,
        },
        {
          name: "Заблокированные",
          Грузовладельцы: userBanCargo,
          Перевозчики: userBanCarrier,
        },
        {
          name: "Без тарифа",
          Перевозчики: userCarrierTarrifEmpty,
        },
      ],
    });
  },
  getRegister: async (req, res, next) => {
    let { year } = req.body;
    let user = await User.aggregate([
      { $addFields: { year: { $year: "$createdAt" } } },
      {
        $match: {
          year: year,
        },
      },
      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },
            type: "$type",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: {
            month: "$_id.month",
          },
          info: {
            $push: {
              type: "$_id.type",
              count: "$count",
            },
          },
        },
      },
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    user = user.map((item) => {
      let carrier = item.info.find((item) => item.type === "carrier");
      let cargo = item.info.find((item) => item.type === "cargo");
      return {
        name: months[item._id.month - 1],
        Перевозчики: (carrier && carrier.count) || 0,
        Грузовладельцы: (cargo && cargo.count) || 0,
      };
    });
    return res.json(user);
  },
  getArticles: async (req, res, next) => {
    let articles = await Article.aggregate([
      {
        $group: {
          _id: {
            status: "$status",
            type: "$type",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: {
            status: "$_id.status",
          },
          info: {
            $push: {
              type: "$_id.type",
              count: "$count",
            },
          },
        },
      },
      {
        $sort: {
          "_id.status": 1,
        },
      },
    ]);
    articles = articles.map((item) => {
      let offer = item.info.find((item) => item.type === "offer");
      let order = item.info.find((item) => item.type === "order");
      return {
        name: statuses[item._id.status - 1],
        Предложения: (offer && offer.count) || 0,
        Заказы: (order && order.count) || 0,
      };
    });
    return res.json(articles);
  },
  getTariffs: async (req, res, next) => {
    let tariffs = await Payment.aggregate([
      {
        $match: {
          tariff: { $ne: null },
          status: "success",
          expiriesAt: { $gte: new Date() },
          startedAt: { $lte: new Date() },
        },
      },
      {
        $lookup: {
          from: "tariffs",
          localField: "tariff",
          foreignField: "_id",
          as: "tariff",
        },
      },
      {
        $unwind: "$tariff",
      },
      {
        $group: {
          _id: {
            tariff: "$tariff._id",
          },
          tariff: { $first: "$tariff" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: "$tariff.name",
          duration: "$tariff.duration",
          count: "$count",
        },
      },
    ]);
    tariffs = tariffs.map((item) => {
      return {
        name: item._id + " " + item.duration,
        Пользователи: item.count || 0,
      };
    });
    return res.json(tariffs);
  },
};
