import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

// Admin password — production'da environment variable'dan alınmalı
const ADMIN_PASSWORD = 'smd2026';

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem('smd_admin_auth') === 'true';
    });

    const login = useCallback((password) => {
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem('smd_admin_auth', 'true');
            return true;
        }
        return false;
    }, []);

    const logout = useCallback(() => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('smd_admin_auth');
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
