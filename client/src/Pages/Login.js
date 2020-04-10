// App
import React from 'react'

// Elements
import Button from '../Elements/Button'
import CheckBox from '../Elements/CheckBox'
import Input from '../Elements/Input'

class Login extends React.Component {
    render() {
        return (
            <div className="login-page">
                <h1 className="login-title">Вход</h1>
                <div className="login-form col-12 col-sm-9 col-md-6 col-lg-6 col-xl-5 mx-auto">
                    <Input type="text" className="my-2" placeholder="+7 (_ _ _) _ _ _ - _ _ - _ _"/>
                    <Input type="text" className="my-2" placeholder="Пароль"/>
                    <div className="row mx-0 bottom pb-3">
                        <div className="col-12 col-sm-6 d-flex mt-2">
                            <span>                                
                                <CheckBox id="remember"></CheckBox>                              
                            </span>  
                            <div className="ml-3">
                                <span>Запомнить меня</span>
                                <span className="d-block mt-2"><a href="/">Забыли пароль</a></span>
                            </div>                          
                        </div>
                        <div className="col-12 col-sm-6 text-center text-sm-right mt-2">
                            <Button type="fill" paddingVertical={"10px"} fontSize={"17px"} paddingHorizontal={"35px"}>Войти</Button>
                        </div>
                    </div>                    
                    <p className="text-center mb-0">Еще не зарегистрированы?</p>
                    <p className="text-center my-0 pb-4">Перейти <a href="/register">страницу регистрации</a></p>
                </div>
            </div>
        )
    }
}

export default Login