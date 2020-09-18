// App
import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as myArticlesActions from "../../redux/actions/myarticles";
import { bindActionCreators } from "redux";
// Elements
import Button from "../../Elements/Button";
import LoadingFixed from "../../Elements/LoadingFixed";
import CompleteModal from "../../Modal/CompleteModal";
//MODAL
import DialogsModal from "../../Modal/DialogsModal";
import CancelsModal from "../../Modal/CancelsModal";
import DeliverModal from "../../Modal/DeliverModal";
import RequestModal from "../../Modal/RequestModal.js";
import ReviewsFormModal from "../../Modal/ReviewsFormModal.js";
//MODAL
//IMG ACTION
import { ReactComponent as Trash } from "../../img/trash.svg";
import { ReactComponent as Otmena } from "../../img/otmena.svg";
import { ReactComponent as ExecutorCancel } from "../../img/executor-cancel.svg";
import { ReactComponent as Refresh } from "../../img/refresh.svg";
import { ReactComponent as CompletedAction } from "../../img/completedAction.svg";
import { ReactComponent as Reviews } from "../../img/reviews.svg";
import { ReactComponent as GeoDetect } from "../../img/geo-detect.svg";
import { ReactComponent as Clone } from "../../img/clone.svg";
import { ReactComponent as LookHire } from "../../img/sid-view.svg";
import { ReactComponent as YellowAngle } from "../../img/yellowAngle.svg";
import { ReactComponent as Chat } from "../../img/chat.svg";
import { ReactComponent as Edit } from "../../img/edit.svg";
import ReviewsShow from "../../Modal/ReviewsShow";
import ArrowDown from "../../img/arrowDownperple.svg";
import ArrowDownPng from "../../img/arrowDown.png";

class InputRow extends React.Component {
  constructor(props) {
    super(props);
    this.role = false;
  }
  state = {
    isOpenPopReviews: false,
    isOpenModalRequest: false,
    isOpenActionList: false,
    isOpenReviewsShow: false,
    isFetching: false,
    notDelivered: false,
  };
  showActionList = () => {
    this.setState({ isOpenActionList: true });
    document.addEventListener("click", this.hideActionList);
  };
  hideActionList = () => {
    this.setState({ isOpenActionList: false });
    document.removeEventListener("click", this.hideActionList);
  };
  showReviewsShow = () => {
    this.setState({ isOpenReviewsShow: true });
    document.addEventListener("click", this.hideReviewsShow);
  };
  hideReviewsShow = (e) => {
    if (
      e &&
      document.getElementById("review-show") &&
      !document.getElementById("review-show").contains(e.target)
    ) {
      this.setState({ isOpenReviewsShow: false });
      document.removeEventListener("click", this.hideReviewsShow);
    }
  };
  reCalculate = () => {
    let users =
      this.role == 1
        ? this.props.article.executors
        : [this.props.article.author];
    let delivered = this.props.article.delivered || [];
    users = users.filter(
      (item) => !delivered.find((itemX) => item._id === itemX)
    );

    if (
      !this.state.notDelivered ||
      this.state.notDelivered.length > users.length
    )
      this.setState({ notDelivered: users });
  };
  componentDidUpdate() {
    this.reCalculate();
  }
  componentDidMount() {
    this.reCalculate();
  }

