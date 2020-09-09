const AdminBro = require("admin-bro");
const AdminBroExpress = require("admin-bro-expressjs");
const AdminBroMongoose = require("admin-bro-mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Page = require("../models/Page");
const Question = require("../models/Question");
const QuestionSection = require("../models/QuestionSection");

AdminBro.registerAdapter(AdminBroMongoose);
const adminBro = new AdminBro({
  rootPath: "/admin",
  branding: {
    companyName: "Pogrooz",
    softwareBrothers: false,
  },
  resources: [
    {
      resource: User,
      options: {
        listProperties: [
          "email",
          "isPassportVerified",
          "name.first",
          "name.last",
          "type",
        ],
        actions: {
          delete: {
            isVisible: false,
          },
          new: {
            isVisible: false,
          },
          edit: {
            isVisible: true,
          },
          passportModeration: {
            actionType: "record",
            isVisible: (context) => !context.record.params.isPassportVerified,
            component: false,
            handler: async (request, response, context) => {
              await User.findOneAndUpdate(
                { _id: context.record.params._id },
                { $set: { isPassportVerified: true } }
              );
              context.record.params.isPassportVerified = true;
              return {
                record: context.record.toJSON(context.record),
              };
            },
          },
        },
        properties: {
          _id: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          email: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          createdAt: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          online: {
            isVisible: { list: true, filter: true, show: true, edit: false },
          },
          buff: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          avatar: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          passportPhoto: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          type: {
            isVisible: { list: false, filter: false, show: true, edit: false },
            availableValues: [
              {
                value: "cargo",
                label: "Грузовладелец",
              },
              {
                value: "carrier",
                label: "Перевозчик",
              },
            ],
          },
          address: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          contract: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "contract.id": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "contract.data": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          country: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          resetPasswordToken: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          resetPasswordExpires: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          verifiedToken: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          verifiedTokenExpires: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          isVerified: {
            isVisible: { list: false, filter: false, show: false, edit: true },
          },
          onlineAt: {
            isVisible: { list: false, filter: false, show: false, edit: true },
          },
          passport: {
            components: {
              show: AdminBro.bundle("../adminComponents/image"),
            },
            position: 200,
            isVisible: { list: false, filter: false, show: true, edit: false },
          },
          isPassportVerified: {
            position: 201,
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
        },
      },
    },
    {
      resource: Page,
      options: {
        actions: {
          delete: {
            isVisible: true,
          },
          new: {
            isVisible: true,
          },
          edit: {
            isVisible: true,
          },
        },
        properties: {
          _id: {
            isVisible: { list: false, filter: false, show: true, edit: false },
          },
          slug: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          content: {
            isVisible: { list: false, filter: false, show: true, edit: true },
            type: "richtext",
          },
          isPrivate: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          createdAt: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          buff: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          title: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
        },
      },
    },
    {
      resource: Question,
      options: {
        actions: {
          delete: {
            isVisible: true,
          },
          new: {
            isVisible: true,
          },
          edit: {
            isVisible: true,
          },
        },
        properties: {
          _id: {
            isVisible: { list: false, filter: false, show: true, edit: false },
          },
          createdAt: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          content: {
            isVisible: { list: false, filter: false, show: true, edit: true },
            type: "richtext",
          },
          buff: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          title: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
        },
      },
    },
    {
      resource: QuestionSection,
      options: {
        actions: {
          delete: {
            isVisible: true,
          },
          new: {
            isVisible: true,
          },
          edit: {
            isVisible: true,
          },
        },
        properties: {
          _id: {
            isVisible: { list: false, filter: false, show: true, edit: false },
          },
          createdAt: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          buff: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          title: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          questions: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          type: {
            isVisible: { list: true, filter: true, show: true, edit: true },
            availableValues: [
              {
                value: "all",
                label: "Для всех",
              },
              {
                value: "carrier",
                label: "Для перевозчиков",
              },
              {
                value: "cargo",
                label: "Для грузовладельцев",
              },
            ],
          },
        },
      },
    },
  ],
  locale: {
    translations: {
      resources: {
        User: {
          actions:{
            passportModeration:"Модерация пасспорта"
          },
          properties: {
            email: "Почта",
            "name.first": "Имя",
            "name.last": "Имя",
            "name.middle": "Отчество",
            phone: "Телефон",
            type: "Тип пользователя",
            online: "Онлайн",
            isPassportVerified: "Прошел модерацию?",
          },
        },
      },
      labels: {
        User: "Пользователи",
        Page: "Страницы",
        Tariff: "Тарифы",
        Question: "Вопросы",
        QuestionSection: "Разделы вопросов",
      },
    },
  },
});

let router = require("express").Router();

module.exports = adminRouter = AdminBroExpress.buildAuthenticatedRouter(
  adminBro,
  {
    authenticate: async (email, password) => {
      if (email === "neostar1996@mail.ru" && password === "23021954") {
        return { email: email, password };
      }

      return null;
    },
    cookieName: "adminbro",
    cookiePassword: "somePassword",
  },
  router
);
