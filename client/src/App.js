// App
import React from 'react'
import { CookiesProvider } from 'react-cookie'
import './App.css'
import './css/grid.min.css'

// Router
import AppRouter from './Router'
import {
    BrowserRouter as Router,
} from "react-router-dom"

// Partials
import Header from './Partials/Header'
import Footer from './Partials/Footer'
import Modal from "react-modal";

// Redux
import store from './redux/store'
import { Provider } from 'react-redux'

Modal.setAppElement("#root");

class App extends React.Component {
    render() {
        return (
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <Header />                
                        <AppRouter />
                        <Footer /> 
                    </Router>
                </Provider>
            </CookiesProvider>
        )
    }
}

export default App