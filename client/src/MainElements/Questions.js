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
            <div className="main-questions">
                <h3>Часто задаваемые вопросы</h3>

                <SliderQuestions>
                    {this.state.questions.map(question => {
                        return (
                            <div key={question.id} className="child-questions">
                                <div className="child-question">
                                    {question.title}
                                </div>

                                <div className="child-preview-img">
                                    <img src={sliderPreviewImg} />
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
        this.checkButtons(this.refs.offsetWidth, this.refs.scrollWidth);
    }

    checkButtons = (offsetWidthValue, scrollWidthValue) => {
        setTimeout(() => {
            this.setState({
                prevDisable: this.refs.scrollLeft <= 0 ? true : false,
                nextDisable:
                this.refs.scrollLeft + offsetWidthValue >= scrollWidthValue ? true : false
            });
        }, 350)
    }
   
    render() {
        const offsetWidthValue = this.refs.offsetWidth,
            scrollWidthValue = this.refs.scrollWidth
            
        return (
            <>
                {(!this.state.nextDisable || !this.state.prevDisable) && <div className="btn-block">
                    <div
                        className={`btn-prev`}
                        disabled={this.state.prevDisable}
                        onClick={() => {
                            this.refs.scrollLeft -= offsetWidthValue / 2;
                            this.checkButtons(offsetWidthValue, scrollWidthValue);
                        }}
                    >
                        {this.state.prevDisable ? <img src={prevQuest} /> : <img src={prevQuestEnable} />}
                    </div>
                
                    <div
                        className={`btn-next`}
                        disabled={this.state.nextDisable}
                        onClick={() => {
                            this.refs.scrollLeft += offsetWidthValue / 2;
                            this.checkButtons(offsetWidthValue, scrollWidthValue);
                        }}
                    >
                        {this.state.nextDisable ? <img src={nextQuest} /> : <img src={nextQuestEnable} />}
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