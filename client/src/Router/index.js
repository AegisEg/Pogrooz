// App
import React from 'react'
import { withCookies } from 'react-cookie'

// Router
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom"

// Pages
import Main from '../Pages/Public/Main'
import FAQ from '../Pages/Public/FAQ'
import Login from '../Pages/Auth/Login'
import Register from '../Pages/Auth/Register'
import About from '../Pages/Public/About'
import Cargo from '../Pages/Public/Cargo'
import Carrier from '../Pages/Public/Carrier'

// Redux
import { connect } from 'react-redux'
import * as userActions from '../redux/actions/user'
import { bindActionCreators } from 'redux'

class AppRouter extends React.Component {
    componentDidMount() {
        const { cookies } = this.props
        let apiToken = cookies.get('apiToken')

        if(apiToken) {
            fetch(`http://localhost:8000/api/user`, {
                method: "get",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${apiToken}`,
                }
            })
            .then(response => response.json())
            .then(user => {
                this.props.userActions.loginUser(user)
            })
        }
    }

    render() {
        return (
            <Switch>
                {/* Auth routes */}
                <this.AuthRoute exact path="/login">
                    <Login />
                </this.AuthRoute>
                <this.AuthRoute exact path="/register">
                    <Register />
                </this.AuthRoute>
                {/* Auth routes end */}

                {/* Public routes */}
                <Route exact path="/">
                    <Main />
                </Route>
                <Route exact path="/faq">
                    <FAQ />
                </Route>
                <Route exact path="/about">
                    <About />
                </Route>
                <Route exact path="/cargo">
                    <Cargo />
                </Route>
                <Route exact path="/carrier">
                    <Carrier />
                </Route>
                {/* Public routes end */}

                {/* Private routes */}
                {/* Private routes end */}
            </Switch>
        )
    }

    PrivateRoute = ({ children, ...rest }) => {
        return (
            <Route
                {...rest}
                render={() =>
                this.props.user.isAuth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login"
                        }}
                    />
                )
                }
            />
        );
    }

    AuthRoute = ({ children, ...rest }) => {
        return (
            <Route
                {...rest}
                render={() =>
                !this.props.user.isAuth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/"
                        }}
                    />
                )
                }
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(AppRouter))