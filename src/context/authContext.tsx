import React, { createContext, useContext, useState, ReactNode } from 'react'

// Context의 상태 타입 정의
interface AuthContextType {
    token: string | null
    setToken: (token: string | null) => void
}

// Context 초기값 설정
const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
}

// Provider 컴포넌트 구현
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null)

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}

// Context 훅 구현
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth는 AuthProvider 내에서만 사용해야 합니다')
    }
    return context
}
