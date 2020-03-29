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

class App extends React.Component {
    render() {
        return (
            <Router>
                <Header />                
                <AppRouter />
            </Router>
        )
    }
}

export default App