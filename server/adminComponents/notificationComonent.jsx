import React, { useState } from "react";
import { Box, useCurrentAdmin } from "admin-bro";
import { Button, Input, Label, TextArea } from "@admin-bro/design-system";

const BanAndTariff = (props) => {
  const [commentNotify, setCommentNotify] = useState(false);
  const [userType, setUserType] = useState(false);
  const admin = useCurrentAdmin();
  let user = props.record && props.record.params;
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
            if (e.target.value.length < 50) setCommentNotify(e.target.value);
            else alert("Максимум 50 символов");
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
              <option>Введите значение</option>
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
    </Box>
  );
};
export default BanAndTariff;
