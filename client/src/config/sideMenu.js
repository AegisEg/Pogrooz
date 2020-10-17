import addIcon from "../img/sideMenu/add-icon.svg";
import chat from "../img/sideMenu/supportsIco.svg";
import ruble from "../img/sideMenu/ruble.svg";
import working from "../img/sideMenu/working.svg";
import completed from "../img/sideMenu/completed.svg";
import trash from "../img/sideMenu/trash.svg";
import profile from "../img/sideMenu/profile.svg";
import myOrders from "../img/sideMenu/my-orders.svg";
import acceptedOrders from "../img/sideMenu/accepted-orders.svg";
import geoDetect from "../img/sideMenu/geo-detect.svg";
import messages from "../img/sideMenu/chat.svg";
import car from "../img/sideMenu/car.svg";
import raiting from "../img/sideMenu/raiting.svg";
import gear from "../img/sideMenu/gear.svg";
import notifications from "../img/sideMenu/notifications.svg";
import chatUser from "../img/sideMenu/chatUser.svg";
import security from "../img/sideMenu/security.svg";

export default [
  {
    name: "Добавить предложение",
    to: "/offer-create",
    icon: addIcon,
    mobile: true,
    className: "yellow  custom-hover",
    role: "carrier",
  },
  {
    name: "Добавить заказ",
    to: "/order-create",
    mobile: true,
    icon: addIcon,
    className: "yellow custom-hover",
    role: "cargo",
  },
  {
    name: "Мои заказы",
    icon: myOrders,
    to: "/my-orders",
    onlyMobile: true,
    role: "cargo",
  },
  {
    name: "Мои предложения",
    icon: acceptedOrders,
    to: "/my-offers",
    onlyMobile: true,
    role: "carrier",
  },
  {
    name: "Мои заказы",
    icon: myOrders,
    role: "cargo",
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
    role: "carrier",
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
    role: "cargo",
  },
  {
    name: "Мои шаблоны авто",
    to: "/mytemplate-auto",
    icon: car,
    role: "carrier",
  },
  {
    name: "Мой тариф",
    to: "/mytarif",
    icon: ruble,
    role: "carrier",
  },
  {
    name: "Взятые заказы",
    to: "/taken-orders",
    mobile: true,
    icon: myOrders,
    role: "carrier",
  },
  {
    name: "Отслеживание",
    to: "/geo-detect",
    icon: geoDetect,
    mobile: true,
    role: "cargo",
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
        to: "/messages-users",
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
    to: "/profile/info",
    icon: profile,
    onlyMobile: true,
  },
  {
    name: "Профиль",
    to: "/profile",
    icon: profile,
    childlist: [
      {
        name: "Личная информация",
        to: "/profile/info",
        icon: profile,
      },
      {
        name: "Безопасность",
        to: "/profile/security",
        icon: security,
      },
    ],
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
];
