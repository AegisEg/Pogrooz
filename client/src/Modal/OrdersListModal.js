// App
import React from "react";
import Modal from "react-modal";
import { ReactComponent as CloseSVG } from "../img/close.svg";
import Loading from "../Elements/Loading";
import { Scrollbars } from "react-custom-scrollbars";
import { CSSTransitionGroup } from "react-transition-group";
import settings from "../config/settings.js";
import api from "../config/api.js";
import { toast } from "react-toastify";
class OrdersListModal extends React.Component {
  constructor(props) {
    super(props);
    settings.stylesModals.content.padding = "25px 30px 20px";
  }
  state = {
    isOpen: false,
    isFetching: true,
    orders: false,
  };
  componentDidMount() {
    fetch(`${api.urlApi}/api/article/getMyArticles`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.apiToken}`,
      },
      body: JSON.stringify({
        status: 2,
        type: "my",
      }),
    })
      .then((response) => response.json())
      .then(({ error, errors, articles }) => {
        if (error)
          errors.map((item) => {
            toast.error(item.msg);
          });
        this.setState({ orders: articles, isFetching: false });
      });
  }
  closeForm = () => {
    this.setState({ isOpen: false });
  };
  openForm = () => {
    this.setState({ isOpen: true });
  };
  offerCargoOrder = (orderId) => {
    fetch(`${api.urlApi}/api/article/offerCargoOrder`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.apiToken}`,
      },
      body: JSON.stringify({
        userId: this.props.userId,
        orderId,
      }),
    })
      .then((response) => response.json())
      .then(({ error, errors }) => {
        if (!error) {
          toast.success("Предложение отправлено");
          this.closeForm();
        }
        if (error)
          errors.map((item) => {
            toast.error(item.msg);
          });
      });
  };
  render() {
    return (
      <Modal
        isOpen={this.state.isOpen}
        onRequestClose={this.closeForm}
        className="orders-modal"
      >
        <CSSTransitionGroup
          transitionName="height-animation-item"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={1}
          style={{
            display: "contents",
          }}
        >
          <Scrollbars
            renderTrackVertical={(props) => <div className="track-vertical" />}
            renderThumbVertical={(props) => <div className="thumb-vertical" />}
            className="scroll"
            autoHide
          >
            <Loading isLoading={this.state.isFetching}></Loading>

            {!this.state.isFetching && !!this.state.orders.length && (
              <div className="orders-item">
                {this.state.orders.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        this.offerCargoOrder(item._id);
                      }}
                    >
                      Заказ№ {item.articleId}
                    </div>
                  );
                })}
              </div>
            )}
            {!this.state.isFetching && !this.state.orders.length && (
              <div className="text-center mt-4">Нет опубликованных заказов</div>
            )}
          </Scrollbars>
        </CSSTransitionGroup>
        <CloseSVG
          className="close-svg"
          onClick={this.closeForm}
          className="close-svg"
        ></CloseSVG>
      </Modal>
    );
  }
}

export default OrdersListModal;
