import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import FormTask from './components/pages/task/Form';
import EditTask from './components/pages/task/Edit';
import Dashboard from './components/pages/task/List';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';

function AllRoutes() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    return (
        <>
            {!isLoginPage && <Header />}
            <Routes>
                <Route exact path="/tasks/add"  element={<FormTask />} />
                <Route exact path="/tasks/edit/:id"  element={<EditTask />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
            </Routes>
            {!isLoginPage && <Footer />}
        </>
    )
}

export default AllRoutes