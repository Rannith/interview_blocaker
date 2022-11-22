import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/common/Home";
import Table from "../components/Table";

const Router: React.FC = () => {
    return (
        <div className = "App">
            <Routes>
                <Route path = "/" element = {<Table />} />
            </Routes>
        </div>
    )
}

export default Router;