// App
import React from "react";
import Modal from "react-modal";
import Button from "../Elements/Button";
import Input from "../Elements/Input";
import settings from "../config/settings.js";
import { ReactComponent as CloseSVG } from "../img/close.svg";
import { toast } from "react-toastify";
class RequestModal extends React.Component {
  constructor(props) {
    super(props);
    settings.stylesModals.content.padingBottom = "37px";
  }
  state = {
    comment: "",
    date: false,
    timeFrom: false,
    timeTo: false,
    budget: 0,
    isFetching: false,
  };
  requestCreate = () => {
    if (!this.state.comment) {
      toast.error("Напишите коментарий");
      return 0;
    }
    if (!this.state.date) {
      toast.error("Необходимо ввести дату отправления");
      return 0;
    }
    if (!this.state.isFetching)
      this.setState({ isFetching: true }, () => {
        this.props
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
            this.props.onRequestClose();
          });
      });
  };
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        className="request-modal"
        style={settings.stylesModals}
      >
        <div className="mb-2">
          <b className="f-14">Напишите комментарий</b>
        </div>
        <div className="row align-items-center">
          <div className="col-12">
            <textarea
              style={{
                width: "100%",
                height: "100px",
              }}
              value={this.state.comment}
              maxLength="1500"
              onChange={(e) => {
                this.setState({ comment: e.target.value });
              }}
            ></textarea>
          </div>
          <div className="col-12 row mx-0 px-0 fields align-items-center">
            <div
              className="d-inline-flex col px-3 mt-3"
              style={{
                marginLeft: "0",
                marginRight: "0",
                alignItems: "center",
                flexDirection: "row",
                minWidth: "230px",
                maxWidth: "210px",
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
              <span className="filter-input-title mb-0">&nbsp;&nbsp;-</span>
              <Input
                type="time"
                date={this.state.date}
                value={this.state.timeTo || null}
                onChange={(val) => {
                  this.setState({ timeTo: val });
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
            <Button
              type="fill"
              paddingVertical="11px"
              paddingHorizontal="36px"
              className="mt-3 ml-auto mr-3 input-action"
              onClick={this.requestCreate}
            >
              Отправить
            </Button>
          </div>
        </div>
        <CloseSVG
          className="close-svg"
          onClick={this.props.onRequestClose}
          className="close-svg"
        ></CloseSVG>
      </Modal>
    );
  }
}

export default RequestModal;
