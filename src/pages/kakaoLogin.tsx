import Image from 'next/image'
import styles from '../styles/kakaoLogin.module.css'  // CSS 모듈 예시

const KakaoLogin = () => {
    const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID
    const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI

    const kakaoLogin = () => {
        if (!KAKAO_CLIENT_ID || !KAKAO_REDIRECT_URI) {
            console.error('Kakao client ID or redirect URI is missing.')
            return
        }
        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}&response_type=code`
    }

    return (
        <div>
            <Image
                src='/images/kakao/ko/kakao_login_large_wide.png'
                alt='카카오 로그인'
                width={270}  // 이미지의 너비
                height={40}  // 이미지의 높이
                priority     // 우선 로드
                className={styles.kakaoImage}  // CSS 모듈 클래스
                onClick={kakaoLogin}
            />
        </div>
    )
}

export default KakaoLogin
