import { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const NaverCallbackClient = () => {
    const router = useRouter()
    const { code, state } = router.query

    useEffect(() => {
        if (code && state) {
            const fetchData = async () => {
                try {
                    // 백엔드 API로 인증 코드 전송
                    const response = await axios.get('/api/auth/naver/naverCallbackServer', {
                        params: { code, state }
                    })
                    // 인증 성공시 홈으로 이동
                    router.push('/')
                } catch (error) {
                    console.error('Error during Naver authentication:', error)
                }
            }

            fetchData()
        }
    }, [code, state, router])

    return <p>Loading...</p>
}

export default NaverCallbackClient
