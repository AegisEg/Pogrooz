// App
import React from 'react'

// Router
import {
    Switch,
    Route
} from "react-router-dom"

// Pages
import Main from '../Pages/Main'
import FAQ from '../Pages/FAQ'
import Login from '../Pages/Login'
import Register from '../Pages/Register'

class AppRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/">
                    <Main />
                </Route>
                <Route exact path="/faq">
                    <FAQ />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/register">
                    <Register />
                </Route>
            </Switch>
        )
    }
}

export default AppRouter