// App
import React from 'react'
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

Modal.setAppElement("#root");

class App extends React.Component {
    
    render() {
        return (
            <Router>
                <Header />                
                <AppRouter />
                <Footer /> 
            </Router>
        )
    }
}

export default App