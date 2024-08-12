import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useAuth } from '@/context/authContext'

const NaverCallbackClient = () => {
    const router = useRouter()
    const { code, state } = router.query
    const { token, setToken } = useAuth()
    const [error, setError] = useState('')

    useEffect(() => {
        if (code && state) {
            const fetchData = async () => {
                try {
                    // 백엔드 API로 인증 코드 전송
                    const response = await axios.get('/api/auth/naver/naverCallbackServer', {
                        params: { code, state }
                    })
                    setToken(response.data)
                } catch (error) {
                    console.error('naverCallbackClient.tsx : ', error)
                    setError('로그인실패. 다시시도해주세요.')
                }
            }
            fetchData()
        }
    }, [code, state, setToken])

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

export default NaverCallbackClient
