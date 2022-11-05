import React from "react";
import Signup from './Auth/Signup';
import Signin from './Auth/Signin';
import { Route, Routes } from 'react-router-dom';
import styles from "./main.module.scss"

const Main = () => {
    return (
        <div>
            <Routes>
                <Route path='spreader/signin' element={<Signin />} />
                <Route path='spreader/signup' element={<Signup />} />
            </Routes>
        </div>
    );
};

export default Main;
