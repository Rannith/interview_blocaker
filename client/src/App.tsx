import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import { ToastContainer } from 'react-toastify'

const App: React.FC = () => {
    return (
        <>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
            <ToastContainer />
        </>
    )
}

export default App;