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
import Application from "../Pages/Public/Application";
import Carrier from "../Pages/Public/Carrier";
import Profile from "../Pages/User/Profile";
import MyOrders from "../Pages/User/MyOrders";
import Notifications from "../Pages/User/Notifications";
import NotificationsSettings from "../Pages/User/NotificationsSettings";

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
  //PUBLIC ROUTE END
  //PRIVATE ROUTE
  {
    path: "/profile",
    exact: true,
    type: "private",
    title: "Профиль",
    component: () => <Profile />,
  },
  {
    path: "/notifications",
    exact: true,
    type: "private",
    title: "Уведомления",
    component: () => <Notifications />,
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
    component: () => <MyOrders />,
  },
];

export default routes;
