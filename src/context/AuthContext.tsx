import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { axiosInstance } from '../api/axiosInstance';

type User = {
    name: string;
    email: string;
};

interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    login: (userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        axiosInstance
            .get('/api/v1/users/me')
            .then((res) => setUser(res.data.result))
            .catch(() => setUser(null));
    }, []);

    const login = (userData: User) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
