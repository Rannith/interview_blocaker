import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/common/Home";

const Router: React.FC = () => {
    return (
        <div className = "App">
            <Routes>
                <Route path = "/" element = {<Home />} />
            </Routes>
        </div>
    )
}

export default Router;