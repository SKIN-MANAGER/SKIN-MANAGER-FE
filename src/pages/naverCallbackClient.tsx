import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useAuth } from '@/context/authContext'

const NaverCallbackClient = () => {
    const router = useRouter()
    const { code, state } = router.query
    const [error, setError] = useState('')
    const { setTokens } = useAuth()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            if (!router.isReady || !code || !loading) {
                return
            }

            const isAutoLogin = sessionStorage.getItem('isAutoLogin')
            const autoLogin = isAutoLogin === 'true' ? 'Y' : 'N'

            try {
                // 백엔드 API로 인증 코드 전송
                const response = await axios.get('/api/auth/naver/naverCallbackServer', {
                    params: { code, state, autoLogin }
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
                router.push('/')
            } catch (error) {
                console.error('naverCallbackClient.tsx : ', error)
                setError('로그인실패. 다시시도해주세요.')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [router.isReady, code, state, setTokens, loading, router])

    if (error) {
        return <p>{error}</p>
    }
    return <p>Loading...</p>
}

export default NaverCallbackClient
