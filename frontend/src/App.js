import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import './App.css'

const App = () => {
    return (
        <React.Fragment>
            <Routes>
                <Route exact path="/" element={<Home />} />
            </Routes>
        </React.Fragment>
    )
}

export default App