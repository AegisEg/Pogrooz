import React, { useState } from "react";
import {
  Box,
  Text,
  DropDownMenu,
  DropDown,
  DropDownItem,
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
  const [tariffsStatsByDate, setTariffsStatsByDate] = useState(false);
  const [tariffsMonth, setTariffsMonth] = useState(1);
  const [tariffsYear, setTariffsYear] = useState(2020);
  const [sumStats, setSumStats] = useState(false);
  const admin = useCurrentAdmin();
  let months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  let years = [2020, 2021, 2022];
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
      .then(({ tariffs, sums }) => {
        setTariffsStats(tariffs);
        setSumStats(sums);
      });
  if (!tariffsStatsByDate)
    fetch(`${window.location.origin}/api/stats/get-tariffs-date`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        admin: admin[0],
        month: tariffsMonth,
        year: tariffsYear,
      }),
    })
      .then((response) => response.json())
      .then(({ tariffs }) => {
        setTariffsStatsByDate(tariffs);
      });
  return (
    <>
      <Box backgroundColor={"#fff"}>
        <Text paddingLeft={"63px"} fontSize={18}>
          Статистика Тарифов
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
            <Text fontSize={20} paddingLeft={"10px"}>
              Сумма в рублях: {sumStats} руб.
            </Text>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <BarChart width={730} height={250} data={tariffsStatsByDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Пользователи" fill="#8884d8" />
            </BarChart>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "300px",
              marginLeft: "50px",
              minHeight: "300px",
            }}
          >
            <DropDown>
              <DropDownTrigger p="default">
                <Text as="span">
                  {" "}
                  За какой месяц: {months[tariffsMonth - 1]}
                </Text>
              </DropDownTrigger>
              <DropDownMenu top="xxl" left="0px">
                {months.map((item, index) => (
                  <DropDownItem
                    key={index}
                    onClick={() => {
                      setTariffsMonth(
                        months.findIndex((itemX) => itemX === item) + 1
                      );
                      setTariffsStatsByDate(false);
                    }}
                  >
                    <div style={{ padding: "5px 10px" }}>{item}</div>
                  </DropDownItem>
                ))}
              </DropDownMenu>
            </DropDown>
          </div>
          <div
            style={{
              width: "300px",
              marginLeft: "50px",
              minHeight: "300px",
            }}
          >
            <DropDown>
              <DropDownTrigger p="default">
                <Text as="span"> За какой год: {tariffsYear}</Text>
              </DropDownTrigger>
              <DropDownMenu top="xxl" left="0px">
                {years.map((item, index) => (
                  <DropDownItem
                    key={index}
                    onClick={() => {
                      setTariffsYear(item);
                      setTariffsStatsByDate(false);
                    }}
                  >
                    <div style={{ padding: "5px 10px" }}>{item}</div>
                  </DropDownItem>
                ))}
              </DropDownMenu>
            </DropDown>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Dashboard;
