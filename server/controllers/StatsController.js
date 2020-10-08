const User = require("../models/User");
const Article = require("../models/Article");
const Payment = require("../models/Payment");
const Notification = require("../models/Notification");
const excel = require("exceljs");
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
  getExelUser: async (req, res, next) => {
    try {
      let workbook = new excel.Workbook(); //creating workbook
      let worksheet = workbook.addWorksheet("Customers");
      let users = await User.aggregate([
        {
          $addFields: {
            namelast: "$name.last",
            namefirst: "$name.first",
            namemiddle: "$name.middle",
            userType: {
              $cond: {
                if: { $eq: ["$type", "cargo"] },
                then: "Грузовладелец",
                else: "Перевозчик",
              },
            },
          },
        },
      ]);
      worksheet.columns = [
        { header: "Id", key: "_id", width: 10 },
        { header: "Фамилия", key: "namelast", width: 30 },
        { header: "Имя", key: "namefirst", width: 30 },
        { header: "Отчество", key: "namemiddle", width: 30 },
        { header: "Телефон", key: "phone", width: 40 },
        { header: "Тип Пользователя", key: "userType", width: 30 },
        { header: "Адрес", key: "address", width: 30 },
        { header: "E-mail", key: "email", width: 30, outlineLevel: 1 },
      ];
      worksheet.addRows(users);
      workbook.xlsx.writeFile("./uploads/exel/users.xlsx");
      return res.json({ href: "/media/exel/users.xlsx" });
    } catch (e) {}
  },
  getUsers: async (req, res, next) => {
    try {
      let userCargo = await User.find({ type: "cargo" }).count();
      let userCarrier = await User.find({ type: "carrier" }).count();
      let userBanCargo = await User.find({
        type: "cargo",
        isBan: true,
      }).count();
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
    } catch (e) {}
  },
  getRegister: async (req, res, next) => {
    let { year } = req.body;
    try {
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
    } catch (e) {}
  },
  getArticles: async (req, res, next) => {
    try {
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
    } catch (e) {}
  },
  getTariffs: async (req, res, next) => {
    try {
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
      let sums = await Payment.aggregate([
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
            _id: "$tariff.di",
            sum: {
              $sum: {
                $multiply: [
                  "$tariff.price",
                  {
                    $cond: {
                      if: { $eq: ["$tariff.discount", 0] },
                      then: 1,
                      else: { $subtract: [100, "$tariff.discount"] },
                    },
                  },
                  {
                    $cond: {
                      if: { $eq: ["$tariff.discount", 0] },
                      then: 1,
                      else: 0.01,
                    },
                  },
                ],
              },
            },
          },
        },
      ]);
      sums = (sums && !!sums.length && sums[0].sum) || 0;
      tariffs = tariffs.map((item) => {
        return {
          name: item._id + " " + item.duration,
          Пользователи: item.count || 0,
        };
      });
      return res.json({ tariffs, sums });
    } catch (e) {}
  },
  getCreatedArticles: async (req, res, next) => {
    let { year } = req.body;
    try {
      let articles = await Article.aggregate([
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

      articles = articles.map((item) => {
        let order = item.info.find((item) => item.type === "order");
        let offer = item.info.find((item) => item.type === "offer");
        return {
          name: months[item._id.month - 1],
          Заказы: (order && order.count) || 0,
          Предложения: (offer && offer.count) || 0,
        };
      });
      return res.json(articles);
    } catch (e) {}
  },
  getNotifications: async (req, res, next) => {
    try {
      let notificationsOther = await Notification.aggregate([
        {
          $match: {
            code: "SYSTEM_NOTIFY",
            "info.typeSender": { $ne: "user" },
          },
        },
        {
          $group: {
            _id: {
              commentNotify: "$info.commentNotify",
              typeSender: "$info.typeSender",
            },
            createdAt: { $first: "$createdAt" },
          },
        },
      ]);
      let notificationsUser = await Notification.aggregate([
        {
          $match: {
            code: "SYSTEM_NOTIFY",
            "info.typeSender": "user",
          },
        },
        {
          $project: {
            _id: {
              commentNotify: "$info.commentNotify",
              typeSender: "$info.typeSender",
            },
            userName: "$info.userName",
            createdAt: "$createdAt",
          },
        },
      ]);
      let notifications = [...notificationsUser, ...notificationsOther]
        .sort((a, b) => {
          return a.createdAt - b.createdAt;
        })
        .slice(0, 20);
      return res.json(notifications);
    } catch (e) {}
  },
};
