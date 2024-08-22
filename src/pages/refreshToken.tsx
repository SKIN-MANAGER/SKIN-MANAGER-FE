import { useEffect } from 'react'
import { useAuth } from '@/context/authContext'
import axiosInstance from './api/axiosInstance'

const RefreshToken = () => {
    const BASE = '/api/v1/member/login/refresh'
    const { tokens, member, setTokens, removeTokens } = useAuth()

    useEffect(() => {
        const setupInterceptor = () => {
            axiosInstance.interceptors.request.use(
                async (config) => {
                    if (tokens && member) {
                        const currentTime = Math.floor(Date.now() / 1000)
                        const tokenExpiration = tokens.accessTokenExpireTime

                        if (tokenExpiration && currentTime > tokenExpiration) {
                            try {
                                const response = await axiosInstance.post(BASE, {
                                    id: member.id
                                })

                                const { id, name, email, firstPhone, middlePhone, lastPhone, token } = response.data.result

                                setTokens(
                                    token,
                                    {
                                        id,
                                        name,
                                        email,
                                        firstPhone,
                                        middlePhone,
                                        lastPhone
                                    }
                                )

                                config.headers['Authorization'] = `Bearer ${token.accessToken}`
                            } catch (error) {
                                console.error('토큰 갱신 실패:', error)
                                removeTokens()
                                window.location.href = '/login'
                                return Promise.reject(error)
                            }
                        } else {
                            config.headers['Authorization'] = `Bearer ${tokens.accessToken}`
                        }
                    }
                    return config
                },
                (error) => Promise.reject(error)
            )
        }

        setupInterceptor()
    }, [tokens, setTokens, removeTokens])

    return null
}

export default RefreshToken
