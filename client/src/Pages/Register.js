// App
import React from 'react'

class Register extends React.Component {
    render() {
        return (
            <div className="register-page">
                <h1 className="register-title">Регистрация</h1>

                <div className="register-form">
                    <input type="text" className="input-register" placeholder="+7 (_ _ _) _ _ _ - _ _ - _ _" />
                    <input type="text" className="input-register" placeholder="Пароль" />
                </div>
            </div>
        )
    }
}

export default Register