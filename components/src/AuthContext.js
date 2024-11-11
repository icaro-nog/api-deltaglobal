// src/contexts/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

// Criação do contexto
const AuthContext = createContext();

// Provider que vai envolver a aplicação
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Estado do usuário
    const [authenticated, setAuthenticated] = useState(false); // Estado de autenticação

    const login = (userData) => {
        setUser(userData);
        setAuthenticated(true);
    };

    return (
        <AuthContext.Provider value={{ user, authenticated, login }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook customizado para facilitar o acesso ao contexto
export const useAuth = () => {
    return useContext(AuthContext);
};
