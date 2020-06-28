// App
import React from "react";
import RequestModal from "../Modal/RequestModal.js";
import ReviewsFormModal from "../Modal/ReviewsFormModal.js";
import { withRouter } from "react-router-dom";
import ReviewsShow from "../Modal/ReviewsShow";
import ArrowDown from "../img/arrowDownperple.svg";
import ArrowDownPng from "../img/arrowDown.png";
import reviews from "../img/reviews.png";
import { Link } from "react-router-dom";
// Elements
import Button from "../Elements/Button";
class InputRow extends React.Component {
  constructor(props) {
    super(props);
    this.showActionList = this.showActionList.bind(this);
    this.hideActionList = this.hideActionList.bind(this);
  }
  state = {
    isOpenPopReviews: false,
    isOpenModalRequest: false,
    isOpenActionList: false,
  };

  buttons = [
    {
      /* Если Черновик или опубликовано */
      id: 1,
      label: "Удалить",
      status: [1, 2],
      isButton: true,
      ButtonType: "empty",
    },
    {
      /* Если статус опубликовано */
      id: 3,
      label: "Отменить",
      status: [2],
      isButton: true,
      ButtonType: "empty",
    },
    {
      /* Если статус Выбран исполнитель и это заказ */
      id: 4,
      label: "Отказаться от исполнителя",
      status: [3],
      articleType: 0,
      isButton: true,
      ButtonType: "empty",
    },
    {
      /* Если статус Выбран исполнитель и это заказ */
      id: 5,
      label: "Запросить отмену заказа",
      status: [3],
      articleType: 0,
      isButton: true,
      ButtonType: "empty",
    },
    {
      /* Если статус Выбран исполнитель и это предложение */
      id: 6,
      label: "Отказаться от грузовладельца",
      status: [3],
      articleType: 1,
      isButton: true,
      ButtonType: "empty",
    },
    {
      /* Если статус Выбран исполнитель и это предложение */
      id: 6,
      label: " Запросить отмену",
      status: [3],
      articleType: 1,
      isButton: true,
      ButtonType: "empty",
    },
    {
      /* Если статус Выбран исполнитель и это предложение */
      id: 7,
      label: "В пути",
      status: [3],
      articleType: 1,
      isButton: false,
      content: (
        <span className="pop-wrapper position-relative">
          <Button type="empty" className="border-yellow input-action">
            В пути
          </Button>
          <div className="pop-block on-my-way padding notAngle">
            <div className="padding pop-block-item-simple noborder f-14 nohref">
              Статус заказа сменится на “В&nbsp;пути”.
              <br /> Клиент сможет отслеживать местоположение груза.
            </div>
          </div>
        </span>
      ),
    },
    {
      id: 8,
      label: "Завершить",
      status: [4],
      isButton: true,
      ButtonType: "empty",
    },
    {
      id: 9,
      label: "Отследить",
      status: [4],
      isButton: true,
      articleType: 0,
      className: "border-yellow",
      ButtonType: "empty",
    },
    {
      id: 10,
      label: "Смотреть отзыв",
      status: [5, 6, 7],
      isButton: false,
      mobileAction: () => {
        this.ReviewsForm.openForm();
      },
      content: (
        <span className="reviews-pop input-action pop-wrapper">
          <img src={reviews} alt="reviews" />
          <div className="ml-2">Смотреть отзыв</div>
          <ReviewsShow onMobile={this.props.onMobile} />
        </span>
      ),
    },
    {
      id: 10,
      label: "Оставить отзыв",
      status: [5, 6],
      isButton: false,
      mobileAction: () => {
        this.ReviewsFormModal.openForm();
      },
      content: (
        <span className="position-relative">
          <Button
            type="empty"
            className="input-action"
            onClick={() => {
              this.ReviewsFormModal.openForm();
            }}
          >
            Оставить отзыв
          </Button>
          <ReviewsFormModal
            ref={(ref) => {
              this.ReviewsFormModal = ref;
            }}
            onMobile={this.props.onMobile}
            reviewsItems={[
              { id: 1, name: "Иванов Иван Иванович" },
              { id: 2, name: "Иванов Иван Иванович" },
            ]}
          />
        </span>
      ),
    },
    {
      id: 11,
      label: "Копировать",
      status: [5, 6],
      isButton: true,
      ButtonType: "empty",
    },
    {
      id: 12,
      label: "Смотреть",
      content: (
        <>
          {!this.props.onlyOpen && (
            <Link to={`/order/${this.props.article.id}`}>
              <Button type="empty" className="input-action">
                Смотреть
              </Button>
            </Link>
          )}
        </>
      ),
    },
    {
      /* Если статус черновик */
      id: 13,
      label: "Опубликовать",
      status: [1],
      isButton: true,
      ButtonType: "fill",
    },
    {
      id: 14,
      label: "Написать",
      status: [3, 4, 5, 6],
      isButton: true,
      ButtonType: "fill",
    },
    {
      id: 15,
      label: "Редактировать",
      status: [1, 2],
      isButton: true,
      ButtonType: "fill",
    },
    {
      id: 16,
      label: "Восстановить",
      status: [7],
      isButton: true,
      ButtonType: "empty",
    },
  ];
  showActionList() {
    this.setState({ isOpenActionList: true });
    document.addEventListener("click", this.hideActionList);
  }
  hideActionList() {
    this.setState({ isOpenActionList: false });
    document.removeEventListener("click", this.hideActionList);
  }
  render() {
    if (this.props.isManage)
      return (
        <>
          {this.props.onMobile && (
            <div className="action-list">
              <span onClick={this.showActionList}>
                Действия <img src={ArrowDownPng} alt="ArrowDownPng" />
              </span>
              {this.state.isOpenActionList && (
                <div className="pop-block">
                  {this.buttons.map((item, index) => {
                    if (
                      (!item.status ||
                        item.status.indexOf(this.props.article.status) != -1) &&
                      (!item.articleType ||
                        item.articleType == this.props.article.type)
                    ) {
                      return (
                        <div
                          className="profile-menu-item"
                          onClick={
                            item.mobileAction ? item.mobileAction : false
                          }
                        >
                          {item.label}
                        </div>
                      );
                    }
                  })}
                </div>
              )}
              <ReviewsShow
                ref={(ref) => {
                  this.ReviewsForm = ref;
                }}
                onMobile={this.props.onMobile}
              />
              <ReviewsFormModal
                ref={(ref) => {
                  this.ReviewsFormModal = ref;
                }}
                onMobile={this.props.onMobile}
                reviewsItems={[
                  { id: 1, name: "Иванов Иван Иванович" },
                  { id: 2, name: "Иванов Иван Иванович" },
                ]}
              />
            </div>
          )}
          {!this.props.onMobile &&
            this.buttons.map((item, index) => {
              if (
                (!item.status ||
                  item.status.indexOf(this.props.article.status) != -1) &&
                (!item.articleType ||
                  item.articleType == this.props.article.type)
              ) {
                if (item.isButton)
                  return (
                    <Button
                      type={item.ButtonType}
                      className={`input-action ${
                        item.className ? item.className : ""
                      }`}
                    >
                      {item.label}
                    </Button>
                  );
                else return item.content;
              }
            })}
          {!this.props.isMore && !this.props.onMobile && (
            <Link
              to="/"
              className="mr-3 d-640-none f-12 href more-click in-row-manage"
              onClick={this.props.eOpen}
            >
              {!this.props.articleOpen ? (
                <>Подробнее</>
              ) : (
                <>Скрыть подробности</>
              )}
              <img
                className="ml-2"
                src={ArrowDown}
                width="10"
                height="7"
                alt="ArrowDown"
              />
            </Link>
          )}
        </>
      );
    else if (!this.props.onlyOpen)
      return (
        <>
          {!this.props.onMobile && (
            <Link
              to="/"
              className="mr-3 d-640-none f-12 href more-click"
              onClick={this.props.eOpen}
            >
              {!this.props.articleOpen ? (
                <>Подробнее</>
              ) : (
                <>Скрыть подробности</>
              )}
              <img
                className="ml-2"
                src={ArrowDown}
                width="10"
                height="7"
                alt="ArrowDown"
              />
            </Link>
          )}
          {this.props.onMobile && (
            <div className="action-list">
              <span onClick={this.showActionList}>
                Действия <img src={ArrowDownPng} alt="ArrowDownPng" />
              </span>
              {this.state.isOpenActionList && (
                <div className="pop-block">
                  <Link to={`/order/${this.props.article.id}`}>
                    <div className="profile-menu-item">Смотреть</div>
                  </Link>
                  <div
                    className="profile-menu-item"
                    onClick={() => {
                      if (this.props.user.isAuth) {
                        this.setState({
                          isOpenModalRequest: !this.state.isOpenModalRequest,
                        });
                      } else this.props.history.push("/login");
                    }}
                  >
                    ВЗЯТЬ
                  </div>
                </div>
              )}
            </div>
          )}
          {!this.props.onMobile && (
            <>
              <Link to={`/order/${this.props.article.id}`}>
                <Button type="empty" className="input-action">
                  Смотреть
                </Button>
              </Link>
              <Button
                type="fill"
                className="get-article"
                paddingVertical={"8px"}
                paddingHorizontal={"35px"}
                fontSize={"14px"}
                onClick={() => {
                  if (this.props.user.isAuth) {
                    this.setState({
                      isOpenModalRequest: !this.state.isOpenModalRequest,
                    });
                  } else this.props.history.push("/login");
                }}
              >
                ВЗЯТЬ
              </Button>
              <RequestModal
                isOpen={this.state.isOpenModalRequest}
                onRequestClose={() => {
                  this.setState({ isOpenModalRequest: false });
                }}
              />
            </>
          )}
        </>
      );
    return false;
  }
}

export default withRouter(InputRow);
