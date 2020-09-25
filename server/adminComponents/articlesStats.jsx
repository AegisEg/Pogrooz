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
  const [startDate, setStartDate] = useState(new Date().getFullYear());
  const [сreatedArticles, setСreatedArticles] = useState(false);
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
  if (!сreatedArticles)
    fetch(`${window.location.origin}/api/stats/get-articlesCreated`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        admin: admin[0],
        year: startDate,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setСreatedArticles(data);
      });

  return (
    <>
      <Box backgroundColor={"#fff"}>
        <Text paddingLeft={"63px"} fontSize={18}>
          Статистика Заказов/Предложений
        </Text>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <BarChart width={730} height={250} data={articlesStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Заказы" fill="#8884d8" />
              <Bar dataKey="Предложения" fill="#888" />
            </BarChart>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Text fontSize={20} paddingLeft={"10px"}>
              Всего заказов:
              {articlesStats &&
                articlesStats.reduce((a, b) => {
                  return a + b.Заказы;
                }, 0)}
            </Text>
            <Text fontSize={20} paddingLeft={"10px"}>
              Всего предложений:
              {articlesStats &&
                articlesStats.reduce((a, b) => {
                  return a + b.Заказы;
                }, 0)}
            </Text>
          </div>
        </div>
      </Box>
      <Box backgroundColor={"#fff"}>
        <Text paddingLeft={"63px"} fontSize={18}>
          Статистика созданиий заказо/предложений
        </Text>
        <BarChart width={730} height={250} data={сreatedArticles}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Заказы" fill="#8884d8" />
          <Bar dataKey="Предложения" fill="#888" />
        </BarChart>

        <div
          style={{
            width: "300px",
            marginLeft: "50px",
            minHeight: "300px",
          }}
        >
          <DropDown>
            <DropDownTrigger p="default">
              <Text as="span"> За какой год: {startDate}</Text>
            </DropDownTrigger>
            <DropDownMenu top="xxl" left="0px">
              <DropDownItem
                onClick={() => {
                  setStartDate(new Date().getFullYear());
                  setСreatedArticles(false);
                }}
              >
                <div style={{ padding: "5px 10px" }}>
                  {new Date().getFullYear()}
                </div>
              </DropDownItem>
              <DropDownItem
                onClick={() => {
                  setStartDate(new Date().getFullYear() - 1);
                  setСreatedArticles(false);
                }}
              >
                <div style={{ padding: "5px 10px" }}>
                  {new Date().getFullYear() - 1}
                </div>
              </DropDownItem>
              <DropDownItem
                onClick={() => {
                  setStartDate(new Date().getFullYear() - 2);
                  setСreatedArticles(false);
                }}
              >
                <div style={{ padding: "5px 10px" }}>
                  {new Date().getFullYear() - 2}
                </div>
              </DropDownItem>
            </DropDownMenu>
          </DropDown>
        </div>
      </Box>
    </>
  );
};

export default Dashboard;
