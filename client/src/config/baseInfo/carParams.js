import Input from "../../Elements/Input";

let extraParams = [
  {
    id: 1,
    name: "Попутный груз",
  },
  {
    id: 2,
    name: "Страхование груза водителем",
  },
  {
    id: 3,
    name: "Пломбирование",
  },
  {
    id: 4,
    name: "Мед. книжка",
  },
  {
    id: 5,
    name: "Нужны поддоны",
  },
  {
    id: 6,
    name: "Сопровождение",
  },
  {
    id: 7,
    name: "Услуги грузчика",
  },
];
let contractParams = [
  {
    id: 1,
    name: "Физ лицо",
  },
  {
    id: 2,
    name: "ООО",
    additionFields: [
      {
        field: Input,
        props: {
          type: "text",
          placeholder: "Введите ОГРН",
          name: "codeOrg",
        },
      },
    ],
  },
  {
    id: 3,
    name: "ИП",
    additionFields: [
      {
        field: Input,
        props: {
          type: "text",
          placeholder: "Введите ИНН",
          name: "codeOrg",
        },
      },
    ],
  },
  {
    id: 4,
    name: "Самозанятый",
  },
];
let paymentParams = [
  { id: 1, name: "Наличные" },
  { id: 2, name: "На банковскую карту" },
  {
    id: 3,
    name: `Блиц-перевод (перевод через систему 
    мгновенных денежных переводов)`,
  },
  { id: 4, name: "Безналичный расчет" },
];
export { extraParams, contractParams, paymentParams };
