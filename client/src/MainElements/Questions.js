// App
import React from "react";

// Arrows for slider
import SliderQuestions from "../Elements/Slider";
import { Link } from "react-router-dom";
// Img for slider
import sliderPreviewImg from "../img/sliderPreviewImg.png";
class Questions extends React.Component {
  state = {
    questions: [
      {
        title: "Что такое PoGrooz?",
        answer: (
          <>
            Попутные грузоперевозки с PoGrooz – это шаг в будущее удобных
            грузоперевозок. Перейти на страницу{" "}
            <Link className="href" to="/questions/about-pogrooz">
              FAQ
            </Link>
          </>
        ),
        id: 0,
      },
      {
        title: "Как откликнуться на заказ?",
        answer: (
          <>
            Откликнуться на Заказ (добавить свое предложение) может любой
            Перевозчик при условии активного Демо режима аккаунта или
            включенного Тарифа. Подробнее в разделе{" "}
            <Link className="href" to="/questions/perevozchikam">
              FAQ
            </Link>
          </>
        ),
        id: 1,
      },
      {
        title: "Как откликнуться на предложение?",
        answer: (
          <>
            Откликнуться на Предложение может любой Грузовладелец бесплатно. Для
            этого нужно кликнуть на кнопку «Взять» на странице поиска
            Предложений.Подробнее в разделе{" "}
            <Link className="href" to="/questions/you-cargo">
              FAQ
            </Link>
          </>
        ),
        id: 2,
      },
      {
        title: "Действительно ли сервис бесплатный?",
        answer: (
          <>
            Сервис бесплатный для Грузовладельцев. Для Перевозчиков действуют{" "}
            <Link className="href" to="/tariffs">
              Тарифы
            </Link>{" "}
            за размещение профиля Перевозчика на сайте.
          </>
        ),
        id: 3,
      },
    ],
  };
  render() {
    return (
      <div className="main-questions d-sm-block">
        <h3>Часто задаваемые вопросы</h3>
        <div className="container-fluid">
          <SliderQuestions>
            {this.state.questions.map((question) => {
              return (
                <div
                  key={question.id}
                  className="child-questions col-12 col-sm-6 col-md-4 col-xl-3"
                >
                  <div className="child-question">
                    <p className="child-question-title">{question.title}</p>
                    <p className="child-question-text">{question.answer}</p>
                    <div className="child-preview-img">
                      <img src={sliderPreviewImg} alt="sliderPreviewImg" />
                    </div>
                  </div>
                </div>
              );
            })}
          </SliderQuestions>
        </div>
      </div>
    );
  }
}

export default Questions;
