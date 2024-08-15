import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useToken } from '@/context/tokenContext'

const NaverCallbackClient = () => {
    const router = useRouter()
    const { code, state } = router.query
    const { token, setToken } = useToken()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            if (!router.isReady || !code || !loading) {
                return
            }

            try {
                // 백엔드 API로 인증 코드 전송
                const response = await axios.get('/api/auth/naver/naverCallbackServer', {
                    params: { code, state }
                })
                setToken(response.data.result.token.accessToken)

                router.push('/')
            } catch (error) {
                console.error('naverCallbackClient.tsx : ', error)
                setError('로그인실패. 다시시도해주세요.')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [router.isReady, code, state, setToken, loading, router])

    if (error) {
        return <p>{error}</p>
    }
    return <p>Loading...</p>
}

export default NaverCallbackClient
