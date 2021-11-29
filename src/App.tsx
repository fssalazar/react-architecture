import React from 'react'
import Modal from 'react-modal'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AppProvider } from './hooks'
import { Routes } from './routes'
import GlobalStyle from './styles/global'
import 'react-toastify/dist/ReactToastify.min.css'

function App() {
    Modal.setAppElement('#root')

    return (
        <AppProvider>
            <Router>
                <Routes />
                <ToastContainer />
            </Router>
            <GlobalStyle />
        </AppProvider>
    )
}

export default App
