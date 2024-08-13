import Image from 'next/image'
import styles from '../styles/naverLogin.module.css'  // CSS 모듈 예시
import { useState } from 'react'
import { Box } from '@mui/material'

const NaverLogin = () => {
    const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID
    const NAVER_REDIRECT_URI = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI
    const [state] = useState(() => Math.random().toString(36).substring(2));  // CSRF 보호를 위해 랜덤 문자열 사용

    const naverLogin = () => {
        if (!NAVER_CLIENT_ID || !NAVER_REDIRECT_URI) {
            console.error('Naver client ID or redirect URI is missing.')
            return
        }
        window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(NAVER_REDIRECT_URI)}&state=${state}`
    }

    return (
        <Box
            component="div"
            sx={{
                position: 'relative', // 부모 요소의 위치를 상대적으로 설정 (fill 사용 시 필요)
                width: '100%', // 부모 요소의 너비를 100%로 설정
                height: '110px', // 원하는 높이 설정
                marginTop: 1,
                marginBottom: 1,
                overflow: 'hidden', // 자식 요소가 부모 요소를 벗어나지 않도록 설정
            }}
            onClick={naverLogin}
        >
            <Image
                src='/images/naver/ko/btnG_완성형.png'
                alt='네이버 로그인'
                fill // 부모 요소를 가득 채우도록 설정
                style={{ objectFit: 'contain' }} // 이미지 비율을 유지하며 맞춤
                sizes="(max-width: 600px) 100vw, 600px" // 뷰포트에 따라 이미지 크기 조정
                priority // 중요 이미지로 설정하여 우선 로드
                className={styles.naverImage}
            />
        </Box>
    )
}

export default NaverLogin
