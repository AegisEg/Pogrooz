// App
import React from "react";
// Elements
import Button from "./Button";
var tarrifs = [
  {
    name: "Тариф ДЕМО",
    price: 0,
    tags: ["1 неделя", "20 руб в день"],
  },
  {
    name: "Тариф PRO",
    price: 140,
    tags: ["1 неделя", "20 руб в день"],
  },
  {
    name: "Тариф PRO",
    price: 600,
    tags: ["1 неделя", "20 руб в день"],
  },
  {
    name: "Тариф PRO",
    price: 1620,
    sale: 10,
    tags: ["1 неделя", "20 руб в день"],
  },
  {
    name: "Тариф PRO",
    price: 3060,
    sale: 15,
    tags: ["1 неделя", "20 руб в день"],
  },
  {
    name: "Тариф PRO",
    price: 5760,
    sale: 20,
    tags: ["1 неделя", "20 руб в день"],
  },
];
class Tarrifs extends React.Component {
  render() {
    return (
      <div className={`row tarrifs-list ${this.props.className}`}>
        {tarrifs.map((item, index) => {
          let priceWithSale = item.sale
            ? item.price - item.price * (item.sale / 100)
            : item.price;
          return (
            <div key={index} className="col-2">
              <div className={`tarrif ${item.sale ? `yellow` : ``}`}>
                <div className="info">
                  <div className="d-flex justify-content-between">
                    <span className="name">{item.name}</span>
                    {item.sale && (
                      <span className="withoutSale"> {item.price} руб </span>
                    )}
                  </div>
                  <span className="price">
                    {priceWithSale !== 0 ? priceWithSale + " руб" : "Бесплатно"}
                  </span>
                  {item.sale && (
                    <span className="sale">Скидка {item.sale}% </span>
                  )}
                  <div className="tags">
                    {item.tags.map((item, index) => {
                      return (
                        <span key={index} className="left-angle mt-1">
                          {item}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="text-center">
                  <Button type={`${item.sale ? `empty` : `fill`}  `}>
                    Оплатить
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Tarrifs;
