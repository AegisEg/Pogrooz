import box from "../../img/offer&order/box.svg";
import circles from "../../img/offer&order/circles.svg";
import commerce from "../../img/offer&order/commerce.svg";
import divan from "../../img/offer&order/divan.svg";
import hand from "../../img/offer&order/hand.svg";
import list from "../../img/offer&order/list.svg";
import CheckBox from "../../Elements/CheckBox";
import Input from "../../Elements/Input";
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
                  name={`constructionType`}
                  value={
                    (index === 0 && !obj["constructionType"]) ||
                    obj["constructionType"] == item
                  }
                  onChange={() => {
                    console.log(item);
                    callback("constructionType", item);
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
    isStandart: true,
  },
  {
    id: 8,
    name: "Мототехника  ",
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
          <Input
            type="text"
            name="animalsName"
            placeholder="Название"
            value={obj.animalsName}
            onChange={(e) => {
              callback(e.target.value);
            }}
          />
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
          <Input
            type="text"
            name="looseName"
            placeholder="Название"
            value={obj.looseName}
            onChange={(e) => {
              callback(e.target.value);
            }}
          />
          <Input
            type="number"
            name="looseName"
            placeholder="Вес"
            value={obj.looseName}
            pla
            onChange={(e) => {
              callback(e.target.value);
            }}
          />
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
  },
  {
    id: 17,
    name: "Спец грузы и опасные грузы",
    isPro: true,
    isStandart: true,
  },
  {
    id: 18,
    name: "Рефрижератор",
    isPro: true,
    isStandart: true,
  },
  {
    id: 6,
    name: "Другое ",
    img: circles,
    isStandart: true,
  },
];
