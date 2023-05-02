import React from 'react';
import { Sidebar } from '../../shared/iu';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
    return (
        <>
            <Sidebar />
            <Outlet />  
        </>
    );
};
