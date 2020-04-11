// App
import React from 'react'

// Arrows for slider
import prevQuest from '../img/prevQuest.png'
import prevQuestEnable from '../img/prevQuestEnable.png'
import nextQuest from '../img/nextQuest.png'
import nextQuestEnable from '../img/nextQuestEnable.png'

// Img for slider
import sliderPreviewImg from '../img/sliderPreviewImg.png'

class Questions extends React.Component {
    state = {
        questions: [
            {title: 'Что такое PoGrooz?', id: 0},
            {title: 'Как откликнуться на заказ?', id: 1},
            {title: 'Как откликнуться на предложение?', id: 2},
            {title: 'Действительно ли сервис бесплатный?', id: 3},
            {title: 'jakolsdkoajsklod aklsjdkl askldj klasdlk aksljd jklasd', id: 4},
            {title: 'jakolsdkoajsklod aklsjdkl askldj klasdlk aksljd jklasd', id: 5},
            {title: 'jakolsdkoajsklod aklsjdkl askldj klasdlk aksljd jklasd', id: 6},
            {title: 'jakolsdkoajsklod aklsjdkl askldj klasdlk aksljd jklasd', id: 7},

        ]
    }
    render() {
        return (
            <div className="main-questions d-none d-sm-block">
                <h3>Часто задаваемые вопросы</h3>

                <SliderQuestions>
                    {this.state.questions.map(question => {
                        return (
                            <div key={question.id} className="child-questions col-12 col-sm-6 col-md-4 col-xl-3">
                                <div className="child-question">
                                    <p className="child-question-title">{question.title}</p>
                                    <p className="child-question-text">Попутные грузоперевозки с PoGrooz – это шаг в будущее удобных грузоперевозок.</p>
                                    <div className="child-preview-img">
                                        <img src={sliderPreviewImg}  alt="sliderPreviewImg"/>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </SliderQuestions>
            </div>
        )
    }
}

export default Questions

// Slider questions
class SliderQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prevDisable: true,
            nextDisable:
            this.refs && this.refs.offsetWidth >= this.refs.scrollWidth ? true : false
        };
    }
   
    componentDidMount() {
        this.checkButtons(this.refs.offsetWidth, this.refs.scrollLeft);
    }

    checkButtons = (offsetWidthValue, scrollLeftValue) => {
        this.setState({
            prevDisable: scrollLeftValue <= 0 ? true : false,
            nextDisable: (scrollLeftValue + offsetWidthValue) >= this.refs.scrollWidth ? true : false
        })
    }
   
    render() {   
        let offsetWidthValue = this.refs.offsetWidth,
            scrollLeftValue = this.refs.scrollLeft

        return (
            <>
                {(!this.state.nextDisable || !this.state.prevDisable) && <div className="btn-block">
                    <div
                        className={`btn-prev`}
                        disabled={this.state.prevDisable}
                        onClick={() => {
                            scrollLeftValue = this.refs.scrollLeft - this.refs.offsetWidth
                            this.refs.scrollLeft -= this.refs.offsetWidth
                            this.checkButtons(offsetWidthValue, scrollLeftValue)
                        }}
                    >
                        {this.state.prevDisable ? <img src={prevQuest} alt="prevQuest" /> : <img src={prevQuestEnable} alt="prevQuestEnable"/>}
                    </div>
                
                    <div
                        className={`btn-next`}
                        disabled={this.state.nextDisable}
                        onClick={() => {
                            scrollLeftValue = this.refs.scrollLeft + this.refs.offsetWidth
                            this.refs.scrollLeft += this.refs.offsetWidth
                            this.checkButtons(offsetWidthValue, scrollLeftValue)
                        }}
                    >
                        {this.state.nextDisable ? <img src={nextQuest} alt="nextQuest" /> : <img src={nextQuestEnable} alt="nextQuestEnable"/>}
                    </div>
                </div>}

                <div
                    className="slider-container"
                    ref={el => {
                        this.refs = el;
                    }}
                >
                    <div className="slider-wrapper">{this.props.children}</div>
                    
                </div>
            </>
        );
   }
}