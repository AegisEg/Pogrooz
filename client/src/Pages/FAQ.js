// App
import React from 'react'

// Router
import {
    Link
} from "react-router-dom"

// Elemnts
import Input from '../Elements/Input'
import questions from '../config/questions'

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
                </div>

                <div className="faq-questions row">
                    {questions.map((question) => {
                        let view = false

                        let q = this.state.q.split(' ')
                        
                        for (let i = 0; i < q.length; i++) {
                            for (let j = 0; j < question.questions.length; j++) {
                                if(~question.questions[j].title.toLowerCase().indexOf(q[i].toLowerCase()) && !!q[i].length) {
                                    view = true
                                    break
                                }
                            }
                        }

                        if(this.state.q.length === 0) {
                            view = true
                        }

                        return view && (
                            <div className="faq-question col-12 col-sm-6 col-md-4 col-lg-3 text-center text-md-left" key={question.id}>
                                <h4>{question.title}</h4>
                                <ul>
                                    {question.questions.map((question) => {
                                        let view = false
                                        let q = this.state.q.split(' ')
                                        
                                        for (let i = 0; i < q.length; i++) {
                                            if(~question.title.toLowerCase().indexOf(q[i].toLowerCase()) && !!q[i].length) {
                                                view = true
                                            }
                                        }
                
                                        if(this.state.q.length === 0) {
                                            view = true
                                        }

                                        return view && (
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