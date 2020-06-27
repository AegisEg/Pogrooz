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
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Дата оплаты</th>
                <th>Способ оплаты</th>
                <th>Тариф</th>
                <th>Сумма</th>
                <th>Срок</th>
                <th>Дата действия</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row"> 18.12.2025 г</th>
                <td>visa / master cart</td>
                <td>Тариф PRO</td>
                <td>280 руб</td>
                <td>1 неделя</td>
                <td>18.12.2025- 25.12.2025 г</td>
                <td>
                  <span className="left-angle yellow">Активен</span>
                </td>
              </tr>
              <tr>
                <th scope="row"> 18.12.2025 г</th>
                <td>visa / master cart</td>
                <td>Тариф PRO</td>
                <td>280 руб</td>
                <td>1 неделя</td>
                <td>18.12.2025- 25.12.2025 г</td>
                <td>
                  <span className="left-angle yellow">Ожидает</span>
                </td>
              </tr>
              <tr>
                <th scope="row"> 18.12.2025 г</th>
                <td>visa / master cart</td>
                <td>Тариф PRO</td>
                <td>280 руб</td>
                <td>1 неделя</td>
                <td>18.12.2025- 25.12.2025 г</td>
                <td>
                  <span className="left-angle gray">Использован</span>
                </td>
              </tr>
            </tbody>
          </table>
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
        <div className="container-fluid">
          <h2 className="title">Мои тариф</h2>
          <div className="row align-items-center">
            <p className="f-14 mt-2 d-inline-block px-3">
              Тариф PRO оплачен до 25.12.2025 г
            </p>
            <div className="col mt-2">
              <Button type="fill" className="f-12" paddingVertical="6px">
                Пополнить
              </Button>
            </div>
          </div>
          <h3 className="f-16 font-weight-normal mt-2">История пополнений</h3>
          <PayHistoryTable />
          <h3 className="f-16 font-weight-normal mt-4">Продлить тариф</h3>
          <Tarrifs />
          <span className="f-14">Тарификация понедельная.</span>
          <p className="f-12 mt-0">
            *Расчет стоимости дня произведен из расчета 30 дней а месяц,
            указывается в ознакомительных целях.
          </p>
          <span className="mb-4 mt-2 d-block">
            <Link
              to="/autopay"
              className="f-14 href-hover"
              style={{
                color: "#000",
              }}
            >
              Настройка автоплатежа
            </Link>
          </span>
        </div>
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
