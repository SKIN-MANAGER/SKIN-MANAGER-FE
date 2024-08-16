import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import axios from 'axios'

interface Member {
  id: string
  name: string
  email: string
  firstPhone: string
  middlePhone: string
  lastPhone: string
}

interface AuthTokens {
  accessToken: string
  accessTokenExpireTime: number
  refreshToken: string
  refreshTokenExpireTime: number
  grantType: string
}

// Context의 타입을 정의합니다.
interface AuthContextType {
  tokens: AuthTokens | null
  member: Member | null
  setTokens: (tokens: AuthTokens | null, member: Member | null) => void
  removeTokens: () => void
}

// 기본값을 설정합니다.
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider 컴포넌트를 정의합니다.
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tokens, setTokensState] = useState<AuthTokens | null>(null)
  const [member, setMemberState] = useState<Member | null>(null)

  useEffect(() => {
    const storedTokens = localStorage.getItem('authTokens')
    const storedMember = localStorage.getItem('member')

    if (storedTokens) {
      setTokensState(JSON.parse(storedTokens))
    }

    if (storedMember) {
      setMemberState(JSON.parse(storedMember))
    }
  }, [])

  useEffect(() => {
    if (tokens) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }, [tokens])

  const setTokens = (newTokens: AuthTokens | null, newMember: Member | null) => {
    if (newTokens) {
      localStorage.setItem('authTokens', JSON.stringify(newTokens))
      setTokensState(newTokens)
    } else {
      localStorage.removeItem('authTokens')
      setTokensState(null)
    }

    if (newMember) {
      localStorage.setItem('member', JSON.stringify(newMember))
      setMemberState(newMember)
    } else {
      localStorage.removeItem('member')
      setMemberState(null)
    }
  }

  const removeTokens = () => {
    localStorage.removeItem('authTokens')
    localStorage.removeItem('member')
    setTokensState(null)
    setMemberState(null)
  }

  return (
    <AuthContext.Provider value={{ tokens, member, setTokens, removeTokens }}>
      {children}
    </AuthContext.Provider>
  )
}

// Context를 사용하는 커스텀 훅
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth는 AuthProvider 내에서 사용되어야 합니다.')
  }
  return context
}
