import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useToken } from '@/context/tokenContext'

const KakaoCallbackClient = () => {
    const router = useRouter()
    const { code } = router.query
    const { token, setToken } = useToken();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            if (!router.isReady || !code || !loading) {
                return
            }

            try {
                // 백엔드 API 호출
                const response = await axios.get('/api/auth/kakao/kakaoCallbackServer', {
                    params: { code }
                })
                setToken(response.data.result.token.accessToken)

                router.push('/')
            } catch (error) {
                console.error('kakaoCallbackClient.tsx : ', error)
                setError('로그인실패. 다시시도해주세요.')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [router.isReady, code, setToken, loading, router])

    if (error) {
        return <p>{error}</p>
    }
    return <p>Loading...</p>
}

export default KakaoCallbackClient
