import React from "react";
import Signup from './Auth/Signup';
import Signin from './Auth/Signin';
import { Route, Routes } from 'react-router-dom';
import styles from "./main.module.scss"
import Dashboard from '../dashboard/Dashboard';
import Sidebar from '../Sidebar/Sidebar';
import Task from './../task/Task';

const Main = () => {
    return (
        <div className={styles.Main}>
            <Sidebar />
            <Routes>
                
                <Route path='spreader/signin' element={<Signin />} />
                <Route path='spreader/signup' element={<Signup />} />
                <Route path='spreader/dashboard' element={<Dashboard />} />
            </Routes>
            <Task />
        </div>
    );
};

export default Main;
