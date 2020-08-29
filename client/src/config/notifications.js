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
    id: 4,
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
    id: 4,
    code: "SEND_NEW_MESSAGE",
    text: (info) => (
      <>
        Вам написали сообщение, для просмотра перейдите на страницу{" "}
        <Link to="/messages">сообщений</Link>
      </>
    ),
  },
  {
    id: 4,
    code: "SEND_NEW_MESSAGE_BY_ORDER",
    text: (info) => (
      <>
        По{" "}
        <Link to={`${info.articleType}/${info.articleId}`}>
          {info.articleType === "offer" ? "предложению" : "заказу"} №
          {info.articleId}
        </Link>{" "}
        появилось новое собщение
      </>
    ),
  },
];
