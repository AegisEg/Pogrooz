import React, { useState } from "react";
import { Box, Text, useCurrentAdmin } from "admin-bro";
import {
  Button,
  Input,
  Label,
  TextArea,
} from "@admin-bro/design-system";

const BanAndTariff = (props) => {
  const [commentBan, setCommentBan] = useState(false);
  const [duration, setDuration] = useState(false);
  const admin = useCurrentAdmin();
  let user = props.record.params;
  return (
    <Box>
      <Text fontSize={18}>
        Пользователь: {user["name.last"]} {user["name.first"]}
      </Text>
      <Label paddingTop={"50px"} htmlFor="cause">
        Причина блокировки
      </Label>
      <TextArea
        id="cause"
        style={{
          resize: "none",
          width: "100%",
          backgroundColor: "#fff",
          height: "150px",
        }}
        value={commentBan || ""}
        onChange={(e) => {
          if (e.target.value.length < 500) setCommentBan(e.target.value);
          else alert("Максимум 500 символов");
        }}
      />
      <Label paddingTop={"50px"} htmlFor="duration">
        Длительсность блокировки
      </Label>
      <Input
        id="duration"
        type="number"
        style={{
          backgroundColor: "#fff",
        }}
        value={duration || ""}
        onChange={(e) => {
          let val = e.target.value.replace(/\D/, "");
          if (val <= 14) setDuration(Math.floor(val, 0));
          else alert("Нельзя больше 14 дней");
        }}
      />
      <Button
        marginTop="20px"
        style={{
          display: "block",
        }}
        onClick={() => {
          if (!!duration && !!commentBan)
            fetch(`${window.location.origin}/api/user/userBan`, {
              method: "post",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                admin: admin[0],
                commentBan,
                duration,
                userId: user._id,
              }),
            }).then(() => {
              location.href = "/admin/resources/User";
            });
          else alert("Запоните поля");
        }}
      >
        Заблокировать
      </Button>
    </Box>
  );
};
export default BanAndTariff;
