import React, { useState } from "react";
import { Box, useCurrentAdmin } from "admin-bro";
import { Button, Input, Label, TextArea } from "@admin-bro/design-system";
function convertDate(inputFormat) {
  var time = new Date(inputFormat);

  var hours = time.getHours();
  var minutes = time.getMinutes();

  if (minutes.toString().length === 1) {
    minutes = "0" + minutes;
  }
  if (hours.toString().length === 1) {
    hours = "0" + hours;
  }

  var day_diff = new Date().getDate() - time.getDate(),
    month_diff = new Date().getMonth() - time.getMonth(),
    year_diff = new Date().getFullYear() - time.getFullYear();
  var year = time.getFullYear(),
    month = time.getMonth() + 1,
    day = time.getDate();

  if (year_diff > 0)
    return (
      (day < 10 ? "0" + day.toString() : day.toString()) +
      "." +
      (month < 10 ? "0" + month.toString() : month.toString()) +
      "." +
      year.toString()
    );

  var arr = [
    "Янв.",
    "Фев.",
    "Мар.",
    "Апр.",
    "Май",
    "Июн.",
    "Июл.",
    "Авг.",
    "Сен.",
    "Окт.",
    "Ноя.",
    "Дек.",
  ];

  var r =
    (day_diff === 0 && month_diff === 0 && hours + ":" + minutes) ||
    (day_diff === 1 && "Вчера") ||
    (year_diff === 0 && day + " " + arr[month - 1]);

  return r;
}
const NitificationSend = (props) => {
  const [commentNotify, setCommentNotify] = useState(false);
  const [userType, setUserType] = useState(false);
  const [history, setHistory] = useState(false);
  const [isFething, setIsFething] = useState(false);
  const admin = useCurrentAdmin();
  let user = props.record && props.record.params;
  if (!history && !isFething) {
    setIsFething(true);
    fetch(`${window.location.origin}/api/stats/get-notifications`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        admin: admin[0],
      }),
    })
      .then((response) => response.json())
      .then((notificationsList) => {
        setHistory(notificationsList);
        setIsFething(false);
      });
  }
  return (
    <Box>
      <div
        style={{
          padding: "0 30px",
        }}
      >
        <h1 style={{ fontSize: "18px" }}>
          Отпрвка уведомления
          {user && `пользователю ${user["name.last"]} ${user["name.first"]}`}
        </h1>
        <Label fontSize={"18px"} htmlFor="cause">
          Текст уведомлениия
        </Label>
        <TextArea
          id="cause"
          style={{
            resize: "none",
            width: "100%",
            backgroundColor: "#fff",
            height: "150px",
          }}
          value={commentNotify || ""}
          onChange={(e) => {
            if (e.target.value.length < 500) setCommentNotify(e.target.value);
            else alert("Максимум 500 символов");
          }}
        />
        {!user && (
          <>
            <Label fontSize={"18px"} paddingTop={"50px"} htmlFor="cause">
              Кому
            </Label>
            <select
              value={userType}
              onChange={(e) => {
                setUserType(e.target.value);
              }}
            >
              <option>Выберите значение</option>
              <option value="all">Всем</option>
              <option value="cargo">Грузовладельцам</option>
              <option value="carrier">Перевозчикам</option>
            </select>
          </>
        )}
        <Button
          marginTop="20px"
          style={{
            display: "block",
          }}
          onClick={() => {
            if ((!!userType || (user && user._id)) && !!commentNotify)
              fetch(`${window.location.origin}/api/user/sendNotify`, {
                method: "post",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  admin: admin[0],
                  commentNotify,
                  userType,
                  userId: user && user._id,
                }),
              }).then(() => {
                setCommentNotify(false);
                setUserType(false);
              });
            else alert("Запоните поля");
          }}
        >
          Отправить
        </Button>
      </div>
      <div
        style={{
          padding: "0 30px",
          marginTop: "30px",
        }}
      >
        <h1 style={{ fontSize: "18px" }}>История оповещений</h1>
        <table style={{ width: "100%" }}>
          <thead
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            <tr>
              <td width="800px">Текст</td>
              <td>Кому</td>
              <td>Дата</td>
            </tr>
          </thead>
          <tbody>
            {history &&
              history.map((item, index) => {
                let typeSender;
                if (item._id.typeSender === "cargo")
                  typeSender = "Грузовладельцам";
                if (item._id.typeSender === "carrier")
                  typeSender = "Перевозчикам";
                if (item._id.typeSender === "all") typeSender = "Всем";
                if (item._id.typeSender === "user")
                  typeSender = (
                    <a href={`/admin/resources/User/records/${item.userId}/show`}>
                      {item.userType === "carrier"
                        ? "Перевозчику"
                        : "Грузовладельцу"}{" "}
                       {item.userName}
                    </a>
                  );
                return (
                  <tr key={index}>
                    <td>{item._id.commentNotify}</td>
                    <td>{typeSender}</td>
                    <td>{convertDate(item.createdAt)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Box>
  );
};
export default NitificationSend;
