import React, { createContext, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axiosConfig from './axiosConfig';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('userToken') !== null ? true : false);
    let navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('userToken')
        if(token !== null) {
            setIsAuthenticated(true);
        }else{
            setIsAuthenticated(false);
        }
    }, []);

    const login = async (email, password) => {
        const axios1 = axiosConfig()
        try {
            await axios1.get("http://localhost:8000/sanctum/csrf-cookie");
            const response = await axios1.post('http://localhost:8000/api/login', {
                email: email,
                password: password
            });
            if (response.data.success) {
                localStorage.setItem('userToken', response.data?.access_token);
                localStorage.setItem('userName', response.data.data?.user?.name);
                localStorage.setItem('userRole', response.data.data?.user?.roles[0]?.name);
                let arr = [];
                response.data.data.permissions.forEach(permission => {
                    arr.push(permission.name)
                });
                localStorage.setItem('permissions', arr);
                setIsAuthenticated(true);
                navigate('/dashboard')
            } else {
                console.error('Login failed:', response.data.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        localStorage.removeItem('permissions');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;