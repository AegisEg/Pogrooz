import React, { useState } from "react";
import {
  Box,
  Text,
  DropDownMenu,
  DropDown,
  DropDownItem,
  Link,
  Icon,
  DropDownTrigger,
  useCurrentAdmin,
} from "admin-bro";
import {
  BarChart,
  Tooltip,
  Legend,
  CartesianGrid,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

const Dashboard = () => {
  const [tariffsStats, setTariffsStats] = useState(false);
  const admin = useCurrentAdmin();

  if (!tariffsStats)
    fetch(`${window.location.origin}/api/stats/get-tariffs`, {
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
      .then((data) => {
        setTariffsStats(data);
      });

  return (
    <>
      <Box backgroundColor={"#fff"}>
        <Text paddingLeft={"63px"} fontSize={18}>
          Статистика Заказов/Предложений
        </Text>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <BarChart width={730} height={250} data={tariffsStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Пользователи" fill="#8884d8" />
            </BarChart>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Text fontSize={20} paddingLeft={"10px"}>
              Всего пользователей с активным тарифом:{" "}
              {tariffsStats &&
                tariffsStats.reduce((a, b) => {
                  return a + b.Пользователи;
                }, 0)}
            </Text>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Dashboard;
