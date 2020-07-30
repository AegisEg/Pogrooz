// App
import React from "react";
import RequestModal from "../Modal/RequestModal.js";
import ReviewsFormModal from "../Modal/ReviewsFormModal.js";
import { withRouter } from "react-router-dom";
import ReviewsShow from "../Modal/ReviewsShow";
import ArrowDown from "../img/arrowDownperple.svg";
import ArrowDownPng from "../img/arrowDown.png";
import { Link } from "react-router-dom";
// Elements
import Button from "../Elements/Button";
//IMG ACTION
import { ReactComponent as Trash } from "../img/trash.svg";
import { ReactComponent as Otmena } from "../img/otmena.svg";
import { ReactComponent as ExecutorCancel } from "../img/executor-cancel.svg";
import { ReactComponent as Refresh } from "../img/refresh.svg";
import { ReactComponent as CanselRequest } from "../img/canselRequest.svg";
import { ReactComponent as CompletedAction } from "../img/completedAction.svg";
import { ReactComponent as Raiting } from "../img/raiting.svg";
import { ReactComponent as Reviews } from "../img/reviews.svg";
import { ReactComponent as GeoDetect } from "../img/geo-detect.svg";
import { ReactComponent as Clone } from "../img/clone.svg";
import { ReactComponent as LookHire } from "../img/sid-view.svg";
import { ReactComponent as YellowAngle } from "../img/yellowAngle.svg";
import { ReactComponent as Chat } from "../img/chat.svg";
import { ReactComponent as Edit } from "../img/edit.svg";

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
      img: Trash,
      status: [1, 2],
      isButton: true,
      ButtonType: "empty",
    },
    {
      /* Если статус опубликовано */
      id: 3,
      label: "Отменить",
      img: Otmena,
      status: [2],
      isButton: true,
      ButtonType: "empty",
    },
    {
      /* Если статус Выбран исполнитель и это заказ */
      id: 4,
      label: "Отказаться от исполнителя",
      status: [3],
      img: ExecutorCancel,
      articleType: 0,
      isButton: true,
      ButtonType: "empty",
    },
    {
      /* Если статус Выбран исполнитель и это заказ */
      id: 5,
      label: "Запросить отмену заказа",
      status: [3],
      img: Refresh,
      articleType: 0,
      isButton: true,
      ButtonType: "empty",
    },
    {
      /* Если статус Выбран исполнитель и это предложение */
      id: 6,
      label: "Отказаться от грузовладельца",
      status: [3],
      img: ExecutorCancel,
      articleType: 1,
      isButton: true,
      ButtonType: "empty",
    },
    {
      /* Если статус Выбран исполнитель и это предложение */
      id: 6,
      label: " Запросить отмену",
      img: CanselRequest,
      status: [3],
      articleType: 1,
      isButton: true,
      ButtonType: "empty",
    },
    {
      /* Если статус Выбран исполнитель и это предложение */
      id: 7,
      label: "В пути",
      img: GeoDetect,
      status: [3],
      // articleType: 1,
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
      img: CompletedAction,
      status: [4],
      isButton: true,
      ButtonType: "empty",
    },
    {
      id: 9,
      label: "Отследить",
      img: GeoDetect,
      status: [4],
      isButton: true,
      articleType: 0,
      className: "border-yellow",
      ButtonType: "empty",
    },
    {
      id: 10,
      label: "Смотреть отзыв",
      img: Raiting,
      status: [5, 6, 7],
      isButton: false,
      mobileAction: () => {
        this.ReviewsForm.openForm();
      },
      content: (
        <span className="reviews-pop input-action pop-wrapper">
          <Raiting></Raiting>
          <div className="ml-2">Смотреть отзыв</div>
          <ReviewsShow onMobile={this.props.onMobile} />
        </span>
      ),
    },
    {
      id: 10,
      label: "Оставить отзыв",
      status: [5, 6],
      img: Reviews,
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
              this.ReviewsFormModal.toogleform();
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
      img: Clone,
      status: [5, 6],
      isButton: true,
      ButtonType: "empty",
    },
    {
      id: 12,
      label: "Смотреть",
      img: LookHire,
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
      img: YellowAngle,
      isButton: true,
      ButtonType: "fill",
    },
    {
      id: 14,
      label: "Написать",
      img: Chat,
      status: [3, 4, 5, 6],
      isButton: true,
      ButtonType: "fill",
    },
    {
      id: 15,
      label: "Редактировать",
      img: Edit,
      status: [1, 2],
      isButton: true,
      ButtonType: "fill",
    },
    {
      id: 16,
      label: "Восстановить",
      img: Refresh,
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
                          key={index}
                          onClick={
                            item.mobileAction ? item.mobileAction : () => {}
                          }
                        >
                          <item.img></item.img>
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
                      key={index}
                      type={item.ButtonType}
                      className={`input-action ${
                        item.className ? item.className : ""
                      }`}
                    >
                      {item.label}
                    </Button>
                  );
                else
                  return (
                    <div key={index} style={{ display: "contents" }}>
                      {item.content}
                    </div>
                  );
              }
            })}
          {!this.props.isMore && !this.props.onMobile && !this.props.onlyOpen && (
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
            </>
          )}
          <RequestModal
            isOpen={this.state.isOpenModalRequest}
            onRequestClose={() => {
              this.setState({ isOpenModalRequest: false });
            }}
          />
        </>
      );
    return false;
  }
}

export default withRouter(InputRow);
