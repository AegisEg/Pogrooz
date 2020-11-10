import React, { useState } from "react";
import { Box, Text, useCurrentAdmin } from "admin-bro";
import { Button, Input, Label, TextArea } from "@admin-bro/design-system";

const BanAndTariff = (props) => {
  const [commentFail, setCommentFail] = useState(false);
  const admin = useCurrentAdmin();
  let user = props.record.params;
  return (
    <Box>
      <Text fontSize={18}>
        Пользователь: {user["name.last"]} {user["name.first"]}
      </Text>
      <Label paddingTop={"50px"} htmlFor="cause">
        Причина
      </Label>
      <TextArea
        id="cause"
        style={{
          resize: "none",
          width: "100%",
          backgroundColor: "#fff",
          height: "150px",
        }}
        value={commentFail || ""}
        onChange={(e) => {
          if (e.target.value.length < 50) setCommentFail(e.target.value);
          else alert("Максимум 50 символов");
        }}
      />
      <Button
        marginTop="20px"
        style={{
          display: "block",
        }}
        onClick={() => {
          if (!!commentFail)
            fetch(`${window.location.origin}/api/user/modarationFail`, {
              method: "post",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                admin: admin[0],
                commentFail,
                userId: user._id,
              }),
            }).then(() => {
              location.href =
                "/admin/resources/User/records/" + user._id + "/show";
            });
          else alert("Запоните поля");
        }}
      >
        Отправить
      </Button>
    </Box>
  );
};
export default BanAndTariff;
