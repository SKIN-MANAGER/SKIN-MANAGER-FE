import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const naverCallbackServer = async (req: NextApiRequest, res: NextApiResponse) => {
    const { code, state, autoLogin } = req.query
    const BASE = 'http://localhost:8080/api/v1/member/naver/login'

    if (!code || !state) {
        res.status(400).send('Authorization code or state missing')
        return
    }

    try {
        // 백엔드 API에 인가 코드를 전달
        const response = await axios.get(BASE, {
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                code: code,
                state: state,
                autoLogin: autoLogin
            }
        })

        // 백엔드에서 반환된 데이터를 프론트엔드로 전달
        res.status(200).json(response.data)
    } catch (error) {
        // 에러 처리
        if (axios.isAxiosError(error) && error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

export default naverCallbackServer
