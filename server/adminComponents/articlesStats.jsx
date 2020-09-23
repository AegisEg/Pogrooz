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
  const [articlesStats, setArticlesStats] = useState(false);
  const admin = useCurrentAdmin();

  if (!articlesStats)
    fetch(`${window.location.origin}/api/stats/get-articles`, {
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
        setArticlesStats(data);
      });

  return (
    <>
      <Box backgroundColor={"#fff"}>
        <Text paddingLeft={"63px"} fontSize={18}>
          Статистика Заказов/Предложений
        </Text>
        <BarChart width={730} height={250} data={articlesStats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Заказы" fill="#8884d8" />
          <Bar dataKey="Предложения" fill="#888" />
        </BarChart>
      </Box>
    </>
  );
};

export default Dashboard;
