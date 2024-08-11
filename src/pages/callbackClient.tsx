import { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const CallbackClient = () => {
    const router = useRouter()
    const { code } = router.query

    useEffect(() => {
        if (code) {
            const fetchData = async () => {
                try {
                    // 백엔드 API로 인증 코드 전송
                    const response = await axios.get('/api/auth/kakao/callbackServer', {
                        params: { code }
                    })

                    // 인증 성공시 홈으로 이동
                    router.push('/')
                } catch (error) {
                    console.error('Error during Kakao authentication:', error)
                }
            }

            fetchData()
        }
    }, [code, router])

    return <p>Loading...</p>
}

export default CallbackClient
