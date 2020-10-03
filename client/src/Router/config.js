import React from "react";

// Pages
import Main from "../Pages/Public/Main";
import FAQ from "../Pages/Public/FAQ";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Forgot from "../Pages/Auth/Forgot";
import Reset from "../Pages/Auth/Reset";
import About from "../Pages/Public/About";
import Cargo from "../Pages/Public/Cargo";
import SearchPage from "../Pages/Public/SearchPage";
import TarifPage from "../Pages/Public/TarifPage";
import Application from "../Pages/Public/Application";
import Carrier from "../Pages/Public/Carrier";
import MyArticles from "../Pages/User/MyArticles";
import TakingArticles from "../Pages/User/TakingArticles";
import CreateTemplateAuto from "../Pages/User/CreatePart/CreateTemplateAuto";
import MyTemplateAuto from "../Pages/User/MyTemplateCar";
import User from "../Pages/Public/User";
import ArticlePage from "../Pages/User/ArticlePage";
import Notifications from "../Pages/User/Notifications/Notifications";
import NotificationsSettings from "../Pages/User/Notifications/NotificationsSettings";

import NewOrder from "../Pages/User/NewOrder";
import Reviwes from "../Pages/User/Reviwes";
import Support from "../Pages/User/Support";
import TarifLk from "../Pages/User/TarifLk";
import AutoPay from "../Pages/User/AutoPay";
import Messages from "../Pages/User/Messages/Messages";
import Dialog from "../Pages/User/Messages/Dialog";
import DialogOrder from "../Pages/User/Messages/DialogOrder";
import GeoDetect from "../Pages/User/GeoDetect";
import Page from "../Pages/Page";
import Questions from "../Pages/Questions";
import LoginByToken from "../Pages/Auth/LoginByToken";

