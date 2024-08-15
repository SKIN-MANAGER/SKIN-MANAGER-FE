import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Context의 타입을 정의합니다.
interface TokenContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  removeToken: () => void;
}

// 기본값을 설정합니다.
const TokenContext = createContext<TokenContextType | undefined>(undefined);

// Provider 컴포넌트를 정의합니다.
export const TokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setTokenState(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
    setTokenState(newToken);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    setTokenState(null);
  };

  return (
    <TokenContext.Provider value={{ token, setToken, removeToken }}>
      {children}
    </TokenContext.Provider>
  );
};

// Context를 사용하는 커스텀 훅
export const useToken = (): TokenContextType => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};
