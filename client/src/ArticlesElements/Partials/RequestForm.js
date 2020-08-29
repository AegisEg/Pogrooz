// App
import React from "react";
import Input from "../../Elements/Input";
import Button from "../../Elements/Button";
import { connect } from "react-redux";
import * as myArticlesActions from "../../redux/actions/myarticles";
import { bindActionCreators } from "redux";
import { toast } from "react-toastify";
import LoadingFixed from "../../Elements/LoadingFixed";
import api from "../../config/api";
class RequestForm extends React.Component {
  state = {
    comment: "",
    date: false,
    timeFrom: false,
    timeTo: false,
    budget: 0,
    isFetching: false,
  };
  componentDidMount() {
    if (this.props.request) {
      this.setState({
        comment: this.props.request.comment,
        date: new Date(this.props.request.date),
        timeFrom: this.props.request.timeFrom
          ? new Date(this.props.request.timeFrom)
          : null,
        timeTo: this.props.request.timeTo
          ? new Date(this.props.request.timeTo)
          : null,
        budget: this.props.request.budget,
      });
    }
  }
  requestCreate = () => {
    if (!this.state.comment) {
      toast.error("Напишите коментарий");
      return 0;
    }
    if (!this.state.date) {
      toast.error("Необходимо ввести дату отправления");
      return 0;
    }
    this.setState({ isFetching: true }, () => {
      this.props.myArticlesActions
        .setRequest(this.props.article, {
          comment: this.state.comment,
          date: this.state.date,
          timeFrom: this.state.timeFrom,
          timeTo: this.state.timeTo,
          budget: this.state.budget,
        })
        .then(() => {
          this.setState({
            comment: "",
            date: false,
            timeFrom: false,
            timeTo: false,
            budget: 0,
            isFetching: false,
          });
        });
    });
  };
  requestSave = () => {
    if (!this.state.comment) {
      toast.error("Напишите коментарий");
      return 0;
    }
    if (!this.state.date) {
      toast.error("Необходимо ввести дату отправления");
      return 0;
    }
    this.setState({ isFetching: true }, () => {
      this.props.myArticlesActions
        .updateRequest(
          this.props.request._id,
          {
            comment: this.state.comment,
            date: this.state.date,
            timeFrom: this.state.timeFrom,
            timeTo: this.state.timeTo,
            budget: this.state.budget,
          },
          this.props.article
        )
        .then(() => {
          this.setState({
            comment: "",
            date: false,
            timeFrom: false,
            timeTo: false,
            budget: 0,
            isFetching: false,
          });
          this.props.endEdit();
        });
    });
  };
  render() {
    if (this.props.user.isAuth) {
      let canType;
      if (this.props.user.type === "cargo") canType = "offer";
      if (this.props.user.type === "carrier") canType = "order";
      let canRequest =
        this.props.user._id !== this.props.article.author._id &&
        this.props.article.type === canType;
      let isAlready = this.props.article.requests.find(
        (item) => item.author._id === this.props.user._id
      );
      if (canRequest || this.props.isEditing)
        return (
          <div className="article-block request-article-block form">
            <LoadingFixed isLoading={this.state.isFetching} />
            {isAlready && !this.props.isEditing && (
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
                  Вы уже оставили отклик по этой заявке!
                </div>
              </div>
            )}
            {(!isAlready || this.props.isEditing) && (
              <div className="container-fluid">
                <div className="mb-2">
                  <b className="f-14">
                    {this.props.isEditing
                      ? "Изменение отклика"
                      : "Напишите комментарий"}
                  </b>
                </div>
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <textarea
                      onChange={(e) => {
                        this.setState({ comment: e.target.value });
                      }}
                      value={this.state.comment}
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
                        value={this.state.date || null}
                        onChange={(val) => {
                          let state = { date: val };
                          if (this.state.timeFrom)
                            state.timeFrom = new Date(
                              val.getFullYear(),
                              val.getMonth(),
                              val.getDate(),
                              this.state.timeFrom.getHours(),
                              this.state.timeFrom.getMinutes(),
                              this.state.timeFrom.getSeconds()
                            );
                          if (this.state.timeTo)
                            state.timeTo = new Date(
                              val.getFullYear(),
                              val.getMonth(),
                              val.getDate(),
                              this.state.timeTo.getHours(),
                              this.state.timeTo.getMinutes(),
                              this.state.timeTo.getSeconds()
                            );
                          this.setState(state);
                        }}
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
                      <Input
                        type="number"
                        placeholder="0"
                        value={this.state.budget || ""}
                        onChange={(e) => {
                          this.setState({ budget: e.target.value });
                        }}
                        max="20000"
                      />
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
                      <Input
                        type="time"
                        date={this.state.date}
                        value={this.state.timeFrom || null}
                        onChange={(val) => {
                          this.setState({ timeFrom: val });
                        }}
                      />
                      <span className="filter-input-title mb-0">
                        &nbsp;&nbsp;-
                      </span>
                      <Input
                        type="time"
                        date={this.state.date}
                        value={this.state.timeTo || null}
                        onChange={(val) => {
                          this.setState({ timeTo: val });
                        }}
                      />
                    </div>
                    <Button
                      type="fill"
                      paddingVertical="11px"
                      className="mt-3 mx-md-auto mr-xl-3 ml-xl-auto mr-3 ml-3 mb-0 input-action send-input-action"
                      onClick={
                        this.props.isEditing
                          ? this.requestSave
                          : this.requestCreate
                      }
                    >
                      Отправить
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
    } else
      return (
        <div className="article-block request-article-block form">
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
        </div>
      );
    return <></>;
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    myArticlesActions: bindActionCreators(myArticlesActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RequestForm);
