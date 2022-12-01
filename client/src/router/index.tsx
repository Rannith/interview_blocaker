import React from "react";
import { Route, Routes } from "react-router-dom";
import Table from "../components/table";

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