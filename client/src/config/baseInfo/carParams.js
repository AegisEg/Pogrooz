import Input from "../../Elements/Input";
import orgSelect from "../../Elements/orgSelect";

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
    label: "Договор с Физ Лицом",
  },
  {
    id: 2,
    name: "ООО",
    label: "Договор с ООО",
    additionFields: [
      {
        field: orgSelect,
        props: {
          placeholder: "Введите ИНН или Название",
          name: "org",
        },
      },
    ],
  },
  {
    id: 3,
    name: "ИП",
    label: "Договор с ИП",
    additionFields: [
      {
        field: Input,
        props: {
          type: "text",
          placeholder: "Введите ИНН или Название",
          name: "org",
        },
      },
    ],
  },
  {
    id: 4,
    name: "Самозанятый",
    label: "Договор с самозанятым водителем",
  },
];
let paymentParams = [
  { id: 1, name: "Наличные", label: "наличными" },
  { id: 2, name: "На банковскую карту", label: "на карту банка" },
  {
    id: 3,
    name: `Блиц-перевод (перевод через систему 
    мгновенных денежных переводов)`,
    label: "Блиц-перевод",
  },
  { id: 4, name: "Безналичный расчет", label: "на р/c" },
];
export { extraParams, contractParams, paymentParams };
