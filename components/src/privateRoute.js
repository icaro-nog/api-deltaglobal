import React, { createContext, useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function PrivateRoute({children}){

    console.log('private route', localStorage.getItem('auth_token'))
    
    const token = localStorage.getItem('auth_token'); // Pegando o token do localStorage

    if (!token) {
        // Se não houver token, redireciona para a tela de login
        return <Navigate to="/login" />;
    }

    // Caso contrário, renderiza o conteúdo protegido
    return children;

}
