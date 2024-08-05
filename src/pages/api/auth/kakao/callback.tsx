import type { NextApiRequest, NextApiResponse } from 'next'

const KakaoCallback = async (req: NextApiRequest, res: NextApiResponse) => {
    const { code } = req.query

    if (!code) {
        res.status(400).send('Authorization code is missing')
        return
    }

    const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID
    const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI

    // 카카오 토큰 요청
    const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: KAKAO_CLIENT_ID!,
            redirect_uri: KAKAO_REDIRECT_URI!,
            code: code as string,
        }),
    })

    const tokenData = await tokenResponse.json()
    if (!tokenResponse.ok) {
        res.status(tokenResponse.status).json(tokenData)
        return
    }

    const { access_token } = tokenData

    // 사용자 정보 요청
    const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })

    const userData = await userResponse.json()
    if (!userResponse.ok) {
        res.status(userResponse.status).json(userData)
        return
    }

    res.status(200).json(userData)
}

export default KakaoCallback
