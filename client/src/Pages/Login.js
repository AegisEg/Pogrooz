// App
import React from 'react'

class Login extends React.Component {
    render() {
        return (
            <div className="login-page">
                <h1 className="login-title">Вход</h1>

                <div className="login-form">
                    <input type="text" className="input-login" placeholder="+7 (_ _ _) _ _ _ - _ _ - _ _" />
                    <input type="text" className="input-login" placeholder="Пароль" />
                </div>
            </div>
        )
    }
}

export default Login