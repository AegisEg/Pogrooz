// App
import React from 'react'

// Router
import {
    Link
} from "react-router-dom"

// Elemnts
import Input from '../Elements/Input'
import Button from '../Elements/Button'

const questions = [
    {
        title: 'Вы - перевозчик',
        questions: [
            {
                title: 'Шаблон данных об автомобиле',
                url: '',
                id: 1
            },
            {
                title: 'Шаблон данных об автомобиле',
                url: '',
                id: 2
            }
        ],
        id: 1
    },
    {
        title: 'Вы - перевозчик',
        questions: [
            {
                title: 'Шаблон данных об автомобиле',
                url: '',
                id: 1
            },
            {
                title: 'Шаблон данных об автомобиле',
                url: '',
                id: 2
            }
        ],
        id: 2
    },
    {
        title: 'Вы - перевозчик',
        questions: [
            {
                title: 'Шаблон данных об автомобиле',
                url: '',
                id: 1
            },
            {
                title: 'Шаблон данных об автомобиле',
                url: '',
                id: 2
            }
        ],
        id: 3
    },
    {
        title: 'Вы - перевозчик',
        questions: [
            {
                title: 'Шаблон данных об автомобиле',
                url: '',
                id: 1
            },
            {
                title: 'Шаблон данных об автомобиле',
                url: '',
                id: 2
            }
        ],
        id: 4
    },
    {
        title: 'Вы - перевозчик',
        questions: [
            {
                title: 'Шаблон данных об автомобиле',
                url: '',
                id: 1
            },
            {
                title: 'Шаблон данных об автомобиле',
                url: '',
                id: 2
            }
        ],
        id: 5
    },
]

class FAQ extends React.Component {
    state = {
        q: ''
    }

    render() {
        return (
            <div className="faq-page container-fluid">
                <h1 className="faq-title">Часто задаваемые вопросы</h1>

                <div className="row">
                    <div className="col">
                        <Input type="text" placeholder="Напишите ваш вопрос..." value={this.state.q} onChange={(e) => {this.setState({q: e.target.value})}} />
                    </div>

                    <Button type="fill" margin={"0 0 0 10px"} paddingVertical={"6px"} paddingHorizontal={"80px"}>Поиск</Button>
                </div>

                <div className="faq-questions row">
                    {questions.map((question) => {
                        return (
                            <div className="faq-question col-md-3" key={question.id}>
                                <h4>{question.title}</h4>
                                <ul>
                                    {question.questions.map((question) => {
                                        return (
                                            <li key={question.id}><Link to="/">{question.title}</Link></li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default FAQ