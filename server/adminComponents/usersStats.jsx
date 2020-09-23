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
  const [userStats, setUserStats] = useState(false);
  const [userAllCount, setUserAllCount] = useState(false);
  const [registerStats, setRegisterStats] = useState(false);
  const [startDate, setStartDate] = useState(new Date().getFullYear());
  const admin = useCurrentAdmin();

  if (!userStats)
    fetch(`${window.location.origin}/api/stats/get-users`, {
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
      .then(({ userAllCount, usersDate }) => {
        setUserStats(usersDate);
        setUserAllCount(userAllCount);
      });
  if (!registerStats)
    fetch(`${window.location.origin}/api/stats/get-registers`, {
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
        setRegisterStats(data);
      });

  return (
    <>
      <Box backgroundColor={"#fff"}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Text paddingLeft={"63px"} fontSize={18}>
              Статистика пользователей
            </Text>
            <BarChart width={730} height={250} data={userStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Грузовладельцы" fill="#8884d8" />
              <Bar dataKey="Перевозчики" fill="#888" />
            </BarChart>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Text fontSize={20} paddingLeft={"10px"}>
              Всего пользователей: {userAllCount}
            </Text>
          </div>
        </div>
      </Box>
      <Box backgroundColor={"#fff"}>
        <Text paddingLeft={"63px"} fontSize={18}>
          Статистика регистраций
        </Text>
        <BarChart width={730} height={250} data={registerStats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Грузовладельцы" fill="#8884d8" />
          <Bar dataKey="Перевозчики" fill="#888" />
        </BarChart>

        <div
          style={{
            width: "300px",
            marginLeft: "50px",
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
                  setRegisterStats(false);
                }}
              >
                <div style={{ padding: "5px 10px" }}>
                  {new Date().getFullYear()}
                </div>
              </DropDownItem>
              <DropDownItem
                onClick={() => {
                  setStartDate(new Date().getFullYear() - 1);
                  setRegisterStats(false);
                }}
              >
                <div style={{ padding: "5px 10px" }}>
                  {new Date().getFullYear() - 1}
                </div>
              </DropDownItem>
              <DropDownItem
                onClick={() => {
                  setStartDate(new Date().getFullYear() - 2);
                  setRegisterStats(false);
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
