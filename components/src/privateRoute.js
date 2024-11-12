import React from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({children}){
    
    const token = localStorage.getItem('auth_token');

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;

}
