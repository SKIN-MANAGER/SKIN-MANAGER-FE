import Image from 'next/image'
import styles from '../styles/naverLogin.module.css'  // CSS 모듈 예시
import { useState } from 'react'

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
        <div>
            <Image
                src='/images/naver/ko/btnG_완성형.png'
                alt='네이버 로그인'
                width={270}  // 이미지의 너비
                height={40}  // 이미지의 높이
                priority     // 우선 로드
                className={styles.naverImage}  // CSS 모듈 클래스
                onClick={naverLogin}
            />
        </div>
    )
}

export default NaverLogin
