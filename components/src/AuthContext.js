import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);

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

export const useAuth = () => {
    return useContext(AuthContext);
};
