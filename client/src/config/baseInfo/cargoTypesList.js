import box from "../../img/offer&order/box.svg";
import circles from "../../img/offer&order/circles.svg";
import commerce from "../../img/offer&order/commerce.svg";
import divan from "../../img/offer&order/divan.svg";
import hand from "../../img/offer&order/hand.svg";
import list from "../../img/offer&order/list.svg";
import CheckBox from "../../Elements/CheckBox";
import Input from "../../Elements/Input";
import Select from "../../Elements/Select";
import React from "react";
export default [
  {
    id: 1,
    name: "Коробка",
    img: box,
    isStandart: true,
  },
  {
    id: 2,
    name: "Мебель ",
    img: divan,
    isStandart: true,
  },
  {
    id: 3,
    name: "Строительные грузы",
    img: list,
    isStandart: true,
    fields: (callback, obj) => {
      let arrayCheck = ["Сыпучие", "Наливные", "Обычные ", "Бетон"];
      return (
        <>
          {arrayCheck.map((item, index) => {
            return (
              <div
                style={{
                  display: "inline-block",
                }}
                key={index}
              >
                <CheckBox
                  id={`constructionType${index}`}
                  name={`Вид груза`}
                  value={obj["Вид груза"] == item}
                  onChange={() => {
                    callback(3, "Вид груза", item);
                  }}
                  text={item}
                />
              </div>
            );
          })}
        </>
      );
    },
  },
  {
    id: 4,
    name: "Курьерские грузы",
    img: hand,
    isStandart: true,
  },
  {
    id: 5,
    name: "Коммерческие грузы",
    img: commerce,
    isStandart: true,
  },
  //Pro
  {
    id: 7,
    name: "Автомобили",
    isPro: true,
    fields: (callback, obj) => {
      return (
        <>
          <div
            className="d-inline-block"
            style={{
              maxWidth: "320px",
            }}
          >
            <Input
              type="text"
              name="Марка"
              placeholder="Марка"
              value={obj["Марка"] || ""}
              onChange={(e) => {
                callback(7, "Марка", e.target.value);
              }}
            />
          </div>
          <div
            className="d-inline-block"
            style={{
              maxWidth: "320px",
            }}
          >
            <Input
              type="text"
              name="Модель"
              placeholder="Модель"
              value={obj["Модель"] || ""}
              onChange={(e) => {
                callback(7, "Модель", e.target.value);
              }}
            />
          </div>
          <div
            className="d-inline-block"
            style={{
              maxWidth: "140px",
            }}
          >
            <Input
              type="number"
              name="Кол-во"
              placeholder="Кол-во"
              value={obj["Кол-во"] || ""}
              onChange={(e) => {
                callback(7, "Кол-во", e.target.value);
              }}
            />
          </div>
        </>
      );
    },
  },
  {
    id: 8,
    name: "Мототехника",
    isPro: true,
    isStandart: true,
  },
  {
    id: 9,
    name: "Транспорт и запчасти",
    isPro: true,
    isStandart: true,
  },
  {
    id: 10,
    name: "Водный транспорт",
    isPro: true,
    isStandart: true,
  },
  {
    id: 11,
    name: "Перевозка животных",
    isPro: true,
    fields: (callback, obj) => {
      return (
        <>
          <div
            className="d-inline-block"
            style={{
              maxWidth: "320px",
            }}
          >
            <Input
              type="text"
              name="Название животного"
              placeholder="Название животного"
              value={obj["Название животного"] || ""}
              onChange={(e) => {
                callback(11, "Название животного", e.target.value);
              }}
            />
          </div>
          <div
            className="d-inline-block"
            style={{
              maxWidth: "140px",
            }}
          >
            <Input
              type="number"
              name="Кол-во"
              placeholder="Кол-во"
              value={obj["Кол-во"] || ""}
              onChange={(e) => {
                callback(11, "Кол-во", e.target.value);
              }}
            />
          </div>
        </>
      );
    },
  },
  {
    id: 12,
    name: "Сыпучие грузы",
    isPro: true,
    fields: (callback, obj) => {
      return (
        <>
          <div
            className="d-inline-block"
            style={{
              maxWidth: "320px",
            }}
          >
            <Input
              type="text"
              name="Название Груза"
              placeholder="Название Груз"
              value={obj["Название Груза"] || ""}
              onChange={(e) => {
                callback(12, "Название Груза", e.target.value);
              }}
            />
          </div>
          <div
            className="d-inline-block"
            style={{
              maxWidth: "140px",
            }}
          >
            <Input
              type="number"
              name="Объем"
              placeholder="Объем"
              value={obj["Объем"]}
              onChange={(e) => {
                callback(12, "Объем", e.target.value);
              }}
            />
          </div>
          <div
            className="d-inline-block"
            style={{
              maxWidth: "140px",
            }}
          >
            <Input
              type="number"
              name="Вес"
              placeholder="Вес"
              value={obj["Вес"]}
              onChange={(e) => {
                callback(12, "Вес", e.target.value);
              }}
            />
          </div>
          <div
            className="d-inline-block w-100"
            style={{
              maxWidth: "180px",
            }}
          >
            <Select
              type="text"
              name="Вид упаковки"
              placeholder="Вид упаковки"
              options={[
                { value: "Пакеты", label: "Пакеты" },
                { value: "Коробки", label: "Коробки" },
                { value: "Пленка", label: "Пленка" },
              ]}
              onChange={(val) => {
                callback(12, "Вид упаковки", val.value);
              }}
              value={{ value: obj["Вид упаковки"], label: obj["Вид упаковки"] }}
            />
          </div>
        </>
      );
    },
  },
  {
    id: 13,
    name: "Продукты питания",
    isPro: true,
    isStandart: true,
  },
  {
    id: 14,
    name: "Наливные грузы",
    isPro: true,
    fields: (callback, obj) => {
      return (
        <>
          <div
            className="d-inline-block"
            style={{
              maxWidth: "320px",
            }}
          >
            <Input
              type="text"
              name="Название Груза"
              placeholder="Название Груза"
              value={obj["Название Груза"] || ""}
              onChange={(e) => {
                callback(14, "Название Груза", e.target.value);
              }}
            />
          </div>
          <div
            className="d-inline-block"
            style={{
              maxWidth: "140px",
            }}
          >
            <Input
              type="number"
              name="Объем"
              placeholder="Объем"
              value={obj["Объем"]}
              onChange={(e) => {
                callback(14, "Объем", e.target.value);
              }}
            />
          </div>
          <div
            className="d-inline-block"
            style={{
              maxWidth: "140px",
            }}
          >
            <Input
              type="number"
              name="looseWeight"
              placeholder="Вес"
              value={obj["Вес"]}
              onChange={(e) => {
                callback(14, "Вес", e.target.value);
              }}
            />
          </div>
          <div
            className="d-inline-block w-100"
            style={{
              maxWidth: "180px",
            }}
          >
            <Select
              type="text"
              name="typePackaging"
              placeholder="Вид упаковки"
              options={[
                { value: "Пакеты", label: "Пакеты" },
                { value: "Коробки", label: "Коробки" },
                { value: "Пленка", label: "Пленка" },
              ]}
              onChange={(val) => {
                callback(14, "Вид упаковки", val.value);
              }}
              value={{ value: obj["Вид упаковки"], label: obj["Вид упаковки"] }}
            />
          </div>
        </>
      );
    },
  },
  {
    id: 15,
    name: "Вывоз мусора",
    isPro: true,
    isStandart: true,
  },
  {
    id: 16,
    name: "Манипулятор",
    isPro: true,
    isStandart: true,
    fields: (callback, obj) => {
      return (
        <>
          <div
            className="d-inline-block"
            style={{
              maxWidth: "320px",
            }}
          >
            <Input
              type="text"
              name="Название Груза"
              placeholder="Название Груза"
              value={obj["Название Груза"] || ""}
              onChange={(e) => {
                callback(16, "Название Груза", e.target.value);
              }}
            />
          </div>
        </>
      );
    },
  },
  {
    id: 17,
    name: "Спец грузы и опасные грузы",
    isPro: true,
    isStandart: true,
    fields: (callback, obj) => {
      let arrayCheck = ["Сыпучие", "Наливные", "Обычные ", "Бетон"];
      return (
        <>
          {arrayCheck.map((item, index) => {
            return (
              <div
                style={{
                  display: "inline-block",
                }}
                key={index}
              >
                <CheckBox
                  id={`Type${index}`}
                  name={`Тип груза`}
                  value={obj["Тип груза"] == item}
                  onChange={() => {
                    callback(17, "Тип груза", item);
                  }}
                  text={item}
                />
              </div>
            );
          })}
        </>
      );
    },
  },
  {
    id: 18,
    name: "Рефрижератор",
    isPro: true,
    isStandart: true,
    fields: (callback, obj) => {
      return (
        <>
          <div
            className="d-inline-block"
            style={{
              maxWidth: "320px",
            }}
          >
            <Input
              type="text"
              name="Название Груза"
              placeholder="Название Груза"
              value={obj["Название Груза"] || ""}
              onChange={(e) => {
                callback(18, "Название Груза", e.target.value);
              }}
            />
          </div>
          <div
            style={{
              display: "inline-block",
            }}
          >
            <CheckBox
              id="isEat"
              name={`Пищевой груз`}
              value={obj["Пищевой груз"] == "Да" ? true : false}
              onChange={(e) => {
                callback(18, "Пищевой груз", e.target.checked ? "Да" : "");
              }}
              text={obj["Пищевой груз"]}
            />
          </div>
        </>
      );
    },
  },
  {
    id: 6,
    name: "Другое ",
    img: circles,
    isStandart: true,
  },
];
