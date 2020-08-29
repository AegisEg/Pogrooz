let { randomString } = require("../controllers/FileController");
const carTemplate = require("../models/Car/carTemplate");
const Car = require("../models/Car/Car");
const { json } = require("body-parser");
module.exports = {
  // Register method
  createCarTemplate: async (req, res, next) => {
    const { user } = res.locals;
    let { car } = req.body;
    car = JSON.parse(car);
    try {
      if (user.type === "carrier") {
        let newCarTemplate = new carTemplate();
        newCarTemplate.car = {};
        if (!car.typesCar || !car.typesCar.length)
          return res.json({
            error: true,
            errors: [{ param: "dontTypes", msg: "Выберите тип машины" }],
          });
        newCarTemplate.car.typesCar = car.typesCar;
        if (!car.name)
          return res.json({
            error: true,
            errors: [{ param: "dontName", msg: "Введите имя машины" }],
          });
        newCarTemplate.car.name = car.name;
        newCarTemplate.car.property = car.property;
        newCarTemplate.car.additionally = car.additionally;
        newCarTemplate.car.info = car.info;
        newCarTemplate.car.contractInfo = car.contractInfo;
        newCarTemplate.car.paymentInfo = car.paymentInfo;
        if (!req.files || !req.files["carPhoto"])
          return res.json({
            error: true,
            errors: [{ param: "dontPhoto", msg: "Необходимо фото машины" }],
          });
        if (req.files["carPhoto"])
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
            newCarTemplate.car.photo = {
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
        newCarTemplate.author = user;
        await newCarTemplate.save();
        return res.json({ error: false });
      }
      return res.json({
        error: true,
        errors: [{ param: "notRole", msg: "Вы не можете создавать шаблоны" }],
      });
    } catch (e) {
      return next(new Error(e));
    }
  },
  updateCarTemplate: async (req, res, next) => {
    const { user } = res.locals;
    let { car, templateId } = req.body;
    car = JSON.parse(car);
    try {
      let editCarTemplate = await carTemplate.findById(templateId);
      if (compareId(user._id, editCarTemplate.author)) {
        if (!car.typesCar || !car.typesCar.length)
          return res.json({
            error: true,
            errors: [{ param: "dontTypes", msg: "Выберите тип машины" }],
          });
        editCarTemplate.car.typesCar = car.typesCar;
        if (!car.name)
          return res.json({
            error: true,
            errors: [{ param: "dontName", msg: "Введите имя машины" }],
          });
        editCarTemplate.car.name = car.name;
        editCarTemplate.car.property = car.property;
        editCarTemplate.car.additionally = car.additionally;
        editCarTemplate.car.info = car.info;
        editCarTemplate.car.contractInfo = car.contractInfo;
        editCarTemplate.car.paymentInfo = car.paymentInfo;
        editCarTemplate.car.photo = car.photo;
        if (req.files && req.files["carPhoto"])
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
            newCarTemplate.car.photo = {
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
        await editCarTemplate.save();
        return res.json({ error: false });
      }
      return res.json({
        error: true,
        errors: [
          { param: "notRole", msg: "Вы не можете редактировать этот шаблон" },
        ],
      });
    } catch (e) {
      return next(new Error(e));
    }
  },
  deleteCarTemplate: async (req, res, next) => {
    const { user } = res.locals;
    const { templateId } = req.body;
    try {
      let removeTemplates = await carTemplate.findById(templateId);
      if (compareId(removeTemplates.author, user._id)) {
        removeTemplates.remove();
        return res.json({ error: false });
      }
      return res.json({
        error: true,
        errors: [{ param: "notRole", msg: "Вы не можете удалить этот шаблон" }],
      });
    } catch (e) {
      return next(new Error(e));
    }
  },
  getCarTemplates: async (req, res, next) => {
    const { user } = res.locals;
    try {
      let carTemplates = await carTemplate.find({ author: user });
      return res.json({ error: false, carTemplates });
    } catch (e) {
      return next(new Error(e));
    }
  },
  getCarTemplate: async (req, res, next) => {
    const { user } = res.locals;
    const { templateId } = req.body;
    try {
      let Template = await carTemplate.findById(templateId);
      if (Template && compareId(Template.author, user._id)) {
        return res.json({ error: false, Template });
      }
      return res.json({
        error: true,
      });
    } catch (e) {
      return next(new Error(e));
    }
  },
  getLikeCars: async (req, res, next) => {
    const { user } = res.locals;
    const { stringLikes } = req.body;
    try {
      let cars = await Car.find({
        name: {
          $regex: stringLikes,
          $options: "i",
        },
      }).limit(10);

      return res.json({
        cars,
      });
    } catch (e) {
      return next(new Error(e));
    }
  },
};
function compareId(id1, id2) {
  return String(id1) === String(id2);
}
