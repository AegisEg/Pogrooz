const AdminBro = require("admin-bro");
const AdminBroExpress = require("admin-bro-expressjs");
const AdminBroMongoose = require("admin-bro-mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Page = require("../models/Page");
const Question = require("../models/Question");
const QuestionSection = require("../models/QuestionSection");
const Tariff = require("../models/Tariff");
const PartitionMenu = require("../models/PartitionMenu");
const ItemMenu = require("../models/ItemMenu");
const Settings = require("../models/Setting");
const UserController = require("../controllers/UserController");

AdminBro.registerAdapter(AdminBroMongoose);
const adminBro = new AdminBro({
  rootPath: "/admin",
  branding: {
    companyName: "Pogrooz",
    logo: "/media/mini-logo.svg",
    softwareBrothers: false,
  },
  assets: {
    // styles: ["//cdn.quilljs.com/1.3.6/quill.snow.css"],
    scripts: [
      "https://cdn.tiny.cloud/1/pg49i8cci2njau4s6gvqwnw3bruos1whjze9ty8lnlnbg1ft/tinymce/5/tinymce.min.js",
    ],
  },
  // dashboard: {
  //   handler: async () => {},
  //   component: AdminBro.bundle("../adminComponents/dashboard"),
  // },
  pages: {
    articlesStats: {
      label: "Статистика пользователей",
      component: AdminBro.bundle("../adminComponents/articlesStats.jsx"),
    },
    sendNotification: {
      label: "Отправка Уведомлений",
      component: AdminBro.bundle("../adminComponents/notificationComonent.jsx"),
    },
    tariffsStats: {
      label: "Статистика тарифов",
      component: AdminBro.bundle("../adminComponents/tariffsStats.jsx"),
    },
    usersStats: {
      label: "Статистика пользователей",
      component: AdminBro.bundle("../adminComponents/usersStats.jsx"),
    },
    exelUsers: {
      label: "Выгрузка пользователей",
      component: AdminBro.bundle("../adminComponents/exelUsers.jsx"),
    },
  },
  resources: [
    {
      resource: Settings,
      options: {
        actions: {
          new: {
            isVisible: true,
          },
          edit: {
            isVisible: true,
          },
        },
        properties: {
          _id: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          key: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
        },
      },
    },
    {
      resource: User,
      options: {
        listProperties: [
          "name.first",
          "name.last",
          "type",
          "isPassportVerified",
          "isBan",
          "isTariff",
        ],
        actions: {
          delete: {
            isVisible: false,
          },
          new: {
            isVisible: false,
          },
          edit: {
            isVisible: false,
          },
          passportModeration: {
            actionType: "record",
            isVisible: (context) =>
              !context.record.params.isPassportVerified &&
              context.record.params.isPassportUploaded,
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
          passportModerationFail: {
            actionType: "record",
            isVisible: (context) =>
              !context.record.params.isPassportVerified &&
              context.record.params.isPassportUploaded,
            component: AdminBro.bundle("../adminComponents/moderationFail.jsx"),
            handler: async (request, response, context) => {
              return {
                record: context.record.toJSON(context.record),
              };
            },
          },
          userBan: {
            actionType: "record",
            isVisible: (context) =>
              !context.record.params.isBan &&
              (context.record.params.type === "cargo" ||
                context.record.params.isTariff),
            component: AdminBro.bundle("../adminComponents/bannedComonent"),
            handler: async (request, response, context) => {
              return {
                record: context.record.toJSON(context.record),
              };
            },
          },
          userUnBan: {
            actionType: "record",
            isVisible: (context) => context.record.params.isBan,
            component: false,
            handler: async (request, response, context) => {
              UserController.cancelBanRequest(context.record.params._id);
              context.record.params.isBan = false;
              return {
                record: context.record.toJSON(context.record),
              };
            },
          },
          sendNotify: {
            actionType: "record",
            isVisible: true,
            component: AdminBro.bundle(
              "../adminComponents/notificationComonent"
            ),
            handler: async (request, response, context) => {
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
          banJobId: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          isBan: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          isTariff: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          "notificationSettings.offer_new_request.push": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.offer_you_executor.push": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.offer_status.push": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.offer_new_review.push": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.offer_new_message.push": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.order_tracking.push": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.order_new_request.push": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.order_you_executor.push": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.order_status.push": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.order_new_review.push": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.order_new_message.push": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.order_tracking.push": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.user_new_message.push": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.order_moderation.push": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.offer_moderation.push": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.system.push": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.tarif_ends.push": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.tarif_payed.push": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.offer_new_request.mail": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.offer_you_executor.mail": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.offer_status.mail": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.offer_new_review.mail": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.offer_new_message.mail": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.order_tracking.mail": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.order_new_request.mail": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.order_you_executor.mail": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.order_status.mail": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.order_new_review.mail": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.order_new_message.mail": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.order_tracking.mail": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.user_new_message.mail": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.order_moderation.mail": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.offer_moderation.mail": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.system.mail": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.tarif_ends.mail": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "notificationSettings.tarif_payed.mail": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          email: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          createdAt: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          online: {
            isVisible: { list: false, filter: false, show: false, edit: false },
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
          "passportPhoto.path": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "passportPhoto.name": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          "passportPhoto.size": {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          type: {
            isVisible: { list: false, filter: true, show: true, edit: false },
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
          isPassportUploaded: {
            position: 201,
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          isPassportVerified: {
            position: 201,
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          rating: {
            position: 201,
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          onlineAt: {
            position: 201,
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          password: {
            position: 201,
            isVisible: { list: false, filter: false, show: false, edit: false },
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
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          slug: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          content: {
            isVisible: { list: false, filter: false, show: false, edit: true },
            components: {
              edit: AdminBro.bundle("../adminComponents/textEditor"),
            },
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
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          createdAt: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          content: {
            isVisible: { list: false, filter: false, show: true, edit: true },
            components: {
              edit: AdminBro.bundle("../adminComponents/textEditor"),
            },
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
            isVisible: { list: false, filter: false, show: false, edit: false },
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
            isVisible: { list: false, filter: false, show: true, edit: true },
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
    {
      resource: Tariff,
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
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          buff: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          createdAt: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          name: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          price: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          discount: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          duration: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          isEnable: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          isDemo: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
        },
      },
    },
    {
      resource: PartitionMenu,
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
          priority: {
            isVisible: { list: true, filter: true, show: true, edit: true },
            type: "number",
          },
          createdAt: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          _id: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
        },
      },
    },
    {
      resource: ItemMenu,
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
          name: {
            isVisible: { list: true, filter: true, show: true, edit: true },
            type: "number",
          },
          name: {
            isVisible: { list: true, filter: true, show: true, edit: true },
            type: "number",
          },
          _id: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          createdAt: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
        },
      },
    },
  ],
  locale: {
    translations: {
      actions: {
        new: "Создать",
        show: "Смотреть",
        edit: "Изменить",
        delete: "Удалить",
        userBan: "Заблокировать",
        userUnBan: "Снять блокировку",
        sendNotify: "Написать уведомление",
      },
      dashboard: "Рабочий стол",
      buttons: {
        filter: "Фильтр",
        save: "Сохранить",
        createnew: "Создать",
        addNewItem: "Добавить",
        applyChanges: "Применить",
        resetFilter: "Сбросить",
        logout: "Выйти",
        createFirstRecord: "Создать",
      },
      resources: {
        User: {
          actions: {
            passportModeration: "Пасспорт прошел модерацию",
            passportModerationFail: "Пасспорт не прошел модерацию",
          },
          properties: {
            email: "Почта",
            "name.first": "Имя",
            "name.last": "Фамилия",
            "name.middle": "Отчество",
            phone: "Телефон",
            isBan: "Заблокирован?",
            isTariff: "Активный тариф?",
            type: "Тип пользователя",
            online: "Онлайн",
            isPassportVerified: "Пасспорт одобрен?",
            isPassportUploaded: "Паспорт загружен?",
          },
        },
        Page: {
          properties: {
            title: "Заголовок",
            slug: "URL",
            content: "Контент",
          },
        },
        Question: {
          properties: {
            title: "Заголовок",
            slug: "URL",
            content: "Контент",
          },
        },
        PartitionMenu: {
          properties: {
            name: "Название",
            link: "Ссылка раздела(необязательно)",
            priority: "Приоритет",
          },
        },
        ItemMenu: {
          properties: {
            name: "Название",
            partition: "Раздел",
            link: "Ссылка",
            onlyNoAuth: "Видно только неавторизованным",
          },
        },
        QuestionSection: {
          properties: {
            title: "Заголовок",
            type: "Тип",
            questions: "Вопросы",
            slug: "URL",
            content: "Контент",
          },
        },
        Tariff: {
          properties: {
            name: "Название",
            duration: "Длительность в днях",
            price: "Цена без скидки",
            discount: "Скидка в процентах",
            isEnable: "Включен?",
            isDemo: "Демо?",
          },
        },
        Settings: {
          properties: { name: "Название", key: "Ключ", value: "Значение" },
        },
      },
      labels: {
        User: "Пользователи",
        Page: "Страницы",
        Tariff: "Тарифы",
        Settings: "Настройки сайта",
        Question: "Вопросы",
        QuestionSection: "Разделы вопросов",
        ItemMenu: "Пункты меню",
        PartitionMenu: "Разделы меню",
        articlesStats: "Статистика Заказов/Предложений",
        usersStats: "Статистика пользователей",
        tariffsStats: "Статистика тарифов",
        sendNotification: "Отправка уведомлений",
        exelUsers: "Выгрузка пользоватлей",
        dashboard: "Панель",
        pages: "Отчеты",
        navigation: "Меню",
      },
    },
  },
});

let router = require("express").Router();

module.exports = adminRouter = AdminBroExpress.buildAuthenticatedRouter(
  adminBro,
  {
    authenticate: async (email, password) => {
      if (
        email === process.env.ADMIN_LOGIN &&
        password === process.env.ADMIN_PASSWORD
      ) {
        return { email: email, password };
      }

      return null;
    },
    cookieName: "adminbro",
    cookiePassword: "somePassword",
  },
  router
);
