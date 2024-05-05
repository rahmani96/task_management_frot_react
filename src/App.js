import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import PrivateRoute from './PrivateRoute';
import AuthProvider from './AuthContext';
import AllRoutes from './AllRoutes';
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css'; 
import 'primeicons/primeicons.css'; 

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route exact path="/login"  element={<Login />} />
                <Route exact path="/register"  element={<Register />} />
                <Route path="*" element={ 
                    <PrivateRoute>
                        <AllRoutes />
                    </PrivateRoute>
                    } />
            </Routes>
        </AuthProvider>
    );
}

export default App;
