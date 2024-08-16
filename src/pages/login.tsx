import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    CssBaseline,
    FormControlLabel,
    Checkbox,
} from '@mui/material'
import axios from 'axios'
import KakaoLogin from './kakaoLogin'
import NaverLogin from './naverLogin'
import { useAuth } from '@/context/authContext'

const Login = () => {
    const BASE = '/api/login'
    const [id, setId] = useState('')
    const [pwd, setPwd] = useState('')
    const [error, setError] = useState('')
    const [isAutoLogin, setIsAutoLogin] = useState(false)
    const { setTokens } = useAuth()
    const router = useRouter()

    useEffect(() => {
        const storedIsAutoLogin = localStorage.getItem('isAutoLogin')
        if (storedIsAutoLogin === 'true') {
            setIsAutoLogin(true)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('isAutoLogin', isAutoLogin.toString())
    }, [isAutoLogin])

    const loginHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        setError('')

        if (!id || !pwd) {
            setError('이메일과 비밀번호를 입력해주세요.')
            return
        }

        const autoLogin = isAutoLogin ? 'Y' : 'N'

        try {
            const response = await axios.post(BASE, { id, pwd, autoLogin }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.status === 200) {
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
            } else {
                setError('이메일 또는 비밀번호가 잘못되었습니다.')
            }
        } catch (err) {
            setError('로그인 중 오류가 발생했습니다.')
            console.error("login.tsx : ", err)
        }
    }

    const signupHandler = () => {
        // 회원가입 처리 로직 추가
        router.push('/signup') // 예시로 회원가입 페이지로 이동
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    로그인
                </Typography>
                <Box component="form" onSubmit={loginHandler} noValidate sx={{ mt: 1 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="이메일 주소"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="비밀번호"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isAutoLogin}
                                onChange={(e) => setIsAutoLogin(e.target.checked)}
                                color="primary"
                            />
                        }
                        label="자동 로그인"
                    />
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 1, mb: 1 }} // 아래에 마진을 줘서 버튼 사이 간격 유지
                    >
                        로그인
                    </Button>
                </Box>
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={signupHandler} // 회원가입 버튼 클릭 시 동작
                    sx={{ mt: 1, mb: 1 }}
                >
                    회원가입
                </Button>
            </Box>
            <KakaoLogin />
            <NaverLogin />
        </Container>
    )
}

export default Login
