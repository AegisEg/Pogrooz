import defaultPassport from "../img/defaultpassport.png";
import defaultCar from "../img/default-car.png";
import box from "../img/offer&order/box.svg";
import circles from "../img/offer&order/circles.svg";
import commerce from "../img/offer&order/commerce.svg";
import divan from "../img/offer&order/divan.svg";
import hand from "../img/offer&order/hand.svg";
import list from "../img/offer&order/list.svg";
export default {
  defaultPassport: defaultPassport,
  defaultCar: defaultCar,
  countArticleOnPage: 6,
  notificationCountOfPage: 10,
  cargoTypes: [
    { id: 1, label: "Коробка", img: box },
    { id: 2, label: "Мебель", img: divan },
    { id: 3, label: "Строительные грузы", img: list },
    { id: 4, label: "Курьерские грузы", img: hand },
    { id: 5, label: "Коммерческие грузы", img: commerce },
    { id: 6, label: "Другое", img: circles },
  ],
  stylesModals: {
    overlay: {
      zIndex: 1001,
    },
    content: {
      top: "50%",
      position: "absolute",
      left: "50%",
      margin: "auto",
      background: "#FFFFFF",
      border: "1px solid #DDDDDD",
      boxSizing: "border-box",
      boxShadow: "3px 2px 15px rgba(0, 0, 0, 0.13)",
      borderRadius: "10px",
      padding: "20px 30px 40px 30px",
      transform: "translate(-50%, -50%)",
    },
  },
  localizateEmoji: {
    search: "Поиск",
    clear: "Отчистить", // Accessible label on "clear" button
    notfound: "Не найдено",
    skintext: "Выберете тон",
    categories: {
      search: "Результаты поиска",
      recent: "Часто используемые",
      smileys: "Смайлики и эмоции",
      people: "Люди",
      nature: "Жывотные и природа",
      foods: "Еда",
      activity: "Деятельность",
      places: "Путешествия",
      objects: "Предметы",
      symbols: "Символы",
      flags: "Флаги",
    },
    categorieslabel: "Emoji categories", // Accessible title for the list of categories
    skintones: {
      1: "Default Skin Tone",
      2: "Light Skin Tone",
      3: "Medium-Light Skin Tone",
      4: "Medium Skin Tone",
      5: "Medium-Dark Skin Tone",
      6: "Dark Skin Tone",
    },
  },
};
