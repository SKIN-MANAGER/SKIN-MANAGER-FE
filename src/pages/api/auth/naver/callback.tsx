import type { NextApiRequest, NextApiResponse } from 'next'

const NaverCallback = async (req: NextApiRequest, res: NextApiResponse) => {
    const { code } = req.query

    if (!code) {
        res.status(400).send('Authorization code missing')
        return
    }

    const NAVAER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID
    const NAVER_CLIENT_SECRET = process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET
    const NAVER_REDIRECT_URI = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI

    // 네이버 토큰 요청
    const tokenResponse = await fetch('https://nid.naver.com/oauth2.0/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: NAVAER_CLIENT_ID!,
            client_secret: NAVER_CLIENT_SECRET!,
            redirect_uri: NAVER_REDIRECT_URI!,
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
    const userResponse = await fetch('https://openapi.naver.com/v1/nid/me', {
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

export default NaverCallback
