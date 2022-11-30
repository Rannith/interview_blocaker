import React from "react";
import { Route, Routes } from "react-router-dom";
import AddDeleteTableRows from "../components/Comp";
import New from "../components/New";
import Table from "../components/Old";

const Router: React.FC = () => {
    return (
        <div className = "App">
            <Routes>
                <Route path = "/" element = {<New />} />
                <Route path = "/table" element = {<AddDeleteTableRows />} />
            </Routes>
        </div>
    )
}

export default Router;