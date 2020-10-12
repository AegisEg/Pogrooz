import React from "react";
import Pagination from "../Elements/Pagination";
import Loading from "../Elements/Loading";
import { CSSTransitionGroup } from "react-transition-group";
import { prettyDate } from "../controllers/TimeController";
import api from "../config/api";
class PayHistoryTable extends React.Component {
  state = {
    payments: false,
    isFetching: true,
    currentPage: 0,
    countAll: false,
  };
  componentDidMount() {
    this.getPaymentHistory(0);
  }
  getPaymentHistory = (page) => {
    this.setState({ currentPage: page, isFetching: true }, () => {
      fetch(`${api.urlApi}/api/tariffs/payments`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.user.apiToken}`,
        },
        body: JSON.stringify({ page: page }),
      })
        .then((response) => response.json())
        .then(({ payments, countAll }) => {
          this.setState({ isFetching: false, payments, countAll: countAll });
        });
    });
  };
  render() {
    return (
      <div className="pay-history">
        <Loading isLoading={this.state.isFetching} />
        <CSSTransitionGroup
          transitionName="height-animation-item"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={1}
          style={{
            display: "contents",
          }}
        >
          {!this.state.isFetching && this.state.payments && (
            <>
              <h3 className="f-16 font-weight-normal mt-3">
                История пополнений
              </h3>
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
                    {!this.state.payments.length && (
                      <tr className="text-center">
                        <td colSpan="7
                        "> Пусто</td>
                      </tr>
                    )}
                    {this.state.payments.map((item, index, items) => {
                      let duration;
                      if (item.tariff) {
                        if (item.tariff.duration <= 28) {
                          duration = item.tariff.duration / 7;
                          if (duration > 1) duration += " недели";
                          else duration += " неделя";
                        }
                        if (item.tariff.duration > 28) {
                          duration = prettyDate(item.tariff.duration / 30);
                        }
                      }
                      return (
                        <tr key={index}>
                          <th scope="row">
                            {new Date(item.updatedAt).toDateR()}
                          </th>
                          <td>
                            {item.tariff && "visa / master cart"}
                            {item.ban && "----------------"}
                          </td>
                          <td>
                            {item.tariff && item.tariff.name}
                            {item.ban && "Возврат"}
                          </td>
                          <td>
                            {item.tariff && (
                              <>
                                {item.tariff.price -
                                  (item.tariff.price * item.tariff.discount) /
                                    100}
                                руб
                              </>
                            )}
                          </td>
                          <td>{item.tariff && duration}</td>
                          <td>
                            {new Date(item.startedAt).toDateR()} -{" "}
                            {new Date(item.expiriesAt).toDateR()} г
                          </td>
                          <td>
                            <span className="left-angle yellow">
                              {new Date(item.expiriesAt) > new Date() &&
                                !(
                                  !!index &&
                                  new Date(items[index - 1].expiriesAt) >
                                    new Date()
                                ) &&
                                "Активен"}
                              {new Date(item.expiriesAt) > new Date() &&
                                !!index &&
                                new Date(items[index - 1].expiriesAt) >
                                  new Date() &&
                                "Ожидает"}
                              {new Date(item.expiriesAt) < new Date() &&
                                "Использован"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {!!this.state.payments.length && (
                <Pagination
                  currentPage={this.state.currentPage}
                  pageCount={this.state.countAll - 1}
                  onPageChange={this.getPaymentHistory}
                />
              )}
            </>
          )}
        </CSSTransitionGroup>
      </div>
    );
  }
}
export default PayHistoryTable;
