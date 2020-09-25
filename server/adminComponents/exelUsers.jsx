import React, { useState } from "react";
import { Box, Text, Button, useCurrentAdmin } from "admin-bro";

const Dashboard = () => {
  const [hrefLoad, setHrefLoad] = useState(false);
  const [isFethDo, setIsFethDo] = useState(false);
  const admin = useCurrentAdmin();

  if (isFethDo)
    fetch(`${window.location.origin}/api/stats/get-exel`, {
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
      .then(({ href }) => {
        setHrefLoad(href);
        setIsFethDo(false);
      });

  return (
    <>
      <Box backgroundColor={"#fff"}>
        <Text paddingLeft={"63px"} fontSize={18}>
          Статистика Заказов/Предложений
        </Text>
        <Text paddingLeft={"63px"} paddingTop={"63px"} fontSize={18}>
          {hrefLoad && (
            <>
              Скачать файл Exel:{" "}
              <a href={window.location.origin + hrefLoad}>Exel</a>
            </>
          )}

          {!hrefLoad && (
            <Button
              onClick={() => {
                setIsFethDo(true);
              }}
            >
              Сформировать выгрузку
            </Button>
          )}
        </Text>
      </Box>
    </>
  );
};

export default Dashboard;
