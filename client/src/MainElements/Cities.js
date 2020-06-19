// App
import React from "react";
var cities = [
  "Казань",
  "Волгоград",
  "Нижний Новгород",
  "Новосибирск",
  "Екатеринбург",
  "Красноярск",
  "Челябинск",
  "Уфа",
  "Владивосток",
  "Саратов",
  "МО, Долгопрудный",
  "Барнаул",
  "Смоленск",
  "Тула",
  "Владимир",
  "Ярославль",
  "Белгород",
  "Курск",
  "Ижевск",
  "Новгород",
  "Орел",
  "Краснодар",
  "Самара",
  "Санкт-Петербург",
  "Ростов-на-Дону",
  "Ставрополь",
  "Воронеж",
  "Иркутск",
  "Тюмень",
  "Омск",
  "Пермь",
  "МО, Домодедово",
  "МО, Дубна",
  "Калуга",
  "Рязань",
  "Иваново",
  "Тверь",
  "Брянск",
  "Липецк",
  "Тольятти",
  "Псков",
  "Кострома",
];
class Cities extends React.Component {
  state = {
    perColumn: 11,
    citiesCount: 42,
    cities: [],
  };
  updateDimensions = () => {
    let perColumn, citiesCount;
    if (window.innerWidth > 640) {
      perColumn = 11;
      citiesCount = 42;
    }
    if (window.innerWidth < 640) {
      perColumn = 7;
      citiesCount = 21;
    }
    if (window.innerWidth < 480) {
      perColumn = 7;
      citiesCount = 14;
    }
    let sliced_array = [];
    for (let i = 0; i < citiesCount; i += perColumn) {
      sliced_array.push(cities.slice(i, i + perColumn));
    }

    this.setState({
      perColumn: perColumn,
      citiesCount: citiesCount,
      cities: sliced_array,
    });
  };
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            {this.state.cities.map((item, i) => {
              return (
                <div key={i} className="main-cities-item">
                  <ul>
                    {item.map((item1, i) => {
                      return <li key={i}>{item1}</li>;
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Cities;
