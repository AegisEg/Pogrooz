// App
import React from "react";

// Arrows for slider
import SliderQuestions from "../Elements/Slider";

// Img for slider
import sliderPreviewImg from "../img/sliderPreviewImg.png";

class Questions extends React.Component {
  state = {
    questions: [
      { title: "Что такое PoGrooz?", id: 0 },
      { title: "Как откликнуться на заказ?", id: 1 },
      { title: "Как откликнуться на предложение?", id: 2 },
      { title: "Действительно ли сервис бесплатный?", id: 3 },
      {
        title: "jakolsdkoajsklod aklsjdkl askldj klasdlk aksljd jklasd",
        id: 4,
      },
      {
        title: "jakolsdkoajsklod aklsjdkl askldj klasdlk aksljd jklasd",
        id: 5,
      },
      {
        title: "jakolsdkoajsklod aklsjdkl askldj klasdlk aksljd jklasd",
        id: 6,
      },
      {
        title: "jakolsdkoajsklod aklsjdkl askldj klasdlk aksljd jklasd",
        id: 7,
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
                    <p className="child-question-text">
                      Попутные грузоперевозки с PoGrooz – это шаг в будущее
                      удобных грузоперевозок.
                    </p>
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
