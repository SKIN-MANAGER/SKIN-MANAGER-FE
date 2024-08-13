import Image from 'next/image'
import styles from '../styles/kakaoLogin.module.css'  // CSS 모듈 예시
import { Box } from '@mui/material'

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
        <Box
            component="div"
            sx={{
                position: 'relative', // 부모 요소의 위치를 상대적으로 설정 (fill 사용 시 필요)
                width: '100%', // 부모 요소의 너비를 100%로 설정
                height: '60px', // 원하는 높이 설정
                marginTop: 1,
                marginBottom: 1,
                overflow: 'hidden', // 자식 요소가 부모 요소를 벗어나지 않도록 설정
            }}
            onClick={kakaoLogin}
        >
            <Image
                src='/images/kakao/ko/kakao_login_large_wide.png'
                alt='카카오 로그인'
                fill // 부모 요소를 가득 채우도록 설정
                style={{ objectFit: 'contain' }} // 이미지 비율을 유지하며 맞춤
                sizes="(max-width: 600px) 100vw, 600px" // 뷰포트에 따라 이미지 크기 조정
                priority // 중요 이미지로 설정하여 우선 로드
                className={styles.kakaoImage}
            />
        </Box>
    )
}

export default KakaoLogin
