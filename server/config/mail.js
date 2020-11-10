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
let domain = "pogrooz.ru";
module.exports = [
  {
    id: 1,
    code: "ARTICLE_NEW_REQUEST",
    title: (info) => "Новая заявка",
    text: (info) =>
      `
        По <a href="${process.env.CLIENT_URL}/${info.articleType}/${
        info.articleId
      }">${info.articleType === "offer" ? "предложению" : "заказу"} № ${
        info.articleId
      }</a> поступила новая заявка`,
  },
  {
    id: 2,
    code: "ARTICLE_CHANGE_STATUS",
    title: (info) =>
      `Смена статуса ${
        info.articleType === "offer" ? "предложения" : "заказа"
      }`,
    text: (info) =>
      `
        По
        <a
          href="${process.env.CLIENT_URL}/${info.articleType}/${info.articleId}"
        >
          ${info.articleType === "offer" ? "предложению" : "заказу"} № 
          ${info.articleId}
        </a>
        &nbsp;сменился статус на "
        ${statuses.find((item) => item.id === info.articleStatus).name}"
      `,
  },
  {
    id: 3,
    code: "ARTICLE_SET_EXECUTOR",
    title: (info) => `Вас выбрали исполнителем`,
    text: (info) =>
      ` По
        <a
          href="${process.env.CLIENT_URL}/${info.articleType}/${info.articleId}"
        >
          ${info.articleType === "offer" ? "предложению" : "заказу"} № 
          ${info.articleId}
        </a>        
        Вас выбрали исполнителем`,
  },
  {
    id: 4,
    code: "ARTICLE_DELETE_EXECUTOR",
    title: (info) => `Вас исключили из исполнителей`,
    text: (info) =>
      ` По
        <a
          href="${process.env.CLIENT_URL}/${info.articleType}/${info.articleId}"
        >
          ${info.articleType === "offer" ? "предложению" : "заказу"} № 
          ${info.articleId}
        </a>        
        Вас исключили из исполнителей`,
  },
  {
    id: 5,
    code: "ARTICLE_SET_REVIEW",
    title: (info) => `Новый отзыв`,
    text: (info) =>
      ` По
        <a
          href="${process.env.CLIENT_URL}/${info.articleType}/${info.articleId}"
        >
          ${info.articleType === "offer" ? "предложению" : "заказу"} № 
          ${info.articleId}
        </a>      
        добавлен новый отзыв
     `,
  },
  {
    id: 6,
    code: "SEND_NEW_MESSAGE",
    title: (info) => `Новое сообщение от пользователя`,
    text: (info) =>
      `
        Вам написали сообщение, для просмотра перейдите на страницу
        <a href="${process.env.CLIENT_URL}/messages">сообщений</a>
      `,
  },
  {
    id: 7,
    code: "SEND_NEW_MESSAGE_BY_ORDER",
    title: (info) =>
      `Новое сообщение по ${
        info.articleType === "offer" ? "предложению" : "заказу"
      }`,
    text: (info) =>
      `
        По
        <a href="${process.env.CLIENT_URL}/${info.articleType}/${
        info.articleId
      }"
        >
          ${info.articleType === "offer" ? "предложению" : "заказу"} № 
          ${info.articleId}
        </a>      
        появилось новое собщение, для просмотра перейдите на страницу.
        <a href="${process.env.CLIENT_URL}/messages-by-order">сообщений</a>`,
  },
  {
    id: 8,
    code: "PASSPORT_MODERATION",
    title: (info) => `Фото вашего паспотра прошло модерацию`,
    text: (info) => `Фото паспотра прошло модерацию`,
  },
  {
    id: 9,
    code: "ARTICLE_REQUEST_CANCEL",
    title: (info) => `Запрос на исключения из исполнителей`,
    text: (info) =>
      ` По
      <a href="${process.env.CLIENT_URL}/${info.articleType}/${info.articleId}"
      >
        ${info.articleType === "offer" ? "предложению" : "заказу"} № 
        ${info.articleId}
      </a>      
        ${info.userType === "cargo" ? "грузовладелец" : "перевозчик"}
        ${info.userFio} послал запрос на исключения из исполнителей
     `,
  },
  {
    id: 10,
    code: "ARTICLE_OFFERED_ORDER",
    title: (info) => `Предложение участия в заказе`,
    text: (info) =>
      `
        Грузовладелец <a href="${process.env.CLIENT_URL}/user/${info.author}">${
        info.authorFIO
      }</a>
        предложиил вам участе в
        <a href="${process.env.CLIENT_URL}/order/${info.articleId}">заказе №${
        info.articleId
      }</Link>
        `,
  },
  {
    id: 11,
    code: "BAN_COMMENT_NOTIFY",
    title: (info) => `Вы заблокированы`,
    text: (info) =>
      `Вы заблокированы на ${info.duration} дня(дней) по причине: ${info.commentBan}.`,
  },
  {
    id: 11,
    code: "UNBAN_NOTIFY",
    title: (info) => `Ваш профиль разблокирован`,
    text: (info) => `Ваш профиль разблокирован.`,
  },
  {
    id: 12,
    code: "PASSPORT_MODERATION_FAIL",
    title: (info) => `Паспорт не прошел модерацию`,
    text: (info) =>
      `Паспорт не прошел модерацию по причине: ${info.commentFail}.`,
  },
  {
    id: 13,
    code: "SYSTEM_NOTIFY",
    title: (info) => `Системное сообщение`,
    text: (info) => `Уведомление от адмнистратора: ${info.commentNotify}.`,
  },
  {
    id: 14,
    code: "ARTICLE_UNPUBLISH",
    title: (info) =>
      `${info.articleType === "offer" ? "Предложение" : "Заказ"} просрочен`,
    text: (info) =>
      `<a href="${process.env.CLIENT_URL}/${info.articleType}/${
        info.articleId
      }">
          ${info.articleType === "offer" ? "Предложение" : "Заказ"} № ${
        info.articleId
      }
        </a>перенесен в статус Черновик по причине просрочки
      `,
  },
  {
    id: 14,
    code: "ARTICLE_REQUEST_GEOLOCATION",
    title: (info) => "Запрос местоположения",
    text: (info) =>
      ` По
      <a href="${process.env.CLIENT_URL}/${info.articleType}/${info.articleId}"
      >
        ${info.articleType === "offer" ? "предложению" : "заказу"} № 
        ${info.articleId}
      </a>      
        ${info.userType === "cargo" ? "грузовладелец" : "перевозчик"}
        ${info.userFio} послал запрос на предоставлене местоположеня.
      `,
  },
  {
    id: 15,
    code: "AUTOPAYMENT_SUCCESS",
    title: (info) => "Совершен автоплатеж",
    text: (info) =>
      `Тариф ${info.tariffName} успешно оплачен с помощью автоплатежа.`,
  },
  {
    id: 16,
    code: "AUTOPAYMENT_ERROR",
    title: (info) => "Неудачный автоплатеж",
    text: (info) =>
      `Тариф ${info.tariffName} не удалось оплатить с помощью автоплатежа.`,
  },
  {
    id: 17,
    code: "TARIFF_WILL_CANCEL",
    title: (info) => "Тариф скоро закончиться",
    text: (info) => `Тариф ${info.tariffName} закончиться через 2 дня.`,
  },
];
