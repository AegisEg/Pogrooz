// App
import React from "react";
import Input from "../Elements/Input";
import Button from "../Elements/Button";
import { connect } from "react-redux";

class RequestForm extends React.Component {
  render() {
    return (
      <div className="article-block request-article-block form">
        {this.props.user.isAuth && (
          <div className="container-fluid">
            <div className="mb-2">
              <b className="f-14">Напишите комментарий</b>
            </div>
            <div className="row align-items-center">
              <div className="col-md-6">
                <textarea
                  style={{
                    width: "100%",
                    height: "100px",
                  }}
                ></textarea>
              </div>
              <div className="col-md-12 col-lg-6 row mx-0 px-0 fields">
                <div
                  className="d-inline-flex col px-3 mt-3"
                  style={{
                    marginLeft: "0",
                    marginRight: "0",
                    alignItems: "center",
                    flexDirection: "row",
                    minWidth: "270px",
                  }}
                >
                  <span className="filter-input-title mb-0">
                    Дата<br></br>погрузки
                  </span>
                  <Input
                    type="date"
                    style={{ width: "130px" }}
                    placeholder="21.12.2020"
                  />
                </div>
                <div
                  className="d-inline-flex px-3 mt-3 budjet_div"
                  style={{
                    marginLeft: "0",
                    marginRight: "0",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <span className="filter-input-title mb-0">
                    Желаемый<br></br>бюджет, руб
                  </span>
                  <Input type="number" placeholder="0" max="20000" />
                </div>
                <div
                  className="d-inline-flex   px-3 mt-3"
                  style={{
                    marginLeft: "0",
                    marginRight: "0",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <span className="filter-input-title mb-0">
                    Время<br></br>погрузки
                  </span>
                  <Input type="time" placeholder="12:00" />
                  <span className="filter-input-title mb-0">&nbsp;&nbsp;-</span>
                  <Input type="time" placeholder="12:00" />
                </div>
                <Button
                  type="fill"
                  paddingVertical="11px"
                  className="mt-3 mx-md-auto mr-xl-3 ml-xl-auto mr-3 ml-3 mb-0 input-action send-input-action"
                >
                  Отправить
                </Button>
              </div>
            </div>
          </div>
        )}
        {!this.props.user.isAuth && (
          <div
            className="row mx-0 mt-4 justify-content-center"
            style={{ minHeight: "218px" }}
          >
            <div
              className="f-18 text-center px-3 mt-2"
              style={{
                maxWidth: "480px",
              }}
            >
              Чтобы отправить заявку войдите в личный кабинет. или
              зарегистрируйтесь на сайте и получите Тариф ДЕМО на 7 дней!
            </div>
            <div className="px-3 mt-2">
              <Button
                type="fill"
                margin={"0 0 0 auto"}
                paddingHorizontal={"25px"}
                paddingVertical={"12px"}
                className="input-action"
              >
                Попробовать
                <br />
                БЕСПЛАТНО
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(RequestForm);
