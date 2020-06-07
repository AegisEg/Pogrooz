// App
import React from "react";
import FAQ from "../Public/FAQ";

// Router
import { Link } from "react-router-dom";
import Button from "../../Elements/Button";
import Pagination from "../../Elements/Pagination";
import { connect } from "react-redux";
import Tarrifs from "../../Partials/Tarrifs";

class PayHistoryTable extends React.Component {
  render() {
    return (
      <div className="pay-history">
        <div className="row header-table">
          <div
            className="col"
            style={{
              maxWidth: "200px",
            }}
          >
            Дата оплаты
          </div>
          <div
            className="col"
            style={{
              maxWidth: "200px",
            }}
          >
            Способ оплаты
          </div>
          <div
            className="col"
            style={{
              maxWidth: "150px",
            }}
          >
            Тариф
          </div>
          <div
            className="col"
            style={{
              maxWidth: "110px",
            }}
          >
            Сумма
          </div>
          <div
            className="col"
            style={{
              maxWidth: "120px",
            }}
          >
            Срок
          </div>
          <div className="col">Дата действия</div>
          <div
            className="col"
            style={{
              maxWidth: "220px",
            }}
          >
            Статус
          </div>
        </div>
        <div className="row">
          <div
            className="col"
            style={{
              maxWidth: "200px",
            }}
          >
            18.12.2025 г
          </div>
          <div
            className="col"
            style={{
              maxWidth: "200px",
            }}
          >
            visa / master cart
          </div>
          <div
            className="col"
            style={{
              maxWidth: "150px",
            }}
          >
            Тариф PRO
          </div>
          <div
            className="col"
            style={{
              maxWidth: "110px",
            }}
          >
            280 руб
          </div>
          <div
            className="col"
            style={{
              maxWidth: "120px",
            }}
          >
            1 неделя
          </div>
          <div className="col">18.12.2025- 25.12.2025 г</div>
          <div
            className="col"
            style={{
              maxWidth: "220px",
            }}
          >
            <span className="left-angle yellow">Активен</span>
          </div>
        </div>
        <div className="row">
          <div
            className="col"
            style={{
              maxWidth: "200px",
            }}
          >
            18.12.2025 г
          </div>
          <div
            className="col"
            style={{
              maxWidth: "200px",
            }}
          >
            visa / master cart
          </div>
          <div
            className="col"
            style={{
              maxWidth: "150px",
            }}
          >
            Тариф PRO
          </div>
          <div
            className="col"
            style={{
              maxWidth: "110px",
            }}
          >
            280 руб
          </div>
          <div
            className="col"
            style={{
              maxWidth: "120px",
            }}
          >
            1 неделя
          </div>
          <div className="col">18.12.2025- 25.12.2025 г</div>
          <div
            className="col"
            style={{
              maxWidth: "220px",
            }}
          >
            <span className="left-angle yellow">Ожидает</span>
          </div>
        </div>

        <div className="row">
          <div
            className="col"
            style={{
              maxWidth: "200px",
            }}
          >
            18.12.2025 г
          </div>
          <div
            className="col"
            style={{
              maxWidth: "200px",
            }}
          >
            visa / master cart
          </div>
          <div
            className="col"
            style={{
              maxWidth: "150px",
            }}
          >
            Тариф PRO
          </div>
          <div
            className="col"
            style={{
              maxWidth: "110px",
            }}
          >
            280 руб
          </div>
          <div
            className="col"
            style={{
              maxWidth: "120px",
            }}
          >
            1 неделя
          </div>
          <div className="col">18.12.2025- 25.12.2025 г</div>
          <div
            className="col"
            style={{
              maxWidth: "220px",
            }}
          >
            <span className="left-angle gray">Использован</span>
          </div>
        </div>
        <Pagination className="mt-4" />
      </div>
    );
  }
}
class Support extends React.Component {
  state = {};
  render() {
    return (
      <div className="standart-page">
        <h2 className="title">Мои тариф</h2>
        <div className="row align-items-center">
          <p className="f-14 d-inline-block px-3">
            Тариф PRO оплачен до 25.12.2025 г
          </p>
          <div className="col">
            <Button type="fill" paddingVertical="6px">
              <span className="f-12">Пополнить</span>
            </Button>
          </div>
        </div>
        <h3 className="f-16 font-weight-normal">История пополнений</h3>
        <PayHistoryTable />
        <h3 className="f-16 font-weight-normal mt-4">Продлить тариф</h3>
        <Tarrifs />
        <span className="f-14">Тарификация понедельная.</span>
        <p className="f-12 mt-0">
          *Расчет стоимости дня произведен из расчета 30 дней а месяц,
          указывается в ознакомительных целях.
        </p>
        <span className="mb-4 d-block">
          <Link to="/autopay">Настройка автоплатежа</Link>
        </span>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Support);
