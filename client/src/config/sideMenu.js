import addIcon from "../img/add-icon.svg";
import chat from "../img/supportsIco.svg";
import ruble from "../img/ruble.svg";
import working from "../img/working.svg";
import completed from "../img/completed.svg";
import trash from "../img/trash.svg";
import download from "../img/download.svg";
import profile from "../img/profile.svg";
import myOrders from "../img/my-orders.svg";
import acceptedOrders from "../img/accepted-orders.svg";
import geoDetect from "../img/geo-detect.svg";
import messages from "../img/chat.svg";
import car from "../img/car.svg";
import raiting from "../img/raiting.svg";
import gear from "../img/gear.svg";
import notifications from "../img/notifications.png";
import chatOrder from "../img/chat-order.png";
import chatUser from "../img/chatUser.svg";

export default [
  {
    name: "Добавить предложение",
    to: "/offer-create",
    icon: addIcon,
    mobile: true,
    className: "yellow  custom-hover",
  },
  {
    name: "Добавить заказ",
    to: "/order-create",
    mobile: true,
    icon: addIcon,
    className: "yellow custom-hover",
  },
  {
    name: "Мои заказы",
    icon: myOrders,
    to: "/my-orders",
    onlyMobile: true,
  },
  {
    name: "Мои предложения",
    icon: myOrders,
    to: "/my-offers",
    onlyMobile: true,
  },
  {
    name: "Мои заказы",
    icon: myOrders,
    // role: "cargo",
    childlist: [
      {
        name: "Открытые",
        to: "/my-orders-open",
        icon: myOrders,
      },
      {
        name: "В работе",
        to: "/my-orders-working",
        icon: working,
      },
      {
        name: "Завершенные",
        to: "/my-orders-completed",
        icon: completed,
      },
      {
        name: "Корзина",
        to: "/my-orders-deleted",
        icon: trash,
      },
    ],
  },
  {
    name: "Мои предложения",
    icon: acceptedOrders,
    // role: "carrier",
    childlist: [
      {
        name: "Открытые",
        to: "/my-offers-open",
        icon: acceptedOrders,
      },
      {
        name: "В работе",
        to: "/my-offers-working",
        icon: working,
      },
      {
        name: "Завершенные",
        to: "/my-offers-completed",
        icon: completed,
      },
      {
        name: "Корзина",
        to: "/my-offers-deleted",
        icon: trash,
      },
    ],
  },
  {
    name: "Взятые предложения",
    to: "/taken-offers",
    mobile: true,
    icon: acceptedOrders,
  },
  {
    name: "Мои шаблоны авто",
    to: "/mytemplate-auto",
    icon: car,
  },
  {
    name: "Мой тариф",
    to: "/mytarif",
    icon: ruble,
  },
  {
    name: "Взятые заказы",
    to: "/taken-orders",
    mobile: true,
    icon: myOrders,
  },
  {
    name: "Отслеживание",
    to: "/geo-detect",
    icon: geoDetect,
    mobile: true,
  },
  {
    name: "Сообщения",
    to: "",
    className: "message-nav",
    icon: messages,
    childlist: [
      {
        name: "Сообщения по заказам, предложениям",
        to: "/messages-by-order",
        icon: messages,
      },
      {
        name: "Сообщения пользователей",
        to: "/messages",
        icon: chatUser,
      },
    ],
  },
  {
    name: "Отзывы",
    to: "/reviews",
    icon: raiting,
  },
  {
    name: "Профиль",
    to: "/profile",
    icon: profile,
    mobile: true,
  },
  {
    name: "Уведомления",
    to: "/notifications",
    icon: notifications,
  },
  {
    name: "Настройки уведомлений",
    to: "/notifications-settings",
    icon: gear,
  },
  {
    name: "Техподдержка",
    to: "/support",
    icon: chat,
  },
  {
    name: `Шаблон договора 
    между Перевозчиком 
    и Грузовладельцем`,
    to: "/dowload",
    icon: download,
    className: "download-order",
  },
];