  buttons = [
    /*Роли показа
       /0 всем
       /1 автор
       /2 - исполнитель
       */
    //Удалить
    {
      id: 1,
      label: "Удалить",
      role: 1,
      condition: (options) => {
        return !options.article.executors.length;
      },
      img: Trash,
      status: [1, 2],
      isButton: true,
      ButtonType: "empty",
      mobileAction: () => {
        this.setState({ isFetching: true }, () => {
          this.props.myArticlesActions
            .deleteMyArticle(this.props.article, this.props.user.apiToken)
            .then((data) => {
              this.setState({ isFetching: false });
            });
        });
      },
      action: () => {
        this.setState({ isFetching: true }, () => {
          this.props.myArticlesActions
            .deleteMyArticle(this.props.article, this.props.user.apiToken)
            .then((data) => {
              this.setState({ isFetching: false });
            });
        });
      },
    },
    //Укомплектовать предложение
    {
      id: 16,
      label: "Укомплектовать предложение",
      role: 1,
      img: Otmena,
      condition: (options) => {
        return (
          !!options.article.executors.length && options.article.type === "offer"
        );
      },
      mobileAction: () => {
        this.setState({ isFetching: true }, () => {
          this.props.myArticlesActions
            .equipMyArticle(this.props.article, this.props.user.apiToken)
            .then((data) => {
              this.setState({ isFetching: false });
            });
        });
      },
      action: () => {
        this.setState({ isFetching: true }, () => {
          this.props.myArticlesActions
            .equipMyArticle(this.props.article, this.props.user.apiToken)
            .then((data) => {
              this.setState({ isFetching: false });
            });
        });
      },
      status: [2],
      isButton: true,
      ButtonType: "fill",
    },
    //Отменить
    {
      /* Если статус опубликовано */
      id: 3,
      label: "В черновик",
      role: 1,
      condition: (options) => {
        return !options.article.executors.length;
      },
      mobileAction: () => {
        this.setState({ isFetching: true }, () => {
          this.props.myArticlesActions
            .draftMyArticle(this.props.article, this.props.user.apiToken)
            .then((data) => {
              this.setState({ isFetching: false });
            });
        });
      },
      action: () => {
        this.setState({ isFetching: true }, () => {
          this.props.myArticlesActions
            .draftMyArticle(this.props.article, this.props.user.apiToken)
            .then((data) => {
              this.setState({ isFetching: false });
            });
        });
      },
      img: Otmena,
      status: [2],
      isButton: true,
      ButtonType: "empty",
    },
    //Отказаться от исполнителя
    {
      id: 4,
      label: "Отказаться от исполнителя",
      role: 1,
      condition: (options) => {
        return options.article.type === "order";
      },
      status: [3],
      action: () => {
        this.setState({ isFetching: true }, () => {
          this.props.myArticlesActions
            .deleteExecutor(this.props.article, this.props.article.executors[0])
            .then((data) => {
              this.setState({ isFetching: false });
            });
        });
      },
      mobileAction: () => {
        this.setState({ isFetching: true }, () => {
          this.props.myArticlesActions
            .deleteExecutor(this.props.article, this.props.article.executors[0])
            .then((data) => {
              this.setState({ isFetching: false });
            });
        });
      },
      img: ExecutorCancel,
      isButton: true,
      ButtonType: "empty",
    },
    //Запросить отмену
    {
      id: 5,
      label: "Запросить отмену",
      role: 2,
      condition: (options) => {
        return options.article.executors.find((item) => {
          return item._id === options.user._id;
        });
      },
      status: [3],
      action: () => {
        this.setState({ isFetching: true }, () => {
          this.props.myArticlesActions
            .setRequestCancel(
              this.props.article,
              this.props.user,
              this.props.user.apiToken
            )
            .then((data) => {
              this.setState({ isFetching: false });
            });
        });
      },
      mobileAction: () => {
        this.setState({ isFetching: true }, () => {
          this.props.myArticlesActions
            .setRequestCancel(
              this.props.article,
              this.props.user,
              this.props.user.apiToken
            )
            .then((data) => {
              this.setState({ isFetching: false });
            });
        });
      },
      img: Refresh,
      isButton: true,
      ButtonType: "empty",
    },
    //Отказаться от грузовладельца
    {
      id: 6,
      label: "Отказаться от грузовладельца",
      role: 1,
      status: [3],
      condition: (options) => {
        return !this.props.onlyOpen && options.article.type === "offer";
      },
      action: () => {
        if (this.props.article.executors.length === 1)
          this.setState({ isFetching: true }, () => {
            this.props.myArticlesActions
              .deleteExecutor(
                this.props.article,
                this.props.article.executors[0]
              )
              .then((data) => {
                this.setState({ isFetching: false });
              });
          });
        else this.CancelsModal.openForm();
      },
      mobileAction: () => {
        if (this.props.article.executors.length === 1)
          this.setState({ isFetching: true }, () => {
            this.props.myArticlesActions
              .deleteExecutor(
                this.props.article,
                this.props.article.executors[0]
              )
              .then((data) => {
                this.setState({ isFetching: false });
              });
          });
        else this.CancelsModal.openForm();
      },
      img: ExecutorCancel,
      isButton: true,
      ButtonType: "empty",
    },
    //Отметка о доставке
    {
      id: 6,
      label: "Доставлено",
      status: [4],
      condition: (options) => {
        return (
          options.user.type === "carrier" &&
          this.state.notDelivered &&
          !!this.state.notDelivered.length
        );
      },
      action: () => {
        if (this.state.notDelivered.length === 1)
          this.setState({ isFetching: true }, () => {
            this.props.myArticlesActions
              .setDeliveredMyArticle(
                this.props.article,
                this.state.notDelivered[0],
                this.props.user.apiToken
              )
              .then((data) => {
                this.setState({ isFetching: false });
              });
          });
        else this.DeliverModal.openForm();
      },
      mobileAction: () => {
        if (this.state.notDelivered.length === 1)
          this.props.myArticlesActions
            .setDeliveredMyArticle(
              this.props.article,
              this.state.notDelivered[0],
              this.props.user.apiToken
            )
            .then((data) => {
              this.setState({ isFetching: false });
            });
        else this.DeliverModal.openForm();
      },
      img: ExecutorCancel,
      isButton: true,
      ButtonType: "empty",
    },
    //В пути
    {
      id: 7,
      label: "В пути",
      img: GeoDetect,
      status: [3],
      condition: (options) => {
        return options.user.type === "carrier";
      },
      mobileAction: () => {
        this.setState({ isFetching: true }, () => {
          this.props.myArticlesActions
            .onWayMyArticle(
              this.props.article,
              this.props.user.apiToken,
              this.props.article.author._id === this.props.user._id
            )
            .then((data) => {
              this.setState({ isFetching: false });
            });
        });
      },
      isButton: false,
      content: () => (
        <span className="pop-wrapper position-relative">
          <Button
            type="empty"
            className="border-yellow input-action"
            onClick={() => {
              this.setState({ isFetching: true }, () => {
                this.props.myArticlesActions
                  .onWayMyArticle(
                    this.props.article,
                    this.props.user.apiToken,
                    this.props.article.author._id !== this.props.user._id
                  )
                  .then((data) => {
                    this.setState({ isFetching: false });
                  });
              });
            }}
          >
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
    //Завершить
    {
      id: 8,
      label: "Завершить",
      role: 1,
      condition: (options) => {
        if (this.role == 1)
          return (
            options.article.delivered &&
            options.article.delivered.length ===
              options.article.executors.length
          );
        if (this.role == 1)
          return (
            options.article.delivered && options.article.delivered.length === 1
          );
        return false;
      },
      img: CompletedAction,
      action: () => {
        this.CompleteModal.openForm();
      },
      mobileAction: () => {
        this.CompleteModal.openForm();
      },
      status: [4],
      isButton: true,
      ButtonType: "empty",
    },
    //Отследить
    {
      id: 9,
      label: "Отследить",
      condition: (options) => {
        return (
          options.user.type === "cargo" &&
          (!options.article.delivered ||
            !options.article.delivered.find(
              (item) => item === options.user._id
            ))
        );
      },
      img: GeoDetect,
      status: [4],
      isButton: true,
      className: "border-yellow",
      ButtonType: "empty",
    },
    //Смотреть отзыв
    {
      id: 10,
      label: "Смотреть отзыв",
      img: Reviews,
      status: [5, 6],
      isButton: false,
      condition: (options) => {
        return !!options.article.reviews.find(
          (item) => item.user._id === options.user._id
        );
      },
      mobileAction: () => {
        this.ReviewsForm.openForm();
      },
      content: () => (
        <span
          className={`reviews-pop input-action ${
            this.state.isOpenReviewsShow ? "open" : ""
          }`}
        >
          <span className="d-flex" onClick={this.showReviewsShow}>
            <Reviews />
            <div className="ml-2">Смотреть отзыв</div>
          </span>
          <ReviewsShow
            reviews={this.props.article.reviews.filter(
              (item) => item.user._id === this.props.user._id
            )}
            onMobile={this.props.onMobile}
          />
        </span>
      ),
    },
    //Оставить отзыв
    {
      id: 22,
      label: "Оставить отзыв",
      status: [5, 6],
      img: Reviews,
      isButton: false,
      mobileAction: () => {
        this.ReviewsFormModal.openForm();
      },
      content: () => (
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
            reviews={this.props.article.reviews}
            article={this.props.article}
            reviewsItems={
              this.props.article.author._id === this.props.user._id
                ? this.props.article.executors
                : [this.props.article.author]
            }
          />
        </span>
      ),
    },
    //Копировать
    {
      id: 11,
      label: "Копировать",
      role: 1,
      action: () => {
        this.setState({ isFetching: true }, () => {
          this.props.myArticlesActions
            .copyMyArticle(this.props.article, this.props.user.apiToken)
            .then((data) => {
              this.setState({ isFetching: false });
            });
        });
      },
      mobileAction: () => {
        this.setState({ isFetching: true }, () => {
          this.props.myArticlesActions
            .completeMyArticle(this.props.article, this.props.user.apiToken)
            .then((data) => {
              this.setState({ isFetching: false });
            });
        });
      },
      img: Clone,
      status: [5, 6],
      isButton: true,
      ButtonType: "empty",
    },
    //Смотреть
    {
      id: 12,
      label: "Смотреть",
      img: LookHire,
      content: () => (
        <>
          {!this.props.onlyOpen && (
            <Link
              to={`/${this.props.article.type}/${this.props.article.articleId}`}
            >
              <Button type="empty" className="input-action">
                Смотреть
              </Button>
            </Link>
          )}
        </>
      ),
    },
    //Опубликовать
    {
      id: 13,
      label: "Опубликовать",
      status: [1],
      role: 1,
      img: YellowAngle,
      isButton: true,
      ButtonType: "fill",
      mobileAction: () => {
        this.setState({ isFetching: true }, () => {
          this.props.myArticlesActions
            .publicMyArticle(this.props.article, this.props.user.apiToken)
            .then((data) => {
              this.setState({ isFetching: false });
            });
        });
      },
      action: () => {
        this.setState({ isFetching: true }, () => {
          this.props.myArticlesActions
            .publicMyArticle(this.props.article, this.props.user.apiToken)
            .then((data) => {
              this.setState({ isFetching: false });
            });
        });
      },
    },
    //Написать в заказе
    {
      id: 14,
      label: "Написать",
      img: Chat,
      status: [3, 4, 5, 6],
      isButton: true,
      condition: (options) => {
        return options.article.type === "order";
      },
      action: () => {
        if (this.role === 1)
          this.props.history.push(
            `/dialog-order/${this.props.article._id}/${this.props.article.executors[0]._id}`
          );
        if (this.role === 2)
          this.props.history.push(
            `/dialog-order/${this.props.article._id}/${this.props.article.author._id}`
          );
      },
      mobileAction: () => {
        if (this.role === 1)
          this.props.history.push(
            `/dialog-order/${this.props.article._id}/${this.props.article.executors[0]._id}`
          );
        if (this.role === 2)
          this.props.history.push(
            `/dialog-order/${this.props.article._id}/${this.props.article.author._id}`
          );
      },
      ButtonType: "fill",
    },
    //Написать в предлдожении
    {
      id: 14,
      label: "Написать",
      img: Chat,
      status: [3, 4, 5, 6],
      isButton: true,
      condition: (options) => {
        return (
          options.article.type === "offer" &&
          (!this.props.onlyOpen || this.role === 2)
        );
      },
      action: () => {
        if (this.role === 1) {
          if (this.props.article.executors.length === 1)
            this.props.history.push(
              `/dialog-order/${this.props.article._id}/${this.props.article.executors[0]._id}`
            );
          else this.DialogsModal.openForm();
        }
        if (this.role === 2)
          this.props.history.push(
            `/dialog-order/${this.props.article._id}/${this.props.article.author._id}`
          );
      },
      mobileAction: () => {
        if (this.role === 1) {
          if (this.props.article.executors.length === 1)
            this.props.history.push(
              `/dialog-order/${this.props.article._id}/${this.props.article.executors[0]._id}`
            );
          else this.DialogsModal.openForm();
        }
        if (this.role === 2)
          this.props.history.push(
            `/dialog-order/${this.props.article._id}/${this.props.article.author._id}`
          );
      },
      ButtonType: "fill",
    },
    {
      id: 15,
      label: "Редактировать",
      img: Edit,
      condition: (options) => {
        return options.article.author._id === options.user._id;
      },
      action: () => {
        this.props.history.push(
          `/edit-${this.props.article.type}/${this.props.article.articleId}`
        );
      },
      mobileAction: () => {
        this.props.history.push(
          `/edit-${this.props.article.type}/${this.props.article.articleId}`
        );
      },
      status: [2],
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
      mobileAction: () => {
        this.setState({ isFetching: true }, () => {
          this.props.myArticlesActions
            .restoreMyArticle(this.props.article, this.props.user.apiToken)
            .then((data) => {
              this.setState({ isFetching: false });
            });
        });
      },
      action: () => {
        this.setState({ isFetching: true }, () => {
          this.props.myArticlesActions
            .restoreMyArticle(this.props.article, this.props.user.apiToken)
            .then((data) => {
              this.setState({ isFetching: false });
            });
        });
      },
    },
  ];

  render() {
    let role = false;
    if (this.props.user.isAuth) {
      if (this.props.user._id === this.props.article.author._id) role = 1;
      console.log(this.props.article);
      if (
        this.props.article.executors.find(
          (item) => item._id === this.props.user._id
        )
      )
        role = 2;
    }
    if (this.props.notControl) role = false;
    this.role = role;
    if (role) {
      return (
        <>
          <LoadingFixed isLoading={this.state.isFetching} />
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
                      (!item.condition ||
                        item.condition({
                          article: this.props.article,
                          user: this.props.user,
                        })) &&
                      (item.role === role || !item.role)
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
                isOpen={this.state.isOpenReviewsShow}
                reviews={this.props.article.reviews}
                onMobile={this.props.onMobile}
              />
              <ReviewsFormModal
                ref={(ref) => {
                  this.ReviewsFormModal = ref;
                }}
                onMobile={this.props.onMobile}
                reviews={this.props.article.reviews}
                article={this.props.article}
                reviewsItems={
                  this.props.article.author._id === this.props.user._id
                    ? this.props.article.executors
                    : [this.props.article.author]
                }
              />
            </div>
          )}
          {!this.props.onMobile &&
            this.buttons.map((item, index) => {
              if (
                (!item.status ||
                  item.status.indexOf(this.props.article.status) != -1) &&
                (!item.condition ||
                  item.condition({
                    article: this.props.article,
                    user: this.props.user,
                  })) &&
                (item.role === role || !item.role)
              ) {
                if (item.isButton)
                  return (
                    <Button
                      key={index}
                      type={item.ButtonType}
                      className={`input-action ${
                        item.className ? item.className : ""
                      }`}
                      onClick={item.action}
                    >
                      {item.label}
                    </Button>
                  );
                else
                  return (
                    <div key={index} style={{ display: "contents" }}>
                      {item.content()}
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
          <CancelsModal
            ref={(ref) => {
              this.CancelsModal = ref;
            }}
            onDeleteExecutor={(executor) => {
              this.setState({ isFetching: true }, () => {});
            }}
            article={this.props.article}
            users={this.props.article.executors}
          ></CancelsModal>
          <DeliverModal
            ref={(ref) => {
              this.DeliverModal = ref;
            }}
            onDeleteExecutor={(user) => {
              this.setState({ isFetching: true }, () => {
                this.props.myArticlesActions
                  .setDeliveredMyArticle(
                    this.props.article,
                    user,
                    this.props.user.apiToken
                  )
                  .then((data) => {
                    this.setState({ isFetching: false });
                  });
              });
            }}
            article={this.props.article}
            users={this.state.notDelivered || []}
          ></DeliverModal>
          <DialogsModal
            ref={(ref) => {
              this.DialogsModal = ref;
            }}
            article={this.props.article}
            dialogs={this.props.article.executors}
          ></DialogsModal>
          <CompleteModal
            ref={(ref) => {
              this.CompleteModal = ref;
            }}
            onComplete={() => {
              this.CompleteModal.closeForm();
              this.setState({ isFetching: true }, () => {
                this.props.myArticlesActions
                  .completeMyArticle(
                    this.props.article,
                    this.props.user.apiToken
                  )
                  .then((data) => {
                    this.setState({ isFetching: false });
                  });
              });
            }}
            onCancel={() => {
              this.CompleteModal.closeForm();
              this.setState({ isFetching: true }, () => {
                this.props.myArticlesActions
                  .cancelMyArticle(this.props.article, this.props.user.apiToken)
                  .then((data) => {
                    this.setState({ isFetching: false });
                  });
              });
            }}
          />
        </>
      );
    } else if (!this.props.onlyOpen)
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
                  <Link
                    to={`/${this.props.article.type}/${this.props.article.articleId}`}
                  >
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
              <Link
                to={`/${this.props.article.type}/${this.props.article.articleId}`}
              >
                <Button type="empty" className="input-action">
                  Смотреть
                </Button>
              </Link>
              <Button
                type="fill"
                className={`get-article ${
                  !this.props.user.isAuth ||
                  (this.props.user.isAuth &&
                    this.props.user.type === "cargo" &&
                    this.props.article.type === "offer") ||
                  (this.props.user.type === "carrier" &&
                    this.props.article.type === "order")
                    ? ""
                    : "disable"
                }`}
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
function mapDispatchToProps(dispatch) {
  return {
    myArticlesActions: bindActionCreators(myArticlesActions, dispatch),
  };
}
export default connect(null, mapDispatchToProps)(withRouter(InputRow));
