import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useAuth } from '@/context/authContext'

const KakaoCallbackClient = () => {
    const router = useRouter()
    const { code } = router.query
    const { token, setToken } = useAuth()
    const [error, setError] = useState('')

    useEffect(() => {
        if (code) {
            const fetchData = async () => {
                try {
                    // 백엔드 API 호출
                    const response = await axios.get('/api/auth/kakao/kakaoCallbackServer', {
                        params: { code }
                    })
                    setToken(response.data)
                } catch (error) {
                    console.error('kakaoCallbackClient.tsx : ', error)
                    setError('로그인실패. 다시시도해주세요.')
                }
            }
            fetchData()
        }
    }, [code, setToken])

    useEffect(() => {
        if (token) {
            // 토큰이 존재하면 홈으로 이동
            router.push('/')
        }
    }, [token, router])

    if (error) {
        return <p>{error}</p>
    }
    return <p>Loading...</p>
}

export default KakaoCallbackClient
