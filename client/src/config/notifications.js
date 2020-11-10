import React from "react";
import { Link } from "react-router-dom";
let statuses = [
  {
    id: 1,
    name: "Черновик",
  },
  {
    id: 2,
    name: "Опубликован",
  },
  {
    id: 3,
    name: "Выбран исполнитель",
  },
  {
    id: 4,
    name: "В пути",
  },
  {
    id: 5,
    name: "Завершен",
  },
  {
    id: 6,
    name: "Отменен",
  },
  {
    id: 7,
    name: "Корзина",
  },
  {
    id: 1,
    name: "Черновик",
  },
];
export default [
  {
    id: 1,
    code: "ARTICLE_NEW_REQUEST",
    text: (info) => (
      <>
        По{" "}
        <Link to={`${info.articleType}/${info.articleId}`}>
          {info.articleType === "offer" ? "предложению" : "заказу"} №
          {info.articleId}
        </Link>
        &nbsp; поступила новая заявка
      </>
    ),
  },
  {
    id: 2,
    code: "ARTICLE_CHANGE_STATUS",
    text: (info) => (
      <>
        По{" "}
        <Link to={`${info.articleType}/${info.articleId}`}>
          {info.articleType === "offer" ? "предложению" : "заказу"} №
          {info.articleId}
        </Link>
        &nbsp;сменился статус на "
        {statuses.find((item) => item.id === info.articleStatus).name}"
      </>
    ),
  },
  {
    id: 3,
    code: "ARTICLE_SET_EXECUTOR",
    text: (info) => (
      <>
        По{" "}
        <Link to={`${info.articleType}/${info.articleId}`}>
          {info.articleType === "offer" ? "предложению" : "заказу"} №
          {info.articleId}
        </Link>{" "}
        Вас выбрали исполнителем
      </>
    ),
  },
  {
    id: 4,
    code: "ARTICLE_DELETE_EXECUTOR",
    text: (info) => (
      <>
        По{" "}
        <Link to={`${info.articleType}/${info.articleId}`}>
          {info.articleType === "offer" ? "предложению" : "заказу"} №
          {info.articleId}
        </Link>{" "}
        Вас исключили из исполнителей
      </>
    ),
  },
  {
    id: 5,
    code: "ARTICLE_SET_REVIEW",
    text: (info) => (
      <>
        По{" "}
        <Link to={`${info.articleType}/${info.articleId}`}>
          {info.articleType === "offer" ? "предложению" : "заказу"} №
          {info.articleId}
        </Link>{" "}
        добавлен новый отзыв
      </>
    ),
  },
  {
    id: 6,
    code: "SEND_NEW_MESSAGE",
    text: (info) => (
      <>
        Вам написали сообщение, для просмотра перейдите на страницу{" "}
        <Link to="/messages">сообщений</Link>
      </>
    ),
  },
  {
    id: 7,
    code: "SEND_NEW_MESSAGE_BY_ORDER",
    text: (info) => (
      <>
        По{" "}
        <Link to={`${info.articleType}/${info.articleId}`}>
          {info.articleType === "offer" ? "предложению" : "заказу"} №
          {info.articleId}
        </Link>{" "}
        появилось новое собщение, для просмотра перейдите на страницу{" "}
        <Link to="/messages-by-order">сообщений</Link>
      </>
    ),
  },
  {
    id: 8,
    code: "PASSPORT_MODERATION",
    text: (info) => <>Фото паспотра прошло модерацию</>,
  },
  {
    id: 9,
    code: "ARTICLE_REQUEST_CANCEL",
    text: (info) => (
      <>
        По{" "}
        <Link to={`${info.articleType}/${info.articleId}`}>
          {info.articleType === "offer" ? "предложению" : "заказу"} №
          {info.articleId}
        </Link>{" "}
        {info.userType === "cargo" ? "грузовладелец" : "перевозчик"}{" "}
        {info.userFio} послал запрос на исключения из исполнителей
      </>
    ),
  },
  {
    id: 10,
    code: "ARTICLE_OFFERED_ORDER",
    text: (info) => (
      <>
        Грузовладелец <Link to={`/user/${info.author}`}>{info.authorFIO}</Link>{" "}
        предложиил вам участе в{" "}
        <Link to={`/order/${info.articleId}`}>заказе №{info.articleId}</Link>
      </>
    ),
  },
  {
    id: 11,
    code: "BAN_COMMENT_NOTIFY",
    text: (info) => <>Вы заблокированы на {info.duration} дня(дней) по причине: {info.commentBan}.</>,
  },
  {
    id: 11,
    code: "UNBAN_NOTIFY",
    text: (info) => <>Ваш профиль разблокирован</>,
  },
  {
    id: 12,
    code: "PASSPORT_MODERATION_FAIL",
    text: (info) => (
      <>Паспорт не прошел модерацию по причине: {info.commentFail}.</>
    ),
  },
  {
    id: 13,
    code: "SYSTEM_NOTIFY",
    text: (info) => <>Уведомление от адмнистратора: {info.commentNotify}.</>,
  },
  {
    id: 14,
    code: "ARTICLE_UNPUBLISH",
    text: (info) => (
      <>
        <Link to={`${info.articleType}/${info.articleId}`}>
          {info.articleType === "offer" ? "Предложение" : "Заказ"} №
          {info.articleId}
        </Link>{" "}
        перенесен в статус Черновик по причине просрочки
      </>
    ),
  },
  {
    id: 14,
    code: "ARTICLE_REQUEST_GEOLOCATION",
    text: (info) => (
      <>
        По{" "}
        <Link to={`${info.articleType}/${info.articleId}`}>
          {info.articleType === "offer" ? "предложению" : "заказу"} №
          {info.articleId}
        </Link>{" "}
        {info.userType === "cargo" ? "грузовладелец" : "перевозчик"}{" "}
        {info.userFio} послал запрос на предоставлене местоположеня.
      </>
    ),
  },
  {
    id: 15,
    code: "AUTOPAYMENT_SUCCESS",
    text: (info) => (
      <>Тариф {info.tariffName} успешно оплачен с помощью автоплатежа.</>
    ),
  },
  {
    id: 16,
    code: "AUTOPAYMENT_ERROR",
    text: (info) => (
      <>Тариф {info.tariffName} не удалось оплатить с помощью автоплатежа.</>
    ),
  },
  {
    id: 17,
    code: "TARIFF_WILL_CANCEL",
    text: (info) => <>Тариф {info.tariffName} закончиться через 2 дня.</>,
  },
];