const Profile = React.lazy(() => import("../Pages/User/Profile"));
const NewOffer = React.lazy(() => import("../Pages/User/NewOffer"));
const routes = [
  //AUTH ROUTE
  {
    path: "/login",
    exact: true,
    type: "auth",
    title: "Авторизация",
    component: () => <Login />,
  },
  {
    path: "/loginbytoken/:token",
    exact: true,
    type: "auth",
    title: "Авторизация",
    component: () => <LoginByToken />,
  },
  {
    path: "/register",
    exact: true,
    type: "auth",
    title: "Регистрация",
    component: () => <Register />,
  },
  {
    path: "/forgot",
    exact: true,
    type: "auth",
    title: "Забыли пароль",
    component: () => <Forgot />,
  },
  {
    path: "/reset/:token",
    isDynamic: true,
    exact: true,
    type: "auth",
    title: "Восстановление пароля",
    component: () => <Reset />,
  },
  //AUTH ROUTE END
  //PUBLIC ROUTE
  {
    path: "/page/:slug",
    exact: true,
    type: "public",
    title: "Страница",
    forseTitle: true,
    component: () => <Page />,
  },
  {
    path: "/",
    exact: true,
    type: "public",
    title: "Поисковик попутных перевозок для ваших грузов",
    component: () => <Main />,
  },
  {
    path: "/faq",
    exact: true,
    type: "public",
    title: "FAQ",
    component: () => <FAQ />,
  },
  {
    path: "/about",
    exact: true,
    type: "public",
    title: "О нас",
    component: () => <About />,
  },
  {
    path: "/cargo",
    exact: true,
    type: "public",
    title: "Грузовладельцам",
    component: () => <Cargo />,
  },
  {
    path: "/search",
    exact: true,
    type: "public",
    title: "Поиск",
    component: () => <SearchPage />,
  },
  {
    path: "/tariffs",
    exact: true,
    type: "public",
    title: "Тарифы",
    component: () => <TarifPage />,
  },
  {
    path: "/download-app",
    exact: true,
    type: "public",
    title: "Приложение в разработке",
    component: () => <Application />,
  },
  {
    path: "/carrier",
    exact: true,
    type: "public",
    title: "Перевозчикам",
    component: () => <Carrier />,
  },
  {
    path: "/questions/:slug",
    exact: true,
    type: "public",
    title: "Вопрос",
    forseTitle: true,
    component: () => <Questions />,
  },
  //PUBLIC ROUTE END
  //PRIVATE ROUTE
  {
    path: "/profile/security",
    exact: true,
    type: "private",
    title: "Безопасность",
    component: () => <Profile step={2} />,
  },
  {
    path: "/profile/info",
    exact: true,
    type: "private",
    title: "Личная информация",
    component: () => <Profile step={1} />,
  },
  {
    path: "/lk/questions/:slug",
    exact: true,
    type: "private",
    title: "Вопрос",
    forseTitle: true,
    component: () => <Questions isPrivate={true} />,
  },
  {
    path: "/notifications",
    exact: true,
    type: "private",
    title: "Уведомления",
    component: () => <Notifications />,
  },
  {
    path: "/messages-by-order",
    exact: true,
    type: "private",
    tab: "order",
    title: "Сообщения по заказам, предложениям",
    component: (props) => <Messages {...props} />,
  },
  {
    path: "/messages",
    exact: true,
    type: "private",
    tab: "all",
    title: "Сообщения",
    component: (props) => <Messages {...props} />,
  },
  {
    path: "/messages-users",
    exact: true,
    type: "private",
    tab: "user",
    title: "Сообщения пользователей",
    component: (props) => <Messages {...props} />,
  },
  {
    path: "/dialog/:id",
    exact: true,
    type: "private",
    lkHeight: true,
    dialogType: 2,
    title: "Сообщения пользователей",
    component: (props) => <Dialog {...props} />,
  },
  {
    path: "/dialog-order/:order/:id",
    exact: true,
    type: "private",
    lkHeight: true,
    dialogType: 2,
    title: "Сообщения пользователей",
    component: (props) => <DialogOrder {...props} />,
  },
  {
    path: "/dialog-order/:id",
    exact: true,
    type: "private",
    lkHeight: true,
    dialogType: 1,
    title: "Сообщения пользователей",
    component: (props) => <Dialog {...props} />,
  },
  {
    path: "/mytarif",
    exact: true,
    type: "private",
    title: "Мои тариф",
    role: "carrier",
    component: () => <TarifLk />,
  },
  {
    path: "/notifications-settings",
    exact: true,
    type: "private",
    title: "Настройки уведомлений",
    component: () => <NotificationsSettings />,
  },
  {
    path: "/my-orders",
    exact: true,
    type: "private",
    title: "Мои заказы",
    typeArticle: "order",
    statusArticle: [1, 2, 3, 4, 5, 6, 7],
    role: "cargo",
    component: (props) => <MyArticles {...props} />,
  },
  {
    path: "/my-orders-open",
    exact: true,
    type: "private",
    title: "Открытые заказы",
    typeArticle: "order",
    statusArticle: [1, 2],
    role: "cargo",
    component: (props) => <MyArticles {...props} />,
  },
  {
    path: "/my-orders-working",
    exact: true,
    type: "private",
    title: "Заказы в работе",
    typeArticle: "order",
    statusArticle: [3, 4],
    role: "cargo",
    component: (props) => <MyArticles {...props} />,
  },
  {
    path: "/my-orders-completed",
    exact: true,
    type: "private",
    typeArticle: "order",
    statusArticle: [5, 6],
    title: "Закрытые заказы",
    role: "cargo",
    component: (props) => <MyArticles {...props} />,
  },
  {
    path: "/autopay",
    exact: true,
    type: "private",
    title: "Настройка автоплатежа",
    role: "carrier",
    component: (props) => <AutoPay {...props} />,
  },
  {
    path: "/my-orders-deleted",
    exact: true,
    type: "private",
    typeArticle: "order",
    statusArticle: [7],
    title: "Корзина",
    role: "cargo",
    component: (props) => <MyArticles {...props} />,
  },
  {
    path: "/order/:id",
    exact: true,
    type: "common",
    title: "Заказ #0000",
    forseTitle: true,
    component: (props) => <ArticlePage type="order" {...props} />,
  },
  {
    path: "/edit-order/:id",
    exact: true,
    type: "private",
    title: "Редактирование заказа",
    forseTitle: true,
    role: "cargo",
    component: (props) => <NewOrder {...props} />,
  },
  {
    path: "/offer/:id",
    exact: true,
    type: "common",
    title: "Предложение #0000",
    forseTitle: true,
    component: (props) => <ArticlePage type="offer" {...props} />,
  },
  {
    path: "/edit-offer/:id",
    exact: true,
    type: "private",
    title: "Редактирование предложения",
    forseTitle: true,
    role: "carrier",
    component: (props) => <NewOffer {...props} />,
  },
  {
    path: "/order-create",
    exact: true,
    type: "private",
    title: "Новый заказ",
    role: "cargo",
    component: (props) => <NewOrder {...props} />,
  },
  {
    path: "/taken-orders",
    exact: true,
    type: "private",
    typeArticle: "order",
    statusArticle: [3, 4, 5, 6],
    title: "Взятые заказы",
    role: "carrier",
    component: (props) => <TakingArticles {...props} />,
  },
  {
    path: "/my-offers",
    exact: true,
    type: "private",
    typeArticle: "offer",
    statusArticle: [1, 2, 3, 4, 5, 6, 7],
    title: "Мои предложения",
    role: "carrier",
    component: (props) => <MyArticles {...props} />,
  },
  {
    path: "/my-offers-open",
    exact: true,
    type: "private",
    typeArticle: "offer",
    statusArticle: [1, 2],
    title: "Открытые предложения",
    role: "carrier",
    component: (props) => <MyArticles {...props} />,
  },
  {
    path: "/my-offers-working",
    exact: true,
    type: "private",
    typeArticle: "offer",
    statusArticle: [3, 4],
    title: "Предложения в работе",
    role: "carrier",
    component: (props) => <MyArticles {...props} />,
  },
  {
    path: "/my-offers-completed",
    exact: true,
    type: "private",
    typeArticle: "offer",
    statusArticle: [5, 6],
    title: "Закрытые предложения",
    role: "carrier",
    component: (props) => <MyArticles {...props} />,
  },
  {
    path: "/my-offers-deleted",
    exact: true,
    type: "private",
    typeArticle: "offer",
    statusArticle: [7],
    title: "Корзина",
    role: "carrier",
    component: (props) => <MyArticles {...props} />,
  },
  {
    path: "/taken-offers",
    exact: true,
    type: "private",
    typeArticle: "offer",
    statusArticle: [3, 4, 5, 6],
    title: "Взятые предложения",
    role: "cargo",
    component: (props) => <TakingArticles {...props} />,
  },
  {
    path: "/offer-create",
    exact: true,
    type: "private",
    title: "Новое предложение",
    role: "carrier",
    component: (props) => <NewOffer {...props} />,
  },
  {
    path: "/create-template-auto",
    exact: true,
    type: "private",
    title: "Новый шаблон авто",
    role: "carrier",
    component: (props) => <CreateTemplateAuto {...props} />,
  },
  {
    path: "/edit-template-auto/:id",
    exact: true,
    type: "private",
    title: "Редактирование шаблона Авто",
    role: "carrier",
    component: (props) => <CreateTemplateAuto {...props} />,
  },
  {
    path: "/mytemplate-auto",
    exact: true,
    type: "private",
    title: "Мои шалоны авто",
    role: "carrier",
    component: (props) => <MyTemplateAuto {...props} />,
  },
  {
    path: "/user/:id",
    exact: true,
    type: "public",
    title: "Профиль пользователя",
    component: (props) => <User {...props} />,
  },
  {
    path: "/reviews",
    exact: true,
    type: "private",
    title: "Отзывы",
    component: (props) => <Reviwes {...props} />,
  },
  {
    path: "/support",
    exact: true,
    type: "private",
    title: "Техподдержка",
    component: (props) => <Support {...props} />,
  },
  {
    path: "/geo-detect",
    exact: true,
    type: "private",
    title: "Отслеживание",
    role: "cargo",
    component: (props) => <GeoDetect {...props} />,
  },
];

export default routes;
