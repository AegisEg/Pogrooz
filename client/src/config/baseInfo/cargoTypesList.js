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
//fieldsLabel  Лейблы полей для вывода
//Fields функция вывода полей для типа груза
//fields функция принимает
//1)Функцию изменения параметра
//2)Параметры для вставки в значение полей
//3) Типы машин, для уловного рендеринга полей. Некоторые отсутсвуют в каком то типе машин
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
    fieldsLabel: {
      type: "Тип",
      volumeInLiter: "Объем в литрах",
      volumeInMetr: "Объем в м&sup3;",
      weight: "Вес в тоннах",
    },
    fields: (callback, obj, car = false) => {
      let arrayCheck = ["Насыпные", "Наливные", "Обычные"];
      if (
        car &&
        car.find(
          (item) =>
            item === 1 ||
            item === 9 ||
            item === 11 ||
            item === 12 ||
            item === 2 ||
            item === 3
        )
      )
        arrayCheck = [arrayCheck[2]];
      if (car && car.find((item) => item === 10 || item === 7))
        arrayCheck = [arrayCheck[0]];
      if (car && car.find((item) => item === 6)) arrayCheck = [arrayCheck[1]];
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
                  name="type"
                  value={obj["type"] == item}
                  onChange={() => {
                    callback(3, "type", item);
                  }}
                  text={item}
                />
              </div>
            );
          })}
          <div className="standartParams row">
            {obj["type"] === "Насыпные" && (
              <>
                <div
                  className="col"
                  style={{
                    maxWidth: "150px",
                  }}
                >
                  <Input
                    type="number"
                    name="volumeInMetr"
                    placeholder="Объем в м&sup3;"
                    value={obj["volumeInMetr"] || ""}
                    onChange={(e) => {
                      callback(3, "volumeInMetr", Number(e.target.value));
                    }}
                  />
                </div>
                <div
                  className="col"
                  style={{
                    maxWidth: "165px",
                  }}
                >
                  <Input
                    type="number"
                    name="weight"
                    placeholder="Вес в тоннах"
                    value={obj["weight"] || ""}
                    onChange={(e) => {
                      callback(3, "weight", Number(e.target.value));
                    }}
                  />
                </div>
              </>
            )}
            {obj["type"] === "Наливные" && (
              <>
                <div
                  className="col"
                  style={{
                    maxWidth: "150px",
                  }}
                >
                  <Input
                    type="number"
                    name="volumeInLiter"
                    placeholder="Объем в л"
                    value={obj["volumeInLiter"] || ""}
                    onChange={(e) => {
                      callback(3, "volumeInLiter", Number(e.target.value));
                    }}
                  />
                </div>
                <div
                  className="col"
                  style={{
                    maxWidth: "165px",
                  }}
                >
                  <Input
                    type="number"
                    name="weight"
                    placeholder="Вес в тоннах"
                    value={obj["weight"] || ""}
                    onChange={(e) => {
                      callback(3, "weight", Number(e.target.value));
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </>
      );
    },
  },
  {
    id: 4,
    name: "Курьерские грузы",
    img: hand,
    fieldsLabel: {
      type: "Тип",
      weight: "Вес в кг",
      length: "Длинна",
      width: "Ширина",
      height: "Высота",
    },
    //IS стандарт если обычные, в условии в заказе прописано
    fields: (callback, obj, car = false) => {
      let arrayCheck = ["Обычные", "Документы"];
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
                  id={`type${index}`}
                  name="type"
                  value={obj["type"] == item}
                  onChange={() => {
                    callback(4, "type", item);
                  }}
                  text={item}
                />
              </div>
            );
          })}
          {obj["type"] === arrayCheck[1] && (
            <>
              <div
                className="col"
                style={{
                  maxWidth: "150px",
                }}
              >
                <Input
                  type="number"
                  name="weight"
                  placeholder="Вес в кг"
                  value={obj["weight"] || ""}
                  onChange={(e) => {
                    callback(4, "weight", Number(e.target.value));
                  }}
                />
              </div>
              <div
                className="row colspan-input px-3"
                style={{
                  marginLeft: "0",
                  alignItems: "center",
                }}
              >
                <Input
                  type="number"
                  placeholder="Длина"
                  className="text-center"
                  style={{ margin: "0 0 0 0" }}
                  value={obj["length"] || ""}
                  onChange={(e) => {
                    callback(4, "length", Number(e.target.value));
                  }}
                />
                <Input
                  type="number"
                  placeholder="Ширина"
                  className="text-center"
                  value={obj["width"] || ""}
                  onChange={(e) => {
                    callback(4, "width", Number(e.target.value));
                  }}
                  style={{ margin: "0 0 0 0" }}
                />
                <Input
                  type="number"
                  className="text-center"
                  value={obj["height"] || ""}
                  onChange={(e) => {
                    callback(4, "height", Number(e.target.value));
                  }}
                  placeholder="Высота"
                />
                <span
                  className="filter-input-title"
                  style={{
                    minWidth: "90px",
                  }}
                >
                  &nbsp;&nbsp;=&nbsp;
                  <div className="valumeCalculate">
                    {obj["length"] * obj["width"] * obj["height"] || ""}
                    &nbsp;
                  </div>
                  м<sup>3</sup>
                </span>
              </div>
            </>
          )}
        </>
      );
    },
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
    fieldsLabel: {
      carName: "Марка, Модель машины",
      count: "Количество",
    },
    fields: (callback, obj, car = false) => {
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
              name="carName"
              placeholder="Марка, Модель машины"
              value={obj["carName"] || ""}
              onChange={(e) => {
                callback(7, "carName", e.target.value);
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
              value={obj["count"] || ""}
              onChange={(e) => {
                callback(7, "count", e.target.value);
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
    fieldsLabel: {
      weigth: "Вес",
      count: "Количество",
    },
    fields: (callback, obj, car = false) => {
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
              name="weigth"
              placeholder="Вес"
              value={obj["weigth"] || ""}
              onChange={(e) => {
                callback(8, "weigth", e.target.value);
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
              value={obj["count"] || ""}
              onChange={(e) => {
                callback(8, "count", e.target.value);
              }}
            />
          </div>
        </>
      );
    },
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
    fieldsLabel: {
      animalName: "Название животного",
      count: "Количество",
    },
    fields: (callback, obj, car = false, isFilter = false) => {
      return (
        <>
          {!isFilter && (
            <div
              className="d-inline-block"
              style={{
                maxWidth: "320px",
              }}
            >
              <Input
                type="text"
                name="animalName"
                placeholder="Название животного"
                value={obj["animalName"] || ""}
                onChange={(e) => {
                  callback(11, "animalName", e.target.value);
                }}
              />
            </div>
          )}
          <div
            className="d-inline-block"
            style={{
              maxWidth: "140px",
            }}
          >
            <Input
              type="number"
              name="count"
              placeholder="Кол-во"
              value={obj["count"] || ""}
              onChange={(e) => {
                callback(11, "count", Number(e.target.value));
              }}
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
    fieldsLabel: {
      type: "Тип",
      volumeInLiter: "Объем в литрах",
      volumeInMetr: "Объем в м&sup3;",
      weight: "Вес в тоннах",
    },
    fields: (callback, obj, car = false) => {
      let arrayCheck = ["Насыпные", "Наливные", "Обычные"];
      if (
        car &&
        car.find(
          (item) =>
            item === 1 ||
            item === 9 ||
            item === 11 ||
            item === 12 ||
            item === 2 ||
            item === 3
        )
      )
        arrayCheck = [arrayCheck[2]];
      if (car && car.find((item) => item === 10 || item === 7))
        arrayCheck = [arrayCheck[0]];
      if (car && car.find((item) => item === 6)) arrayCheck = [arrayCheck[1]];
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
                  id={`eatType${index}`}
                  name="type"
                  value={obj["type"] == item}
                  onChange={() => {
                    callback(13, "type", item);
                  }}
                  text={item}
                />
              </div>
            );
          })}
          <div className="standartParams row">
            {obj["type"] === "Насыпные" && (
              <>
                <div
                  className="col"
                  style={{
                    maxWidth: "150px",
                  }}
                >
                  <Input
                    type="number"
                    name="volumeInMetr"
                    placeholder="Объем в м&sup3;"
                    value={obj["volumeInMetr"] || ""}
                    onChange={(e) => {
                      callback(13, "volumeInMetr", Number(e.target.value));
                    }}
                  />
                </div>
                <div
                  className="col"
                  style={{
                    maxWidth: "165px",
                  }}
                >
                  <Input
                    type="number"
                    name="weight"
                    placeholder="Вес в тоннах"
                    value={obj["weight"] || ""}
                    onChange={(e) => {
                      callback(13, "weight", Number(e.target.value));
                    }}
                  />
                </div>
              </>
            )}
            {obj["type"] === "Наливные" && (
              <>
                <div
                  className="col"
                  style={{
                    maxWidth: "150px",
                  }}
                >
                  <Input
                    type="number"
                    name="volumeInLiter"
                    placeholder="Объем в л"
                    value={obj["volumeInLiter"] || ""}
                    onChange={(e) => {
                      callback(13, "volumeInLiter", Number(e.target.value));
                    }}
                  />
                </div>
                <div
                  className="col"
                  style={{
                    maxWidth: "165px",
                  }}
                >
                  <Input
                    type="number"
                    name="weight"
                    placeholder="Вес в тоннах"
                    value={obj["weight"] || ""}
                    onChange={(e) => {
                      callback(13, "weight", Number(e.target.value));
                    }}
                  />
                </div>
              </>
            )}
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
    id: 6,
    name: "Другое ",
    img: circles,
    isPro: true,
    isStandart: true,
  },
  {
    id: 16,
    name: "Эвакуатор",
    img: circles,
  },
];
